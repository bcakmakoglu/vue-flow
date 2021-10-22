<script lang="ts" setup>
import EdgeAnchor from './EdgeAnchor.vue'
import { getEdgePositions, getHandle, getSourceTargetNodes, isEdgeVisible } from '~/container/EdgeRenderer/utils'
import { isEdge } from '~/utils/graph'
import { ConnectionMode, Edge, EdgeType, Position } from '~/types'
import { useHandle, useHooks, useStore } from '~/composables'

interface EdgeProps {
  type: EdgeType
  edge: Edge
  markerEndId?: string
  edgeUpdaterRadius?: number
}

const props = withDefaults(defineProps<EdgeProps>(), {})

const store = useStore()
const hooks = useHooks()

hooks.connect.on((connection) => {
  hooks.edgeUpdate.trigger({ edge: props.edge, connection })
})

const onEdgeClick = (event: MouseEvent) => {
  if (store.elementsSelectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([props.edge])
  }

  hooks.edgeClick.trigger({ event, edge: props.edge })
}

const onEdgeContextMenu = (event: MouseEvent) =>
  hooks.edgeContextMenu.trigger({
    event,
    edge: props.edge,
  })

const onEdgeMouseEnter = (event: MouseEvent) => hooks.edgeMouseEnter.trigger({ event, edge: props.edge })

const onEdgeMouseMove = (event: MouseEvent) => hooks.edgeMouseMove.trigger({ event, edge: props.edge })

const onEdgeMouseLeave = (event: MouseEvent) => hooks.edgeMouseLeave.trigger({ event, edge: props.edge })

const handler = useHandle()
const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? props.edge.target : props.edge.source
  const handleId = isSourceHandle ? props.edge.targetHandle : props.edge.sourceHandle
  const isValidConnection = () => true
  const isTarget = isSourceHandle

  hooks.edgeUpdateStart.trigger({ event, edge: props.edge })
  handleId && handler(event, handleId, nodeId, isTarget, isValidConnection, isSourceHandle ? 'target' : 'source')
}

const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, true)
}

const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, false)
}

const updating = ref<boolean>(false)
const onEdgeUpdaterMouseEnter = () => (updating.value = true)

const onEdgeUpdaterMouseOut = () => (updating.value = false)

const isVisible = ({ sourceX, sourceY, targetX, targetY }: ReturnType<typeof getEdgePositions>) => {
  return store.onlyRenderVisibleElements
    ? isEdgeVisible({
        sourcePos: { x: sourceX, y: sourceY },
        targetPos: { x: targetX, y: targetY },
        width: store.dimensions.width,
        height: store.dimensions.height,
        transform: store.transform,
      })
    : true
}

const nodes = computed(() => {
  const n = getSourceTargetNodes(props.edge, store.nodes)

  if (!n.sourceNode) {
    console.warn(`couldn't create edge for source id: ${props.edge.source}; edge id: ${props.edge.id}`)
  }

  if (!n.targetNode) {
    console.warn(`couldn't create edge for target id: ${props.edge.target}; edge id: ${props.edge.id}`)
  }

  return n
})

// when connection type is loose we can define all handles as sources
const targetNodeHandles = computed(() =>
  store.connectionMode === ConnectionMode.Strict
    ? nodes.value.targetNode?.__rf.handleBounds.target
    : nodes.value.targetNode?.__rf.handleBounds.target ?? nodes.value.targetNode?.__rf.handleBounds.source,
)

const sourceHandle = computed(
  () => nodes.value.sourceNode && getHandle(nodes.value.sourceNode.__rf.handleBounds.source, props.edge.sourceHandle || null),
)
const targetHandle = computed(() => getHandle(targetNodeHandles.value, props.edge.targetHandle || null))
const sourcePosition = computed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom))
const targetPosition = computed(() => (targetHandle.value ? targetHandle.value.position : Position.Top))

const isSelected = computed(() => store.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.edge.id) || false)
const edgePos = computed(() =>
  getEdgePositions(
    nodes.value.sourceNode,
    sourceHandle.value,
    sourcePosition.value,
    nodes.value.targetNode,
    targetHandle.value,
    targetPosition.value,
  ),
)
</script>
<template>
  <g
    v-if="!props.edge.isHidden && isVisible(edgePos)"
    :class="[
      'vue-flow__edge',
      `vue-flow__edge-${props.edge.type || 'default'}`,
      {
        selected: isSelected,
        animated: props.edge.animated,
        inactive: !store.elementsSelectable,
        updating: updating.value,
      },
    ]"
    @click="onEdgeClick"
    @contextmenu="onEdgeContextMenu"
    @mouseenter="onEdgeMouseEnter"
    @mousemove="onEdgeMouseMove"
    @mouseleave="onEdgeMouseLeave"
  >
    <slot
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
        :is="props.type"
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
