import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadComponent } from './plugins/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './assets/css/index.less'
import './utils/common'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
loadComponent(app)

app.use(router).use(pinia).mount('#app')
