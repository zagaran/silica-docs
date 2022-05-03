# Fields

For the most part, `silica-django` is intended as a tool to be easily integrated into existing codebases. However,
there are a few features of [JSONForms](https://jsonforms.io) which we think could provide useful functionality in Django.


## SilicaSubFormArrayField <img src="https://img.shields.io/static/v1?label=status&message=in-progress&color=red"/>
The `SilicaSubFormArrayField` allows you to embed sub-forms within a single form. This allows you to manage
multiple items -- for example, a blog post and comments on the blog post -- in a single Django form. For now, only
Django Model Forms are supported.

### Usage
The `SilicaSubFormArrayField` is not intended to be used on its own; instead, you should subclass it for
each type of subform. On this subclass you should define the `instance_form` attribute, which is the form which will be
used to render each of the items returned by the field's `get_queryset` function.

```python
class ApplicationNoteArrayField(SilicaSubFormArrayField):
    instance_form = ApplicationNoteForm

    def get_queryset(self):
        return ApplicationNote.objects.filter(application=self.parent_instance)

    def prepare_create(self, form_data):
        return ApplicationNote(application=self.parent_instance, **form_data)

```

In the above example, we override `get_queryset` to filter for `ApplicationNote`s whose `application` field matches the parent
instance. `parent_instance` is set on initialization of the form and refers to the database object attached to the 
parent form (e.g. `form.instance` where `form` is the form which contains the `ApplicationNoteArrayField`).

We also override the `prepare_create` function, which is used to process the raw data from the form in the 
`handle_create` function, which validates the raw data against the `instance_form`.


#### Updates, Creates, and Deletes
All changes to the database are made in a single, atomic transaction and are made during the form's `.save()` 
invocation. Updates, creates, and deletes are identified based on the following rules:
- If the raw data of an item does not have a primary key, it is considered a create operation
- If the primary key of an item already exists in the queryset, it is considered an update operation
- If a primary key exists in the queryset and does not exist in the raw data, it is considered a delete operation


#### Constructor Arguments

##### queryset (kwarg)
If provided a `queryset`, the `ApplicationNoteArrayField` does not construct a new queryset, instead using and 
refreshing the provided queryset as needed. Note that you should not define both `queryset` and `get_queryset`, as this
will result in undesirable behavior.

#### Overridable Functions
While any function can technically be overridden, there are a number of functions which are intended to be overridden
(following the paradigm of Django's class-based views).

##### get_queryset
This function should return a queryset; this queryset will be used to instantiate the form data, as well as determine
how updates, creates, and deletes are identified.

##### get_items_to_delete
This function returns a queryset of items which will be passed to `perform_delete`.

##### perform_delete
This function attempts to call `.delete()` on the queryset of items created by `get_items_to_delete`

##### prepare_create
This function takes in the cleaned data from the `instance_form` and returns a Model object.

##### handle_create
This function takes in the raw data and validates it against the `instance_form`, then (assuming it passes validation)
calls `prepare_create` on the cleaned data.

##### prepare_update
This function takes in the primary key of the existing object and the data which should be used to update it. It returns
a Django Model object which will be used to update the existing object with the data.

##### handle_update
This function takes in the primary key of the existing object and the raw data which should be used to update it. It
validates the raw data against the `instance_form` and, assuming no errors, calls `prepare_update` on the cleaned data.


#### Configurable Class Variables
As part of defining a `SilicaSubFormArrayField`, you may wish to customize different facets of its configuration. These
are the variables you may configure to change the field's behavior.

| Field Name       | Default | Description                                                                                |
|------------------|---------|--------------------------------------------------------------------------------------------|
| identifier_field | pk      | The name of the field on the model to use as the primary key                               |
| queryset         | None    | If set, used as the queryset to determine which database objects are handled by this field |
| batch_size       | 200     | Determines the batch size used when committing updates or creates to the database          |
| min_instances    | 0       | If set, determines the minimum allowed number of instances for the array field             |
| max_instances    | None    | If set, determines the maximum allowed number of instances for the array field             |



#### Useful Class Variables
As part of normal form operation, a number of class variables are set. They are listed below; you will likely find some
of them useful in overriding class functions. 

| Name of Variable | Description                                                       |
|------------------|-------------------------------------------------------------------|
| instance_form    | The Django Form used to turn an instance into a form              |
| parent_instance  | The database object associated with the parent form of this field |
