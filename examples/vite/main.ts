import { createApp } from 'vue'
import { createVueFlow } from '@vue-flow/core'
import { PluginScreenshot } from '@vue-flow/plugin-screenshot'
import './index.css'
import { createVueFlow } from '@vue-flow/core'
import { PluginDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import App from './App.vue'
import { router } from './router'

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginScreenshot)

const app = createApp(App)

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginDragNDrop)

app.config.performance = true
app.use(router)
app.mount('#root')
