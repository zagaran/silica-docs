# Forms

Silica-Django's entire reason for being is to allow developers to define logical conditions for rendering
a form with the least effort possible. At the same time, we want to make sure that developers can effectively configure
the various behaviors of the form, within reason.

## SilicaFormMixin

This mixin can be used with either Django Model Forms or standard Forms. In either case, Silica's behavior can be
configured by adding or modifying fields in the Form's `Meta` class. Note that while standard Django Forms do not
require the definition of a `Meta` class as Model Forms do, one may be added in the same manner as for a Model Form 
without consequences. Note that if you wish to use `SilicaSubFormArrayField` fields, you should instead use 
`SilicaModelFormMixin` as described below.

### Setup

To use the `SilicaFormMixin`, simply include it as a subclass when defining any Form or Model Form, e.g.
```python
from django.forms import ModelForm
from silica_django.forms import SilicaModelFormMixin
from silica_django.layout import VerticalLayout, HorizontalLayout, Control
# other imports
...

class SomeForm(SilicaModelFormMixin, ModelForm):
    # define your fields here
    ...
    class Meta:
        model = SomeModel
        fields = ('field1', 'field2')
        rules = {
           # optionally define rules for dynamic field behavior
            ... 
        }
        # optionally define a custom layout for the form
        layout = VerticalLayout(HorizontalLayout(Control('field1'), Control('field2')))
        uischema_options = {
            # optionally define custom options for the uischema to configure individual fields
            ...
        }
```
or, for non-Model Forms:
```python
from django.forms import Form
from silica_django.forms import SilicaFormMixin
from silica_django.layout import VerticalLayout
# other imports
...
class SomeStandardForm(SilicaFormMixin, Form):
    # define fields
    ...
    class Meta:
        rules = {
           # optionally define rules for dynamic field behavior
            ... 
        }
        # optionally define a custom layout for the form
        layout = VerticalLayout(...)
        uischema_options = {
            # optionally define custom options for the uischema to configure individual fields
            ...
        }
```

### Configuration

#### Rules
The `rules` parameter of `SilicaFormMixin.Meta` is a mapping of field names to the rules which should be applied to the 
field. To construct rules, we have implemented a number of helper functions described [here](/django/docs/rules.md).

#### Layout
The `layout` parameter of `SilicaFormMixin.Meta` allows you to describe a custom configuration for how the fields will
be rendered on the page. By default, the form will render as a VerticalLayout with each field as a direct
child. Note that if you define a custom layout, it will entirely override the generated layout; if you do not include
a field in your custom layout, it will not be rendered. For more details on how to construct custom layouts, see 
[Layout](/django/docs/layout.md).

#### UISchema Options
The `uischema_options` parameter of `SilicaFormMixin.Meta` allows you to modify the contents of the generated UISchema 
`options` object generated by the mixin. This allows you to set flags on specific fields which can toggle specific
rendering features in different renderers, e.g. the `displayDelete` option for the `SilicaSubFormArrayField`. This
parameter should be a dictionary mapping the name of the field whose uischema options you wish to modify, to the dictionary
of values you wish to update the generated values with. Note that this will also override any values which are generated
by the mixin itself.

#### Custom Components
In some cases you may wish to define a custom renderer to handle the display of a specific field. In this case,
you should define a custom widget. For more details on how to create custom widgets, see [Widgets](/django/docs/widgets.md).

## SilicaModelFormMixin
The primary difference between this mixin and `SilicaFormMixin` is that `SilicaModelFormMixin` provides support for saving
`SilicaSubFormArrayField`s. All configuration options and usage instructions as of now are exactly the same for both
mixins.