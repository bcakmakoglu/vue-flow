<script lang="ts" setup>
import { useHandle, useStore } from '../../composables'
import { ConnectionMode, Position, EdgePositions, Dimensions, Transform, GraphEdge } from '../../types'
import { isEdge, getEdgePositions, getHandle, isEdgeVisible } from '../../utils'
import EdgeAnchor from './EdgeAnchor.vue'

interface EdgeWrapper {
  edge: GraphEdge
  component?: any
  markerEndId?: string
  edgeUpdaterRadius?: number
  selectable?: boolean
  dimensions: Dimensions
  transform: Transform
}

const props = withDefaults(defineProps<EdgeWrapper>(), {})

const store = useStore()

const updating = ref<boolean>(false)
const handler = useHandle()

const onEdgeClick = (event: MouseEvent) => {
  const data = { event, edge: props.edge }
  if (store.elementsSelectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([props.edge])
  }
  store.hooks.edgeClick.trigger(data)
  store.hooks.elementClick.trigger({ event, element: props.edge })
}
const onEdgeContextMenu = (event: MouseEvent) => store.hooks.edgeContextMenu.trigger({ event, edge: props.edge })
const onDoubleClick = (event: MouseEvent) => store.hooks.edgeDoubleClick.trigger({ event, edge: props.edge })
const onEdgeMouseEnter = (event: MouseEvent) => store.hooks.edgeMouseEnter.trigger({ event, edge: props.edge })
const onEdgeMouseMove = (event: MouseEvent) => store.hooks.edgeMouseMove.trigger({ event, edge: props.edge })
const onEdgeMouseLeave = (event: MouseEvent) => store.hooks.edgeMouseLeave.trigger({ event, edge: props.edge })
const onEdgeUpdaterMouseEnter = () => (updating.value = true)
const onEdgeUpdaterMouseOut = () => (updating.value = false)
const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, true)
const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, false)

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? props.edge.target : props.edge.source
  const handleId = (isSourceHandle ? props.edge.targetHandle : props.edge.sourceHandle) ?? ''
  const isValidConnection = () => true
  const isTarget = isSourceHandle

  store.hooks.edgeUpdateStart.trigger({ event, edge: props.edge })
  handler(
    event,
    handleId,
    nodeId,
    isTarget,
    isValidConnection,
    isSourceHandle ? 'target' : 'source',
    (connection) => store.hooks.edgeUpdate.trigger({ edge: props.edge, connection }),
    () => store.hooks.edgeUpdateEnd.trigger({ event, edge: props.edge }),
  )
}

// when connection type is loose we can define all handles as sources
const targetNodeHandles = computed(() =>
  store.connectionMode === ConnectionMode.Strict
    ? props.edge.targetNode.__vf.handleBounds.target
    : props.edge.targetNode.__vf.handleBounds.target ?? props.edge.targetNode.__vf.handleBounds.source,
)

const sourceHandle = controlledComputed(
  () => props.edge,
  () => {
    if (props.edge.sourceNode && props.edge.sourceNode.__vf.handleBounds.source)
      return getHandle(props.edge.sourceNode.__vf.handleBounds.source, props.edge.sourceHandle)
    else return undefined
  },
)
const targetHandle = computed(() => {
  if (targetNodeHandles.value) return getHandle(targetNodeHandles.value, props.edge.targetHandle)
  else return undefined
})
const sourcePosition = eagerComputed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom))
const targetPosition = eagerComputed(() => (targetHandle.value ? targetHandle.value.position : Position.Top))

const isSelected = controlledComputed(
  () => store.selectedElements,
  () => (props.selectable && store.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.edge.id)) ?? false,
)
const edgePos = computed(() =>
  getEdgePositions(
    props.edge.sourceNode,
    sourceHandle.value,
    sourcePosition.value,
    props.edge.targetNode,
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
        sourceNode: props.edge.sourceNode,
        targetNode: props.edge.targetNode,
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
          sourceNode: props.edge.sourceNode,
          targetNode: props.edge.targetNode,
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
