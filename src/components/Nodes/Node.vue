<script lang="ts" setup>
import { DraggableEventListener } from '@braks/revue-draggable'
import { Node, NodeDimensionUpdate, NodeType } from '~/types'
import { Hooks, Store } from '~/context/symbols'

interface NodeProps {
  node: Node
  type: NodeType
  selected?: boolean
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  selectNodesOnDrag?: boolean
}

const props = withDefaults(defineProps<NodeProps>(), {
  selected: false,
  draggable: true,
  selectable: true,
  connectable: true,
  selectNodesOnDrag: true,
})

const store = inject(Store)!
const hooks = inject(Hooks)!
provide('NodeIdContext', props.node.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const onMouseEnterHandler = () => {
  if (props.node.__rf.isDragging) {
    return
  }

  return (event: MouseEvent) => hooks.nodeMouseEnter.trigger({ event, node: props.node })
}

const onMouseMoveHandler = () => {
  if (props.node.__rf.isDragging) {
    return
  }

  return (event: MouseEvent) => hooks.nodeMouseMove.trigger({ event, node: props.node })
}

const onMouseLeaveHandler = () => {
  if (props.node.__rf.isDragging) {
    return
  }

  return (event: MouseEvent) => hooks.nodeMouseLeave.trigger({ event, node: props.node })
}

const onContextMenuHandler = () => {
  return (event: MouseEvent) => hooks.nodeContextMenu.trigger({ event, node: props.node })
}

const onSelectNodeHandler = (event: MouseEvent) => {
  if (!props.draggable) {
    const n = props.node
    if (props.selectable) {
      store.unsetNodesSelection()

      if (!props.selected) {
        store.addSelectedElements([n])
      }
    }

    hooks.nodeClick.trigger({ event, node: n })
  }
}

const onDragStart: DraggableEventListener = ({ event }) => {
  const n = props.node
  hooks.nodeDragStart.trigger({ event, node: n })

  if (props.selectNodesOnDrag && props.selectable) {
    store.unsetNodesSelection()

    if (!props.selected) {
      store.addSelectedElements([n])
    }
  } else if (!props.selectNodesOnDrag && !props.selected && props.selectable) {
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
  if (!props.node.__rf.isDragging) {
    if (props.selectable && !props.selectNodesOnDrag && !props.selected) {
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

useResizeObserver(nodeElement, (entries) => {
  const updates: NodeDimensionUpdate[] = entries.map((entry) => ({
    id: entry.target.getAttribute('data-id') as string,
    nodeElement: entry.target as HTMLDivElement,
  }))
  store.updateNodeDimensions(updates)
})

onMounted(() => {
  store.updateNodeDimensions([
    {
      id: props.node.id,
      nodeElement: nodeElement.value,
      forceUpdate: true,
    },
  ])
})
</script>

<template>
  <DraggableCore
    v-if="!props.node.isHidden"
    cancel=".nodrag"
    :disabled="!props.draggable"
    :scale="store.transform[2]"
    :grid="store.snapToGrid ? store.snapGrid : undefined"
    :enable-user-select-hack="false"
    @start="onDragStart"
    @move="onDrag"
    @stop="onDragStop"
  >
    <div
      ref="node-element"
      :class="[
        'revue-flow__node',
        `revue-flow__node-${props.node.type}`,
        {
          selected: props.selected,
          selectable: props.selectable,
        },
      ]"
      :style="{
        zIndex: props.selected ? 10 : 3,
        transform: `translate(${props.node.__rf.position.x}px,${props.node.__rf.position.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        opacity: props.node.__rf.width !== null && props.node.__rf.height !== null ? 1 : 0,
        ...props.node.style,
      }"
      :data-id="props.node.id"
      @mouseenter="onMouseEnterHandler"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseLeaveHandler"
      @contextmenu="onContextMenuHandler"
      @click="onSelectNodeHandler"
    >
      <component
        :is="props.type"
        v-bind="{
          data: props.node.data,
          type: props.node.type,
          xPos: props.node.__rf.position.x,
          yPos: props.node.__rf.position.y,
          selected: props.selected,
          connectable: props.connectable,
          sourcePosition: props.node.sourcePosition,
          targetPosition: props.node.targetPosition,
          dragging: props.node.__rf.isDragging,
        }"
      />
    </div>
  </DraggableCore>
</template>
