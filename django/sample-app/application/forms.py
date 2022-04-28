from django import forms

from django.forms import ModelForm, Form
from django.utils import timezone
from silica_django.fields import SilicaSubFormArrayField
from silica_django.forms import SilicaFormMixin, SilicaModelFormMixin
from silica_django.layout import HorizontalLayout, VerticalLayout, Control
from silica_django.rules import ShowIf

from application.models import Application, ApplicationNote
from application.widgets import CustomTextRenderer


class ApplicationNoteForm(SilicaFormMixin, ModelForm):

    class Meta:
        model = ApplicationNote
        fields = ('content',)


class ApplicationNoteArrayField(SilicaSubFormArrayField):
    # todo support non-model forms
    # todo make the visuals a lot better
    instance_form = ApplicationNoteForm

    def get_queryset(self):
        return ApplicationNote.objects.filter(application=self.parent_instance)

    def prepare_create(self, form_data):
        return ApplicationNote(application=self.parent_instance, **form_data)


class ApplicationForm(SilicaModelFormMixin, ModelForm):
    is_eligible = forms.BooleanField(required=False)
    application_notes = ApplicationNoteArrayField(required=False)
    eligible_reason = forms.CharField(widget=CustomTextRenderer, required=False)
    ineligible_reason = forms.CharField(widget=forms.Textarea, required=False)
    can_appeal = forms.BooleanField(required=False)
    dob = forms.DateField(initial=timezone.now().date())

    class Meta:
        model = Application
        rules = {
            'eligible_reason': ShowIf(is_eligible=True),
            'ineligible_reason': ShowIf(is_eligible=False),
            'can_appeal': ShowIf(is_eligible=False),
        }
        labels = {
            'dob': "Date of Birth"
        }
        fields = ('name', 'dob', 'is_eligible', 'eligible_reason', 'ineligible_reason', 'can_appeal')
        layout = VerticalLayout(
            HorizontalLayout('name', 'dob'),
            VerticalLayout(
                HorizontalLayout('is_eligible', 'eligible_reason'),
                HorizontalLayout('ineligible_reason', 'can_appeal')
            ),
            Control('application_notes')
        )
        uischema_options = {
            'application_notes': {
                'displayDelete': True,
                'enableAddButton': True,
            }
        }


class NormalForm(SilicaFormMixin, Form):
    check = forms.BooleanField(initial=False)
    text = forms.CharField(required=True)

    class Meta:
        rules = {
            'text': ShowIf(check=True)
        }
