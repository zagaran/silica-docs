# Layout
If you wish to further customize the layout of your form, `silica-django` has implemented wrappers for all supported
layout objects in [JsonForms.io](https://jsonforms.io).

## Configure Layout

For now, `Layout`s accept only one optional parameter, the `rule` parameter. This parameter is configured the same as in
any `SilicaFieldConfig`, as described in [Rules](/django/docs/rules.md). All other values should be passed as args, which can
either be a `Layout` object or a string. If the value is a string, it will converted automatically to a `Control` for
purposes of determining render layout.

```python
VerticalLayout(Control('field1', rule=ShowIf(field2=2)), 'field2')
```

## Vertical Layout
Accepts any other Layout object or a String as a child. Is a valid top-level Layout object. Example:
```python

VerticalLayout(Control("field1"), HorizontalLayout(VerticalLayout(Control("field2"), "field3")))

```

## Horizontal Layout
Accepts any other Layout object or a String as a child. Is a valid top-level Layout object. Example:
```python

HorizontalLayout(Control("field1"), VerticalLayout(HorizontalLayout(Control("field2"), Control("field3"))))

```
## Group
Accepts any other Layout object or a String as a child. Is a valid top-level Layout object. Takes a `label` parameter as its first arg. Example:
```python

VerticalLayout(Group("Group1", Control("field1")), Group("Group2", HorizontalLayout(VerticalLayout(Control("field2"), Control("field3")))))

```

## Categorization
Accepts only a Category as a child. Is a valid top-level Layout object. Takes a `label` parameter as its first arg. Can only have `Category` objects as its direct children. Example:
```python

Categorization(Category("Category1", Control("field1")), Category("Category2", HorizontalLayout(VerticalLayout(Control("field2"), Control("field3")))))

```
## Category
Only valid as a child of Categorization. Accepts any Layout object or a String as a child. See above for example.

## Control
Represents a single input element. Accepts the name of a field as its argument. Is not a valid top-level Layout object. See any
above Layout for example.