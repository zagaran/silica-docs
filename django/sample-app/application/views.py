from django.contrib import messages
from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect, render, get_object_or_404
from django.views.generic.base import TemplateView, View
from django.http.response import HttpResponse

from application.constants import Permissions
from application.forms import CreateApplicationForm, ApplicationForm, ApplicantInfoForm
from application.models import Application, ApplicationItemOne, ApplicationItemTwo, ApplicantInformation
from common.authentication import UserHasPermissionMixin


class IndexView(TemplateView):
    template_name = "common/index.html"


class ApplicantHomeView(UserHasPermissionMixin, TemplateView):
    template_name = "applicant/home.html"
    permission = Permissions.edit_own_application

    def get_context_data(self, **kwargs):
        applications = Application.objects.filter(user=self.request.user)
        return {
            'user': self.request.user,
            'applications': applications,
        }


class CreateApplicationView(TemplateView, UserHasPermissionMixin):
    template_name = "applicant/create_application.html"

    def get_context_data(self, **kwargs):
        return {
            'form': CreateApplicationForm()
        }

    def post(self, request):
        form = CreateApplicationForm(request.POST)
        if form.is_valid():
            cleaned_data = form.cleaned_data
            application = Application.objects.create(user=request.user, organization=cleaned_data['organization'])
            if cleaned_data['include_section_one']:
                ApplicationItemOne.objects.create(application=application)
            if cleaned_data['include_section_two']:
                ApplicationItemTwo.objects.create(application=application)
            return redirect('view_application', application.id)
        else:
            messages.error(request, "Form invalid. See errors below.")
            return render(request, template_name=self.template_name, context={'form': form})


class ApplicationView(TemplateView, UserHasPermissionMixin):
    template_name = "applicant/application.html"

    def get_context_data(self, **kwargs):
        pk = self.kwargs.get('pk', None)
        application = get_object_or_404(Application, id=pk, user=self.request.user)
        if not application.applicant:
            application.applicant = ApplicantInformation.objects.create()
            application.save()
        return {
            'application': application,
            'form': ApplicantInfoForm(instance=application.applicant),
        }

    def post(self, request, *args, pk=None, **kwargs):
        application = get_object_or_404(Application, id=pk, user=self.request.user)
        form = ApplicationForm(request.POST, instance=application)
        if form.is_valid():
            form.save()
        else:
            for key, val in form.errors.items():
                messages.error(request, f"{key}: {val}", extra_tags="danger")
        return redirect('view_application', pk)


# class StandardFormView(TemplateView):
#     template_name = "non_model_form.html"
# 
#     def get_context_data(self, **kwargs):
#         return {
#             'form': NormalForm()
#         }
# 
#     def post(self, request):
#         form = NormalForm(request.POST)
#         form.is_valid()
#         return HttpResponse("You have submitted a non-modal form! Congrats!" + repr(form.cleaned_data))


class HealthCheckView(View):
    def get(self, request):
        return HttpResponse("ok")


class LoginView(TemplateView):
    template_name = "common/auth/login.html"

    def get_context_data(self, **kwargs):
        return {
            'login_form': AuthenticationForm()
        }

    def get(self, request, *args, **kwargs):
        request.session['login_next'] = request.GET.get('next')
        return super().get(request, *args, **kwargs)

    def post(self, request):
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.user_cache)
            messages.info(request, "You have successfully logged in.")
            if request.session['login_next']:
                next_page = request.session['login_next']
                request.session['login_next'] = None
                return redirect(to=next_page)
            if form.user_cache.has_permission(Permissions.edit_own_application):
                return redirect('applicant_home')
            return redirect('index')
        return render(request, template_name=self.template_name, context={'login_form': form})


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect("index")


# class ApplicationView(TemplateView):
#     template_name = 'applications.html'
# 
#     def post(self, request, pk=None):
#         if pk:
#             form = ApplicationForm(request.POST, instance=Application.objects.get(id=pk))
#         else:
#             form = ApplicationForm(request.POST)
#         if form.is_valid():
#             form.save()
#         else:
#             messages.error(request, form.errors)
#         return redirect('view_applications')
#     
#     def get_context_data(self, **kwargs):
#         return {
#             'create_form': ApplicationForm(),
#             'existing_applications_forms': [ApplicationForm(instance=instance) for instance in Application.objects.all()]
#         }


def error_404(request, exception):
    return render(request, "errors/404.html", status=404)


def error_500(request):
    return render(request, "errors/500.html", status=500)
