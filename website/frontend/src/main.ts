import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import store from './stores/store' // Import your Vuex store

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store) // Use Vuex store
app.use(autoAnimatePlugin)

app.mount('#app')
export default app
