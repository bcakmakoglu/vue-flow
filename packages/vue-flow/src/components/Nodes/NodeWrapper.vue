<script lang="ts" setup>
import { useDrag, useVueFlow } from '../../composables'
import type { NodeComponent, SnapGrid } from '../../types'
import { NodeId } from '../../context'
import { getConnectedEdges, getHandleBounds, getXYZPos, handleNodeClick } from '../../utils'

const { id, type, name, draggable, selectable, connectable, snapGrid, ...props } = defineProps<{
  id: string
  draggable: boolean
  selectable: boolean
  connectable: boolean
  snapGrid?: SnapGrid
  type: NodeComponent | Function | Object | false
  name: string
}>()

provide(NodeId, id)

const {
  edges,
  viewport,
  noDragClassName,
  noPanClassName,
  emits,
  selectNodesOnDrag,
  setState,
  updateNodeDimensions,
  getNode,
  addSelectedNodes,
  multiSelectionActive,
  removeSelectedElements,
  getSelectedNodes,
  onUpdateNodeInternals,
} = $(useVueFlow())

const node = $computed(() => getNode(id)!)
const parentNode = $computed(() => (node.parentNode ? getNode(node.parentNode) : undefined))

const nodeElement = ref()

const dragging = useDrag({
  id,
  el: nodeElement,
  disabled: computed(() => !draggable),
  noDragClassName: $$(noDragClassName) as any,
  handleSelector: node.dragHandle,
  onStart(event, node, nodes) {
    emits.nodeDragStart({ event, node, nodes })
  },
  onDrag(event, node, nodes) {
    emits.nodeDrag({ event, node, nodes })
  },
  onStop(event, node, nodes) {
    emits.nodeDragStop({ event, node, nodes })
  },
})

const observer = useResizeObserver(nodeElement, () => {
  updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])
})

watch(
  [() => node.width, () => node.height, () => node.type, () => node.sourcePosition, () => node.targetPosition],
  () => {
    updateNodeDimensions([{ id, nodeElement: nodeElement.value }])
  },
  { flush: 'post' },
)

onUpdateNodeInternals((updateIds) => {
  if (updateIds.includes(id)) {
    updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])

    const xyzPos = {
      x: node.position.x,
      y: node.position.y,
      z: node.computedPosition.z ? node.computedPosition.z : node.selected ? 1000 : 0,
    }

    if (parentNode) {
      if (parentNode.computedPosition.x && parentNode.computedPosition.y) {
        node.computedPosition = getXYZPos(
          { x: parentNode.computedPosition.x, y: parentNode.computedPosition.y, z: parentNode.computedPosition.z! },
          xyzPos,
        )
      } else {
        node.computedPosition = xyzPos
      }
    }
  }
})

onBeforeUnmount(() => observer.stop())

onMounted(() => {
  updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])

  watch(
    [
      () => node.position.x,
      () => node.position.y,
      () => parentNode?.computedPosition.x,
      () => parentNode?.computedPosition.y,
      () => parentNode?.computedPosition.z,
      () => node.selected,
      () => node.dimensions,
      () => parentNode?.dimensions,
    ],
    ([newX, newY, parentX, parentY, parentZ]) => {
      const xyzPos = {
        x: newX,
        y: newY,
        z: node.computedPosition.z ? node.computedPosition.z : node.selected ? 1000 : 0,
      }

      if (parentX && parentY) {
        node.computedPosition = getXYZPos({ x: parentX, y: parentY, z: parentZ! }, xyzPos)
      } else {
        node.computedPosition = xyzPos
      }

      node.handleBounds = getHandleBounds(nodeElement.value, viewport.zoom)
    },
    { immediate: true, flush: 'post' },
  )
})

const onMouseEnter = (event: MouseEvent) => {
  if (!dragging) {
    emits.nodeMouseEnter({ event, node, connectedEdges: getConnectedEdges([node], edges) })
  }
}

const onMouseMove = (event: MouseEvent) => {
  if (!dragging) {
    emits.nodeMouseMove({ event, node, connectedEdges: getConnectedEdges([node], edges) })
  }
}

const onMouseLeave = (event: MouseEvent) => {
  if (!dragging) {
    emits.nodeMouseLeave({ event, node, connectedEdges: getConnectedEdges([node], edges) })
  }
}

const onContextMenu = (event: MouseEvent) => {
  emits.nodeContextMenu({
    event,
    node,
    connectedEdges: getConnectedEdges([node], edges),
  })
}

const onDoubleClick = (event: MouseEvent) =>
  emits.nodeDoubleClick({ event, node, connectedEdges: getConnectedEdges([node], edges) })

const onSelectNode = (event: MouseEvent) => {
  if (selectable && (!selectNodesOnDrag || !draggable)) {
    handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedElements, setState)
  }
  emits.nodeClick({ event, node, connectedEdges: getConnectedEdges([node], edges) })
}

const getClass = computed(() => {
  return node.class instanceof Function ? node.class(node) : node.class
})

const getStyle = computed(() => {
  const styles = (node.style instanceof Function ? node.style(node) : node.style) || {}
  const width = node.width instanceof Function ? node.width(node) : node.width
  const height = node.height instanceof Function ? node.height(node) : node.height
  if (width) styles.width = typeof width === 'string' ? width : `${width}px`
  if (height) styles.height = typeof height === 'string' ? height : `${height}px`

  return styles
})
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
      `vue-flow__node-${name}`,
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
      :is="type"
      :id="node.id"
      :type="node.type"
      :data="node.data"
      :selected="!!node.selected"
      :connectable="connectable"
      :position="node.position"
      :computed-position="node.computedPosition"
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
    />
  </div>
</template>
