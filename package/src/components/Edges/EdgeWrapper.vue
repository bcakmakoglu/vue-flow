<script lang="ts" setup>
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, Position } from '../../types'
import { getEdgePositions, getHandle, getMarkerId } from '../../utils'
import EdgeAnchor from './EdgeAnchor.vue'

interface EdgeWrapper {
  id: string
  name: string
  selectable?: boolean
  updatable?: boolean
}

const props = defineProps<EdgeWrapper>()
const { store } = useVueFlow()
const edge = computed(() => store.getEdge(props.id)!)
if (!edge.value) throw new Error(`Edge with ${props.id} not found!`)

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
      `vue-flow__edge-${props.name}`,
      store.noPanClassName,
      {
        selected: edge.selected,
        animated: edge.animated,
        inactive: !props.selectable,
        updating,
      },
      edge.class,
    ]"
    @click="onEdgeClick"
    @dblClick="onDoubleClick"
    @contextmenu="onEdgeContextMenu"
    @mouseenter="onEdgeMouseEnter"
    @mousemove="onEdgeMouseMove"
    @mouseleave="onEdgeMouseLeave"
  >
    <slot
      v-bind="{
        id: edge.id,
        sourceNode: edge.sourceNode,
        targetNode: edge.targetNode,
        source: edge.source,
        target: edge.target,
        updatable: props.updatable,
        selected: edge.selected,
        animated: edge.animated,
        label: edge.label,
        labelStyle: edge.labelStyle,
        labelShowBg: edge.labelShowBg,
        labelBgStyle: edge.labelBgStyle,
        labelBgPadding: edge.labelBgPadding,
        labelBgBorderRadius: edge.labelBgBorderRadius,
        data: edge.data,
        style: edge.style,
        markerStart: `url(#${getMarkerId(edge.markerStart)})`,
        markerEnd: `url(#${getMarkerId(edge.markerEnd)})`,
        sourcePosition,
        targetPosition,
        sourceX: edge.sourceX,
        sourceY: edge.sourceY,
        targetX: edge.targetX,
        targetY: edge.targetY,
        sourceHandleId: edge.sourceHandle,
        targetHandleId: edge.targetHandle,
      }"
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
