<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { GraphNode, SnapGrid, VFInternals, Draggable } from '../../types'
import { NodeId } from '../../context'

interface NodeWrapperProps {
  node: GraphNode
  vf: VFInternals
  selectNodesOnDrag?: boolean
  snapGrid?: SnapGrid
  component?: any
  draggable?: Draggable
  selectable?: boolean
  connectable?: boolean
  scale?: number
}

const props = defineProps<NodeWrapperProps>()

const store = useStore()
provide(NodeId, props.node.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const selected = computed(() => props.selectable && store.selectedElements?.some(({ id }) => id === props.node.id))

const onMouseEnterHandler = () =>
  props.vf.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseEnter.trigger({ event, node: props.node }))
const onMouseMoveHandler = () =>
  props.vf.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseMove.trigger({ event, node: props.node }))
const onMouseLeaveHandler = () =>
  props.vf.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseLeave.trigger({ event, node: props.node }))
const onContextMenuHandler = () => (event: MouseEvent) => store.hooks.nodeContextMenu.trigger({ event, node: props.node })
const onDoubleClick = () => (event: MouseEvent) => store.hooks.nodeDoubleClick.trigger({ event, node: props.node })
const onSelectNodeHandler = (event: MouseEvent) => {
  const n = props.node
  if (!props.draggable) {
    if (props.selectable) {
      store.unsetNodesSelection()
      if (!selected.value) store.addSelectedElements([n])
    }
    store.hooks.elementClick.trigger({ event, element: n })
    store.hooks.nodeClick.trigger({ event, node: n })
  }
}
const onDragStart: DraggableEventListener = ({ event }) => {
  const n = props.node
  store.hooks.nodeDragStart.trigger({ event, node: n })

  if (props.selectNodesOnDrag && props.selectable) {
    store.unsetNodesSelection()

    if (!selected.value) store.addSelectedElements([n])
  } else if (!props.selectNodesOnDrag && !selected.value && props.selectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([])
  }
}
const onDrag: DraggableEventListener = ({ event, data }) => {
  const n = props.node
  n.position.x += data.deltaX
  n.position.y += data.deltaY
  store.hooks.nodeDrag.trigger({ event, node: n })

  store.updateNodePosDiff({
    id: props.node.id,
    diff: {
      x: data.deltaX,
      y: data.deltaY,
    },
    isDragging: true,
  })
}
const onDragStop: DraggableEventListener = ({ event }) => {
  const n = props.node
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!props.vf.isDragging) {
    if (props.selectable && !props.selectNodesOnDrag && !selected.value) {
      store.addSelectedElements([n])
    }
    store.hooks.nodeClick.trigger({ event, node: n })
    store.hooks.elementClick.trigger({ event, element: n })
    return
  }
  store.updateNodePosDiff({
    id: n.id,
    isDragging: false,
  })
  store.hooks.nodeDragStop.trigger({ event, node: n })
}

onMounted(() => {
  store.updateNodeDimensions({
    id: props.node.id,
    nodeElement: nodeElement.value,
    forceUpdate: true,
  })

  useResizeObserver(nodeElement, (entries) =>
    entries.forEach((entry) => {
      store.updateNodeDimensions({
        id: entry.target.getAttribute('data-id') as string,
        nodeElement: entry.target as HTMLDivElement,
      })
    }),
  )

  watch([() => props.node.type, () => props.node.sourcePosition, () => props.node.targetPosition], () => {
    nextTick(() => {
      store.updateNodeDimensions({
        id: props.node.id,
        nodeElement: nodeElement.value,
        forceUpdate: true,
      })
    })
  })
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
    :handle="props.node.dragHandle"
    :disabled="!props.draggable"
    :scale="props.scale"
    :grid="props.snapGrid"
    :enable-user-select-hack="false"
    v-bind="props.draggable"
    @start="onDragStart"
    @move="onDrag"
    @stop="onDragStop"
  >
    <div
      ref="node-element"
      :class="[
        'vue-flow__node',
        `vue-flow__node-${props.node.type}`,
        {
          selected,
          selectable: props.selectable,
        },
        props.node.class,
      ]"
      :style="{
        zIndex: selected ? 10 : 3,
        transform: `translate(${props.vf.position.x}px,${props.vf.position.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        opacity: props.vf.width !== null && props.vf.height !== null ? 1 : 0,
        ...props.node.style,
      }"
      :data-id="props.node.id"
      @mouseenter="onMouseEnterHandler"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseLeaveHandler"
      @contextmenu="onContextMenuHandler"
      @click="onSelectNodeHandler"
      @dblclick="onDoubleClick"
    >
      <slot
        v-bind="{
          id: props.node.id,
          data: props.node.data,
          type: props.node.type,
          xPos: props.vf.position.x,
          yPos: props.vf.position.y,
          selected,
          connectable: props.connectable,
          sourcePosition: props.node.sourcePosition,
          targetPosition: props.node.targetPosition,
          dragging: props.vf.isDragging,
        }"
      >
        <component
          :is="props.component ?? props.node.type"
          v-bind="{
            id: props.node.id,
            data: props.node.data,
            type: props.node.type,
            xPos: props.vf.position.x,
            yPos: props.vf.position.y,
            selected,
            connectable: props.connectable,
            sourcePosition: props.node.sourcePosition,
            targetPosition: props.node.targetPosition,
            dragging: props.vf.isDragging,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
