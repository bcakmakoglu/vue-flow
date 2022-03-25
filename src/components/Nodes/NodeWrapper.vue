<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useVueFlow } from '../../composables'
import { GraphNode, NodeComponent, SnapGrid } from '../../types'
import { NodeId } from '../../context'
import { getXYZPos } from '../../utils'

interface NodeWrapperProps {
  node: GraphNode
  type: NodeComponent
  draggable: boolean
  selectable: boolean
  connectable: boolean
  snapGrid?: SnapGrid
}

const props = defineProps<NodeWrapperProps>()
const node = useVModel(props, 'node')
const { store } = useVueFlow()
provide(NodeId, props.node.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const scale = controlledComputed(
  () => store.transform[2],
  () => store.transform[2],
)
watch(
  [() => node.value.position, () => node.value.parentNode],
  ([pos, parent]) => {
    const xyzPos = {
      ...pos,
      z: node.value.computedPosition.z,
    }
    if (parent) {
      node.value.computedPosition = getXYZPos(parent, xyzPos)
    } else {
      node.value.computedPosition = xyzPos
    }
  },
  { deep: true },
)

const onMouseEnterHandler = () =>
  node.value.dragging && ((event: MouseEvent) => store.hooks.nodeMouseEnter.trigger({ event, node: node.value }))
const onMouseMoveHandler = () =>
  node.value.dragging && ((event: MouseEvent) => store.hooks.nodeMouseMove.trigger({ event, node: node.value }))
const onMouseLeaveHandler = () =>
  node.value.dragging && ((event: MouseEvent) => store.hooks.nodeMouseLeave.trigger({ event, node: node.value }))
const onContextMenuHandler = () => (event: MouseEvent) =>
  store.hooks.nodeContextMenu.trigger({
    event,
    node: node.value,
  })
const onDoubleClick = () => (event: MouseEvent) => store.hooks.nodeDoubleClick.trigger({ event, node: node.value })
const onSelectNodeHandler = (event: MouseEvent) => {
  if (!props.draggable) {
    if (props.selectable) {
      store.nodesSelectionActive = false
      if (!node.value.selected) store.addSelectedNodes([node.value])
    }
    store.hooks.nodeClick.trigger({ event, node: node.value })
  }
}
const onDragStart: DraggableEventListener = ({ event }) => {
  store.addSelectedNodes([])
  store.hooks.nodeDragStart.trigger({ event, node: node.value })

  if (store.selectNodesOnDrag && props.selectable) {
    store.nodesSelectionActive = false

    if (!node.value.selected) store.addSelectedNodes([node.value])
  } else if (!store.selectNodesOnDrag && !node.value.selected && props.selectable) {
    store.nodesSelectionActive = false
    store.addSelectedNodes([])
  }
}
const onDrag: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  nextTick(() => store.updateNodePosition({ id: node.value.id, diff: { x: deltaX, y: deltaY }, dragging: true }))
  store.hooks.nodeDrag.trigger({ event, node: node.value })
}
const onDragStop: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!node.value.dragging) {
    if (props.selectable && !store.selectNodesOnDrag && !node.value.selected) {
      store.addSelectedNodes([node.value])
    }
    store.hooks.nodeClick.trigger({ event, node: node.value })
    return
  }
  store.updateNodePosition({ id: node.value.id, diff: { x: deltaX, y: deltaY }, dragging: false })
  store.hooks.nodeDragStop.trigger({ event, node: node.value })
}

store.updateNodePosition({ id: node.value.id, diff: { x: 0, y: 0 } })
onMounted(() => {
  useResizeObserver(nodeElement, () => store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value, forceUpdate: true }]))
  watch([() => node.value.type, () => node.value.sourcePosition, () => node.value.targetPosition], () =>
    nextTick(() => store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value }])),
  )
  store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value }])
})
</script>
<script lang="ts">
export default {
  name: 'Node',
}
</script>
<template>
  <DraggableCore
    cancel=".nodrag"
    :handle="node.dragHandle"
    :disabled="!props.draggable"
    :scale="scale"
    :grid="props.snapGrid"
    :enable-user-select-hack="false"
    @start="onDragStart"
    @move="onDrag"
    @stop="onDragStop"
  >
    <div
      ref="node-element"
      :key="`node-${node.id}`"
      :class="[
        'vue-flow__node',
        `vue-flow__node-${node.type}`,
        {
          dragging: node.dragging,
          selected: node.selected,
          selectable: props.selectable,
        },
        node.class,
      ]"
      :style="{
        zIndex: node.dragging || node.selected ? 1000 : node.computedPosition.z,
        transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        ...node.style,
      }"
      :data-id="node.id"
      @mouseenter="onMouseEnterHandler"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseLeaveHandler"
      @contextmenu="onContextMenuHandler"
      @click="onSelectNodeHandler"
      @dblclick="onDoubleClick"
    >
      <slot
        v-bind="{
             nodeElement,
             id: node.id,
             type: node.type,
             data: node.data,
             selected: !!node.selected,
             isConnectable: props.connectable,
             position: node.position,
             computedPosition: node.computedPosition,
             isValidTargetPos: node.isValidTargetPos,
             isValidSourcePos: node.isValidSourcePos,
             parentNode: node.parentNode ? node.parentNode.id : undefined,
             dragging: !!node.dragging,
             zIndex: node.dragging || node.selected ? 1000 : node.computedPosition.z,
             targetPosition: node.targetPosition,
             sourcePosition: node.sourcePosition,
             label: node.label,
             dragHandle: node.dragHandle,
        }"
      >
        <component
          :is="props.type ?? node.type"
          v-bind="{
             nodeElement,
             id: node.id,
             type: node.type,
             data: node.data,
             selected: !!node.selected,
             connectable: props.connectable,
             position: node.position,
             computedPosition: node.computedPosition,
             isValidTargetPos: node.isValidTargetPos,
             isValidSourcePos: node.isValidSourcePos,
             parentNode: node.parentNode ? node.parentNode.id : undefined,
             dragging: !!node.dragging,
             zIndex: node.dragging || node.selected ? 1000 : node.computedPosition.z,
             targetPosition: node.targetPosition,
             sourcePosition: node.sourcePosition,
             label: node.label,
             dragHandle: node.dragHandle,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
