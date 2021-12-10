<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { Draggable, GraphNode, NodeDimensionUpdate, SnapGrid, XYPosition } from '../../types'
import { NodeId } from '../../context'
import { calculateXYZPosition, clampPosition, getDimensions, getHandleBounds, isParentSelected } from '../../utils'

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
const onDragStop: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
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

const updateNodePosition = (node: GraphNode, { x, y }: XYPosition) => {
  const position = {
    x: node.position.x + x,
    y: node.position.y + y,
    z: node.__vf.position.z,
  }

  let extent = store.nodeExtent
  if (node.extent === 'parent' && node.parentNode && node.__vf.width && node.__vf.height) {
    const parent = node.__vf.parentNode
    extent =
      parent.__vf.width && parent.__vf.height
        ? [
            [0, 0],
            [parent.__vf.width - node.__vf.width, parent.__vf.height - node.__vf.height],
          ]
        : extent
  }
  node.position = clampPosition(position, extent)
  if (node.parentNode || node.__vf.isParent) {
    node.__vf.position = calculateXYZPosition(node, { z: position.z, ...node.position })
  } else node.__vf.position = { z: position.z, ...node.position }
}

const updateNodeDimensions = ({ nodeElement, forceUpdate }: NodeDimensionUpdate) => {
  const dimensions = getDimensions(nodeElement)

  const doUpdate =
    dimensions.width &&
    dimensions.height &&
    (node.value.__vf.width !== dimensions.width || node.value.__vf.height !== dimensions.height || forceUpdate)

  if (doUpdate) {
    const handleBounds = getHandleBounds(nodeElement, store.transform[2], store.id)

    node.value.__vf = {
      ...node.value.__vf,
      ...dimensions,
      handleBounds,
    }
  }
}

tryOnMounted(() => {
  watch([() => node.value.__vf.width, () => node.value.__vf.height], () => {
    updateNodeDimensions({
      id: node.value.id,
      nodeElement: nodeElement.value,
      forceUpdate: true,
    })
  })
  useResizeObserver(nodeElement, (entries) =>
    entries.forEach((entry) => {
      updateNodeDimensions({
        id: entry.target.getAttribute('data-id') as string,
        nodeElement: entry.target as HTMLDivElement,
      })
    }),
  )

  watch([() => node.value.type, () => node.value.sourcePosition, () => node.value.targetPosition], () => {
    updateNodeDimensions({
      id: node.value.id,
      nodeElement: nodeElement.value,
      forceUpdate: true,
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
        zIndex: node.dragging || selected ? 1000 : node.__vf.position.z,
        transform: `translate(${node.__vf.position.x}px,${node.__vf.position.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        opacity: node.__vf.width !== null && node.__vf.height !== null ? 1 : 0,
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
          id: node.id,
          data: node.data,
          type: node.type,
          position: node.position,
          __vf: node.__vf,
          selected,
          connectable: props.connectable,
          sourcePosition: node.sourcePosition,
          targetPosition: node.targetPosition,
          dragging: node.dragging,
          isValidTargetPos: node.isValidTargetPos,
          isValidSourcePos: node.isValidSourcePos,
        }"
      >
        <component
          :is="props.component ?? node.type"
          v-bind="{
            id: node.id,
            data: node.data,
            type: node.type,
            position: node.position,
            __vf: node.__vf,
            selected,
            connectable: props.connectable,
            sourcePosition: node.sourcePosition,
            targetPosition: node.targetPosition,
            dragging: node.dragging,
            isValidTargetPos: node.isValidTargetPos,
            isValidSourcePos: node.isValidSourcePos,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
