import { BasicApp, BasicCSS, BasicElements } from './basic'
import { ColorPresets, CustomNode, CustomNodeApp, CustomNodeCSS } from './customNode'

export const exampleImports = {
  basic: {
    'App.vue': BasicApp,
    'initial-elements.js': BasicElements,
    'style.css': BasicCSS,
  },
  customNode: {
    'App.vue': CustomNodeApp,
    'CustomNode.vue': CustomNode,
    'style.css': CustomNodeCSS,
    'presets.js': ColorPresets,
  },
}
