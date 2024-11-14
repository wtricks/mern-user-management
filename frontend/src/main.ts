import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vue-toast-notification/dist/theme-default.css';

import App from './App.vue'
import './style.css'
import router from './routes'

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
