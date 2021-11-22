<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { ElementId, FlowEvents, GraphNode, Position, SnapGrid, VFInternals, XYPosition } from '../../types'
import { NodeId } from '../../context'

interface NodeWrapperProps {
  id: ElementId
  position: XYPosition
  node: GraphNode
  vf: VFInternals
  selectNodesOnDrag?: boolean
  snapGrid?: SnapGrid
  type?: string
  component?: any
  class?: string
  style?: CSSProperties
  data?: any
  targetPosition?: Position
  sourcePosition?: Position
  isHidden?: boolean
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  dragHandle?: string
  scale?: number
}

interface NodeEvents {
  (event: 'mouseEnter', data: FlowEvents['nodeMouseEnter']): void
  (event: 'mouseMove', data: FlowEvents['nodeMouseMove']): void
  (event: 'mouseLeave', data: FlowEvents['nodeMouseLeave']): void
  (event: 'contextMenu', data: FlowEvents['nodeContextMenu']): void
  (event: 'click', data: FlowEvents['nodeClick']): void
  (event: 'dblClick', data: FlowEvents['nodeDoubleClick']): void
  (event: 'dragStart', data: FlowEvents['nodeDragStart']): void
  (event: 'drag', data: FlowEvents['nodeDrag']): void
  (event: 'dragStop', data: FlowEvents['nodeDragStop']): void
}

const props = defineProps<NodeWrapperProps>()
const emit = defineEmits<NodeEvents>()

const store = useStore()
provide(NodeId, props.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const selected = computed(() => props.selectable && store.selectedElements?.some(({ id }) => id === props.id))

const onMouseEnterHandler = () =>
  props.vf.isDragging &&
  ((event: MouseEvent) => {
    const data = { event, node: props.node }
    emit('mouseEnter', data)
    store.hooks.nodeMouseEnter.trigger(data)
  })

const onMouseMoveHandler = () =>
  props.vf.isDragging &&
  ((event: MouseEvent) => {
    const data = { event, node: props.node }
    emit('mouseMove', data)
    store.hooks.nodeMouseMove.trigger(data)
  })

const onMouseLeaveHandler = () =>
  props.vf.isDragging &&
  ((event: MouseEvent) => {
    const data = { event, node: props.node }
    emit('mouseLeave', data)
    store.hooks.nodeMouseLeave.trigger(data)
  })

const onContextMenuHandler = () => (event: MouseEvent) => {
  const data = { event, node: props.node }
  emit('contextMenu', data)
  store.hooks.nodeContextMenu.trigger(data)
}

const onDoubleClick = () => (event: MouseEvent) => {
  const data = { event, node: props.node }
  emit('dblClick', data)
  store.hooks.nodeDoubleClick.trigger({ event, node: props.node })
}

const onSelectNodeHandler = (event: MouseEvent) => {
  const n = props.node
  if (!props.draggable) {
    if (props.selectable) {
      store.unsetNodesSelection()
      if (!selected.value) store.addSelectedElements([n])
    }
    emit('click', { event, node: n })
    store.hooks.nodeClick.trigger({ event, node: n })
  }
}

const onDragStart: DraggableEventListener = ({ event }) => {
  const n = props.node
  emit('dragStart', { event, node: n })
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
  emit('drag', { event, node: n })
  store.hooks.nodeDrag.trigger({ event, node: n })

  store.updateNodePosDiff({
    id: props.id,
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

  emit('dragStop', { event, node: n })
  store.hooks.nodeDragStop.trigger({ event, node: n })
}

onMounted(() => {
  store.updateNodeDimensions({
    id: props.id,
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

  watch([() => props.type, () => props.sourcePosition, () => props.targetPosition], () => {
    nextTick(() => {
      store.updateNodeDimensions({
        id: props.id,
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
    :handle="props.dragHandle"
    :disabled="!draggable"
    :scale="props.scale"
    :grid="props.snapGrid"
    :enable-user-select-hack="false"
    @start="onDragStart"
    @move="onDrag"
    @stop="onDragStop"
  >
    <div
      ref="node-element"
      :class="[
        'vue-flow__node',
        `vue-flow__node-${props.type}`,
        {
          selected,
          selectable: props.selectable,
        },
        props.class,
      ]"
      :style="{
        zIndex: selected ? 10 : 3,
        transform: `translate(${props.vf.position.x}px,${props.vf.position.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        opacity: props.vf.width !== null && props.vf.height !== null ? 1 : 0,
        ...props.style,
      }"
      :data-id="props.id"
      @mouseenter="onMouseEnterHandler"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseLeaveHandler"
      @contextmenu="onContextMenuHandler"
      @click="onSelectNodeHandler"
      @dblclick="onDoubleClick"
    >
      <slot
        v-bind="{
          id: props.id,
          data: props.data,
          type: props.type,
          xPos: props.vf.position.x,
          yPos: props.vf.position.y,
          selected,
          connectable: props.connectable,
          sourcePosition: props.sourcePosition,
          targetPosition: props.targetPosition,
          dragging: props.vf.isDragging,
        }"
      >
        <component
          :is="props.component ?? props.type"
          v-bind="{
            id: props.id,
            data: props.data,
            type: props.type,
            xPos: props.vf.position.x,
            yPos: props.vf.position.y,
            selected,
            connectable: props.connectable,
            sourcePosition: props.sourcePosition,
            targetPosition: props.targetPosition,
            dragging: props.vf.isDragging,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
