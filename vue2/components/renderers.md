# Renderers

In general, we have done our best to make Silica renderers have the same general
function and signature as their analogous JSONForms renderers. We have, however, enhanced
the implementation of core JSONForms renderers to enable features which are particularly useful for 
application in statically rendered contexts. These changes are detailed below in [Changes from JSONForms](#changes-from-jsonforms).

## Changes from JSONForms

### Array Fields
For now, Silica does not provide out-of-the-box support for moving items up or down in an array field, as there is not yet an interface for
how these changes would be saved on the database in a way which would ensure visual consistency across reloads.

We have also added additional customization options to the Array List renderer. Specifically,
- `schema.options.enableMovementControls`: defaults to `false`; if `true`, the control will display the move up/down controls
- `schema.options.displayDelete`: defaults to `false`; if set to `true`, enables deletion of existing array items
- `schema.options.staticTitle`: if set, displays a static title for each array item.
- `schema.options.enableAddButton`: defaults to `false`; if set to `true`, allows the user to add a new, blank item to the array.


### Renderer Parameters

All Silica renderers support these additional parameters:

- `schema.options.hidden`: defaults to `false`; if `true`, the control will have the effects of `v-hide` applied
- `schema.readOnly`: defaults to `false`; if `true`, the control will be rendered as a read-only control

### Style Configuration

Silica supports the existing JSONForms style format; however, if you wish, you may make use of a more configurable style
format supported by all Silica Renderers.

What in vanilla Vue JSONForms is

```js
const styles = {
  "styles": {
    ...,
    "control": {
      "input": "input-class"
    }
  }
}
```

can now be
```js
const styles = {
  "styles": {
    ...,
    "control": {
      "input": {
        "default": "input-class",
        "boolean": "boolean-input-class",
      }
    }
  }
}
```

which should allow for more control over the overall styling of your forms. The following style options have been upgraded:

- `styles.control.input`: may now be either a string or an object with these keys:
  - `default`: required; the default class to apply for an input control
  - `boolean`: optional; the special class to use for boolean inputs
  - `radio`: optional; the special class to use for options in a radio select group
  - `submit`: optional; the special class to use for inputs with type='submit'
- `styles.control.label`: may now be either a string or an object with these keys:
  - `default`: required; the default class to apply for labels
  - `radio`: optional; the class to use for radio option labels

### Additional Preconfigured Styles
We have developed a number of off-the-shelf style solutions for use with the popular Bootstrap library. There are
currently implementations for Bootstrap 3 and Bootstrap4. These can be imported from the library.

## Guidance for Custom Renderers
We have implemented a utility function `customSilicaRendererTester` for use
in projects with a Django backend. This function is a simple wrapper around JSONForms' `rankWith` function
which allows you to quickly set up the tester for a custom component. Silica-Django sets custom renderers by component
name, which this ranking function allows you to quickly.

Generally speaking, the fastest way to implement a custom renderer is to copy an existing renderer which is closest in
functionality to what you are looking for and then customize it as needed for your specific use case. Custom renderers
should only be implemented if you either need to a) fundamentally reorganize the HTML elements of the existing renderers 
or b) implement custom rendering or processing logic for your inputs. If you only need to change the look of a field, 
we recommend that you first attempt to modify the `style` parameter of the parent form component, which will be 
significantly easier and have a much lower chance of unintended consequences.
