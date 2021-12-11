<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { GraphNode, SnapGrid, XYPosition } from '../../types'
import { NodeId } from '../../context'
import { calculateXYZPosition, clampPosition, getDimensions, getHandleBounds, isParentSelected } from '../../utils'

interface NodeWrapperProps {
  node: GraphNode
  selectNodesOnDrag?: boolean
  snapGrid?: SnapGrid
  component?: any
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  scale?: number
}

const props = defineProps<NodeWrapperProps>()
const emit = defineEmits(['update:node'])
const node = useVModel(props, 'node', emit)
const store = useStore()
provide(NodeId, props.node.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const selected = computed(() => props.selectable && store.selectedElements?.some(({ id }) => id === node.value.id))

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
      store.unsetNodesSelection()
      if (!selected.value) store.addSelectedElements([node.value])
    }
    store.hooks.elementClick.trigger({ event, element: node.value })
    store.hooks.nodeClick.trigger({ event, node: node.value })
  }
}
const onDragStart: DraggableEventListener = ({ event }) => {
  store.hooks.nodeDragStart.trigger({ event, node: node.value })

  if (props.selectNodesOnDrag && props.selectable) {
    store.unsetNodesSelection()

    if (!selected.value) store.addSelectedElements([node.value])
  } else if (!props.selectNodesOnDrag && !selected.value && props.selectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([])
  }
}
const onDrag: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  updateNodePosition(node.value, { x: deltaX, y: deltaY })
  node.value.dragging = true
  store.hooks.nodeDrag.trigger({ event, node: node.value })
}
const onDragStop: DraggableEventListener = ({ event }) => {
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!node.value.dragging) {
    if (props.selectable && !props.selectNodesOnDrag && !selected.value) {
      store.addSelectedElements([node.value])
    }
    store.hooks.nodeClick.trigger({ event, node: node.value })
    store.hooks.elementClick.trigger({ event, element: node.value })
    return
  }
  node.value.dragging = false
  store.hooks.nodeDragStop.trigger({ event, node: node.value })
}

const updateNodePosition = (node: GraphNode, { x, y }: XYPosition = { x: 0, y: 0 }) => {
  const position = {
    x: node.position.x + x,
    y: node.position.y + y,
    z: node.computedPosition.z,
  }

  let extent = store.nodeExtent
  if (node.extent === 'parent' && node.parentNode && node.dimensions.width && node.dimensions.height) {
    const parent = node.parentNode
    extent =
      parent.dimensions.width && parent.dimensions.height
        ? [
            [0, 0],
            [parent.dimensions.width - node.dimensions.width, parent.dimensions.height - node.dimensions.height],
          ]
        : extent
  }
  node.position = clampPosition(position, extent)
  if (node.parentNode || node.isParent) {
    node.computedPosition = calculateXYZPosition(node, { z: position.z, ...node.position })
  } else node.computedPosition = { ...node.position, z: position.z }
}

updateNodePosition(node.value)
onMounted(() => {
  const dimensions = ref(getDimensions(nodeElement.value))
  useResizeObserver(nodeElement, () => (dimensions.value = getDimensions(nodeElement.value)))
  watch(
    dimensions,
    ({ width: w, height: h }) => {
      if (w > 0 && h > 0) {
        const handleBounds = getHandleBounds(nodeElement.value, store.transform[2], store.id)

        node.value.dimensions = {
          width: w,
          height: h,
        }
        node.value.handleBounds = handleBounds
      }
    },
    { immediate: true },
  )
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
        `vue-flow__node-${node.type}`,
        {
          dragging: node.dragging,
          selected,
          selectable: props.selectable,
        },
        node.class,
      ]"
      :style="{
        zIndex: node.dragging || selected ? 1000 : node.computedPosition.z,
        transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        opacity: node.dimensions.width !== 0 && node.dimensions.height !== 0 ? 1 : 0,
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
          selected,
          connectable: props.connectable,
          sourcePosition: node.sourcePosition,
          targetPosition: node.targetPosition,
          dragging: node.dragging,
          isValidTargetPos: node.isValidTargetPos,
          isValidSourcePos: node.isValidSourcePos,
          label: node.label,
          class: node.class,
          style: node.style,
          hidden: node.hidden,
          id: node.id,
          type: node.type,
          data: node.data,
          dragging: node.dragging,
          handleBounds: node.handleBounds,
          parentNode: node.parentNode,
          isParent: node.isParent,
          computedPosition: node.computedPosition,
          position: node.position,
          draggable: props.draggable,
          selectable: props.selectable,
          children: node.children,
          dimensions: node.dimensions,
        }"
      >
        <component
          :is="props.component ?? node.type"
          v-bind="{
            selected,
            connectable: props.connectable,
            sourcePosition: node.sourcePosition,
            targetPosition: node.targetPosition,
            dragging: node.dragging,
            isValidTargetPos: node.isValidTargetPos,
            isValidSourcePos: node.isValidSourcePos,
            label: node.label,
            class: node.class,
            style: node.style,
            hidden: node.hidden,
            id: node.id,
            type: node.type,
            data: node.data,
            dragging: node.dragging,
            handleBounds: node.handleBounds,
            parentNode: node.parentNode,
            isParent: node.isParent,
            computedPosition: node.computedPosition,
            position: node.position,
            draggable: props.draggable,
            selectable: props.selectable,
            children: node.children,
            dimensions: node.dimensions,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
