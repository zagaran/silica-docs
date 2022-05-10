from django import forms
from django.forms import ModelForm, Form
from django.utils import timezone
from silica_django.fields import SilicaSubFormArrayField, SilicaSubmitInputField
from silica_django.forms import SilicaFormMixin, SilicaModelFormMixin
from silica_django.layout import HorizontalLayout, VerticalLayout, Control
from silica_django.rules import ShowIf

from application.models import Application, ApplicationNote
from application.widgets import CustomTextRenderer
from silica_django.config import SilicaConfig, SilicaFieldConfig


class ApplicationNoteForm(SilicaFormMixin, ModelForm):

    class Meta:
        model = ApplicationNote
        fields = ('content',)


class ApplicationNoteArrayField(SilicaSubFormArrayField):
    instance_form = ApplicationNoteForm
    max_instances = 4
    min_instances = 2

    def get_queryset(self):
        return ApplicationNote.objects.filter(application=self.parent_instance)

    def prepare_create(self, form_data):
        return ApplicationNote(application=self.parent_instance, **form_data)


SHOW_IF_ELIGIBLE = ShowIf(is_eligible=True)
SHOW_IF_INELIGIBLE = ShowIf(is_eligible=False)


class ApplicationForm(SilicaModelFormMixin, ModelForm):
    is_eligible = forms.BooleanField(required=True)
    application_notes = ApplicationNoteArrayField(required=False)
    eligible_reason = forms.CharField(widget=CustomTextRenderer, required=False)
    ineligible_reason = forms.CharField(widget=forms.Textarea, required=False)
    can_appeal = forms.BooleanField(required=False)
    dob = forms.DateField(initial=timezone.now().date())
    integer_field = forms.IntegerField(initial=2)
    submit = SilicaSubmitInputField(value="Test Submit")

    class Meta:
        model = Application
        silica_config = SilicaConfig(
            name=SilicaFieldConfig(min_length=3),
            integer_field=SilicaFieldConfig(minimum=3),
            eligible_reason=SilicaFieldConfig(rule=SHOW_IF_ELIGIBLE),
            ineligible_reason=SilicaFieldConfig(rule=SHOW_IF_INELIGIBLE),
            can_appeal=SilicaFieldConfig(rule=SHOW_IF_INELIGIBLE),
            application_notes=SilicaFieldConfig(display_delete=True, enable_add=True),
            submit=SilicaFieldConfig(label="")
        )
        fields = '__all__'
        labels = {
            'dob': "Date of Birth"
        }
        layout = VerticalLayout(
            HorizontalLayout('name', 'dob'),
            VerticalLayout(
                HorizontalLayout('is_eligible', 'eligible_reason'),
                HorizontalLayout('ineligible_reason', 'can_appeal')
            ),
            'application_notes',
            'integer_field',
            'submit'
        )


class NormalForm(SilicaFormMixin, Form):
    check = forms.BooleanField(initial=False)
    text = forms.CharField(required=True)

    class Meta:
        rules = {
            'text': ShowIf(check=True)
        }
