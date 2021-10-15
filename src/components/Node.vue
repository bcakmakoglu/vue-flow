<script lang="ts" setup>
import { computed, inject, onMounted, provide } from 'vue'
import { DraggableEventListener } from '@braks/revue-draggable'
import { RevueFlowHooks } from '~/hooks/RevueFlowHooks'
import { Node, RevueFlowStore, NodeDimensionUpdate } from '~/types'

interface NodeProps {
  node: Node
  snapToGrid?: boolean
  snapGrid?: [number, number]
  scale?: number
  selectNodesOnDrag: boolean
}

const props = withDefaults(defineProps<NodeProps>(), {
  selectNodesOnDrag: true,
  scale: 1,
})
const emit = defineEmits(['updateNodeDimensions'])

const store = inject<RevueFlowStore>('store')!
const hooks = inject<RevueFlowHooks>('hooks')!
provide('NodeIdContext', props.node.id)

const nodeElement = templateRef<HTMLDivElement>('nodeElement', null)

const selected = computed(() => store.selectedElements?.some(({ id }) => id === props.node.id) || false)
const isDraggable = computed(() => props.node.draggable || (store.nodesDraggable && typeof props.node.draggable === 'undefined'))
const isSelectable = computed(
  () => props.node.selectable || (store.elementsSelectable && typeof props.node.selectable === 'undefined'),
)
const isConnectable = computed(
  () => props.node.connectable || (store.nodesConnectable && typeof props.node.connectable === 'undefined'),
)

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
  if (!isDraggable.value) {
    const n = props.node
    if (isSelectable.value) {
      store.unsetNodesSelection()

      if (!selected.value) {
        store.addSelectedElements([n])
      }
    }

    hooks.nodeClick.trigger({ event, node: n })
  }
}

const onDragStart: DraggableEventListener = ({ event }) => {
  const n = props.node
  hooks.nodeDragStart.trigger({ event, node: n })

  if (props.selectNodesOnDrag && isSelectable.value) {
    store.unsetNodesSelection()

    if (!selected.value) {
      store.addSelectedElements([n])
    }
  } else if (!props.selectNodesOnDrag && !selected.value && isSelectable.value) {
    store.unsetNodesSelection()
    store.addSelectedElements([])
  }
}

const onDrag: DraggableEventListener = ({ event, data }) => {
  const n = props.node
  n.position.x += data.deltaX
  n.position.y += data.deltaY
  hooks.nodeDrag.trigger({ event, node: n })

  store?.updateNodePosDiff({
    id: props.node.id as string,
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
    if (isSelectable.value && !props.selectNodesOnDrag && !selected.value) {
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

  emit('updateNodeDimensions', updates)
})

onMounted(() => {
  emit('updateNodeDimensions', [
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
    :scale="props.scale"
    :disabled="!isDraggable"
    :grid="props.snapGrid"
    :enable-user-select-hack="false"
    @start="onDragStart"
    @move="onDrag"
    @stop="onDragStop"
  >
    <div
      ref="nodeElement"
      :class="[
        'revue-flow__node',
        `revue-flow__node-${props.node.type}`,
        {
          selected: selected,
          selectable: isSelectable,
        },
      ]"
      :style="{
        zIndex: selected ? 10 : 3,
        transform: `translate(${props.node.__rf.position.x}px,${props.node.__rf.position.y}px)`,
        pointerEvents: isSelectable || isDraggable ? 'all' : 'none',
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
      <slot :selected="selected" :isConnectable="isConnectable"></slot>
    </div>
  </DraggableCore>
</template>
