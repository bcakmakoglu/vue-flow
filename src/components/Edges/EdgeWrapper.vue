<script lang="ts" setup>
import { CSSProperties, DefineComponent } from 'vue'
import { useHandle, useStore } from '../../composables'
import { ArrowHeadType, ConnectionMode, Edge, EdgePositions, EdgeTextProps, ElementId, Position } from '../../types'
import { isEdge, getEdgePositions, getHandle, getSourceTargetNodes, isEdgeVisible } from '../../utils'
import EdgeAnchor from './EdgeAnchor.vue'

interface EdgeWrapper {
  id: ElementId
  edge: Edge
  type?: string
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
        component: DefineComponent<EdgeTextProps>
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
}

const props = withDefaults(defineProps<EdgeWrapper>(), {})

const store = useStore()

const type = computed(() => {
  const t = props.type ?? 'default'
  let edge = store.getEdgeTypes[t]
  if (!edge) {
    edge = store.getEdgeTypes.default
    console.warn(`Edge type "${t}" not found. Using fallback type "default".`)
  }
  return edge
})

const updating = ref<boolean>(false)

const onEdgeClick = (event: MouseEvent) => {
  if (store.elementsSelectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([props.edge])
  }
  store.hooks.elementClick.trigger({ event, element: props.edge })
  store.hooks.edgeClick.trigger({ event, edge: props.edge })
}

const onDoubleClick = (event: MouseEvent) => {
  store.hooks.edgeDoubleClick.trigger({ event, edge: props.edge })
}

const onEdgeContextMenu = (event: MouseEvent) =>
  store.hooks.edgeContextMenu.trigger({
    event,
    edge: props.edge,
  })

const onEdgeMouseEnter = (event: MouseEvent) => store.hooks.edgeMouseEnter.trigger({ event, edge: props.edge })

const onEdgeMouseMove = (event: MouseEvent) => store.hooks.edgeMouseMove.trigger({ event, edge: props.edge })

const onEdgeMouseLeave = (event: MouseEvent) => store.hooks.edgeMouseLeave.trigger({ event, edge: props.edge })

const handler = useHandle()
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

const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, true)
}

const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => {
  handleEdgeUpdater(event, false)
}

const onEdgeUpdaterMouseEnter = () => (updating.value = true)

const onEdgeUpdaterMouseOut = () => (updating.value = false)

const isVisible = ({ sourceX, sourceY, targetX, targetY }: EdgePositions) => {
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
    console.warn(`couldn't create edge for source id: ${props.source}; edge id: ${props.id}`)
  }

  if (!n.targetNode) {
    console.warn(`couldn't create edge for target id: ${props.target}; edge id: ${props.id}`)
  }

  return n
})

// when connection type is loose we can define all handles as sources
const targetNodeHandles = computed(() =>
  store.connectionMode === ConnectionMode.Strict
    ? nodes.value.targetNode?.__vf?.handleBounds?.target
    : nodes.value.targetNode?.__vf?.handleBounds?.target ?? nodes.value.targetNode?.__vf?.handleBounds?.source,
)

const sourceHandle = computed(() => {
  if (nodes.value.sourceNode && nodes.value.sourceNode.__vf?.handleBounds?.source)
    return getHandle(nodes.value.sourceNode.__vf.handleBounds.source, props.sourceHandle ?? null)
  else return null
})
const targetHandle = computed(() => {
  if (targetNodeHandles.value) return getHandle(targetNodeHandles.value, props.targetHandle ?? null)
  else return null
})
const sourcePosition = computed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom))
const targetPosition = computed(() => (targetHandle.value ? targetHandle.value.position : Position.Top))

const isSelected = computed(() => store.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.id) ?? false)
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
const elementsSelectable = computed(() => store.elementsSelectable)
</script>
<script lang="ts">
export default {
  name: 'Edge',
}
</script>
<template>
  <g
    v-show="!props.isHidden && isVisible(edgePos)"
    :class="[
      'vue-flow__edge',
      `vue-flow__edge-${props.type || 'default'}`,
      {
        selected: isSelected,
        animated: props.animated,
        inactive: !elementsSelectable,
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
        :is="type"
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
