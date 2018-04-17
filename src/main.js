// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n';
import { getUrlParameter } from './utils/common';
import { en, tr} from './languages';
import App from './App'

Vue.use(VueI18n);
Vue.config.productionTip = false

const sdkOptions = JSON.parse(getUrlParameter('options'));
let language = sdkOptions.lang || 'en';

const i18n = new VueI18n({
  locale: language, // set locale
  messages : {tr, en}, // set locale messages
})


/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App v-bind:options="options" />',
  data : {
    options : sdkOptions
  }
})
