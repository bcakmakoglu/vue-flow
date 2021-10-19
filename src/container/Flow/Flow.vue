<script lang="ts" setup>
import '~/style.css'
import '~/theme-default.css'
import { CSSProperties, onBeforeUnmount } from 'vue'
import ZoomPane from '~/container/ZoomPane/ZoomPane.vue'
import SelectionPane from '~/container/SelectionPane/SelectionPane.vue'
import NodeRenderer from '~/container/NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '~/container/EdgeRenderer/EdgeRenderer.vue'
import {
  ConnectionLineType,
  ConnectionMode,
  Elements,
  PanOnScrollMode,
  RevueFlowStore,
  NodeType,
  EdgeType,
  CustomConnectionLine,
  KeyCode,
  TranslateExtent,
  NodeExtent,
} from '~/types'
import { RevueFlowHooks, useRevueFlow } from '~/hooks/RevueFlowHooks'
import configureStore from '~/store/configure-store'
import { initialState } from '~/store'
import { DefaultNode, InputNode, OutputNode } from '~/components/Nodes'
import { BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '~/components/Edges'
import { createEdgeTypes } from '~/container/EdgeRenderer/utils'
import { createNodeTypes } from '~/container/NodeRenderer/utils'

export interface FlowProps {
  elements: Elements
  nodeTypes?: Record<string, NodeType>
  edgeTypes?: Record<string, EdgeType>
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  customConnectionLine?: CustomConnectionLine
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onlyRenderVisibleElements?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  paneMoveable?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: TranslateExtent
  nodeExtent?: NodeExtent
  arrowHeadColor?: string
  markerEndId?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  edgeUpdaterRadius?: number
}

const props = withDefaults(defineProps<FlowProps>(), {
  elements: () => [],
  connectionMode: ConnectionMode.Strict,
  connectionLineType: ConnectionLineType.Bezier,
  selectionKeyCode: 'Shift',
  multiSelectionKeyCode: 'Meta',
  zoomActivationKeyCode: 'Meta',
  deleteKeyCode: 'Backspace',
  snapToGrid: false,
  snapGrid: () => [15, 15],
  onlyRenderVisibleElements: false,
  nodesConnectable: true,
  nodesDraggable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  minZoom: 0.5,
  maxZoom: 2,
  defaultZoom: 1,
  defaultPosition: () => [0, 0],
  translateExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  nodeExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  arrowHeadColor: '#b1b1b7',
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,
})
const emit = defineEmits(Object.keys(useRevueFlow()))

const defaultNodeTypes: Record<string, NodeType> = {
  input: InputNode as NodeType,
  default: DefaultNode as NodeType,
  output: OutputNode as NodeType,
}

const defaultEdgeTypes: Record<string, EdgeType> = {
  default: BezierEdge as EdgeType,
  straight: StraightEdge as EdgeType,
  step: StepEdge as EdgeType,
  smoothstep: SmoothStepEdge as EdgeType,
}

let store = inject<RevueFlowStore>('store')!
if (!store) {
  store = configureStore({
    ...initialState,
    ...props,
  })()
  provide<RevueFlowStore>('store', store)
}

const init = () => {
  store.setElements(props.elements)
  store.setMinZoom(props.minZoom)
  store.setMaxZoom(props.maxZoom)
  store.setTranslateExtent(props.translateExtent)
  store.setNodeExtent(props.nodeExtent)
}

onBeforeUnmount(() => store?.$dispose())

onUpdated(() => init())
init()

const hooks = useRevueFlow().bind(emit)
provide<RevueFlowHooks>('hooks', hooks)

const nodeTypes = createNodeTypes({ ...defaultNodeTypes, ...props.nodeTypes })
const edgeTypes = createEdgeTypes({ ...defaultEdgeTypes, ...props.edgeTypes })
</script>
<template>
  <div class="revue-flow">
    <ZoomPane
      :selection-key-code="props.selectionKeyCode"
      :zoom-activation-key-code="props.zoomActivationKeyCode"
      :default-zoom="props.defaultZoom"
      :default-position="props.defaultPosition"
      :zoom-on-scroll="props.zoomOnScroll"
      :zoom-on-pinch="props.zoomOnPinch"
      :zoom-on-double-click="props.zoomOnDoubleClick"
      :pan-on-scroll="props.panOnScroll"
      :pan-on-scroll-speed="props.panOnScrollSpeed"
      :pan-on-scroll-mode="props.panOnScrollMode"
      :pane-moveable="props.paneMoveable"
    >
      <template #default="{ transform, dimensions }">
        <SelectionPane
          :delete-key-code="props.deleteKeyCode"
          :multi-selection-key-code="props.multiSelectionKeyCode"
          :selection-key-code="props.selectionKeyCode"
        >
          <NodeRenderer :node-types="nodeTypes" :transform="transform" :dimensions="dimensions" />
          <EdgeRenderer
            :connection-line-type="props.connectionLineType"
            :connection-line-style="props.connectionLineStyle"
            :custom-connection-line="props.customConnectionLine"
            :connection-mode="props.connectionMode"
            :arrow-head-color="props.arrowHeadColor"
            :marker-end-id="props.markerEndId"
            :only-render-visible-elements="props.onlyRenderVisibleElements"
            :edge-types="edgeTypes"
            :transform="transform"
            :dimensions="dimensions"
          />
        </SelectionPane>
      </template>
    </ZoomPane>
    <slot></slot>
  </div>
</template>
