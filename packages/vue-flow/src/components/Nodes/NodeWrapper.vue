<script lang="ts" setup>
import { useVueFlow, useDrag } from '../../composables'
import { NodeComponent, SnapGrid, XYZPosition } from '../../types'
import { NodeId } from '../../context'
import { getHandleBounds, getXYZPos } from '../../utils'

const { id, type, name, draggable, selectable, connectable, snapGrid, ...props } = defineProps<
  id: string
  modelValue: XYZPosition
  draggable: boolean
  selectable: boolean
  connectable: boolean
  snapGrid?: SnapGrid
  type: NodeComponent | Function | Object | false
  name: string
}>()


const emit = defineEmits(['update:modelValue'])

let computedPosition = $(useVModel(props, 'modelValue', emit))

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

const node = $computed(() => getNode(id)!)
const parentNode = $computed(() => (node.parentNode ? getNode(node.parentNode) : undefined))

const nodeElement = ref()

let dragging = $ref(false)

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
    dragging = true
    updateNodePosition({ id, diff: { x: dx, y: dy } })
    emits.nodeDrag({ event: event.sourceEvent, node })
  },
  onStop(event) {
    dragging = false
    emits.nodeDragStop({ event: event.sourceEvent, node })
  },
})

onMounted(() => {
  const observer = useResizeObserver(nodeElement, () =>
    updateNodeDimensions([{ id, nodeElement: nodeElement.value, forceUpdate: true }]),
  )

  watch(
    [() => node.type, () => node.sourcePosition, () => node.targetPosition],
    () => {
      updateNodeDimensions([{ id, nodeElement: nodeElement.value }])
    },
    { flush: 'post' },
  )

  onBeforeUnmount(() => observer.stop())

  watch(
    [() => node.position, () => parentNode?.computedPosition],
    ([pos, parent]) => {
      const xyzPos = {
        ...pos,
        z: node.computedPosition.z ? node.computedPosition.z : node.selected ? 1000 : 0,
      }

      if (parent) {
        computedPosition = getXYZPos(parent, xyzPos)
      } else {
        computedPosition = xyzPos
      }

      node.handleBounds = getHandleBounds(nodeElement.value, viewport.zoom)
    },
    { immediate: true, deep: true, flush: 'post' },
  )
})

onUnmounted(() => {
  nodeElement.value = undefined
})

const onMouseEnter = (event: MouseEvent) => {
  if (!dragging) {
    emits.nodeMouseEnter({ event, node })
  }
}

const onMouseMove = (event: MouseEvent) => {
  if (!dragging) {
    emits.nodeMouseMove({ event, node })
  }
}

const onMouseLeave = (event: MouseEvent) => {
  if (!dragging) {
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
  if (!dragging) {
    if (selectable && !selectNodesOnDrag && !node.selected) {
      setState({
        nodesSelectionActive: false,
      })

      if (!node.selected) addSelectedNodes([node])
    }
    emits.nodeClick({ event, node })
  }
}

const getClass = () => {
  return node.class instanceof Function ? node.class(node) : node.class
}

const getStyle = () => {
  const styles = (node.style instanceof Function ? node.style(node) : node.style) || {}
  const width = node.width instanceof Function ? node.width(node) : node.width
  const height = node.height instanceof Function ? node.height(node) : node.height
  if (width) styles.width = typeof width === 'string' ? width : `${width}px`
  if (height) styles.height = typeof height === 'string' ? height : `${height}px`

  return styles
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
    :class="[
      'vue-flow__node',
      `vue-flow__node-${name}`,
      noPanClassName,
      {
        dragging,
        selected: node.selected,
        selectable,
      },
      getClass(),
    ]"
    :style="{
      zIndex: node.computedPosition.z ? node.computedPosition.z : node.selected ? 1000 : 0,
      transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
      pointerEvents: selectable || draggable ? 'all' : 'none',
      ...getStyle(),
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
      :node-element="nodeElement"
    />
  </div>
</template>
