import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createEncolaVuetify } from './encola'

createApp(App).use(router).use(createEncolaVuetify()).mount('#app')
