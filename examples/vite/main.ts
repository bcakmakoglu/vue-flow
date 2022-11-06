import { createApp } from 'vue'
import { createVueFlow } from '@vue-flow/core'
import { PluginDagreLayout } from '@vue-flow/plugin-dagre'
import { PluginDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import { PluginScreenshot } from '@vue-flow/plugin-screenshot'
import './index.css'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginDagreLayout)
vueFlowApp.use(PluginDragNDrop)
vueFlowApp.use(PluginScreenshot({ defaultFileName: 'vue-flow-screenshot' }))

app.config.performance = true
app.use(router)
app.mount('#root')
