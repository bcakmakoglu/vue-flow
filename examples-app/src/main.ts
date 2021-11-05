import 'virtual:windi.css'
import { createApp } from 'vue'
import './assets/index.css'
import { createPinia } from 'pinia'
import { DraggablePlugin } from '@braks/revue-draggable'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.config.performance = true
app.use(router)
app.use(DraggablePlugin)
app.use(createPinia())
app.mount('#root')
