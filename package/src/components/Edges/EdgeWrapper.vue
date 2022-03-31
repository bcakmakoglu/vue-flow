<script lang="ts" setup>
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, EdgeComponent, GraphEdge, Position } from '../../types'
import { getEdgePositions, getHandle, getMarkerId } from '../../utils'
import { Slots } from '../../context'
import EdgeAnchor from './EdgeAnchor.vue'

interface EdgeWrapper {
  id: string
  edge: GraphEdge
  selectable?: boolean
  updatable?: boolean
}

const props = defineProps<EdgeWrapper>()
const { store } = useVueFlow()
const edge = useVModel(props, 'edge')

const updating = ref(false)

const { onMouseDown } = useHandle()
const onEdgeClick = (event: MouseEvent) => {
  const data = { event, edge: edge.value }
  if (props.selectable) {
    store.nodesSelectionActive = false
    store.addSelectedEdges([edge.value])
  }
  store.hooks.edgeClick.trigger(data)
}
const onEdgeContextMenu = (event: MouseEvent) => store.hooks.edgeContextMenu.trigger({ event, edge: edge.value })
const onDoubleClick = (event: MouseEvent) => store.hooks.edgeDoubleClick.trigger({ event, edge: edge.value })
const onEdgeMouseEnter = (event: MouseEvent) => store.hooks.edgeMouseEnter.trigger({ event, edge: edge.value })
const onEdgeMouseMove = (event: MouseEvent) => store.hooks.edgeMouseMove.trigger({ event, edge: edge.value })
const onEdgeMouseLeave = (event: MouseEvent) => store.hooks.edgeMouseLeave.trigger({ event, edge: edge.value })
const onEdgeUpdaterMouseEnter = () => (updating.value = true)
const onEdgeUpdaterMouseOut = () => (updating.value = false)
const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, true)
const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, false)

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? edge.value.target : edge.value.source
  const handleId = (isSourceHandle ? edge.value.targetHandle : edge.value.sourceHandle) ?? ''

  store.hooks.edgeUpdateStart.trigger({ event, edge: edge.value })
  onMouseDown(
    event,
    handleId,
    nodeId,
    isSourceHandle,
    undefined,
    isSourceHandle ? 'target' : 'source',
    (connection) => store.hooks.edgeUpdate.trigger({ edge: edge.value, connection }),
    () => store.hooks.edgeUpdateEnd.trigger({ event, edge: edge.value }),
  )
}

const getClass = () => (edge.value.class instanceof Function ? edge.value.class(edge.value) : edge.value.class)
const getStyle = () => (edge.value.style instanceof Function ? edge.value.style(edge.value) : edge.value.style)

// when connection type is loose we can define all handles as sources
const targetNodeHandles = computed(() =>
  store.connectionMode === ConnectionMode.Strict
    ? edge.value.targetNode.handleBounds.target
    : edge.value.targetNode.handleBounds.target ?? edge.value.targetNode.handleBounds.source,
)

const sourceHandle = controlledComputed(
  () => edge.value.sourceNode.handleBounds,
  () => getHandle(edge.value.sourceNode.handleBounds.source, edge.value.sourceHandle),
)

const targetHandle = computed(() => getHandle(targetNodeHandles.value, edge.value.targetHandle))
const sourcePosition = computed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom))
const targetPosition = computed(() => (targetHandle.value ? targetHandle.value.position : Position.Top))

const edgeUpdaterRadius = computed(() => store.edgeUpdaterRadius)

