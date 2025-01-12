import { BasicApp, BasicCSS, BasicElements, BasicIcon } from './basic'
import { ColorPresets, ColorSelectorNode, CustomNodeApp, CustomNodeCSS, OutputNode } from './custom-node'
import { CustomConnectionLine, CustomConnectionLineApp } from './connectionline'
import { CustomEdge, CustomEdgeLabel, EdgeCSS, EdgeWithButton, EdgesApp } from './edges'
import { NestedApp } from './nested'
import { StressApp, StressCSS, StressUtils } from './stress'
import { UpdateEdgeApp } from './update-edge'
import { UpdateNodeApp, UpdateNodeCSS } from './update-node'
import { ValidationApp, ValidationCSS, ValidationCustomInput, ValidationCustomNode } from './validation'
import { SaveRestoreApp, SaveRestoreCSS, SaveRestoreControls, SaveRestoreIcon } from './save-restore'
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
import { LayoutApp, LayoutEdge, LayoutElements, LayoutIcon, LayoutNode, useLayout, useRunProcess } from './layout'
import { SimpleLayoutApp, SimpleLayoutElements, SimpleLayoutIcon, useSimpleLayout } from './layout-simple'
import { LoopbackApp, LoopbackCSS, LoopbackEdge } from './loopback'
import { MathApp, MathCSS, MathElements, MathIcon, MathOperatorNode, MathResultNode, MathValueNode } from './math'
import { ConfirmApp, ConfirmDialog, useDialog } from './confirm-delete'
import { EdgeMarkersApp, EdgeMarkersCSS, EdgeMarkersEdge, EdgeMarkersMarker } from './edge-markers'

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
    'EdgeWithButton.vue': EdgeWithButton,
    'CustomEdge.vue': CustomEdge,
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
    'Icon.vue': SaveRestoreIcon,
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
      '@vueuse/core': 'https://cdn.jsdelivr.net/npm/@vueuse/core@10.7.0/index.mjs',
      '@vueuse/shared': 'https://cdn.jsdelivr.net/npm/@vueuse/shared@10.7.0/index.mjs',
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
    'ProcessNode.vue': LayoutNode,
    'AnimationEdge.vue': LayoutEdge,
    'useRunProcess.js': useRunProcess,
    'useLayout.js': useLayout,
    'Icon.vue': LayoutIcon,
    'additionalImports': {
      '@dagrejs/dagre': 'https://cdn.jsdelivr.net/npm/@dagrejs/dagre@1.1.2/+esm',
    },
  },
  layoutSimple: {
    'App.vue': SimpleLayoutApp,
    'initial-elements.js': SimpleLayoutElements,
    'useLayout.js': useSimpleLayout,
    'Icon.vue': SimpleLayoutIcon,
    'additionalImports': {
      '@dagrejs/dagre': 'https://cdn.jsdelivr.net/npm/@dagrejs/dagre@1.1.2/+esm',
    },
  },
  math: {
    'App.vue': MathApp,
    'ValueNode.vue': MathValueNode,
    'OperatorNode.vue': MathOperatorNode,
    'ResultNode.vue': MathResultNode,
    'Icon.vue': MathIcon,
    'style.css': MathCSS,
    'initial-elements.js': MathElements,
  },
  confirmDelete: {
    'App.vue': ConfirmApp,
    'Dialog.vue': ConfirmDialog,
    'useDialog.js': useDialog,
  },
  loopback: {
    'App.vue': LoopbackApp,
    'LoopbackEdge.vue': LoopbackEdge,
    'style.css': LoopbackCSS,
  },
  markers: {
    'App.vue': EdgeMarkersApp,
    'CustomEdge.vue': EdgeMarkersEdge,
    'CustomMarker.vue': EdgeMarkersMarker,
    'style.css': EdgeMarkersCSS,
  },
}
