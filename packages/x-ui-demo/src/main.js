import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

import App from './App.vue';
import router from './router';

import XUI from '@xquant/x-ui';
import '@xquant/x-ui/lib/theme-chalk/index.css';
Vue.use(XUI);

import { iframeAppInit, startObservePopups } from 'shared-utils';
iframeAppInit(router);
startObservePopups('x-ui');

import './assets/main.css';

Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
