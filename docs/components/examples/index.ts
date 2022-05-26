import { BasicApp, BasicCSS, BasicElements } from './basic'
import { ColorPresets, CustomNode, CustomNodeApp, CustomNodeCSS } from './custom-node'
import { CustomConnectionLine, CustomConnectionLineApp } from './connectionline'
import { CustomEdge, CustomEdge2, CustomEdgeLabel, EdgeCSS, EdgesApp } from './edges'
import { NestedApp } from './nested'
import { StressApp, StressCSS, StressUtils } from './stress'
import { UpdateEdgeApp } from './update-edge'
import { UpdateNodeApp, UpdateNodeCSS } from './update-node'
import { ValidationApp, ValidationCSS, ValidationCustomInput, ValidationCustomNode } from './validation'
import { SaveRestoreApp, SaveRestoreControls, SaveRestoreCSS } from "./save-restore";

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
  updateEdge: {
    'App.vue': UpdateEdgeApp,
  },
  updateNode: {
    'App.vue': UpdateNodeApp,
    'style.css': UpdateNodeCSS,
  },
  validation: {
    'App.vue': ValidationApp,
    'CustomInput.vue': ValidationCustomInput,
    'CustomNode.vue': ValidationCustomNode,
    'style.css': ValidationCSS,
  },
  saveRestore: {
    'App.vue': SaveRestoreApp,
    'Controls.vue': SaveRestoreControls,
    'style.css': SaveRestoreCSS,
  },
}
