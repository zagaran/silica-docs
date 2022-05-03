# Layout
If you wish to further customize the layout of your form, `silica-django` has implemented wrappers for all supported
layout objects in [JsonForms.io](https://jsonforms.io).

## Vertical Layout
Accepts any other Layout object as a child. Is a valid top-level Layout object. Example:
```python

VerticalLayout(Control("field1"), HorizontalLayout(VerticalLayout(Control("field2"), Control("field3"))))

```

## Horizontal Layout
Accepts any other Layout object as a child. Is a valid top-level Layout object. Example:
```python

HorizontalLayout(Control("field1"), VerticalLayout(HorizontalLayout(Control("field2"), Control("field3"))))

```
## Group
Accepts any other Layout object as a child. Is a valid top-level Layout object. Takes a `label` parameter as its first arg. Example:
```python

VerticalLayout(Group("Group1", Control("field1")), Group("Group2", HorizontalLayout(VerticalLayout(Control("field2"), Control("field3")))))

```

## Categorization
Accepts any other Layout object as a child. Is a valid top-level Layout object. Takes a `label` parameter as its first arg. Can only have `Category` objects as its direct children. Example:
```python

Categorization(Category("Category1", Control("field1")), Category("Category2", HorizontalLayout(VerticalLayout(Control("field2"), Control("field3")))))

```
## Category
Only valid as a child of Categorization. See above for example.

## Control
Represents a single input element. Accepts the name of a field as its only argument. Is not a valid top-level Layout object. See any
above Layout for example.