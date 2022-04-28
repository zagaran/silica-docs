# sample-silica-django-app
Sample Silica-Django app.

## About this project

This sample project demonstrates how to use Silica-Django Forms. It is not actually the completely minimal possible 
setup, because it also demonstrates -- and provides a framework for -- how to build custom renderers that you can use 
alongside the default Silica-Vue components.

Silica-Vue does require that the Vue Composition API is imported into the browser in addition to Vue 2.

## Installation

### Python
1. Run `pip install -r requirements.txt`
2. Run `python manage.py runserver`

### Vue

#### Local Development

When you first install the sample project you will need to also install and run the Vue app at least once. Because the code is built 
on the server so that users will always have the most up-to-date version of the frontend code, we follow a similar 
paradigm locally -- namely that the frontend code is sourced from a local server and not from a pre-compiled library.
This may change in the future, but for now you should assume that running the Django server and a Node server simultaneously
is how you should develop locally.

1. run `yarn install`
2. run `yarn dev` (if you are actively developing)
3. run `yarn build` (if you want to build it statically for Django)

If you have a node server running the Vue app, you should see changes to your components reflected immediately after
reloading the page.

### Implementation Details
The library we build defines a number of components as well as a method `install` which globally registers Vue 
components, mixins, and directives when it is loaded. Unlike the spiritual companion project `django-react-components`,
we do not individually import and configure components. Rather, the Node server will dynamically rebuild the library
of components we are building, so that any change you make will automatically be loaded into `/static/vue/dist/js/app.js`.
Thus, when you refresh the page, you will get the latest version of the Vue library loaded onto the page. If the Vue library
becomes large enough that loading it in bulk becomes problematic, we should investigate breaking it into chunks; for now,
the library is small enough that we can safely load it on each page.

Note that this file may grow in size over time, as hot-reloading sometimes leaves behind files and other artifacts.
If the folder starts to fill up, simply delete it and re-run either `yarn dev` or `yarn build`.

## Custom Renderers

In order to maximize compatibility, Silica-Vue is implemented in Vue 2. This means that any custom renderers you build
should also be implemented in Vue 2. **It is highly recommended that you use the existing build setup unless you know exactly
what you're doing.**

To register a custom renderer, follow these steps:
1. Implement your renderer in `src/components/YourCustomRenderer.vue`
2. Add the renderer to the export variables in `src/components/renderer.js`.

The ins and outs of how to implement renderers in JsonForms is beyond the scope of this sample application. For more, visit
the [JsonForms website](jsonforms.io).
