import { createApp } from 'vue'
import { PluginScreenshot } from '@vue-flow/plugin-screenshot'
import './index.css'
import { createVueFlow } from '@vue-flow/core'
import { PluginDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginDragNDrop)
vueFlowApp.use(PluginScreenshot)

app.config.performance = true
app.use(router)
app.use(createPinia())
app.mount('#root')
