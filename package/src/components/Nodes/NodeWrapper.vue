<script lang="ts" setup>
import { DraggableEventListener, DraggableCore } from '@braks/revue-draggable'
import { useVueFlow } from '../../composables'
import { GraphNode, NodeComponent, SnapGrid } from '../../types'
import { NodeId, Slots } from '../../context'
import { getXYZPos } from '../../utils'

interface NodeWrapperProps {
  id: string
  node: GraphNode
  draggable: boolean
  selectable: boolean
  connectable: boolean
  snapGrid?: SnapGrid
}

const props = defineProps<NodeWrapperProps>()
const { store } = useVueFlow()
const node = useVModel(props, 'node')
provide(NodeId, props.id)

const nodeElement = templateRef<HTMLDivElement>('node-element', null)

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
      store.nodesSelectionActive = false
      if (!node.value.selected) store.addSelectedNodes([node.value])
    }
    store.hooks.nodeClick.trigger({ event, node: node.value })
  }
}
const onDragStart: DraggableEventListener = ({ event }) => {
  store.addSelectedNodes([])
  store.hooks.nodeDragStart.trigger({ event, node: node.value })

  if (store.selectNodesOnDrag && props.selectable) {
    store.nodesSelectionActive = false

    if (!node.value.selected) store.addSelectedNodes([node.value])
  } else if (!store.selectNodesOnDrag && !node.value.selected && props.selectable) {
    store.nodesSelectionActive = false
    store.addSelectedNodes([])
  }
}
const onDrag: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  nextTick(() => store.updateNodePosition({ id: node.value.id, diff: { x: deltaX, y: deltaY }, dragging: true }))
  store.hooks.nodeDrag.trigger({ event, node: node.value })
}
const onDragStop: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!node.value.dragging) {
    if (props.selectable && !store.selectNodesOnDrag && !node.value.selected) {
      store.addSelectedNodes([node.value])
    }
    store.hooks.nodeClick.trigger({ event, node: node.value })
    return
  }
  store.updateNodePosition({ id: node.value.id, diff: { x: deltaX, y: deltaY }, dragging: false })
  store.hooks.nodeDragStop.trigger({ event, node: node.value })
}

onMounted(() => {
  useResizeObserver(nodeElement, () =>
    store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value, forceUpdate: true }]),
  )

  watch([() => node.value.type, () => node.value.sourcePosition, () => node.value.targetPosition], () =>
    nextTick(() => store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value }])),
  )

  store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value }])
})

const getClass = () => (node.value.class instanceof Function ? node.value.class(node.value) : node.value.class)
const getStyle = () => (node.value.style instanceof Function ? node.value.style(node.value) : node.value.style)

const scale = controlledComputed(
  () => store.transform[2],
  () => store.transform[2],
)
const scaleDebounced = debouncedRef(scale, 5)

watch(
  [() => node.value.position, () => store.getNode(node.value.parentNode!)],
  ([pos, parent]) => {
    const xyzPos = {
      ...pos,
      z: node.value.dragging || node.value.selected ? 1000 : node.value.computedPosition.z,
    }
    if (parent) {
      node.value.computedPosition = getXYZPos(parent, xyzPos)
    } else {
      node.value.computedPosition = xyzPos
    }
  },
  { deep: true },
)

store.updateNodePosition({ id: node.value.id, diff: { x: 0, y: 0 } })

const slots = inject(Slots)

const name = ref(node.value.type ?? 'default')
watch(
  () => node.value.type,
  (v) => v && (name.value = v),
)

const type = computed(() => {
  const instance = getCurrentInstance()
  let nodeType = store.getNodeTypes[name.value]
  if (typeof nodeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name.value)) {
        nodeType = resolveComponent(name.value, false) as NodeComponent
      }
    }
  }
  if (typeof nodeType !== 'string') return nodeType

  const slot = slots?.[`node-${name.value}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Node type "${node.value.type}" not found and no node-slot detected. Using fallback type "default".`)
    name.value = 'default'
    return store.getNodeTypes.default
  }

  return slot
})
</script>
<script lang="ts">
export default {
  name: 'Node',
  inheritAttrs: false,
}
</script>
<template>
  <DraggableCore
    :cancel="`.${store.noDragClassName}`"
    :handle="node.dragHandle"
    :disabled="!props.draggable"
    :scale="scaleDebounced"
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
        getClass(),
      ]"
      :style="{
        zIndex: node.computedPosition.z,
        transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
        pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
        ...getStyle(),
      }"
      :data-id="node.id"
      @mouseenter="onMouseEnterHandler"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseLeaveHandler"
      @contextmenu="onContextMenuHandler"
      @click="onSelectNodeHandler"
      @dblclick="onDoubleClick"
    >
      <component
        :is="type"
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
    </div>
  </DraggableCore>
</template>
