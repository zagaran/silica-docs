// https://dev.to/siegerts/consolidating-components-into-a-vue-js-plugin-ndc
import {customRenderers, rendererComponents as components} from "./components";
import {default as SilicaVue, bootstrap4Styles } from "silica-vue";
const SampleApp = {
  install(Vue, options={}) {
    for (const componentName of components) {
      const component = components[componentName];
      Vue.component(componentName, component);
    }
  }
}

export default SampleApp
export * from "./components";

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SilicaVue)
  window.Vue.use(SampleApp)
  window.SilicaVueStyles = bootstrap4Styles;
  window.SilicaCustomRenderers = customRenderers;
}