# Django-Vue Sample Project

## Development
It is recommended to keep a node server running in dev mode while you make changes to your app; this way, any changes you
make to your Vue code will be displayed in Django on the next page reload, which should prevent a de-sync between your
code and the behavior you see in local testing. Note that this example assumes you are not committing the compiled
JS to your repo, and that instead you have `yarn build` as part of your deployment process. If you wish instead to manually
build and commit your Vue library, you should ensure that you clear the `/static/vue/dist` folder before doing so, as hot-reloading
can cause a buildup of unused files.

Do all Vue development in `/src`. If you correctly define components in the library, you will have access to them
throughout the codebase. Do keep in mind that you will have to create a new Vue component in your browser when you wish
to use Vue components or directives.

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

To register a custom renderer, follow these steps:
1. Implement your renderer in `src/components/YourCustomRenderer.vue`
2. Add the renderer to the export variables in `src/components/renderers.js`.

The specifics of how to implement renderers in JsonForms is beyond the scope of this sample application. For more, visit
the [JsonForms website](https://jsonforms.io).
