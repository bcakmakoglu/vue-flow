<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { Node, SnapGrid } from '../../types'
import { NodeId } from '../../context'

interface NodeProps {
  node: Node
  selectNodesOnDrag?: boolean
  snapGrid?: SnapGrid
}

const props = withDefaults(defineProps<NodeProps>(), {
  selected: false,
  selectNodesOnDrag: true,
})

const store = useStore()
provide(NodeId, props.node.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const nodeType = props.node.type || 'default'
const type = store.getNodeTypes[nodeType] || store.getNodeTypes.default
if (!store.getNodeTypes[nodeType]) {
  console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`)
}

const selectable = computed(() =>
  typeof props.node.selectable === 'undefined' ? store.elementsSelectable : props.node.selectable,
)
const draggable = computed(() => (typeof props.node.draggable === 'undefined' ? store.nodesDraggable : props.node.draggable))
const connectable = computed(() =>
  typeof props.node.connectable === 'undefined' ? store.nodesConnectable : props.node.connectable,
)
const scale = computed(() => store.transform[2])
const selected = computed(() => selectable && store.selectedElements?.some(({ id }) => id === props.node.id))

const onMouseEnterHandler = () =>
  props.node.__rf?.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseEnter.trigger({ event, node: props.node }))

const onMouseMoveHandler = () =>
  props.node.__rf?.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseMove.trigger({ event, node: props.node }))

const onMouseLeaveHandler = () =>
  props.node.__rf?.isDragging && ((event: MouseEvent) => store.hooks.nodeMouseLeave.trigger({ event, node: props.node }))

const onContextMenuHandler = () => (event: MouseEvent) => store.hooks.nodeContextMenu.trigger({ event, node: props.node })

const onSelectNodeHandler = (event: MouseEvent) => {
  if (!draggable.value) {
    const n = props.node
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
    if (selectable.value && !props.selectNodesOnDrag && !selected.value) {
      store.addSelectedElements([n])
    }
    store.hooks.nodeClick.trigger({ event, node: n })

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
    <Suspense>
      <div
        ref="node-element"
        :class="[
          'vue-flow__node',
          `vue-flow__node-${props.node.type}`,
          {
            selected,
            selectable: selectable,
          },
          props.node.class,
        ]"
        :style="{
          zIndex: selected ? 10 : 3,
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
            selected,
            connectable,
            sourcePosition: props.node.sourcePosition,
            targetPosition: props.node.targetPosition,
            dragging: props.node.__rf?.isDragging,
          }"
        >
          <component
            :is="type"
            v-if="typeof type !== 'boolean'"
            v-bind="{
              id: props.node.id,
              data: props.node.data,
              type: props.node.type,
              xPos: props.node.__rf?.position?.x,
              yPos: props.node.__rf?.position?.y,
              selected,
              connectable,
              sourcePosition: props.node.sourcePosition,
              targetPosition: props.node.targetPosition,
              dragging: props.node.__rf?.isDragging,
            }"
          />
        </slot>
      </div>
    </Suspense>
  </DraggableCore>
</template>
