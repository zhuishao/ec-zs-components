import ZsSearchBox from './ZsSearchBox/index'
import ParamsInput from './ParamsInput/index'

const components = [
    ZsSearchBox,
    ParamsInput,
]

const install = function(Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    })
}

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ZsSearchBox,
    ParamsInput,
}
