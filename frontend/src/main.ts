import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './style.css'
import router from './routes'

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
