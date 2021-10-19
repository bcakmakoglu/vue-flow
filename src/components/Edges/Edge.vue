<script lang="ts" setup>
import EdgeAnchor from './EdgeAnchor.vue'
import { getEdgePositions, getHandle, getSourceTargetNodes, isEdgeVisible } from '~/container/EdgeRenderer/utils'
import { isEdge } from '~/utils/graph'
import { ConnectionMode, Dimensions, Edge, EdgeType, Elements, Position, Transform } from '~/types'
import { onMouseDown } from '~/components/Handle/utils'
import { Hooks, Store } from '~/context'

interface EdgeProps {
  type: EdgeType
  edge: Edge
  nodes: ReturnType<typeof getSourceTargetNodes>
  dimensions: Dimensions
  transform: Transform
  selectedElements?: Elements
  elementsSelectable?: boolean
  onlyRenderVisibleElements?: boolean
  connectionMode?: ConnectionMode
  markerEndId?: string
  edgeUpdaterRadius?: number
}

const props = withDefaults(defineProps<EdgeProps>(), {
  elementsSelectable: true,
  onlyRenderVisibleElements: false,
})

const store = inject(Store)!
const hooks = inject(Hooks)!

hooks.connect.on((connection) => {
  hooks.edgeUpdate.trigger({ edge: props.edge, connection })
})

if (!props.nodes.value.sourceNode) {
  console.warn(`couldn't create edge for source id: ${props.edge.source}; edge id: ${props.edge.id}`)
}

if (!props.nodes.value.targetNode) {
  console.warn(`couldn't create edge for target id: ${props.edge.target}; edge id: ${props.edge.id}`)
}

// when connection type is loose we can define all handles as sources
const targetNodeHandles =
  props.connectionMode === ConnectionMode.Strict
    ? props.nodes.value.targetNode?.__rf.handleBounds.target
    : props.nodes.value.targetNode?.__rf.handleBounds.target || props.nodes.value.targetNode?.__rf.handleBounds.source

const sourceHandle =
  props.nodes.value.sourceNode &&
  getHandle(props.nodes.value.sourceNode.__rf.handleBounds.source, props.edge.sourceHandle || null)
const targetHandle = getHandle(targetNodeHandles, props.edge.targetHandle || null)
const sourcePosition = sourceHandle ? sourceHandle.position : Position.Bottom
const targetPosition = targetHandle ? targetHandle.position : Position.Top

const isSelected = computed(() => props.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.edge.id) || false)

const edgeElement = computed(() => {
  const el: Edge = {
    id: props.edge.id || '',
    source: props.edge.source,
    target: props.edge.target,
    type: props.edge.type,
  }

  if (props.edge.sourceHandle) {
    el.sourceHandle = props.edge.sourceHandle
  }

  if (props.edge.targetHandle) {
    el.targetHandle = props.edge.targetHandle
  }

  if (typeof props.edge.data !== 'undefined') {
    el.data = props.edge.data
  }

  return el
})

const onEdgeClick = (event: MouseEvent) => {
  if (props.elementsSelectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([edgeElement.value])
  }

  hooks.edgeClick.trigger({ event, edge: edgeElement.value })
}

const onEdgeContextMenu = (event: MouseEvent) =>
  hooks.edgeContextMenu.trigger({
    event,
    edge: edgeElement.value,
  })

const onEdgeMouseEnter = (event: MouseEvent) => hooks.edgeMouseEnter.trigger({ event, edge: edgeElement.value })

const onEdgeMouseMove = (event: MouseEvent) => hooks.edgeMouseMove.trigger({ event, edge: edgeElement.value })

const onEdgeMouseLeave = (event: MouseEvent) => hooks.edgeMouseLeave.trigger({ event, edge: edgeElement.value })

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? props.edge.target : props.edge.source
  const handleId = isSourceHandle ? props.edge.targetHandle : props.edge.sourceHandle
  const isValidConnection = () => true
  const isTarget = isSourceHandle

  hooks.edgeUpdateStart.trigger({ event, edge: edgeElement.value })
  handleId &&
    onMouseDown(event, store, hooks, handleId, nodeId, isTarget, isValidConnection, isSourceHandle ? 'target' : 'source')
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
const edgePos = computed(() =>
  getEdgePositions(
    props.nodes.value.sourceNode,
    sourceHandle,
    sourcePosition,
    props.nodes.value.targetNode,
    targetHandle,
    targetPosition,
  ),
)
const isVisible = ({ sourceX, sourceY, targetX, targetY }: ReturnType<typeof getEdgePositions>) => {
  return props.onlyRenderVisibleElements
    ? isEdgeVisible({
        sourcePos: { x: sourceX, y: sourceY },
        targetPos: { x: targetX, y: targetY },
        width: props.dimensions.width,
        height: props.dimensions.height,
        transform: props.transform,
      })
    : true
}
const visible = computed(() => !props.edge.isHidden && isVisible(edgePos.value))
</script>
<template>
  <g
    v-if="visible"
    :class="[
      'revue-flow__edge',
      `revue-flow__edge-${props.type.name || 'default'}`,
      {
        selected: isSelected.value,
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
    <component
      :is="props.type"
      v-bind="{
        id: props.edge.id,
        source: props.edge.source,
        target: props.edge.target,
        selected: isSelected.value,
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
        :position="sourcePosition"
        :center-x="edgePos.sourceX"
        :center-y="edgePos.sourceY"
        :radius="props.edgeUpdaterRadius"
      />
    </g>
  </g>
</template>
