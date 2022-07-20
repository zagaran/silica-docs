# Config

## Validation
Currently, Silica does not support adding custom front-end validation via backend configuration. To implement your own 
custom validation, we recommend creating and registering a [Custom Component](/django/docs/widgets.md).

## SilicaConfig <img src="https://img.shields.io/static/v1?label=status&message=stabilizing&color=orange"/>

The `SilicaConfig` class contains all logic for configuring the data validation and rendering
of a Silica form by field. It provides an additional layer of abstraction between the Django Form style of configuration
and the pair of JSONSchema and JSONForms' UISchema expected by the frontend library.

To configure your Silica-powered form, you need only define `Meta.silica_config` using a `SilicaConfig` object. A valid
`SilicaConfig` object has the fields of the form as kwargs and `SilicaFieldConfig` objects as their values, as 
demonstrated below.

### Example

```python

class SomeForm(SilicaModelFormMixin, ModelForm):
    some_field = forms.BooleanField(required=True)
    
    class Meta:
        model = SomeModel
        silica_config = SilicaConfig(
            # config any fields you wish to customize
            some_field=SilicaFieldConfig(
                # your config goes here
                ...
            )
        )

```

Note that `silica_config` is applied after config auto-generation, which means that you can use it to override
any automatically generated values. Be careful with this, as you could create a discrepancy between your backend 
and frontend validation rules.

## SilicaFieldConfig <img src="https://img.shields.io/static/v1?label=status&message=stabilizing&color=orange"/>
The `SilicaFieldConfig` class is a layer of abstraction between the Django Form style of configuration and the 
JSONForms' expected split between data schema and UISchema. It defines a simple API to configure these values as well as 
add an optional `Rule` for the field. JSONForms does not currently support multiple `Rule` objects per field.

We plan to expand this class with additional configuration options (e.g. the ability to turn frontend validation off).

### Example

```python

# within a SilicaFormMixin form's Meta...
silica_config = SilicaConfig(
    some_field=SilicaFieldConfig(
        min_length=10,
        rule=ShowIf(And(some_other_field=12, another_field=["show_all", "show_some_field"]))
    )
)

```

### Configuration Options

All fields below are passed to `SilicaFieldConfig` as kwargs. They are separated here into "data" and "display" options
to help developers who wish to see how Silica treats each kwarg under the hood as they are ultimately divided into two 
separate objects.

#### Data options
Supported configuration options for a `SilicaFieldConfig`'s data (the `schema` passed to JSONForms) currently include:

| field                                                                                            | valid field types | description                                                                                                           |
|--------------------------------------------------------------------------------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------|
| `maximum`                                                                                        | any number field  | the maximum value this field may have                                                                                 |
| `minimum`                                                                                        | any number field  | the minimum value this field may have                                                                                 |
| `default`                                                                                        | any field         | the default value for this field if no value exists                                                                   |
| `min_length`                                                                                     | string fields     | the minimum length of the string input for this field                                                                 |
| `max_length`                                                                                     | string fields     | the maximum length of the string input for this field                                                                 |
| `description`                                                                                    | any field         | text shown when the field is focused if there are no errors                                                           |
| `type` <img src="https://img.shields.io/static/v1?label=&message=dangerous&color=red"/>          | any field         | can be used to override the "type" value of the schema. This can break JSONForms if you don't know what you're doing. |
| `schema_format` <img src="https://img.shields.io/static/v1?label=&message=dangerous&color=red"/> | any field         | can be used to override the "format" value of the schema. Can break JSONForms if you don't know what you're doing.    |
| `multiple_of`                                                                                    | any number field  | enforce that a number is a multiple of the given value                                                                |
| `examples`                                                                                       | any field         | provide examples in the schema. only useful if you are generating schemas for consumption in other contexts           |
| `title`                                                                                          | any field         | title of the schema. only useful if you are generating schema for consumption elsewhere                               |
| `error_message`                                                                                  | any field         | the error message for the field if it does not pass frontend validation                                               |

#### Display options
Supported configuration options for a `SilicaFieldConfig`'s display (the `uischema` passed to JSONForms) currently include:

| field                                                                                        | valid field types | description                                                                                                                                            |
|----------------------------------------------------------------------------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `label`                                                                                      | all               | the label of the field                                                                                                                                 |
| `scope`                                                                                      | all               | the scope of data in the form's schema which the field should have access to. do not modify unless you know what you're doing.                         |
| `options`                                                                                    | all               | dictionary of keys and values to be passed as `uischema.options` to the frontend component. overrides any of the following fields if they are present. |
| `detail`                                                                                     | Array             | toggles the "detail" view of an Array field. Not currently implemented in Silica.                                                                      |
| `show_sort_buttons`                                                                          | Array             | toggles the display of sort buttons in an Array field.                                                                                                 |
| `element_label_prop`                                                                         | Array             | if provided, uses the given field to populate the display name for each item in an array field                                                         |
| `ui_format` <img src="https://img.shields.io/static/v1?label=&message=dangerous&color=red"/> | all               | overrides the `uischema.options.format` parameter. only modify if you know what you're doing.                                                          |
| `readonly`                                                                                   | all               | marks the field as a readonly field, rendering a disabled input                                                                                        |
| `display_delete`                                                                             | Array             | toggles the display of the delete button on individual items in an Array field.                                                                        |
| `enable_add`                                                                                 | Array             | toggles the display of the add item button in an Array field                                                                                           |
| `no_data_msg`                                                                                | Array             | sets the "no data" message of an Array field                                                                                                           |
| `static_title`                                                                               | Array             | if set, displays the given value as the title for all items in an Array field                                                                          |
| `add_text`                                                                                   | Array             | sets the text which appears in the "add item" button in an Array field                                                                                 |
| `max_item_text`                                                                              | Array             | sets the text which appears in the "add item" button when the array reaches maximum size                                                               |
| `css_classes`                                                                                | Dict or Str       | overrides the classes which are applied to the control input. Valid options are described below.                                                       |
| `wrapper_css_classes`                                                                        | Dict              | overrides the classes which are applied to the control wrapper (e.g. the parent div and label). Valid options are described below                      |


#### Overriding CSS
Silica allows you to customize the classes which will be applied to an individual element using the `css_classes` and `wrapper_css_classes` kwargs.

| UI Element          | `css_classes`                                                                                                                                                                                                                                                                                                                                   |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Radio Select        | `{"wrapper": "CLASS", "radio": "CLASS", "input": "CLASS"}`                                                                                                                                                                                                                                                                                      |
| Select              | `{"select": "CLASS", "option": "CLASS"}`                                                                                                                                                                                                                                                                                                        |
| Array               | `{"root": "CLASS", "legend": "CLASS", "label": "CLASS", "addButton": "CLASS", "itemWrapper": "CLASS", "listElement": {"arrayList": {"item": "CLASS", "itemLabel": "CLASS", "itemMoveUp": "CLASS", "itemMoveDown": "CLASS", "itemDelete": "CLASS", "itemContent": "CLASS", "itemToolbar": "CLASS"}}, "itemContent": "CLASS", "noData": "CLASS"}` |
| All Other Renderers | `"CLASS"`                                                                                                                                                                                                                                                                                                                                       |

`wrapper_css_classes` should be a dictionary with the following form:
```python
wrapper_css_classes = {
    'control': {
        'root': "YOUR_CLASSES",
        'label': "YOUR_CLASSES",
        'wrapper': "YOUR_CLASSES",
        'error': "YOUR_CLASSES",
        'description': "YOUR_CLASSES",
    }
}
```
