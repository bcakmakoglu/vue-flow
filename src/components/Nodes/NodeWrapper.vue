<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { CSSProperties } from 'vue'
import { useStore } from '../../composables'
import { ElementId, FlowEvents, GraphNode, Position, SnapGrid, VFInternals, XYPosition } from '../../types'
import { NodeId } from '../../context'

interface NodeWrapperProps {
  node: GraphNode
  vf: VFInternals
  selectNodesOnDrag?: boolean
  snapGrid?: SnapGrid
  id: ElementId
  position: XYPosition
  type?: string
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
}

interface NodeEvents {
  (event: 'mouseEnter', data: FlowEvents['nodeMouseEnter']): void
  (event: 'mouseMove', data: FlowEvents['nodeMouseMove']): void
  (event: 'mouseLeave', data: FlowEvents['nodeMouseLeave']): void
  (event: 'contextMenu', data: FlowEvents['nodeContextMenu']): void
  (event: 'click', data: FlowEvents['nodeClick']): void
  (event: 'click', data: FlowEvents['nodeClick']): void
}

const props = withDefaults(defineProps<NodeWrapperProps>(), {
  selected: false,
  selectNodesOnDrag: true,
})

const store = useStore()
provide(NodeId, props.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const type = computed(() => {
  const t = props.type ?? 'default'
  let node = store.getNodeTypes[t]
  if (!node) {
    node = store.getNodeTypes.default
    console.warn(`Node type "${t}" not found. Using fallback type "default".`)
  }
  return node
})

const selectable = computed(() => (typeof props.selectable === 'undefined' ? store.elementsSelectable : props.selectable))
const draggable = computed(() => (typeof props.draggable === 'undefined' ? store.nodesDraggable : props.draggable))
const connectable = computed(() => (typeof props.connectable === 'undefined' ? store.nodesConnectable : props.connectable))
const scale = computed(() => store.transform[2])
const selected = computed(() => selectable.value && store.selectedElements?.some(({ id }) => id === props.id))

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
  if (!draggable.value) {
    if (selectable.value) {
      store.unsetNodesSelection()
      if (!selected.value) store.addSelectedElements([n])
    }
    store.hooks.nodeClick.trigger({ event, node: n })
  }
}

const onDragStart: DraggableEventListener = ({ event }) => {
  const n = props.node
  store.hooks.nodeDragStart.trigger({ event, node: n })

  if (props.selectNodesOnDrag && selectable) {
    store.unsetNodesSelection()

    if (!selected.value) store.addSelectedElements([n])
  } else if (!props.selectNodesOnDrag && !selected.value && selectable.value) {
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
    if (selectable.value && !props.selectNodesOnDrag && !selected.value) {
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
    :scale="scale"
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
          selectable: selectable,
        },
        props.class,
      ]"
      :style="{
        zIndex: selected ? 10 : 3,
        transform: `translate(${props.vf.position.x}px,${props.vf.position.y}px)`,
        pointerEvents: selectable || draggable ? 'all' : 'none',
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
          connectable,
          sourcePosition: props.sourcePosition,
          targetPosition: props.targetPosition,
          dragging: props.vf.isDragging,
        }"
      >
        <component
          :is="type"
          v-bind="{
            id: props.id,
            data: props.data,
            type: props.type,
            xPos: props.vf.position.x,
            yPos: props.vf.position.y,
            selected,
            connectable,
            sourcePosition: props.sourcePosition,
            targetPosition: props.targetPosition,
            dragging: props.vf.isDragging,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
