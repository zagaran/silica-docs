from django import forms
from silica_django.config import SilicaConfig, SilicaFieldConfig
from silica_django.forms import SilicaFormMixin
from silica_django.fields import SilicaSubFormField, SilicaSubFormArrayField
from silica_django.layout import VerticalLayout, Categorization, Category, CustomHTMLElement, HorizontalLayout
from silica_django.rules import ShowIf

from application.models import Application, ApplicationItemOne, ApplicantInformation, ApplicationItemTwo
from common.models import Organization


class CreateApplicationForm(forms.Form):
    include_section_one = forms.BooleanField(widget=forms.CheckboxInput, required=False)
    include_section_two = forms.BooleanField(widget=forms.CheckboxInput, required=False)
    organization = forms.ModelChoiceField(Organization.objects.all())


class ApplicantInfoForm(SilicaFormMixin, forms.ModelForm):
    class Meta:
        model = ApplicantInformation
        fields = '__all__'


class SilicaApplicantInfoField(SilicaSubFormField):
    instance_form = ApplicantInfoForm

    def get_instance(self):
        return ApplicantInformation.objects.get(application=self.parent_instance)


class SilicaCoApplicantInfoField(SilicaSubFormArrayField):
    instance_form = ApplicantInfoForm

    def get_queryset(self):
        return ApplicantInformation.objects.filter(item_ones=self.parent_instance)


class ItemOneForm(SilicaFormMixin, forms.ModelForm):
    co_applicants = SilicaCoApplicantInfoField(label="Co-Applicants")

    class Meta:
        model = ApplicationItemOne
        fields = '__all__'
        silica_config = SilicaConfig(
            co_applicants=SilicaFieldConfig(enable_add=True)
        )


class SilicaItemOneField(SilicaSubFormField):
    instance_form = ItemOneForm

    def get_instance(self):
        return ApplicationItemOne.objects.get(application=self.parent_instance)


class ApplicationForm(SilicaFormMixin, forms.ModelForm):
    applicant = SilicaApplicantInfoField(label="Applicant Info")
    item_one = SilicaItemOneField(label="Fill out Item One")
    include_item_one = forms.BooleanField(initial=True, required=False)
    include_item_two = forms.BooleanField(initial=False, required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Application
        fields = ('applicant', 'item_one', 'include_item_one', 'include_item_two')
        silica_config = SilicaConfig(
            # TODO: rules aren't working currently
            item_one=SilicaFieldConfig(rule=ShowIf(include_item_one=True))
        )
        layout = VerticalLayout(
            HorizontalLayout(
                'include_item_one', 'include_item_two',
            ),
            CustomHTMLElement("<h1>test</h1>", rule=ShowIf(include_item_one=True)),
            Categorization(
                Category("General Info", 'applicant'),
                Category("Item One", 'item_one'),
                Category("Item Two", CustomHTMLElement("<h1>Element Two</h1>"), rule=ShowIf(include_item_two=True)),
            )
        )


class ApplicationItemOneForm(forms.ModelForm):
    class Meta:
        model = ApplicationItemOne
        fields = '__all__'


class ApplicationItemTwoForm(forms.ModelForm):
    class Meta:
        model = ApplicationItemTwo
        fields = '__all__'
