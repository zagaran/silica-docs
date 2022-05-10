# Silica-Vue

`silica-vue` is the Vue2 implementation of the Silica interface. It is based on the existing
Vue2 implementation of JSONForms, but adds functionality likely to be useful for Django
developers. While it can be used in standard Vue projects, it is primarily intended for use in Django
projects where the frontend has been enhanced with Vue.

For an example of how to use `silica-vue` in a Vue2 project, see [Vue 2 Sample Project](/vue2/sample-app).


## Installation
1. `yarn install silica-vue`
2. Add the following to your `main.js` (or wherever your app's entry point is):
```javascript
import SilicaVue from "silica-vue";
import CompositionApi from "@vue/composition-api";
// you must install CompositionAPI before installing SilicaVue
Vue.use(CompositionApi);
Vue.use(SilicaVue);
```

## Documentation
- [Components](/vue2/docs/components)
- [Styles](/vue2/docs/styles.md)

## Roadmap / TODO
- [Roadmap](/vue2/roadmap.md)