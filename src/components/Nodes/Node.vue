<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { Node, NodeType, SnapGrid } from '~/types'
import { NodeIdContextKey } from '~/context'
import { useHooks, useStore } from '~/composables'

interface NodeProps {
  node: Node
  type: NodeType
  selected?: boolean
  selectNodesOnDrag?: boolean
  snapGrid?: SnapGrid
}

const props = withDefaults(defineProps<NodeProps>(), {
  selected: false,
  selectNodesOnDrag: true,
})

const store = useStore()
const hooks = useHooks()
provide(NodeIdContextKey, props.node.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const selectable = computed(() => props.node.selectable ?? store.elementsSelectable)
const draggable = computed(() => props.node.draggable ?? store.nodesDraggable)
const connectable = computed(() => props.node.connectable ?? store.nodesConnectable)
const scale = computed(() => store.transform[2])

const onMouseEnterHandler = () =>
  props.node.__rf?.isDragging && ((event: MouseEvent) => hooks.nodeMouseEnter.trigger({ event, node: props.node }))

const onMouseMoveHandler = () =>
  props.node.__rf?.isDragging && ((event: MouseEvent) => hooks.nodeMouseMove.trigger({ event, node: props.node }))

const onMouseLeaveHandler = () =>
  props.node.__rf?.isDragging && ((event: MouseEvent) => hooks.nodeMouseLeave.trigger({ event, node: props.node }))

const onContextMenuHandler = () => (event: MouseEvent) => hooks.nodeContextMenu.trigger({ event, node: props.node })

const onSelectNodeHandler = (event: MouseEvent) => {
  if (!draggable) {
    const n = props.node
    if (selectable.value) {
      store.unsetNodesSelection()

      if (!props.selected) store.addSelectedElements([n])
    }
    hooks.nodeClick.trigger({ event, node: n })
  }
}

const onDragStart: DraggableEventListener = ({ event }) => {
  const n = props.node
  hooks.nodeDragStart.trigger({ event, node: n })

  if (props.selectNodesOnDrag && selectable) {
    store.unsetNodesSelection()

    if (!props.selected) store.addSelectedElements([n])
  } else if (!props.selectNodesOnDrag && !props.selected && selectable) {
    store.unsetNodesSelection()
    store.addSelectedElements([])
  }
}

const onDrag: DraggableEventListener = ({ event, data }) => {
  const n = props.node
  n.position.x += data.deltaX
  n.position.y += data.deltaY
  hooks.nodeDrag.trigger({ event, node: n })

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
  if (!props.node.__rf?.isDragging) {
    if (selectable && !props.selectNodesOnDrag && !props.selected) {
      store.addSelectedElements([n])
    }
    hooks.nodeClick.trigger({ event, node: n })

    return
  }

  store.updateNodePosDiff({
    id: n.id,
    isDragging: false,
  })

  hooks.nodeDragStop.trigger({ event, node: n })
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

<template>
  <DraggableCore
    cancel=".nodrag"
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
        `vue-flow__node-${props.node.type}`,
        {
          selected: props.selected,
          selectable: selectable,
        },
        props.node.class,
      ]"
      :style="{
        zIndex: props.selected ? 10 : 3,
        transform: `translate(${props.node.__rf?.position?.x}px,${props.node.__rf?.position?.y}px)`,
        pointerEvents: selectable || draggable ? 'all' : 'none',
        opacity: props.node.__rf?.width !== null && props.node.__rf?.height !== null ? 1 : 0,
        ...props.node.style,
      }"
      :data-id="props.node.id"
      @mouseenter="onMouseEnterHandler"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseLeaveHandler"
      @contextmenu="onContextMenuHandler"
      @click="onSelectNodeHandler"
    >
      <slot
        v-bind="{
          id: props.node.id,
          data: props.node.data,
          type: props.node.type,
          xPos: props.node.__rf?.position?.x,
          yPos: props.node.__rf?.position?.y,
          selected: props.selected,
          connectable,
          sourcePosition: props.node.sourcePosition,
          targetPosition: props.node.targetPosition,
          dragging: props.node.__rf?.isDragging,
        }"
      >
        <component
          :is="props.type"
          v-bind="{
            id: props.node.id,
            data: props.node.data,
            type: props.node.type,
            xPos: props.node.__rf?.position?.x,
            yPos: props.node.__rf?.position?.y,
            selected: props.selected,
            connectable,
            sourcePosition: props.node.sourcePosition,
            targetPosition: props.node.targetPosition,
            dragging: props.node.__rf?.isDragging,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
