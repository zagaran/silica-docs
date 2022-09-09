from django import forms

from application.models import Application, ApplicationItemOne, ApplicantInformation, ApplicationItemTwo
from common.models import Organization


class CreateApplicationForm(forms.Form):
    include_section_one = forms.BooleanField(widget=forms.CheckboxInput, required=False)
    include_section_two = forms.BooleanField(widget=forms.CheckboxInput, required=False)
    organization = forms.ModelChoiceField(Organization.objects.all())


class ApplicantInfoForm(forms.ModelForm):
    class Meta:
        model = ApplicantInformation
        fields = '__all__'


class ApplicationForm(forms.ModelForm):
    has_item_one = False
    has_item_two = False

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.has_item_one = self.instance.item_one_id is not None
        self.has_item_two = self.instance.item_two_id is not None

    class Meta:
        model = Application
        fields = ('applicant',)


class ApplicationItemOneForm(forms.ModelForm):
    class Meta:
        model = ApplicationItemOne
        fields = '__all__'


class ApplicationItemTwoForm(forms.ModelForm):
    class Meta:
        model = ApplicationItemTwo
        fields = '__all__'
