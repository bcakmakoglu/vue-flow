import { BasicApp, BasicElements, BasicFlow, BasicIcon } from './basic';
import { ConfirmApp, ConfirmDialog, ConfirmFlow, useDialog } from './confirm-delete';
import { SnappableConnectionLine, SnapToHandleApp } from './connection-radius';
import { CustomConnectionLine, CustomConnectionLineApp } from './connectionline';
import { ColorPresets, ColorSelectorNode, CustomNodeApp, CustomNodeCSS, OutputNode } from './custom-node';
import { DndApp, DndBackground, DndCSS, DndFlow, DndScript, DndSidebar } from './dnd';
import { EdgeMarkersApp, EdgeMarkersCSS, EdgeMarkersEdge, EdgeMarkersMarker } from './edge-markers';
import { CustomEdge, CustomEdgeLabel, EdgeCSS, EdgesApp, EdgeWithButton } from './edges';
import {
  HelperLinesApp,
  HelperLinesComponent,
  HelperLinesFlow,
  HelperLinesInitialElements,
  HelperLinesStyle,
  HelperLinesUtils,
} from './helper-lines';
import { HiddenApp } from './hidden';
import { InteractionApp, InteractionControls, InteractionCSS } from './interaction';
import { IntersectionApp, IntersectionCSS, IntersectionFlow } from './intersection';
import { LayoutApp, LayoutEdge, LayoutElements, LayoutFlow, LayoutIcon, LayoutNode, useLayout, useRunProcess } from './layout';
import { SimpleLayoutApp, SimpleLayoutElements, SimpleLayoutFlow, SimpleLayoutIcon, useSimpleLayout } from './layout-simple';
import { LoopbackApp, LoopbackCSS, LoopbackEdge, LoopbackFlow } from './loopback';
import { MathApp, MathCSS, MathElements, MathIcon, MathOperatorNode, MathResultNode, MathValueNode } from './math';
import { MultiApp, MultiCSS, MultiFlow } from './multi';
import { NestedApp } from './nested';
import { NodeResizerApp, ResizableNode } from './node-resizer';
import { ToolbarApp, ToolbarNode } from './node-toolbar';
import { SaveRestoreApp, SaveRestoreControls, SaveRestoreCSS, SaveRestoreIcon } from './save-restore';
import { StressApp, StressCSS, StressFlow, StressUtils } from './stress';
import { TeleportableNode, TeleportableUseTransition, TeleportApp, TeleportCSS, TeleportSidebar } from './teleport';
import { TransitionApp, TransitionCSS, TransitionEdge, TransitionFlow } from './transition';
import { UpdateEdgeApp, UpdateEdgeFlow } from './update-edge';
import { UpdateNodeApp, UpdateNodeCSS, UpdateNodeFlow } from './update-node';
import { ValidationApp, ValidationCSS, ValidationCustomInput, ValidationCustomNode, ValidationFlow } from './validation';

export const exampleImports = {
  basic: {
    'App.vue': BasicApp,
    'Flow.vue': BasicFlow,
    'Icon.vue': BasicIcon,
    'initial-elements.js': BasicElements,
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
    'Flow.vue': StressFlow,
    'utils.js': StressUtils,
    'style.css': StressCSS,
  },
  reconnectEdge: {
    'App.vue': UpdateEdgeApp,
    'Flow.vue': UpdateEdgeFlow,
  },
  updateNode: {
    'App.vue': UpdateNodeApp,
    'Flow.vue': UpdateNodeFlow,
    'style.css': UpdateNodeCSS,
  },
  validation: {
    'App.vue': ValidationApp,
    'Flow.vue': ValidationFlow,
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
    'Flow.vue': DndFlow,
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
    'Flow.vue': TransitionFlow,
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
    'Flow.vue': IntersectionFlow,
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
    'Flow.vue': LayoutFlow,
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
    'Flow.vue': SimpleLayoutFlow,
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
    'Flow.vue': ConfirmFlow,
    'Dialog.vue': ConfirmDialog,
    'useDialog.js': useDialog,
  },
  loopback: {
    'App.vue': LoopbackApp,
    'Flow.vue': LoopbackFlow,
    'LoopbackEdge.vue': LoopbackEdge,
    'style.css': LoopbackCSS,
  },
  markers: {
    'App.vue': EdgeMarkersApp,
    'CustomEdge.vue': EdgeMarkersEdge,
    'CustomMarker.vue': EdgeMarkersMarker,
    'style.css': EdgeMarkersCSS,
  },
  helperLines: {
    'App.vue': HelperLinesApp,
    'Flow.vue': HelperLinesFlow,
    'HelperLines.vue': HelperLinesComponent,
    'utils.ts': HelperLinesUtils,
    'initialElements.ts': HelperLinesInitialElements,
    'style.css': HelperLinesStyle,
  },
};
