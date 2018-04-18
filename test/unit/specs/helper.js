import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { en } from '@/languages';

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en',
    messages: { en },
})


const getRenderedComponent = (component, propsData) => {
    const Constructor = Vue.extend(component)
    const vm = new Constructor({ i18n, propsData: propsData }).$mount()
    return vm;
}

export {
    getRenderedComponent
}