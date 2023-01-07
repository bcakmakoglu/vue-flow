<script lang="ts" setup>
import { isNumber } from '@vueuse/core'
import type { ReactiveVariable } from 'vue/macros'
import type { GraphNode, HandleConnectable, NodeComponent } from '../../types'
import { ARIA_NODE_DESC_KEY } from '../../utils/a11y'

const { id, type, name, draggable, selectable, connectable, ...props } = defineProps<{
  id: string
  draggable: boolean
  selectable: boolean
  connectable: HandleConnectable
  focusable: boolean
  type: NodeComponent | Function | Object | false
  name: string
  node: GraphNode
  resizeObserver: ResizeObserver
}>()

provide(NodeId, id)

const {
  id: vueFlowId,
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
  elevateNodesOnSelect,
  disableKeyboardA11y,
  ariaLiveMessage,
} = $(useVueFlow())

const updateNodePositions = useUpdateNodePositions()

const node: ReactiveVariable<GraphNode> = $(useVModel(props, 'node'))

const parentNode = $computed(() => (node.parentNode ? getNode(node.parentNode) : undefined))

const connectedEdges = $computed(() => getConnectedEdges([node], edges))

const nodeElement = ref()

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
  { flush: 'pre' },
)

/** this watcher only updates XYZPosition (when dragging a parent etc) */
watch(
  [
    () => node.position.x,
    () => node.position.y,
    () => parentNode?.computedPosition.x,
    () => parentNode?.computedPosition.y,
    () => parentNode?.computedPosition.z,
    () => node.selected,
    () => node.dimensions.height,
    () => node.dimensions.width,
    () => parentNode?.dimensions.height,
    () => parentNode?.dimensions.width,
  ],
  ([newX, newY, parentX, parentY, parentZ]) => {
    const xyzPos = {
      x: newX,
      y: newY,
      // if a zIndex style is present, add 1000 to it
      z: (isNumber(getStyle.value.zIndex) ? getStyle.value.zIndex : 0) + (elevateNodesOnSelect ? (node.selected ? 1000 : 0) : 0),
    }

    if (parentX && parentY) {
      node.computedPosition = getXYZPos({ x: parentX, y: parentY, z: parentZ! }, xyzPos)
    } else {
      node.computedPosition = xyzPos
    }
  },
  { flush: 'pre', immediate: true },
)

watch(
  [() => node.extent, () => nodeExtent],
  ([nodeExtent, globalExtent], [oldNodeExtent, oldGlobalExtent]) => {
    // update position if extent has actually changed
    if (nodeExtent !== oldNodeExtent || globalExtent !== oldGlobalExtent) {
      updatePosition()
    }
  },
  { flush: 'pre' },
)

until(() => node.initialized)
  .toBe(true, { flush: 'pre' })
  .then(updatePosition)

/** this re-calculates the current position, necessary for clamping by a node's extent */
function updatePosition() {
  const { computedPosition, position } = calcNextPosition(node, node.computedPosition, nodeExtent, parentNode)

  // only overwrite positions if there are changes when clamping
  if (node.computedPosition.x !== computedPosition.x || node.computedPosition.y !== computedPosition.y) {
    node.computedPosition = { ...node.computedPosition, ...computedPosition }
  }

  if (node.position.x !== position.x || node.position.y !== position.y) {
    node.position = position
  }
}

function updateInternals() {
  if (nodeElement.value) updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])
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

const onKeyDown = (event: KeyboardEvent) => {
  if (isInputDOMNode(event)) return

  event.preventDefault()

  if (elementSelectionKeys.includes(event.key) && selectable) {
    const unselect = event.key === 'Escape'

    if (unselect) {
      nodeElement.value?.blur()
    }

    handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedElements, $$(nodesSelectionActive), unselect)
  } else if (!disableKeyboardA11y && draggable && node.selected && arrowKeyDiffs[event.key]) {
    $$(ariaLiveMessage).value = `Moved selected node ${event.key.replace('Arrow', '').toLowerCase()}. New position, x: ${~~node
      .position.x}, y: ${~~node.position.y}`

    updateNodePositions(
      {
        x: arrowKeyDiffs[event.key].x,
        y: arrowKeyDiffs[event.key].y,
      },
      event.shiftKey,
    )
  }
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
    :tabIndex="focusable ? 0 : undefined"
    :role="focusable ? 'button' : undefined"
    :aria-describedby="disableKeyboardA11y ? undefined : `${ARIA_NODE_DESC_KEY}-${vueFlowId}`"
    :aria-label="node.ariaLabel"
    :data-id="node.id"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @contextmenu="onContextMenu"
    @click="onSelectNode"
    @dblclick="onDoubleClick"
    @keydown="onKeyDown"
  >
    <component
      :is="type === false ? getNodeTypes.default : type"
      :id="node.id"
      :type="node.type"
      :data="node.data"
      :events="{ ...node.events, ...on }"
      :selected="!!node.selected"
      :resizing="!!node.resizing"
      :dragging="dragging"
      :connectable="connectable"
      :position="node.position"
      :dimensions="node.dimensions"
      :is-valid-target-pos="node.isValidTargetPos"
      :is-valid-source-pos="node.isValidSourcePos"
      :parent-node="node.parentNode"
      :z-index="node.computedPosition.z"
      :target-position="node.targetPosition"
      :source-position="node.sourcePosition"
      :label="node.label"
      :drag-handle="node.dragHandle"
      @update-node-internals="updateInternals"
    />
  </div>
</template>
