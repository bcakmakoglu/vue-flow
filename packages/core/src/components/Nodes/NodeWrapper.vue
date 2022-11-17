<script lang="ts" setup>
import { isNumber } from '@vueuse/core'
import type { GraphNode, HandleConnectable, NodeComponent, SnapGrid, XYZPosition } from '../../types'

const { id, type, name, draggable, selectable, connectable, ...props } = defineProps<{
  id: string
  draggable: boolean
  selectable: boolean
  connectable: HandleConnectable
  snapGrid?: SnapGrid
  type: NodeComponent | Function | Object | false
  name: string
  node: GraphNode
  resizeObserver: ResizeObserver
}>()

provide(NodeId, id)

const {
  edges,
  noPanClassName,
  selectNodesOnDrag,
  nodesSelectionActive,
  multiSelectionActive,
  emits,
  getNode,
  removeSelectedElements,
  addSelectedNodes,
  updateNodeDimensions,
  onUpdateNodeInternals,
  getIntersectingNodes,
  getNodeTypes,
  nodeExtent,
  onNodesInitialized,
} = $(useVueFlow())

const node = $(useVModel(props, 'node'))

const parentNode = $computed(() => (node.parentNode ? getNode(node.parentNode) : undefined))

const connectedEdges = $computed(() => getConnectedEdges([node], edges))

const nodeElement = ref()

const initialized = ref(false)

provide(NodeRef, nodeElement)

const { emit, on } = useNodeHooks(node, emits)

const dragging = useDrag({
  id,
  el: nodeElement,
  disabled: computed(() => !draggable),
  onStart(event, node, nodes) {
    emit.dragStart({ event, node, nodes, intersections: getIntersectingNodes(node) })
  },
  onDrag(event, node, nodes) {
    emit.drag({ event, node, nodes, intersections: getIntersectingNodes(node) })
  },
  onStop(event, node, nodes) {
    emit.dragStop({ event, node, nodes, intersections: getIntersectingNodes(node) })
  },
})

const getClass = computed(() => (node.class instanceof Function ? node.class(node) : node.class))

const getStyle = computed(() => {
  const styles = (node.style instanceof Function ? node.style(node) : node.style) || {}

  const width = node.width instanceof Function ? node.width(node) : node.width
  const height = node.height instanceof Function ? node.height(node) : node.height

  if (width) styles.width = typeof width === 'string' ? width : `${width}px`

  if (height) styles.height = typeof height === 'string' ? height : `${height}px`

  return styles
})

onUpdateNodeInternals((updateIds) => {
  if (updateIds.includes(id)) {
    updateInternals()
  }
})

onMounted(() => {
  props.resizeObserver.observe(nodeElement.value)
})

onBeforeUnmount(() => {
  props.resizeObserver.unobserve(nodeElement.value)
})

watch(
  [() => node.type, () => node.sourcePosition, () => node.targetPosition],
  () => {
    updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])
  },
  { flush: 'post' },
)

watch(
  [
    () => node.position.x,
    () => node.position.y,
    () => parentNode?.computedPosition.x,
    () => parentNode?.computedPosition.y,
    () => parentNode?.computedPosition.z,
    () => node.selected,
  ],
  ([newX, newY, parentX, parentY, parentZ]) => {
    const xyzPos = {
      x: newX,
      y: newY,
      // if a zIndex style is present, add 1000 to it
      z: (isNumber(getStyle.value.zIndex) ? getStyle.value.zIndex : 0) + (node.selected ? 1000 : 0),
    }

    updatePosition(xyzPos, parentX && parentY ? { x: parentX, y: parentY, z: parentZ || 0 } : undefined)
  },
  { flush: 'post', immediate: true },
)

function updatePosition(nodePos: XYZPosition, parentPos?: XYZPosition) {
  let nextPos = { ...nodePos }
  if (parentPos) {
    nextPos = getXYZPos({ x: parentPos.x, y: parentPos.y, z: parentPos.z! }, nodePos)
  }

  node.computedPosition = nextPos
}

onNodesInitialized(() => {
  initialized.value = true
})

onMounted(() => {
  until(initialized)
    .toBe(true)
    .then(() => {
      const extent = applyExtent(node, nodeExtent, parentNode)

      const clampedPos = clampPosition(node.computedPosition, extent)

      node.computedPosition = { ...node.computedPosition, ...clampedPos }
      node.position = {
        x: node.computedPosition.x - (parentNode?.computedPosition.x || 0),
        y: node.computedPosition.y - (parentNode?.computedPosition.y || 0),
      }
    })
})

function updateInternals() {
  if (nodeElement.value) updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])

  updatePosition(
    {
      x: node.position.x,
      y: node.position.y,
      // should be using computedPosition.z but in case  it's not present, fall back to selected state
      z: node.computedPosition.z ? node.computedPosition.z : node.selected ? 1000 : 0,
    },
    parentNode ? { ...parentNode.computedPosition } : undefined,
  )
}

function onMouseEnter(event: MouseEvent) {
  if (!dragging?.value) {
    emit.mouseEnter({ event, node, connectedEdges })
  }
}

function onMouseMove(event: MouseEvent) {
  if (!dragging?.value) {
    emit.mouseMove({ event, node, connectedEdges })
  }
}

function onMouseLeave(event: MouseEvent) {
  if (!dragging?.value) {
    emit.mouseLeave({ event, node, connectedEdges })
  }
}

function onContextMenu(event: MouseEvent) {
  return emit.contextMenu({ event, node, connectedEdges })
}

function onDoubleClick(event: MouseEvent) {
  return emit.doubleClick({ event, node, connectedEdges })
}

function onSelectNode(event: MouseEvent) {
  if (selectable && (!selectNodesOnDrag || !draggable)) {
    handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedElements, $$(nodesSelectionActive))
  }

  emit.click({ event, node, connectedEdges })
}
</script>

<script lang="ts">
export default {
  name: 'Node',
  inheritAttrs: false,
}
</script>

<template>
  <div
    ref="nodeElement"
    class="vue-flow__node"
    :class="[
      `vue-flow__node-${type === false ? 'default' : name}`,
      noPanClassName,
      {
        dragging,
        selected: node.selected,
        selectable,
      },
      getClass,
    ]"
    :style="{
      zIndex: node.computedPosition.z ?? 0,
      transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
      pointerEvents: selectable || draggable ? 'all' : 'none',
      ...getStyle,
    }"
    :data-id="node.id"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @contextmenu="onContextMenu"
    @click="onSelectNode"
    @dblclick="onDoubleClick"
  >
    <component
      :is="type === false ? getNodeTypes.default : type"
      :id="node.id"
      :type="node.type"
      :data="node.data"
      :events="{ ...node.events, ...on }"
      :selected="!!node.selected"
      :connectable="connectable"
      :position="node.position"
      :dimensions="node.dimensions"
      :is-valid-target-pos="node.isValidTargetPos"
      :is-valid-source-pos="node.isValidSourcePos"
      :parent-node="node.parentNode"
      :dragging="dragging"
      :z-index="node.computedPosition.z"
      :target-position="node.targetPosition"
      :source-position="node.sourcePosition"
      :label="node.label"
      :drag-handle="node.dragHandle"
      @update-node-internals="updateInternals"
    />
  </div>
</template>
