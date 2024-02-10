import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import '@/assets/css/style.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(pinia)
app.use(router)
app.mount('#app')
