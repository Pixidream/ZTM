import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Buffer } from 'buffer'

import './style.scss'
import App from './App.vue'
import { vuetifyPlugin } from './plugins/vuetifyPlugin'
import { router } from './routes/index'

window.Buffer = Buffer

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(vuetifyPlugin).mount('#app')
