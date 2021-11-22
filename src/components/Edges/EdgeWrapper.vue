<script lang="ts" setup>
import { useHandle, useStore } from '../../composables'
import { ConnectionMode, Edge, SourceTargetNode, Position, FlowEvents, EdgePositions, Dimensions, Transform } from '../../types'
import { isEdge, getEdgePositions, getHandle, isEdgeVisible } from '../../utils'
import EdgeAnchor from './EdgeAnchor.vue'

interface EdgeWrapper {
  edge: Edge
  sourceTargetNodes: SourceTargetNode
  component?: any
  markerEndId?: string
  edgeUpdaterRadius?: number
  selectable?: boolean
  dimensions: Dimensions
  transform: Transform
}

interface EdgeEvents {
  (event: 'mouseEnter', data: FlowEvents['edgeMouseEnter']): void
  (event: 'mouseMove', data: FlowEvents['edgeMouseMove']): void
  (event: 'mouseLeave', data: FlowEvents['edgeMouseLeave']): void
  (event: 'contextMenu', data: FlowEvents['edgeContextMenu']): void
  (event: 'click', data: FlowEvents['edgeClick']): void
  (event: 'dblClick', data: FlowEvents['edgeDoubleClick']): void
  (event: 'updateStart', data: FlowEvents['edgeUpdateStart']): void
  (event: 'update', data: FlowEvents['edgeUpdate']): void
  (event: 'updateEnd', data: FlowEvents['edgeUpdateEnd']): void
}

const props = withDefaults(defineProps<EdgeWrapper>(), {})
const emit = defineEmits<EdgeEvents>()

const store = useStore()

const updating = ref<boolean>(false)
const handler = useHandle()

const onEdgeClick = (event: MouseEvent) => {
  const data = { event, edge: props.edge }
  if (store.elementsSelectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([props.edge])
  }
  emit('click', data)
  store.hooks.edgeClick.trigger(data)
  store.hooks.elementClick.trigger({ event, element: props.edge })
}
const onEdgeContextMenu = (event: MouseEvent) => {
  const data = { event, edge: props.edge }
  emit('contextMenu', data)
  store.hooks.edgeContextMenu.trigger(data)
}
const onDoubleClick = (event: MouseEvent) => {
  const data = { event, edge: props.edge }
  emit('dblClick', data)
  store.hooks.edgeDoubleClick.trigger(data)
}
const onEdgeMouseEnter = (event: MouseEvent) => {
  const data = { event, edge: props.edge }
  emit('mouseEnter', data)
  store.hooks.edgeMouseEnter.trigger({ event, edge: props.edge })
}
const onEdgeMouseMove = (event: MouseEvent) => {
  const data = { event, edge: props.edge }
  emit('mouseMove', data)
  store.hooks.edgeMouseMove.trigger(data)
}
const onEdgeMouseLeave = (event: MouseEvent) => {
  const data = { event, edge: props.edge }
  emit('mouseLeave', data)
  store.hooks.edgeMouseLeave.trigger(data)
}
const onEdgeUpdaterMouseEnter = () => (updating.value = true)
const onEdgeUpdaterMouseOut = () => (updating.value = false)
const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, true)
}
const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, false)
}

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? props.edge.target : props.edge.source
  const handleId = (isSourceHandle ? props.edge.targetHandle : props.edge.sourceHandle) ?? ''
  const isValidConnection = () => true
  const isTarget = isSourceHandle

  emit('updateStart', { event, edge: props.edge })
  store.hooks.edgeUpdateStart.trigger({ event, edge: props.edge })
  handler(
    event,
    handleId,
    nodeId,
    isTarget,
    isValidConnection,
    isSourceHandle ? 'target' : 'source',
    (connection) => {
      emit('update', { edge: props.edge, connection })
      store.hooks.edgeUpdate.trigger({ edge: props.edge, connection })
    },
    () => {
      emit('updateEnd', event)
      store.hooks.edgeUpdateEnd.trigger(event)
    },
  )
}

// when connection type is loose we can define all handles as sources
const targetNodeHandles = controlledComputed(
  () => props.sourceTargetNodes,
  () =>
    store.connectionMode === ConnectionMode.Strict
      ? props.sourceTargetNodes.targetNode.__vf.handleBounds.target
      : props.sourceTargetNodes.targetNode.__vf.handleBounds.target ??
        props.sourceTargetNodes.targetNode.__vf.handleBounds.source,
)

const sourceHandle = controlledComputed(
  () => props.sourceTargetNodes,
  () => {
    if (props.sourceTargetNodes.sourceNode && props.sourceTargetNodes.sourceNode.__vf.handleBounds.source)
      return getHandle(props.sourceTargetNodes.sourceNode.__vf.handleBounds.source, props.edge.sourceHandle)
    else return null
  },
)
const targetHandle = computed(() => {
  if (targetNodeHandles.value) return getHandle(targetNodeHandles.value, props.edge.targetHandle)
  else return null
})
const sourcePosition = eagerComputed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom))
const targetPosition = eagerComputed(() => (targetHandle.value ? targetHandle.value.position : Position.Top))

