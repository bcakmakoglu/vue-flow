<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { useVueFlow, useDrag } from '../../composables'
import { GraphNode, NodeComponent, SnapGrid } from '../../types'
import { NodeId } from '../../context'
import { getHandleBounds, getXYZPos } from '../../utils'

const { id, type, name, node, parentNode, draggable, selectable, connectable, snapGrid } = defineProps<{
  id: string
  node: GraphNode
  parentNode?: GraphNode
  draggable: boolean
  selectable: boolean
  connectable: boolean
  snapGrid?: SnapGrid
  type: NodeComponent | Function | Object | false
  name: string
}>()

provide(NodeId, id)

const {
  viewport,
  noDragClassName,
  noPanClassName,
  emits,
  selectNodesOnDrag,
  setState,
  updateNodePosition,
  updateNodeDimensions,
  getNode,
  getNodeTypes,
  addSelectedNodes,
  multiSelectionActive,
  resetSelectedElements,
} = $(useVueFlow())

const nodeElement = ref()

useDrag({
  id,
  el: nodeElement,
  disabled: computed(() => !draggable),
  noDragClassName: $$(noDragClassName) as any,
  handleSelector: node.dragHandle,
  onStart(event) {
    if (selectNodesOnDrag && selectable) {
      setState({
        nodesSelectionActive: false,
      })

      if (!node.selected) {
        addSelectedNodes([node])
      }
    } else if (!selectNodesOnDrag && !node.selected && selectable) {
      if (multiSelectionActive) {
        addSelectedNodes([node])
      } else {
        resetSelectedElements()
        setState({
          nodesSelectionActive: false,
        })
      }
    }

    emits.nodeDragStart({ event: event.sourceEvent, node })
  },
  onDrag(event, { dx, dy }) {
    updateNodePosition({ id: node.id, diff: { x: dx, y: dy }, dragging: true })
    emits.nodeDrag({ event: event.sourceEvent, node })
  },
  onStop(event) {
    if (!node.dragging) {
      if (selectable && !selectNodesOnDrag && !node.selected) {
        addSelectedNodes([node])
      }
      emits.nodeClick({ event: event.sourceEvent, node })
      return
    }

    updateNodePosition({ id: node.id, dragging: false })

    emits.nodeDragStop({ event: event.sourceEvent, node })
  },
})

onBeforeMount(() => {
  updateNodePosition({ id: node.id, diff: { x: 0, y: 0 }, dragging: false })
})

onMounted(() => {
  const observer = useResizeObserver(nodeElement, () =>
    updateNodeDimensions([{ id: node.id, nodeElement: nodeElement.value, forceUpdate: true }]),
  )

  watch(
    [() => node.type, () => node.sourcePosition, () => node.targetPosition],
    () => {
      updateNodeDimensions([{ id: node.id, nodeElement: nodeElement.value }])
    },
    { flush: 'post' },
  )

  onBeforeUnmount(() => observer.stop())

  updateNodeDimensions([{ id: node.id, nodeElement: nodeElement.value, forceUpdate: true }])

  watch(
    [() => node.position, () => parentNode?.computedPosition, () => node.selected, () => parentNode?.selected],
    ([pos, parent]) => {
      const xyzPos = {
        ...pos,
        z: node.dragging || node.selected ? 1000 : 0,
      }
      const graphNode = getNode(id)!

      if (parent) {
        graphNode.computedPosition = getXYZPos(parent, xyzPos)
      } else {
        graphNode.computedPosition = xyzPos
      }

      graphNode.handleBounds = getHandleBounds(nodeElement.value, viewport.zoom)
    },
    { deep: true, flush: 'post' },
  )
})

onUnmounted(() => {
  nodeElement.value = undefined
})

const onMouseEnter = (event: MouseEvent) => {
  if (!node.dragging) {
    emits.nodeMouseEnter({ event, node })
  }
}

const onMouseMove = (event: MouseEvent) => {
  if (!node.dragging) {
    emits.nodeMouseMove({ event, node })
  }
}

const onMouseLeave = (event: MouseEvent) => {
  if (!node.dragging) {
    emits.nodeMouseLeave({ event, node })
  }
}

const onContextMenu = (event: MouseEvent) => {
  emits.nodeContextMenu({
    event,
    node,
  })
}

const onDoubleClick = (event: MouseEvent) => emits.nodeDoubleClick({ event, node })

const onSelectNode = (event: MouseEvent) => {
  if (!draggable) {
    if (selectable) {
      setState({
        nodesSelectionActive: false,
      })

      if (!node.selected) addSelectedNodes([node])
    }
    emits.nodeClick({ event, node })
  }
}

const getClass = computed(() => {
  const extraClass = node.class instanceof Function ? node.class(node) : node.class
  return [
    'vue-flow__node',
    `vue-flow__node-${name}`,
    noPanClassName,
    {
      dragging: node.dragging,
      selected: node.selected,
      selectable,
    },
    extraClass,
  ]
})

const getStyle = computed(() => {
  const styles = (node.style instanceof Function ? node.style(node) : node.style) || {}
  const width = node.width instanceof Function ? node.width(node) : node.width
  const height = node.height instanceof Function ? node.height(node) : node.height
  if (width) styles.width = typeof width === 'string' ? width : `${width}px`
  if (height) styles.height = typeof height === 'string' ? height : `${height}px`

  return {
    zIndex: node.computedPosition.z,
    transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
    pointerEvents: selectable || draggable ? 'all' : 'none',
    ...styles,
  } as CSSProperties
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
    :class="getClass"
    :style="getStyle"
    :data-id="id"
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
      :dragging="!!node.dragging"
      :z-index="node.computedPosition.z"
      :target-position="node.targetPosition"
      :source-position="node.sourcePosition"
      :label="node.label"
      :drag-handle="node.dragHandle"
      :node-element="nodeElement"
    />
  </div>
</template>
