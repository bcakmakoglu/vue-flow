<script lang="ts" setup>
import { CSSProperties, onBeforeUnmount } from 'vue'
import { invoke } from '@vueuse/core'
import {
  ConnectionLineType,
  ConnectionMode,
  Elements,
  PanOnScrollMode,
  KeyCode,
  TranslateExtent,
  NodeExtent,
  NodeTypes,
  EdgeTypes,
  FlowStore,
  FlowState,
  FlowInstance,
  Loading,
} from '../../types'
import ZoomPane from '../ZoomPane/ZoomPane.vue'
import SelectionPane from '../SelectionPane/SelectionPane.vue'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import LoadingIndicator from '../../components/Loading/LoadingIndicator.vue'
import { createHooks, initFlow, useWindow, useZoomPanHelper } from '../../composables'
import { onLoadGetElements, onLoadProject, onLoadToObject } from '../../utils'

interface FlowProps {
  id?: string
  store?: FlowStore
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
  loading?: Loading
  worker?: boolean
}

const emit = defineEmits([...Object.keys(createHooks()), 'update:elements', 'update:modelValue'])

const props = withDefaults(defineProps<FlowProps>(), {
  modelValue: () => [],
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
  loading: false,
  worker: false,
})
const store = initFlow(emit, typeof props.storageKey === 'string' ? props.storageKey : props.id, props.store)
const elements = useVModel(props, 'modelValue', emit)

// if there are preloaded elements we overwrite the current elements with the stored ones
if (store.elements.length) elements.value = store.elements

const options = Object.assign({}, store.$state, props)

const init = async (state: FlowState) => {
  // set state variables
  const skip = ['modelValue', 'd3Zoom', 'd3Selection', 'd3ZoomHandler', 'minZoom', 'maxZoom', 'translateExtent', 'nodeExtent']
  for (const opt of Object.keys(state)) {
    const val = state[opt as keyof FlowState]
    if (typeof val !== 'undefined' && !skip.includes(opt)) {
      if (typeof val === 'object' && !Array.isArray(val)) {
        ;(store as any)[opt] = { ...(store as any)[opt], ...val }
      } else (store as any)[opt] = val
    }
  }
  if (!store.isReady) await until(() => store.d3Zoom).not.toBeUndefined()
  store.setMinZoom(state.minZoom)
  store.setMaxZoom(state.maxZoom)
  store.setTranslateExtent(state.translateExtent)
  store.setNodeExtent(state.nodeExtent)
}
onBeforeUnmount(() => store?.$dispose())

invoke(async () => {
  init(options)
  await store.setElements(elements.value)
  store.isReady = true

  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window)
    await until(store.dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)

  const { zoomIn, zoomOut, zoomTo, transform: setTransform, fitView } = useZoomPanHelper(store)
  const instance: FlowInstance = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform,
    project: onLoadProject(store),
    getElements: onLoadGetElements(store),
    toObject: onLoadToObject(store),
  }
  store.hooks.load.trigger(instance)
  store.instance = instance
  watch(
    () => props,
    () => init({ ...store.$state, ...props } as FlowState),
    { flush: 'post', deep: true },
  )
})

throttledWatch(elements, store.setElements, { flush: 'post', deep: true, throttle: 10 })
throttledWatch(store.elements, (val) => (elements.value = val), { flush: 'post', deep: true, throttle: 10 })

const transitionName = computed(() => {
  let name = ''
  if (typeof store.loading === 'object' && store.loading.transition) {
    if (typeof store.loading.transition === 'string') name = store.loading.transition
    else name = store.loading.transition.name
  }
  return name
})
</script>
<template>
  <div class="vue-flow">
    <Transition :key="`vue-flow-transition-${store.$id}`" :name="transitionName">
      <Suspense>
        <template #default>
          <ZoomPane
            :key="`zoom-pane-${store.$id}`"
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
                :key="`selection-pane-${store.$id}`"
                :edges="store.getEdges"
                :selected-elements="store.selectedElements"
                :selection-active="store.selectionActive"
                :nodes-selection-active="store.nodesSelectionActive"
                :elements-selectable="store.elementsSelectable"
                :delete-key-code="store.deleteKeyCode"
                :multi-selection-key-code="store.multiSelectionKeyCode"
                :selection-key-code="store.selectionKeyCode"
              >
                <slot name="node-renderer" v-bind="{ nodes: store.getNodes, nodeTypes: store.getNodeTypes }">
                  <NodeRenderer
                    :key="`node-renderer-${store.$id}`"
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
                      :key="`node-${nodeName}-${store.$id}`"
                    >
                      <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
                    </template>
                  </NodeRenderer>
                </slot>
                <slot name="edge-renderer" v-bind="{ edges: store.getEdges, edgeTypes: store.getEdgeTypes }">
                  <EdgeRenderer
                    :key="`edge-renderer-${store.$id}`"
                    :transform="store.transform"
                    :dimensions="store.dimensions"
                    :edges="store.getEdges"
                    :edge-types="store.getEdgeTypes"
                    :nodes="store.getNodes"
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
                  >
                    <template
                      v-for="edgeName of Object.keys(store.getEdgeTypes)"
                      #[`edge-${edgeName}`]="edgeProps"
                      :key="`edge-${edgeName}-${store.$id}`"
                    >
                      <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
                    </template>
                    <template #custom-connection-line="customConnectionLineProps">
                      <slot
                        :key="`connection-line-${store.$id}`"
                        name="custom-connection-line"
                        v-bind="customConnectionLineProps"
                      />
                    </template>
                  </EdgeRenderer>
                </slot>
              </SelectionPane>
              <slot name="zoom-pane" v-bind="zoomPaneProps"></slot>
            </template>
          </ZoomPane>
        </template>
        <template v-if="store.loading" #fallback>
          <slot :key="`loading-indicator-${store.$id}`" name="loading-indicator">
            <LoadingIndicator :key="`default-loading-indicator-${store.$id}`" v-bind="store.loading">
              <slot name="loading-label" />
            </LoadingIndicator>
          </slot>
        </template>
      </Suspense>
    </Transition>
    <slot v-bind="{ store }"></slot>
  </div>
</template>
<style>
@import '../../style.css';
</style>
