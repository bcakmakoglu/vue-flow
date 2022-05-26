import { BasicApp, BasicCSS, BasicElements } from './basic'
import { ColorPresets, CustomNode, CustomNodeApp, CustomNodeCSS } from './customNode'
import { CustomConnectionLine, CustomConnectionLineApp } from './connectionline'
import { CustomEdge, CustomEdge2, CustomEdgeLabel, EdgeCSS, EdgesApp } from './edges'
import { NestedApp } from './nested'
import { StressApp, StressCSS, StressUtils } from './stress'

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
  connectionline: {
    'App.vue': CustomConnectionLineApp,
    'CustomConnectionLine.vue': CustomConnectionLine,
  },
  edges: {
    'App.vue': EdgesApp,
    'CustomEdge.vue': CustomEdge,
    'CustomEdge2.vue': CustomEdge2,
    'CustomEdgeLabel.vue': CustomEdgeLabel,
    'style.css': EdgeCSS,
  },
  nested: {
    'App.vue': NestedApp,
  },
  stress: {
    'App.vue': StressApp,
    'utils.js': StressUtils,
    'style.css': StressCSS,
  },
}
