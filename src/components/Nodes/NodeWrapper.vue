<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { GraphNode, SnapGrid, Draggable, NodeDimensionUpdate } from '../../types'
import { NodeId } from '../../context'
import { getDimensions, getHandleBounds } from '~/utils'

interface NodeWrapperProps {
  node: GraphNode
  selectNodesOnDrag?: boolean
  snapGrid?: SnapGrid
  component?: any
  draggable?: Draggable
  selectable?: boolean
  connectable?: boolean
  scale?: number
}

const props = defineProps<NodeWrapperProps>()
const emit = defineEmits(['update:modelValue'])
const node = useVModel(props, 'node', emit)
const store = useStore()
provide(NodeId, props.node.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const selected = computed(() => props.selectable && store.selectedElements?.some(({ id }) => id === props.node.id))

const onMouseEnterHandler = () =>
  props.node.__vf.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseEnter.trigger({ event, node: props.node }))
const onMouseMoveHandler = () =>
  props.node.__vf.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseMove.trigger({ event, node: props.node }))
const onMouseLeaveHandler = () =>
  props.node.__vf.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseLeave.trigger({ event, node: props.node }))
const onContextMenuHandler = () => (event: MouseEvent) => store.hooks.nodeContextMenu.trigger({ event, node: props.node })
const onDoubleClick = () => (event: MouseEvent) => store.hooks.nodeDoubleClick.trigger({ event, node: props.node })
const onSelectNodeHandler = (event: MouseEvent) => {
  if (!props.draggable) {
    if (props.selectable) {
      store.unsetNodesSelection()
      if (!selected.value) store.addSelectedElements([props.node])
    }
    store.hooks.elementClick.trigger({ event, element: props.node })
    store.hooks.nodeClick.trigger({ event, node: props.node })
  }
}
const onDragStart: DraggableEventListener = ({ event }) => {
  store.hooks.nodeDragStart.trigger({ event, node: props.node })

  if (props.selectNodesOnDrag && props.selectable) {
    store.unsetNodesSelection()

    if (!selected.value) store.addSelectedElements([props.node])
  } else if (!props.selectNodesOnDrag && !selected.value && props.selectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([])
  }
}
const onDrag: DraggableEventListener = ({ event, data }) => {
  node.value.position.x += data.deltaX
  node.value.position.y += data.deltaY
  node.value.__vf.isDragging = true
  store.hooks.nodeDrag.trigger({ event, node: props.node })
}
const onDragStop: DraggableEventListener = ({ event }) => {
  const n = props.node
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!props.node.__vf.isDragging) {
    if (props.selectable && !props.selectNodesOnDrag && !selected.value) {
      store.addSelectedElements([n])
    }
    store.hooks.nodeClick.trigger({ event, node: n })
    store.hooks.elementClick.trigger({ event, element: n })
    return
  }
  node.value.__vf.isDragging = false
  store.hooks.nodeDragStop.trigger({ event, node: n })
}

const updateNodeDimensions = ({ nodeElement, forceUpdate }: NodeDimensionUpdate) => {
  const dimensions = getDimensions(nodeElement)

  const doUpdate =
    dimensions.width &&
    dimensions.height &&
    (props.node.__vf.width !== dimensions.width || props.node.__vf.height !== dimensions.height || forceUpdate)

  if (doUpdate) {
    const handleBounds = getHandleBounds(nodeElement, store.transform[2])

    node.value.__vf = {
      ...node.value.__vf,
      ...dimensions,
      handleBounds,
    }
  }
}

onMounted(() => {
  updateNodeDimensions({
    id: props.node.id,
    nodeElement: nodeElement.value,
    forceUpdate: true,
  })

  useResizeObserver(nodeElement, (entries) =>
    entries.forEach((entry) => {
      updateNodeDimensions({
        id: entry.target.getAttribute('data-id') as string,
        nodeElement: entry.target as HTMLDivElement,
      })
    }),
  )

  watch([() => props.node.type, () => props.node.sourcePosition, () => props.node.targetPosition], () => {
    nextTick(() => {
      updateNodeDimensions({
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
        transform: `translate(${props.node.position.x}px,${props.node.position.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        opacity: props.node.__vf.width !== null && props.node.__vf.height !== null ? 1 : 0,
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
          xPos: props.node.position.x,
          yPos: props.node.position.y,
          selected,
          connectable: props.connectable,
          sourcePosition: props.node.sourcePosition,
          targetPosition: props.node.targetPosition,
          dragging: props.node.__vf.isDragging,
        }"
      >
        <component
          :is="props.component ?? props.node.type"
          v-bind="{
            id: props.node.id,
            data: props.node.data,
            type: props.node.type,
            xPos: props.node.position.x,
            yPos: props.node.position.y,
            selected,
            connectable: props.connectable,
            sourcePosition: props.node.sourcePosition,
            targetPosition: props.node.targetPosition,
            dragging: props.node.__vf.isDragging,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
