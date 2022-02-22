import { createApp } from 'vue'
import './index.css'
import { DraggablePlugin } from '@braks/revue-draggable'
import App from './App.vue'
import { router } from './router'
/* import the required styles */
import '../src/style.css'

/* import the default theme (optional) */
import '../src/theme-default.css'

const app = createApp(App)

app.config.performance = true
app.use(router)
app.use(DraggablePlugin)
app.mount('#root')
