import { createApp } from 'vue'
import './index.css'
import { DraggablePlugin } from '@braks/revue-draggable'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.config.performance = true
app.use(router)
app.use(DraggablePlugin)
app.mount('#root')
