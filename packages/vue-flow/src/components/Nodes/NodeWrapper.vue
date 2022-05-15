<script lang="ts" setup>
import { useDraggableCore } from '@braks/revue-draggable'
import type { CSSProperties } from 'vue'
import { useVueFlow } from '../../composables'
import type { GraphNode, NodeComponent, SnapGrid } from '../../types'
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
} = $(useVueFlow())

const nodeElement = ref()

const { scale, disabled, handle, cancel, grid, onDrag, onDragStart, onDragStop } = useDraggableCore(nodeElement, {
  handle: node.dragHandle,
  disabled: !draggable,
  grid: snapGrid,
  cancel: `.${noDragClassName}`,
  enableUserSelectHack: false,
  scale: viewport.zoom,
})

onBeforeMount(() => {
  updateNodePosition({ id: node.id, diff: { x: 0, y: 0 } })
})

onMounted(() => {
  debouncedWatch(
    () => viewport.zoom,
    () => {
      scale.value = viewport.zoom
    },
    { debounce: 5, flush: 'post' },
  )

  watch(
    () => draggable,
    () => {
      disabled.value = !draggable
    },
  )

  watch(
    () => node.dragHandle,
    () => {
      if (node.dragHandle) handle.value = node.dragHandle
    },
  )

  watch($$(noDragClassName), () => {
    if (noDragClassName) cancel.value = noDragClassName as any
  })

  watch(
    () => snapGrid,
    () => {
      if (grid) grid.value = snapGrid
    },
  )
})

const parent = $computed(() => (node.parentNode ? getNode(node.parentNode) : undefined))

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
    [() => node.position, () => parent?.computedPosition, () => node.selected, () => parent?.selected],
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

      graphNode.handleBounds = getHandleBounds(nodeElement.value, scale.value)
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

onDragStart(({ event }) => {
  addSelectedNodes([])
  emits.nodeDragStart({ event, node })

  if (selectNodesOnDrag && selectable) {
    setState({
      nodesSelectionActive: false,
    })

    if (!node.selected) addSelectedNodes([node])
  } else if (!selectNodesOnDrag && !node.selected && selectable) {
    setState({
      nodesSelectionActive: false,
    })

    addSelectedNodes([])
  }
})

onDrag(({ event, data: { deltaX, deltaY } }) => {
  updateNodePosition({ id: node.id, diff: { x: deltaX, y: deltaY }, dragging: true })
  emits.nodeDrag({ event, node })
})

onDragStop(({ event, data: { deltaX, deltaY } }) => {
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!node.dragging) {
    if (selectable && !selectNodesOnDrag && !node.selected) {
      addSelectedNodes([node])
    }
    emits.nodeClick({ event, node })
    return
  }
  updateNodePosition({ id: node.id, diff: { x: deltaX, y: deltaY }, dragging: false })
  emits.nodeDragStop({ event, node })
})

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
