# SilicaDjangoForm
Provides a wrapper around [SilicaDjangoFormBody](/vue2/docs/components/silica-django-form-body.md) which includes
a submit button and form with action and method, as well as a `csrftoken` input.

## Props
- `id` - the id of the form; required, as this will be used to look up data if the props are not provided.
- `submitText` - the text to be displayed on the submit button. defaults to "submit"
- `customRenderers` - the list of custom renderers to be used by the form
- `onChange` - the function to be called when data changes. Note that this will not override the form setting its own data and is intended to be used as a callback.
- `handleSubmit` - the function to be called when the "submit" button is clicked.
- `formAttrs` - a dictionary of keys to values to be spread to the form. default to {}
- `styles` - a [Style](/vue2/docs/styles.md) object
- `method` - the value of the form's `method` parameter
- `action` - the value of the form's `action` parameter
- `csrfToken` - the value of the form's `csrfmiddlewaretoken` input. Can also be sourced from the browser's cookies.
- `dataProp` - the value to use for the form's data.
- `schemaProp` - the value to use for the form's schema.
- `uischemaProp` - the value to use for the form's uischema.
