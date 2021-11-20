<script lang="ts" setup>
import { CSSProperties, onBeforeUnmount } from 'vue'
import diff from 'microdiff'
import {
  ConnectionLineType,
  ConnectionMode,
  Elements,
  PanOnScrollMode,
  KeyCode,
  TranslateExtent,
  NodeExtent,
  FlowOptions,
  NodeTypes,
  EdgeTypes,
  FlowStore,
  FlowState,
} from '../../types'
import ZoomPane from '../../container/ZoomPane/ZoomPane.vue'
import SelectionPane from '../../container/SelectionPane/SelectionPane.vue'
import NodeRenderer from '../../container/NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../../container/EdgeRenderer/EdgeRenderer.vue'
import { createHooks, initFlow } from '../../composables'

export interface FlowProps extends Partial<FlowOptions> {
  id?: string
  store?: FlowStore
  modelValue?: Elements
  elements?: Elements
  nodeTypes?: NodeTypes
  edgeTypes?: EdgeTypes
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
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
  storageKey?: string
}

const emit = defineEmits([...Object.keys(createHooks()), 'update:elements', 'update:modelValue'])

const props = withDefaults(defineProps<FlowProps>(), {
  modelValue: () => [],
  elements: () => [],
  connectionMode: ConnectionMode.Loose,
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
const store = initFlow(emit, typeof props.storageKey === 'string' ? props.storageKey : props.id, props.store)
const elements = useVModel(props, props.elements.length ? 'elements' : 'modelValue', emit)

const options = Object.assign({}, props, store.$state, props)

// if there are preloaded elements we overwrite the current elements with the stored ones
if (store.elements.length) elements.value = store.elements

const init = (state: FlowState) => {
  for (const opt of Object.keys(state)) {
    const val = state[opt as keyof FlowState]
    if (typeof val !== 'undefined') {
      if (typeof val === 'object' && !Array.isArray(val)) {
        ;(store as any)[opt] = { ...(store as any)[opt], ...val }
      } else (store as any)[opt] = val
    }
  }
  store.setElements(elements.value)
  store.setMinZoom(state.minZoom)
  store.setMaxZoom(state.maxZoom)
  store.setTranslateExtent(state.translateExtent)
  store.setNodeExtent(state.nodeExtent)
}
onBeforeUnmount(() => store?.$dispose())

init(options)
watch(elements, (val) => store.setElements(val), { flush: 'post', deep: true })
watch(
  () => store.elements,
  (val, oldVal) => {
    nextTick(() => {
      const hasDiff = diff(val, oldVal)
      if (hasDiff.length > 0) elements.value = val
    })
  },
  { flush: 'post', deep: true },
)
watch(
  () => props,
  (val, oldVal) => {
    const hasDiff = diff(val, oldVal)
    if (hasDiff.length > 0) init({ ...store.$state, ...val } as FlowState)
  },
  { flush: 'pre', deep: true },
)
</script>
<template>
  <div class="vue-flow">
    <Suspense>
      <ZoomPane
        :selection-key-code="store.selectionKeyCode"
        :zoom-activation-key-code="store.zoomActivationKeyCode"
        :default-zoom="store.defaultZoom"
        :default-position="store.defaultPosition"
        :zoom-on-scroll="store.zoomOnScroll"
        :zoom-on-pinch="store.zoomOnPinch"
        :zoom-on-double-click="store.zoomOnDoubleClick"
        :pan-on-scroll="store.panOnScroll"
        :pan-on-scroll-speed="store.panOnScrollSpeed"
        :pan-on-scroll-mode="store.panOnScrollMode"
        :pane-moveable="store.paneMoveable"
      >
        <template #default="zoomPaneProps">
          <SelectionPane
            :delete-key-code="store.deleteKeyCode"
            :multi-selection-key-code="store.multiSelectionKeyCode"
            :selection-key-code="store.selectionKeyCode"
          >
            <NodeRenderer :select-nodes-on-drag="store.selectNodesOnDrag">
              <template v-for="nodeName of Object.keys(store.getNodeTypes)" #[`node-${nodeName}`]="nodeProps">
                <slot :name="`node-${nodeName}`" v-bind="nodeProps"></slot>
              </template>
            </NodeRenderer>
            <EdgeRenderer
              :connection-line-type="store.connectionLineType"
              :connection-line-style="store.connectionLineStyle"
              :arrow-head-color="store.arrowHeadColor"
              :marker-end-id="store.markerEndId"
            >
              <template v-for="edgeName of Object.keys(store.getEdgeTypes)" #[`edge-${edgeName}`]="edgeProps">
                <slot :name="`edge-${edgeName}`" v-bind="edgeProps"></slot>
              </template>
              <template #custom-connection-line="customConnectionLineProps">
                <slot name="custom-connection-line" v-bind="customConnectionLineProps"></slot>
              </template>
            </EdgeRenderer>
          </SelectionPane>
          <slot name="zoom-pane" v-bind="zoomPaneProps"></slot>
        </template>
      </ZoomPane>
    </Suspense>
    <slot v-bind="{ ...props, store }"></slot>
  </div>
</template>
<style>
@import '../../style.css';
</style>
