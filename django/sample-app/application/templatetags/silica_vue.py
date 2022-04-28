from django import template

register = template.Library()


@register.inclusion_tag('common/setup_vue_silica.html')
def setup_silica_vue_form(form, form_id, do_import_library=False):
    return {
        "form": form,
        "form_id": form_id,
        "do_import_library": do_import_library,
    }
