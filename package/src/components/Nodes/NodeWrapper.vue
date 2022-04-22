<script lang="ts" setup>
import { useDraggableCore } from '@braks/revue-draggable'
import { CSSProperties } from 'vue'
import { useVueFlow } from '../../composables'
import { GraphNode, NodeComponent, SnapGrid } from '../../types'
import { NodeId, Slots } from '../../context'
import { getHandleBounds, getXYZPos } from '../../utils'

interface NodeWrapperProps {
  id: string
  node: GraphNode
  draggable: boolean
  selectable: boolean
  connectable: boolean
  snapGrid?: SnapGrid
}

const { id, node, draggable, selectable, connectable, snapGrid } = defineProps<NodeWrapperProps>()

provide(NodeId, id)

const slots = inject(Slots)

const {
  viewport,
  noDragClassName,
  noPanClassName,
  hooks,
  selectNodesOnDrag,
  setState,
  updateNodePosition,
  updateNodeDimensions,
  getNode,
  getNodeTypes,
  addSelectedNodes,
} = $(useVueFlow())

let name = $ref(node.type ?? 'default')
watch(
  () => node.type,
  (v) => v && (name = v),
)

const nodeElement = ref()

const { scale, onDrag, onDragStart, onDragStop } = useDraggableCore(nodeElement, {
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
})

watch(
  [
    () => node.position,
    () => getNode(node.parentNode!)?.computedPosition,
    () => node.selected,
    () => getNode(node.parentNode!)?.selected,
  ],
  ([pos, parent]) => {
    const xyzPos = {
      ...pos,
      z: node.dragging || node.selected ? 1000 : 0,
    }

    if (parent) {
      getNode(id)!.computedPosition = getXYZPos(parent, xyzPos)
    } else {
      getNode(id)!.computedPosition = xyzPos
    }

    getNode(id)!.handleBounds = getHandleBounds(nodeElement.value, scale.value)
  },
  { deep: true, flush: 'post' },
)

onUnmounted(() => {
  nodeElement.value = undefined
})

const onMouseEnter = (event: MouseEvent) => {
  if (!node.dragging) {
    hooks.nodeMouseEnter.trigger({ event, node })
  }
}

const onMouseMove = (event: MouseEvent) => {
  if (!node.dragging) {
    hooks.nodeMouseMove.trigger({ event, node })
  }
}

const onMouseLeave = (event: MouseEvent) => {
  if (!node.dragging) {
    hooks.nodeMouseLeave.trigger({ event, node })
  }
}

const onContextMenu = (event: MouseEvent) => {
  hooks.nodeContextMenu.trigger({
    event,
    node,
  })
}

const onDoubleClick = (event: MouseEvent) => hooks.nodeDoubleClick.trigger({ event, node })

const onSelectNode = (event: MouseEvent) => {
  if (!draggable) {
    if (selectable) {
      setState({
        nodesSelectionActive: false,
      })

      if (!node.selected) addSelectedNodes([node])
    }
    hooks.nodeClick.trigger({ event, node })
  }
}

const type = computed(() => {
  let nodeType = node.template ?? getNodeTypes[name]
  const instance = getCurrentInstance()

  if (typeof nodeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        nodeType = resolveComponent(name, false) as NodeComponent
      }
    }
  }
  if (typeof nodeType !== 'string') return nodeType

  const slot = slots?.[`node-${name}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Node type "${node.type}" not found and no node-slot detected. Using fallback type "default".`)
    name = 'default'
    return getNodeTypes.default
  }

  return slot
})

onDragStart(({ event }) => {
  addSelectedNodes([])
  hooks.nodeDragStart.trigger({ event, node })

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
  hooks.nodeDrag.trigger({ event, node })
})

onDragStop(({ event, data: { deltaX, deltaY } }) => {
  // onDragStop also gets called when user just clicks on a node.
  // Because of that we set dragging to true inside the onDrag handler and handle the click here
  if (!node.dragging) {
    if (selectable && !selectNodesOnDrag && !node.selected) {
      addSelectedNodes([node])
    }
    hooks.nodeClick.trigger({ event, node })
    return
  }
  updateNodePosition({ id: node.id, diff: { x: deltaX, y: deltaY }, dragging: false })
  hooks.nodeDragStop.trigger({ event, node })
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
