<script lang="ts" setup>
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, Position, EdgeComponent } from '../../types'
import { getEdgePositions, getHandle, getMarkerId } from '../../utils'
import EdgeAnchor from './EdgeAnchor.vue'

interface EdgeWrapper {
  id: string
  selectable?: boolean
  updatable?: boolean
}

const props = defineProps<EdgeWrapper>()
const { store } = useVueFlow()
const edge = store.getEdge(props.id)
if (!edge) throw new Error(`Edge with ${props.id} not found!`)

const updating = ref(false)
const { onMouseDown } = useHandle()

const onEdgeClick = (event: MouseEvent) => {
  const data = { event, edge }
  if (props.selectable) {
    store.nodesSelectionActive = false
    store.addSelectedEdges([edge])
  }
  store.hooks.edgeClick.trigger(data)
}
const onEdgeContextMenu = (event: MouseEvent) => store.hooks.edgeContextMenu.trigger({ event, edge })
const onDoubleClick = (event: MouseEvent) => store.hooks.edgeDoubleClick.trigger({ event, edge })
const onEdgeMouseEnter = (event: MouseEvent) => store.hooks.edgeMouseEnter.trigger({ event, edge })
const onEdgeMouseMove = (event: MouseEvent) => store.hooks.edgeMouseMove.trigger({ event, edge })
const onEdgeMouseLeave = (event: MouseEvent) => store.hooks.edgeMouseLeave.trigger({ event, edge })
const onEdgeUpdaterMouseEnter = () => (updating.value = true)
const onEdgeUpdaterMouseOut = () => (updating.value = false)
const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, true)
const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, false)

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? edge.target : edge.source
  const handleId = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''

  store.hooks.edgeUpdateStart.trigger({ event, edge })
  onMouseDown(
    event,
    handleId,
    nodeId,
    isSourceHandle,
    undefined,
    isSourceHandle ? 'target' : 'source',
    (connection) => store.hooks.edgeUpdate.trigger({ edge, connection }),
    () => store.hooks.edgeUpdateEnd.trigger({ event, edge }),
  )
}

// when connection type is loose we can define all handles as sources
const targetNodeHandles = computed(() =>
  store.connectionMode === ConnectionMode.Strict
    ? edge.targetNode.handleBounds.target
    : edge.targetNode.handleBounds.target ?? edge.targetNode.handleBounds.source,
)
const sourceHandle = controlledComputed(
  () => edge.sourceNode.handleBounds,
  () => getHandle(edge.sourceNode.handleBounds.source, edge.sourceHandle),
)
const targetHandle = computed(() => getHandle(targetNodeHandles.value, edge.targetHandle))
const sourcePosition = computed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom))
const targetPosition = computed(() => (targetHandle.value ? targetHandle.value.position : Position.Top))
const edgeUpdaterRadius = computed(() => store.edgeUpdaterRadius)

onMounted(() => {
  watch(
    [
      sourcePosition,
      targetPosition,
      () => edge.sourceNode.position,
      () => edge.targetNode.position,
      () => edge.sourceNode.computedPosition,
      () => edge.targetNode.computedPosition,
      () => edge.sourceNode.dimensions,
      () => edge.targetNode.dimensions,
    ],
    () => {
      const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
        edge.sourceNode,
        sourceHandle.value,
        sourcePosition.value,
        edge.targetNode,
        targetHandle.value,
        targetPosition.value,
      )
      if (edge.sourceX !== sourceX) edge.sourceX = sourceX
      if (edge.sourceY !== sourceY) edge.sourceY = sourceY
      if (edge.targetX !== targetX) edge.targetX = targetX
      if (edge.targetY !== targetY) edge.targetY = targetY
    },
    { immediate: true, deep: true },
  )
})

const name = ref(edge.type ?? 'default')
const type = computed(() => {
  let edgeType = store.getEdgeTypes[name.value]
  if (typeof edgeType === 'string') edgeType = resolveComponent(name.value, false) as EdgeComponent
  if (typeof edgeType !== 'string') return edgeType

  const slot = useSlots()?.[name.value]?.({})
  if (!slot || !slot[0].key?.toString().includes(name.value)) {
    console.warn(`Node type "${edge.type}" not found and no slot detected. Using fallback type "default".`)
    name.value = 'default'
    return store.getEdgeTypes.default
  }
})
</script>
<script lang="ts">
export default {
  name: 'Edge',
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
        selected: edge.selected,
        animated: edge.animated,
        updatable: props.updatable,
        label: edge.label,
        labelStyle: edge.labelStyle,
        labelShowBg: edge.labelShowBg,
        labelBgStyle: edge.labelBgStyle,
        labelBgPadding: edge.labelBgPadding,
        labelBgBorderRadius: edge.labelBgBorderRadius,
        data: edge.data,
        style: edge.style,
        sourceX: edge.sourceX,
        sourceY: edge.sourceY,
        targetX: edge.targetX,
        targetY: edge.targetY,
        markerStart: `url(#${getMarkerId(edge.markerStart)})`,
        markerEnd: `url(#${getMarkerId(edge.markerEnd)})`,
        sourcePosition,
        targetPosition,
        sourceHandleId: edge.sourceHandle,
        targetHandleId: edge.targetHandle,
      }"
    >
      <component
        :is="type"
        v-if="type"
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
    </slot>
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
