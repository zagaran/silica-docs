# sample-silica-django-app
Sample Silica-Django app.

## About this project

This sample project demonstrates how to use Silica-Django Forms. It is not actually the completely minimal possible 
setup, because it also demonstrates -- and provides a framework for -- how to build custom renderers that you can use 
alongside the default Silica-Vue components. If you will not be using custom renderers in your implementation of your app,
you may delete the `/vue` directory and its contents. If you do this, you should also delete all references to `sample-lib.umd.js`
and delete the library from `/static/lib/js` as well.

Silica-Vue does require that the Vue Composition API is imported into the browser in addition to Vue 2.

## Installation

### Python
1. Run `pip install -r requirements.txt`
2. Run `python manage.py runserver`

### Vue
1. Navigate to `/vue`
2. Run `npm install`
3. Run `npx vite dev` to see the sample Vue app
4. Run `npx vite build` to build the library. Note that you will have to manually copy the generated file from `/vue/dist` to `/static/lib/js`.

## Custom Renderers

In order to maximize compatibility, Silica-Vue is implemented in Vue 2. This means that any custom renderers you build
should also be implemented in Vue 2. **It is highly recommended that you use the existing build setup unless you know exactly
what you're doing.**

To register a custom renderer, follow these steps:
1. Implement your renderer in `vue/src/components/YourCustomRenderer.vue`
2. Add `export {default as YourCustomRenderer} from "./YourCustomRenderer.vue""` to `/vue/src/components/index.js`
3. Add `import {entry as YourCustomRenderer} from "./YourCustomRenderer.vue";` to `/vue/src/components/renderer.js`
4. Add `YourCustomRenderer` to `customRenderers` in `/vue/src/components/renderer.js`.

The ins and outs of how to implement renderers in JsonForms is beyond the scope of this sample application. For more, visit
the [JsonForms website](jsonforms.io).