onMounted(() => {
  watch(
    [
      sourcePosition,
      targetPosition,
      () => edge.value.sourceNode.position,
      () => edge.value.targetNode.position,
      () => edge.value.sourceNode.computedPosition,
      () => edge.value.targetNode.computedPosition,
      () => edge.value.sourceNode.dimensions,
      () => edge.value.targetNode.dimensions,
    ],
    () => {
      const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
        edge.value.sourceNode,
        sourceHandle.value,
        sourcePosition.value,
        edge.value.targetNode,
        targetHandle.value,
        targetPosition.value,
      )
      if (edge.value.sourceX !== sourceX) edge.value.sourceX = sourceX
      if (edge.value.sourceY !== sourceY) edge.value.sourceY = sourceY
      if (edge.value.targetX !== targetX) edge.value.targetX = targetX
      if (edge.value.targetY !== targetY) edge.value.targetY = targetY
    },
    { immediate: true, deep: true },
  )
})

const slots = inject(Slots)

const name = ref(edge.value.type ?? 'default')
watch(
  () => edge.value.type,
  (v) => v && (name.value = v),
)

const type = computed(() => {
  const instance = getCurrentInstance()
  let edgeType = store.getEdgeTypes[name.value]
  if (typeof edgeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name.value)) {
        edgeType = resolveComponent(name.value, false) as EdgeComponent
      }
    }
  }
  if (typeof edgeType !== 'string') return edgeType

  const slot = slots?.[`edge-${name.value}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Edge type "${edge.value.type}" not found and no edge-slot detected. Using fallback type "default".`)
    name.value = 'default'
    return store.getEdgeTypes.default
  }

  return slot
})
</script>
<script lang="ts">
export default {
  name: 'Edge',
  inheritAttrs: false,
}
</script>
<template>
  <g
    :key="`edge-${edge.id}`"
    :class="[
      'vue-flow__edge',
      `vue-flow__edge-${name}`,
      store.noPanClassName,
      {
        selected: edge.selected,
        animated: edge.animated,
        inactive: !props.selectable,
        updating,
      },
      getClass(),
    ]"
    @click="onEdgeClick"
    @dblClick="onDoubleClick"
    @contextmenu="onEdgeContextMenu"
    @mouseenter="onEdgeMouseEnter"
    @mousemove="onEdgeMouseMove"
    @mouseleave="onEdgeMouseLeave"
  >
    <component
      :is="type"
      :id="edge.id"
      :source-node="edge.sourceNode"
      :target-node="edge.targetNode"
      :source="edge.source"
      :target="edge.target"
      :updatable="props.updatable"
      :selected="edge.selected"
      :animated="edge.animated"
      :label="edge.label"
      :label-style="edge.labelStyle"
      :label-show-bg="edge.labelShowBg"
      :label-bg-style="edge.labelBgStyle"
      :label-bg-padding="edge.labelBgPadding"
      :label-bg-border-radius="edge.labelBgBorderRadius"
      :data="edge.data"
      :style="getStyle()"
      :marker-start="`url(#${getMarkerId(edge.markerStart)})`"
      :marker-end="`url(#${getMarkerId(edge.markerEnd)})`"
      :source-position="sourcePosition"
      :target-position="targetPosition"
      :source-x="edge.sourceX"
      :source-y="edge.sourceY"
      :target-x="edge.targetX"
      :target-y="edge.targetY"
      :source-handle-id="edge.sourceHandle"
      :target-handle-id="edge.targetHandle"
    />
    <g
      v-if="props.updatable"
      @mousedown="onEdgeUpdaterSourceMouseDown"
      @mouseenter="onEdgeUpdaterMouseEnter"
      @mouseout="onEdgeUpdaterMouseOut"
    >
      <EdgeAnchor :position="sourcePosition" :center-x="edge.sourceX" :center-y="edge.sourceY" :radius="edgeUpdaterRadius" />
    </g>
    <g
      v-if="props.updatable"
      @mousedown="onEdgeUpdaterTargetMouseDown"
      @mouseenter="onEdgeUpdaterMouseEnter"
      @mouseout="onEdgeUpdaterMouseOut"
    >
      <EdgeAnchor :position="targetPosition" :center-x="edge.targetX" :center-y="edge.targetY" :radius="edgeUpdaterRadius" />
    </g>
  </g>
</template>
