from django.forms import widgets
from silica_django.widgets import SilicaRenderer


class CustomTextRenderer(SilicaRenderer, widgets.Textarea):
    custom_component_name = "CustomTextRenderer"
