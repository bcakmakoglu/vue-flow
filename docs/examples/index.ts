import { BasicApp, BasicCSS, BasicElements, BasicIcon } from './basic'
import { ColorPresets, ColorSelectorNode, CustomNodeApp, CustomNodeCSS, OutputNode } from './custom-node'
import { CustomConnectionLine, CustomConnectionLineApp } from './connectionline'
import { CustomEdge2, CustomEdgeLabel, EdgeCSS, EdgeWithButton, EdgesApp } from './edges'
import { NestedApp } from './nested'
import { StressApp, StressCSS, StressUtils } from './stress'
import { UpdateEdgeApp } from './update-edge'
import { UpdateNodeApp, UpdateNodeCSS } from './update-node'
import { ValidationApp, ValidationCSS, ValidationCustomInput, ValidationCustomNode } from './validation'
import { SaveRestoreApp, SaveRestoreCSS, SaveRestoreControls } from './save-restore'
import { DndApp, DndBackground, DndCSS, DndScript, DndSidebar } from './dnd'
import { HiddenApp } from './hidden'
import { InteractionApp, InteractionCSS, InteractionControls } from './interaction'
import { MultiApp, MultiCSS, MultiFlow } from './multi'
import { TeleportApp, TeleportCSS, TeleportSidebar, TeleportableNode, TeleportableUseTransition } from './teleport'
import { TransitionApp, TransitionCSS, TransitionEdge } from './transition'
import { IntersectionApp, IntersectionCSS } from './intersection'
import { SnapToHandleApp, SnappableConnectionLine } from './connection-radius'
import { NodeResizerApp, ResizableNode } from './node-resizer'
import { ToolbarApp, ToolbarNode } from './node-toolbar'
import { LayoutApp, LayoutElements } from './layout'

export const exampleImports = {
  basic: {
    'App.vue': BasicApp,
    'Icon.vue': BasicIcon,
    'initial-elements.js': BasicElements,
    'style.css': BasicCSS,
  },
  customNode: {
    'App.vue': CustomNodeApp,
    'ColorSelectorNode.vue': ColorSelectorNode,
    'OutputNode.vue': OutputNode,
    'style.css': CustomNodeCSS,
    'presets.js': ColorPresets,
  },
  connectionline: {
    'App.vue': CustomConnectionLineApp,
    'CustomConnectionLine.vue': CustomConnectionLine,
  },
  edges: {
    'App.vue': EdgesApp,
    'CustomEdge.vue': EdgeWithButton,
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
  dnd: {
    'App.vue': DndApp,
    'Sidebar.vue': DndSidebar,
    'DropzoneBackground.vue': DndBackground,
    'style.css': DndCSS,
    'useDnD.js': DndScript,
  },
  hidden: {
    'App.vue': HiddenApp,
  },
  interaction: {
    'App.vue': InteractionApp,
    'InteractionControls.vue': InteractionControls,
    'style.css': InteractionCSS,
  },
  multi: {
    'App.vue': MultiApp,
    'Flow.vue': MultiFlow,
    'style.css': MultiCSS,
  },
  teleport: {
    'App.vue': TeleportApp,
    'Sidebar.vue': TeleportSidebar,
    'TeleportableNode.vue': TeleportableNode,
    'useTeleport.js': TeleportableUseTransition,
    'style.css': TeleportCSS,
  },
  transition: {
    'App.vue': TransitionApp,
    'TransitionEdge.vue': TransitionEdge,
    'style.css': TransitionCSS,
    'additionalImports': {
      '@vueuse/core': 'https://cdn.jsdelivr.net/npm/@vueuse/core@9.3.0/index.mjs',
      '@vueuse/shared': 'https://cdn.jsdelivr.net/npm/@vueuse/shared@9.3.0/index.mjs',
      'vue-demi': 'https://cdn.jsdelivr.net/npm/vue-demi@0.13.11/lib/index.mjs',
    },
  },
  intersection: {
    'App.vue': IntersectionApp,
    'style.css': IntersectionCSS,
  },
  snappable: {
    'App.vue': SnapToHandleApp,
    'SnappableConnectionLine.vue': SnappableConnectionLine,
  },
  resizable: {
    'App.vue': NodeResizerApp,
    'ResizableNode.vue': ResizableNode,
  },
  toolbar: {
    'App.vue': ToolbarApp,
    'ToolbarNode.vue': ToolbarNode,
  },
  layout: {
    'App.vue': LayoutApp,
    'initial-elements.js': LayoutElements,
    'additionalImports': {
      dagre: 'https://cdn.skypack.dev/pin/dagre@v0.8.5-NOlknF82nBdUHQKLJWRC/mode=imports,min/optimized/dagre.js',
    },
  },
}
