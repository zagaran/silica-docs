// https://dev.to/siegerts/consolidating-components-into-a-vue-js-plugin-ndc
import * as components from "./components";
import SilicaVue, {bootstrap4Styles} from "silica-vue";

const SiteLib = {
    install(Vue, options = {}) {
        Vue.use(SilicaVue)
        for (const componentName in components) {
            const component = components[componentName]
            Vue.component(componentName, component)
        }
        console.info("Installed Site Library")
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    const ourStyles = {...bootstrap4Styles}
    window.SilicaVueStyles = ourStyles
    window.Vue.use(SiteLib)
}

export * from "./components";

export default SiteLib;