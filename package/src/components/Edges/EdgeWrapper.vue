<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, EdgeComponent, GraphEdge, GraphNode, Position } from '../../types'
import { getEdgePositions, getHandle, getMarkerId } from '../../utils'
import { Slots } from '../../context'
import EdgeAnchor from './EdgeAnchor'

interface EdgeWrapper {
  id: string
  edge: GraphEdge
  sourceNode: GraphNode
  targetNode: GraphNode
  selectable?: boolean
  updatable?: boolean
}

const props = defineProps<EdgeWrapper>()

const slots = inject(Slots)

const { hooks, connectionMode, setState, addSelectedEdges, getEdgeTypes, edgeUpdaterRadius, noPanClassName } = $(useVueFlow())

const edge = $(useVModel(props, 'edge'))

let name = $ref(edge.type ?? 'default')
watch(
  () => edge.type,
  (v) => v && (name = v),
)

let updating = $ref(false)

onMounted(() => {
  watch(
    [
      sourcePosition,
      targetPosition,
      () => props.sourceNode.position,
      () => props.targetNode.position,
      () => props.sourceNode.computedPosition,
      () => props.targetNode.computedPosition,
      () => props.sourceNode.dimensions,
      () => props.targetNode.dimensions,
    ],
    () => {
      const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
        props.sourceNode,
        sourceHandle.value,
        sourcePosition.value,
        props.targetNode,
        targetHandle.value,
        targetPosition.value,
      )
      if (edge.sourceX !== sourceX) edge.sourceX = sourceX
      if (edge.sourceY !== sourceY) edge.sourceY = sourceY
      if (edge.targetX !== targetX) edge.targetX = targetX
      if (edge.targetY !== targetY) edge.targetY = targetY
    },
    { immediate: true },
  )
})

const { onMouseDown } = useHandle()

const onEdgeClick = (event: MouseEvent) => {
  const data = { event, edge }
  if (props.selectable) {
    setState({
      nodesSelectionActive: false,
    })

    addSelectedEdges([edge])
  }
  hooks.edgeClick.trigger(data)
}

const onEdgeContextMenu = (event: MouseEvent) => hooks.edgeContextMenu.trigger({ event, edge })

const onDoubleClick = (event: MouseEvent) => hooks.edgeDoubleClick.trigger({ event, edge })

const onEdgeMouseEnter = (event: MouseEvent) => hooks.edgeMouseEnter.trigger({ event, edge })

const onEdgeMouseMove = (event: MouseEvent) => hooks.edgeMouseMove.trigger({ event, edge })

const onEdgeMouseLeave = (event: MouseEvent) => hooks.edgeMouseLeave.trigger({ event, edge })

const onEdgeUpdaterMouseEnter = () => (updating = true)

const onEdgeUpdaterMouseOut = () => (updating = false)

const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, true)

const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, false)

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? edge.target : edge.source
  const handleId = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''

  hooks.edgeUpdateStart.trigger({ event, edge })

  onMouseDown(
    event,
    handleId,
    nodeId,
    isSourceHandle,
    undefined,
    isSourceHandle ? 'target' : 'source',
    (connection) => hooks.edgeUpdate.trigger({ edge, connection }),
    () => hooks.edgeUpdateEnd.trigger({ event, edge }),
  )
}

// when connection type is loose we can define all handles as sources
const targetNodeHandles = computed(() => {
  if (connectionMode === ConnectionMode.Strict) {
    return props.targetNode.handleBounds.target
  }

  const targetBounds = props.targetNode.handleBounds.target
  const sourceBounds = props.targetNode.handleBounds.source
  return targetBounds ?? sourceBounds
})

const sourceNodeHandles = computed(() => {
  if (connectionMode === ConnectionMode.Strict) {
    return props.sourceNode.handleBounds.source
  }

  const targetBounds = props.sourceNode.handleBounds.target
  const sourceBounds = props.sourceNode.handleBounds.source
  return sourceBounds ?? targetBounds
})

const sourceHandle = computed(() => getHandle(sourceNodeHandles.value, edge.sourceHandle))

const targetHandle = computed(() => getHandle(targetNodeHandles.value, edge.targetHandle))

const sourcePosition = controlledComputed(sourceHandle, () =>
  sourceHandle.value ? sourceHandle.value.position : Position.Bottom,
)

const targetPosition = controlledComputed(targetHandle, () => (targetHandle.value ? targetHandle.value.position : Position.Top))

const type = computed(() => {
  let edgeType = edge.template ?? getEdgeTypes[name]
  const instance = getCurrentInstance()

  if (typeof edgeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        edgeType = resolveComponent(name, false) as EdgeComponent
      }
    }
  }
  if (typeof edgeType !== 'string') return edgeType

  const slot = slots?.[`edge-${name}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Edge type "${edge.type}" not found and no edge-slot detected. Using fallback type "default".`)
    name = 'default'
    return getEdgeTypes.default
  }

  return slot
})

const getClass = computed(() => {
  const extraClass = edge.class instanceof Function ? edge.class(edge) : edge.class
  return [
    'vue-flow__edge',
    `vue-flow__edge-${name}`,
    noPanClassName,
    {
      selected: edge.selected,
      animated: edge.animated,
      inactive: !props.selectable,
      updating,
    },
    extraClass,
  ]
})

const getStyle = () => (edge.style instanceof Function ? edge.style(edge) : edge.style) as CSSProperties
</script>
<script lang="ts">
export default {
  name: 'Edge',
  inheritAttrs: false,
}
</script>
<template>
  <g
    :class="getClass"
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
      :source-node="props.sourceNode"
      :target-node="props.targetNode"
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
