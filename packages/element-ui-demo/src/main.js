import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

import App from './App.vue';
import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import { iframeAppInit, startObservePopups } from 'shared-utils';
iframeAppInit(router);
startObservePopups();

import './assets/main.css';

Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
