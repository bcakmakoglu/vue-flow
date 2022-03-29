<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useVueFlow } from '../../composables'
import { NodeComponent, SnapGrid } from '../../types'
import { NodeId } from '../../context'
import { getXYZPos } from '../../utils'

interface NodeWrapperProps {
  id: string
  draggable: boolean
  selectable: boolean
  connectable: boolean
  snapGrid?: SnapGrid
}

const props = defineProps<NodeWrapperProps>()
const { store } = useVueFlow()
const node = store.getNode(props.id)
if (!node) throw new Error(`Node with ${props.id} not found!`)
provide(NodeId, props.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

const onMouseEnterHandler = () => node.dragging && ((event: MouseEvent) => store.hooks.nodeMouseEnter.trigger({ event, node }))
const onMouseMoveHandler = () => node.dragging && ((event: MouseEvent) => store.hooks.nodeMouseMove.trigger({ event, node }))
const onMouseLeaveHandler = () => node.dragging && ((event: MouseEvent) => store.hooks.nodeMouseLeave.trigger({ event, node }))
const onContextMenuHandler = () => (event: MouseEvent) =>
  store.hooks.nodeContextMenu.trigger({
    event,
    node,
  })
const onDoubleClick = () => (event: MouseEvent) => store.hooks.nodeDoubleClick.trigger({ event, node })
const onSelectNodeHandler = (event: MouseEvent) => {
  if (!props.draggable) {
    if (props.selectable) {
      store.nodesSelectionActive = false
      if (!node.selected) store.addSelectedNodes([node])
    }
    store.hooks.nodeClick.trigger({ event, node })
  }
}
const onDragStart: DraggableEventListener = ({ event }) => {
  store.addSelectedNodes([])
  store.hooks.nodeDragStart.trigger({ event, node })

  if (store.selectNodesOnDrag && props.selectable) {
    store.nodesSelectionActive = false

    if (!node.selected) store.addSelectedNodes([node])
  } else if (!store.selectNodesOnDrag && !node.selected && props.selectable) {
    store.nodesSelectionActive = false
    store.addSelectedNodes([])
  }
}
const onDrag: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  nextTick(() => store.updateNodePosition({ id: node.id, diff: { x: deltaX, y: deltaY }, dragging: true }))
  store.hooks.nodeDrag.trigger({ event, node })
}
const onDragStop: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!node.dragging) {
    if (props.selectable && !store.selectNodesOnDrag && !node.selected) {
      store.addSelectedNodes([node])
    }
    store.hooks.nodeClick.trigger({ event, node })
    return
  }
  store.updateNodePosition({ id: node.id, diff: { x: deltaX, y: deltaY }, dragging: false })
  store.hooks.nodeDragStop.trigger({ event, node })
}

onMounted(() => {
  useResizeObserver(nodeElement, () =>
    store.updateNodeDimensions([{ id: node.id, nodeElement: nodeElement.value, forceUpdate: true }]),
  )

  watch([() => node.type, () => node.sourcePosition, () => node.targetPosition], () =>
    nextTick(() => store.updateNodeDimensions([{ id: node.id, nodeElement: nodeElement.value }])),
  )

  store.updateNodeDimensions([{ id: node.id, nodeElement: nodeElement.value }])
})

const scale = controlledComputed(
  () => store.transform[2],
  () => store.transform[2],
)

watch(
  [() => node.position, () => store.getNode(node.parentNode!)],
  ([pos, parent]) => {
    const xyzPos = {
      ...pos,
      z: node.dragging || node.selected ? 1000 : node.computedPosition.z,
    }
    if (parent) {
      node.computedPosition = getXYZPos(parent, xyzPos)
    } else {
      node.computedPosition = xyzPos
    }
  },
  { deep: true },
)

store.updateNodePosition({ id: node.id, diff: { x: 0, y: 0 } })

const name = ref(node.type ?? 'default')
const type = computed(() => {
  let nodeType = store.getNodeTypes[name.value]
  if (typeof nodeType === 'string') nodeType = resolveComponent(name.value, false) as NodeComponent
  if (typeof nodeType !== 'string') return nodeType

  const slot = useSlots()?.[name.value]?.({})
  if (!slot || !slot[0].key?.toString().includes(name.value)) {
    console.warn(`Node type "${node.type}" not found and no slot detected. Using fallback type "default".`)
    name.value = 'default'
    return store.getNodeTypes.default
  }
})
</script>
<script lang="ts">
export default {
  name: 'Node',
}
</script>
<template>
  <DraggableCore
    :cancel="`.${store.noDragClassName}`"
    :handle="node.dragHandle"
    :disabled="!props.draggable"
    :scale="scale"
    :grid="props.snapGrid"
    :enable-user-select-hack="false"
    @start="onDragStart"
    @move="onDrag"
    @stop="onDragStop"
  >
    <div
      ref="node-element"
      :key="`node-${node.id}`"
      :class="[
        'vue-flow__node',
        `vue-flow__node-${name}`,
        store.noPanClassName,
        {
          dragging: node.dragging,
          selected: node.selected,
          selectable: props.selectable,
        },
        node.class,
      ]"
      :style="{
        zIndex: node.computedPosition.z,
        transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
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
          nodeElement,
          id: node.id,
          type: node.type,
          data: node.data,
          selected: !!node.selected,
          isConnectable: props.connectable,
          position: node.position,
          computedPosition: node.computedPosition,
          dimensions: node.dimensions,
          isValidTargetPos: node.isValidTargetPos,
          isValidSourcePos: node.isValidSourcePos,
          parentNode: node.parentNode,
          dragging: !!node.dragging,
          zIndex: node.dragging || node.selected ? 1000 : node.computedPosition.z,
          targetPosition: node.targetPosition,
          sourcePosition: node.sourcePosition,
          label: node.label,
          dragHandle: node.dragHandle,
        }"
      >
        <component
          :is="type"
          v-if="type"
          v-bind="{
            nodeElement,
            id: node.id,
            type: node.type,
            data: node.data,
            selected: !!node.selected,
            connectable: props.connectable,
            position: node.position,
            computedPosition: node.computedPosition,
            dimensions: node.dimensions,
            isValidTargetPos: node.isValidTargetPos,
            isValidSourcePos: node.isValidSourcePos,
            parentNode: node.parentNode,
            dragging: !!node.dragging,
            zIndex: node.dragging || node.selected ? 1000 : node.computedPosition.z,
            targetPosition: node.targetPosition,
            sourcePosition: node.sourcePosition,
            label: node.label,
            dragHandle: node.dragHandle,
          }"
        />
      </slot>
    </div>
  </DraggableCore>
</template>