const isSelected = controlledComputed(
  () => store.selectedElements,
  () => (props.selectable && store.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.edge.id)) ?? false,
)
const edgePos = computed(() =>
  getEdgePositions(
    props.sourceTargetNodes.sourceNode,
    sourceHandle.value,
    sourcePosition.value,
    props.sourceTargetNodes.targetNode,
    targetHandle.value,
    targetPosition.value,
  ),
)

const isVisible = ({ sourceX, sourceY, targetX, targetY }: EdgePositions) =>
  store.onlyRenderVisibleElements
    ? isEdgeVisible({
        sourcePos: { x: sourceX, y: sourceY },
        targetPos: { x: targetX, y: targetY },
        width: props.dimensions.width,
        height: props.dimensions.height,
        transform: props.transform,
      })
    : true
</script>
<script lang="ts">
export default {
  name: 'Edge',
}
</script>
<template>
  <g
    v-show="isVisible(edgePos)"
    :class="[
      'vue-flow__edge',
      `vue-flow__edge-${props.edge.type || 'default'}`,
      {
        selected: isSelected,
        animated: props.edge.animated,
        inactive: !props.selectable,
        updating,
      },
      props.edge.class,
    ]"
    @click="onEdgeClick"
    @dblClick="onDoubleClick"
    @contextmenu="onEdgeContextMenu"
    @mouseenter="onEdgeMouseEnter"
    @mousemove="onEdgeMouseMove"
    @mouseleave="onEdgeMouseLeave"
  >
    <slot
      v-if="edgePos.sourceX && edgePos.sourceY && edgePos.targetX && edgePos.targetY"
      v-bind="{
        id: props.edge.id,
        source: props.edge.source,
        target: props.edge.target,
        selected: isSelected,
        animated: props.edge.animated,
        label: props.edge.label,
        labelStyle: props.edge.labelStyle,
        labelShowBg: props.edge.labelShowBg,
        labelBgStyle: props.edge.labelBgStyle,
        labelBgPadding: props.edge.labelBgPadding,
        labelBgBorderRadius: props.edge.labelBgBorderRadius,
        data: props.edge.data,
        style: props.edge.style,
        arrowHeadType: props.edge.arrowHeadType,
        sourcePosition,
        targetPosition,
        sourceX: edgePos.sourceX,
        sourceY: edgePos.sourceY,
        targetX: edgePos.targetX,
        targetY: edgePos.targetY,
        markerEndId: props.markerEndId,
        sourceHandleId: props.edge.sourceHandle,
        targetHandleId: props.edge.targetHandle,
      }"
    >
      <component
        :is="props.component ?? props.edge.type"
        v-bind="{
          id: props.edge.id,
          source: props.edge.source,
          target: props.edge.target,
          selected: isSelected,
          animated: props.edge.animated,
          label: props.edge.label,
          labelStyle: props.edge.labelStyle,
          labelShowBg: props.edge.labelShowBg,
          labelBgStyle: props.edge.labelBgStyle,
          labelBgPadding: props.edge.labelBgPadding,
          labelBgBorderRadius: props.edge.labelBgBorderRadius,
          data: props.edge.data,
          style: props.edge.style,
          arrowHeadType: props.edge.arrowHeadType,
          sourcePosition,
          targetPosition,
          sourceX: edgePos.sourceX,
          sourceY: edgePos.sourceY,
          targetX: edgePos.targetX,
          targetY: edgePos.targetY,
          markerEndId: props.markerEndId,
          sourceHandleId: props.edge.sourceHandle,
          targetHandleId: props.edge.targetHandle,
        }"
      />
    </slot>
    <g @mousedown="onEdgeUpdaterSourceMouseDown" @mouseenter="onEdgeUpdaterMouseEnter" @mouseout="onEdgeUpdaterMouseOut">
      <EdgeAnchor
        :position="sourcePosition"
        :center-x="edgePos.sourceX"
        :center-y="edgePos.sourceY"
        :radius="props.edgeUpdaterRadius"
      />
    </g>
    <g @mousedown="onEdgeUpdaterTargetMouseDown" @mouseenter="onEdgeUpdaterMouseEnter" @mouseout="onEdgeUpdaterMouseOut">
      <EdgeAnchor
        :position="targetPosition"
        :center-x="edgePos.targetX"
        :center-y="edgePos.targetY"
        :radius="props.edgeUpdaterRadius"
      />
    </g>
  </g>
</template>
