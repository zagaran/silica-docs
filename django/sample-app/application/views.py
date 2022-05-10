from django.contrib import messages
from django.contrib.auth import logout
from django.shortcuts import redirect, render
from django.views.generic.base import TemplateView, View
from django.http.response import HttpResponse
from application.forms import ApplicationForm, NormalForm
from application.models import Application


class IndexView(TemplateView):
    template_name = "common/index.html"


class StandardFormView(TemplateView):
    template_name = "common/non_model_form.html"

    def get_context_data(self, **kwargs):
        return {
            'form': NormalForm()
        }

    def post(self, request):
        form = NormalForm(request.POST)
        form.is_valid()
        return HttpResponse("You have submitted a non-modal form! Congrats!" + repr(form.cleaned_data))


class HealthCheckView(View):
    def get(self, request):
        return HttpResponse("ok")


class LogoutView(View):
    def post(self, request):
        logout(request)
        return redirect("index")


class ApplicationView(TemplateView):
    template_name = 'common/applications.html'

    def post(self, request, pk=None):
        if pk:
            form = ApplicationForm(request.POST, instance=Application.objects.get(id=pk))
        else:
            form = ApplicationForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            if pk:
                return render(request, self.template_name, context={
                    'create_form': ApplicationForm(),
                    'existing_applications_forms': [ApplicationForm(instance=instance) for instance in Application.objects.exclude(pk=pk)] + [form]
                })
            else:
                return render(request, self.template_name, context={
                    'create_form': form,
                    'existing_applications_forms': [ApplicationForm(instance=instance) for instance in
                                                    Application.objects.all()]
                })
        return redirect('view_applications')

    def get_context_data(self, **kwargs):
        return {
            'create_form': ApplicationForm(),
            'existing_applications_forms': [ApplicationForm(instance=instance) for instance in Application.objects.all()]
        }


def error_404(request, exception):
    return render(request, "errors/404.html", status=404)


def error_500(request):
    return render(request, "errors/500.html", status=500)
