<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { useHandle, useStore } from '../../composables'
import { ArrowHeadType, ConnectionMode, Edge, EdgeTextProps, ElementId, SourceTargetNode, Position } from '../../types'
import { isEdge, getEdgePositions, getHandle } from '../../utils'
import EdgeAnchor from './EdgeAnchor.vue'

interface EdgeWrapper {
  id: ElementId
  edge: Edge
  sourceTargetNodes: SourceTargetNode
  type?: string
  component?: any
  source: ElementId
  target: ElementId
  sourceHandle?: ElementId | null
  targetHandle?: ElementId | null
  selected?: boolean
  sourcePosition?: Position
  targetPosition?: Position
  label?:
    | string
    | {
        component: any
        props?: EdgeTextProps
      }
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: CSSProperties | unknown
  animated?: boolean
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: any
  class?: string
  isHidden?: boolean
  edgeUpdaterRadius?: number
  selectable?: boolean
}

const props = withDefaults(defineProps<EdgeWrapper>(), {})

const store = useStore()

const updating = ref<boolean>(false)
const handler = useHandle()

const onEdgeClick = (event: MouseEvent) => {
  if (store.elementsSelectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([props.edge])
  }
  store.hooks.elementClick.trigger({ event, element: props.edge })
  store.hooks.edgeClick.trigger({ event, edge: props.edge })
}
const onEdgeContextMenu = (event: MouseEvent) =>
  store.hooks.edgeContextMenu.trigger({
    event,
    edge: props.edge,
  })
const onDoubleClick = (event: MouseEvent) => store.hooks.edgeDoubleClick.trigger({ event, edge: props.edge })
const onEdgeMouseEnter = (event: MouseEvent) => store.hooks.edgeMouseEnter.trigger({ event, edge: props.edge })
const onEdgeMouseMove = (event: MouseEvent) => store.hooks.edgeMouseMove.trigger({ event, edge: props.edge })
const onEdgeMouseLeave = (event: MouseEvent) => store.hooks.edgeMouseLeave.trigger({ event, edge: props.edge })
const onEdgeUpdaterMouseEnter = () => (updating.value = true)
const onEdgeUpdaterMouseOut = () => (updating.value = false)
const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, true)
}
const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, false)
}

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? props.target : props.source
  const handleId = (isSourceHandle ? props.targetHandle : props.sourceHandle) ?? ''
  const isValidConnection = () => true
  const isTarget = isSourceHandle

  store.hooks.edgeUpdateStart.trigger({ event, edge: props.edge })
  handler(event, handleId, nodeId, isTarget, isValidConnection, isSourceHandle ? 'target' : 'source', (connection) =>
    store.hooks.edgeUpdate.trigger({ edge: props.edge, connection }),
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
      return getHandle(props.sourceTargetNodes.sourceNode.__vf.handleBounds.source, props.sourceHandle ?? null)
    else return null
  },
)
const targetHandle = computed(() => {
  if (targetNodeHandles.value) return getHandle(targetNodeHandles.value, props.targetHandle ?? null)
  else return null
})
const sourcePosition = eagerComputed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom))
const targetPosition = eagerComputed(() => (targetHandle.value ? targetHandle.value.position : Position.Top))

const isSelected = controlledComputed(
  () => store.selectedElements,
  () => (props.selectable && store.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.id)) ?? false,
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
</script>
<script lang="ts">
export default {
  name: 'Edge',
}
</script>
<template>
  <g
    :class="[
      'vue-flow__edge',
      `vue-flow__edge-${props.type || 'default'}`,
      {
        selected: isSelected,
        animated: props.animated,
        inactive: !props.selectable,
        updating,
      },
      props.class,
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
        id: props.id,
        source: props.source,
        target: props.target,
        selected: isSelected,
        animated: props.animated,
        label: props.label,
        labelStyle: props.labelStyle,
        labelShowBg: props.labelShowBg,
        labelBgStyle: props.labelBgStyle,
        labelBgPadding: props.labelBgPadding,
        labelBgBorderRadius: props.labelBgBorderRadius,
        data: props.data,
        style: props.style,
        arrowHeadType: props.arrowHeadType,
        sourcePosition,
        targetPosition,
        sourceX: edgePos.sourceX,
        sourceY: edgePos.sourceY,
        targetX: edgePos.targetX,
        targetY: edgePos.targetY,
        markerEndId: props.markerEndId,
        sourceHandleId: props.sourceHandle,
        targetHandleId: props.targetHandle,
      }"
    >
      <component
        :is="props.component ?? props.type"
        v-if="typeof type !== 'boolean'"
        v-bind="{
          id: props.id,
          source: props.source,
          target: props.target,
          selected: isSelected,
          animated: props.animated,
          label: props.label,
          labelStyle: props.labelStyle,
          labelShowBg: props.labelShowBg,
          labelBgStyle: props.labelBgStyle,
          labelBgPadding: props.labelBgPadding,
          labelBgBorderRadius: props.labelBgBorderRadius,
          data: props.data,
          style: props.style,
          arrowHeadType: props.arrowHeadType,
          sourcePosition,
          targetPosition,
          sourceX: edgePos.sourceX,
          sourceY: edgePos.sourceY,
          targetX: edgePos.targetX,
          targetY: edgePos.targetY,
          markerEndId: props.markerEndId,
          sourceHandleId: props.sourceHandle,
          targetHandleId: props.targetHandle,
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
