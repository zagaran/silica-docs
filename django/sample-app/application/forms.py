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

    billing_is_same = forms.BooleanField(required=False, initial=False)

    class Meta:
        model = Application
        labels = {
            'dob': "Date of Birth"
        }
        fields = '__all__' # fields must be included here or no renderer found error?
        silica = {
            'rules': {
                'eligible_reason': ShowIf(is_eligible=False), # show example compound condition here e.g. ShowIf(And(is_eligible=["criterion1","criterion2"], is_eligible=True)),
                'ineligible_reason': ShowIf(is_eligible=False),
                'can_appeal': ShowIf(is_eligible=False),
                'billing_address_1': ShowIf(billing_is_same=False),
                'billing_address_2': ShowIf(billing_is_same=False),
                'billing_address_city': ShowIf(billing_is_same=False),
                'billing_address_state': ShowIf(billing_is_same=False),
                'billing_address_zip_code': ShowIf(billing_is_same=False),
                },
            'schema_options': {
                'billing_address_state': {'maxLength': 2},
                'mailing_address_state': {'maxLength': 2},
                'mailing_address_zip_code': {'maxLength': 5},
                'mailing_address_zip_code': {'maxLength': 5},
                },
            'uischema_options': {
                'application_notes': {
                    'displayDelete': True,
                    'enableAddButton': True,
                    },
                },
            'layout': VerticalLayout(
                HorizontalLayout('name', 'dob'),
                VerticalLayout(
                    HorizontalLayout('is_eligible', 'eligible_reason', VerticalLayout('billing_address_1','billing_address_2')),
                    HorizontalLayout('ineligible_reason', 'can_appeal'),
                 ),
                'billing_is_same',
                'billing_address_2',
                HorizontalLayout(
                    'billing_address_city',
                    'billing_address_state',
                    'billing_address_zip_code',
                ),
                'mailing_address_1',
                'mailing_address_2',
                HorizontalLayout(
                    'mailing_address_city',
                    'mailing_address_state',
                    'mailing_address_zip_code',
                ),
            )
        }


class NormalForm(SilicaFormMixin, Form):
    check = forms.BooleanField(initial=False)
    text = forms.CharField(required=True)

    class Meta:
        rules = {
            'text': ShowIf(check=True)
        }
