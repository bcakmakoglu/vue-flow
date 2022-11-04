import { createApp } from 'vue'
import { createVueFlow } from '@vue-flow/core'
import { PluginScreenshot } from '@vue-flow/plugin-screenshot'
import './index.css'
import App from './App.vue'
import { router } from './router'

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginScreenshot)

const app = createApp(App)

app.config.performance = true
app.use(router)
app.mount('#root')
