import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import XUIPlus from '@xquant/x-ui-plus'
import '@xquant/x-ui-plus/dist/index.css'

import { iframeAppInit, startObservePopups } from 'shared-utils';
iframeAppInit(router);
startObservePopups();

const app = createApp(App)
app.use(XUIPlus);
app.use(createPinia())
app.use(router)

app.mount('#app')
