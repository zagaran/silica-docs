import "core-js/stable";
import "regenerator-runtime/runtime";
// https://dev.to/siegerts/consolidating-components-into-a-vue-js-plugin-ndc
import * as components from "./components";
import SilicaVue, {bootstrap3Styles} from "silica-vue";

Vue.use(SilicaVue)

const SiteLib = {
    install(Vue, options = {}) {
        // you must install CompositionAPI before installing SilicaVue
        for (const componentName in components) {
            const component = components[componentName]
            Vue.component(componentName, component)
        }
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SiteLib)
    const ourStyles = {...bootstrap3Styles}
    window.SilicaVueStyles = ourStyles
}

export * from "./components";

export default SiteLib;