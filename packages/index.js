import ZsSearchBox from './ZsSearchBox/index'
import ParamsInput from './ParamsInput/index'
// import locale from 'ec-zs-components/src/locale';

const components = [
    ZsSearchBox,
    ParamsInput,
]

const install = function(Vue, opts = {}) {
    // locale.use(opts.locale);
    // locale.i18n(opts.i18n);
    components.map(component => {
        Vue.component(component.name, component);
    })
}

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    // locale: locale.use,
    // i18n: locale.i18n,
    install,
    ZsSearchBox,
    ParamsInput,
}
