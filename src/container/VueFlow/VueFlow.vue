<script lang="ts" setup>
import { CSSProperties } from 'vue'
import {
  ConnectionLineType,
  ConnectionMode,
  Elements,
  PanOnScrollMode,
  KeyCode,
  CoordinateExtent,
  NodeTypes,
  EdgeTypes,
  FlowOptions,
} from '../../types'
import Renderer from '../Renderer/Renderer.vue'
import ZoomPane from '../ZoomPane/ZoomPane.vue'
import SelectionPane from '../SelectionPane/SelectionPane.vue'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import LoadingIndicator from '../../components/Loading/LoadingIndicator.vue'
import { createHooks, initFlow } from '../../composables'

interface FlowProps extends FlowOptions {
  id?: string
  modelValue?: Elements
  nodeTypes?: NodeTypes
  edgeTypes?: EdgeTypes
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  preventScrolling?: boolean
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onlyRenderVisibleElements?: boolean
  edgesUpdatable?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  paneMoveable?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: CoordinateExtent
  nodeExtent?: CoordinateExtent
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
  loading?: string
}

const props = withDefaults(defineProps<FlowProps>(), {
  modelValue: () => [],
  snapToGrid: false,
  onlyRenderVisibleElements: false,
  edgesUpdatable: false,
  nodesConnectable: true,
  nodesDraggable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  preventScrolling: true,
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  paneMoveable: true,
})
const emit = defineEmits([...Object.keys(createHooks()), 'update:modelValue'])
const store = initFlow(emit, props.id)
const elements = useVModel(props, 'modelValue', emit)
store.setState(props)
watch(
  () => props,
  () => store.setState(props),
  { flush: 'post', deep: true },
)
const { pause: pauseModel, resume: resumeModel } = pausableWatch(
  () => props.modelValue.length,
  async () => await store.setElements(elements.value),
)
const { pause, resume } = pausableWatch(elements, async (val) => await store.setElements(val), { flush: 'post' })

until(() => store.isReady)
  .toBe(true)
  .then(() => {
    watch(
      () => store.elements,
      (val) => {
        pause()
        pauseModel()
        elements.value = val
        setTimeout(() => {
          resume()
          resumeModel()
        }, 1)
      },
      { flush: 'post', deep: true },
    )
  })
</script>
<script lang="ts">
export default {
  name: 'VueFlow',
}
</script>
<template>
  <div class="vue-flow">
    <Suspense timeout="0">
      <template #default>
        <Renderer :key="`renderer-${store.id}`" :elements="elements">
          <ZoomPane
            :key="`zoom-pane-${store.id}`"
            :prevent-scrolling="store.preventScrolling"
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
                :key="`selection-pane-${store.id}`"
                :edges="store.getEdges"
                :selected-elements="store.selectedElements"
                :selection-active="store.selectionActive"
                :nodes-selection-active="store.nodesSelectionActive"
                :elements-selectable="store.elementsSelectable"
                :delete-key-code="store.deleteKeyCode"
                :multi-selection-key-code="store.multiSelectionKeyCode"
                :selection-key-code="store.selectionKeyCode"
              >
                <NodeRenderer
                  :key="`node-renderer-${store.id}`"
                  :nodes="store.getNodes"
                  :node-types="store.getNodeTypes"
                  :snap-to-grid="store.snapToGrid"
                  :snap-grid="store.snapGrid"
                  :select-nodes-on-drag="store.selectNodesOnDrag"
                  :transform="store.transform"
                  :elements-selectable="store.elementsSelectable"
                  :nodes-draggable="store.nodesDraggable"
                  :nodes-connectable="store.nodesConnectable"
                >
                  <template
                    v-for="nodeName of Object.keys(store.getNodeTypes)"
                    #[`node-${nodeName}`]="nodeProps"
                    :key="`node-${nodeName}-${store.id}`"
                  >
                    <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
                  </template>
                </NodeRenderer>
                <EdgeRenderer
                  :key="`edge-renderer-${store.id}`"
                  :transform="store.transform"
                  :dimensions="store.dimensions"
                  :edges="store.getEdges"
                  :edge-types="store.getEdgeTypes"
                  :nodes="store.getNodes"
                  :selected-elements="store.selectedElements"
                  :elements-selectable="store.elementsSelectable"
                  :connection-node-id="store.connectionNodeId"
                  :connction-handle-id="store.connectionHandleId"
                  :connection-handle-type="store.connectionHandleType"
                  :connection-position="store.connectionPosition"
                  :connection-mode="store.connectionMode"
                  :nodes-connectable="store.nodesConnectable"
                  :connection-line-type="store.connectionLineType"
                  :connection-line-style="store.connectionLineStyle"
                  :arrow-head-color="store.arrowHeadColor"
                  :marker-end-id="store.markerEndId"
                  :only-render-visible-elements="store.onlyRenderVisibleElements"
                  :edges-updatable="store.edgesUpdatable"
                >
                  <template
                    v-for="edgeName of Object.keys(store.getEdgeTypes)"
                    #[`edge-${edgeName}`]="edgeProps"
                    :key="`edge-${edgeName}-${store.id}`"
                  >
                    <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
                  </template>
                  <template #custom-connection-line="customConnectionLineProps">
                    <slot name="custom-connection-line" v-bind="customConnectionLineProps" />
                  </template>
                </EdgeRenderer>
              </SelectionPane>
              <slot name="zoom-pane" v-bind="zoomPaneProps"></slot>
            </template>
          </ZoomPane>
        </Renderer>
      </template>
      <template #fallback>
        <slot name="loading-indicator">
          <LoadingIndicator v-if="store.loading && store.loading !== '' && !store.isReady" :label="store.loading">
            <slot name="loading-label" />
          </LoadingIndicator>
        </slot>
      </template>
    </Suspense>
    <slot v-bind="store"></slot>
  </div>
</template>
<style>
@import '../../style.css';
</style>
