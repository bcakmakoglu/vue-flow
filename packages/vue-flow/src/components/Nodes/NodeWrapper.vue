<script lang="ts" setup>
import { useDrag, useNodeHooks, useVueFlow } from '../../composables'
import type { NodeComponent, SnapGrid, XYZPosition } from '../../types'
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
} = $(useVueFlow())

const node = $computed(() => getNode(id)!)
const parentNode = $computed(() => (node.parentNode ? getNode(node.parentNode) : undefined))

const nodeElement = ref()

const { emit, on } = useNodeHooks(node, emits)

const scope = effectScope()

const dragging = useDrag({
  id,
  el: nodeElement,
  disabled: computed(() => !draggable),
  onStart(event, node, nodes) {
    emit.dragStart({ event, node, nodes })
  },
  onDrag(event, node, nodes) {
    emit.drag({ event, node, nodes })
  },
  onStop(event, node, nodes) {
    emit.dragStop({ event, node, nodes })
  },
})

const observer = useResizeObserver(
  nodeElement,
  () => {
    updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])
  },
  { box: 'content-box' },
)

const updatePosition = (nodePos: XYZPosition, parentPos?: XYZPosition) => {
  if (parentPos) {
    node.computedPosition = getXYZPos({ x: parentPos.x, y: parentPos.y, z: parentPos.z! }, nodePos)
  } else {
    node.computedPosition = nodePos
  }
}

const updateInternals = () => {
  if (nodeElement.value) updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }])

  updatePosition(
    {
      x: node.position.x,
      y: node.position.y,
      z: node.computedPosition.z ? node.computedPosition.z : node.selected ? 1000 : 0,
    },
    parentNode ? { ...parentNode.computedPosition } : undefined,
  )
}

onUpdateNodeInternals((updateIds) => {
  if (updateIds.includes(id)) {
    updateInternals()
  }
})

onMounted(() => {
  scope.run(() => {
    watch(
      [() => node.width, () => node.height, () => node.type, () => node.sourcePosition, () => node.targetPosition],
      () => {
        updateNodeDimensions([{ id, nodeElement: nodeElement.value }])
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
        () => node.dimensions,
        () => parentNode?.dimensions,
      ],
      ([newX, newY, parentX, parentY, parentZ]) => {
        const xyzPos = {
          x: newX,
          y: newY,
          z: node.selected ? 1000 : 0,
        }

        updatePosition(xyzPos, parentX && parentY ? { x: parentX, y: parentY, z: parentZ! } : undefined)

        node.handleBounds = {
          source: getHandleBounds('.source', nodeElement.value, viewport.zoom),
          target: getHandleBounds('.target', nodeElement.value, viewport.zoom),
        }
      },
      { immediate: true, flush: 'post' },
    )
  })
})

onBeforeUnmount(() => {
  observer.stop()
  scope.stop()
})

const onMouseEnter = (event: MouseEvent) => {
  if (!dragging) {
    emit.mouseEnter({ event, node, connectedEdges: getConnectedEdges([node], edges) })
  }
}

const onMouseMove = (event: MouseEvent) => {
  if (!dragging) {
    emit.mouseMove({ event, node, connectedEdges: getConnectedEdges([node], edges) })
  }
}

const onMouseLeave = (event: MouseEvent) => {
  if (!dragging) {
    emit.mouseLeave({ event, node, connectedEdges: getConnectedEdges([node], edges) })
  }
}

const onContextMenu = (event: MouseEvent) => {
  emit.contextMenu({
    event,
    node,
    connectedEdges: getConnectedEdges([node], edges),
  })
}

const onDoubleClick = (event: MouseEvent) => {
  emit.doubleClick({ event, node, connectedEdges: getConnectedEdges([node], edges) })
}

const onSelectNode = (event: MouseEvent) => {
  if (selectable && (!selectNodesOnDrag || !draggable)) {
    handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedElements, $$(nodesSelectionActive))
  }
  emit.click({ event, node, connectedEdges: getConnectedEdges([node], edges) })
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
