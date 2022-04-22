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

const props = defineProps<NodeWrapperProps>()

provide(NodeId, props.id)

const slots = inject(Slots)

const { store } = useVueFlow()

const node = useVModel(props, 'node')

const name = ref(node.value.type ?? 'default')
watch(
  () => node.value.type,
  (v) => v && (name.value = v),
)

const nodeElement = ref()

const { scale, onDrag, onDragStart, onDragStop } = useDraggableCore(nodeElement, {
  handle: node.value.dragHandle,
  disabled: !props.draggable,
  grid: props.snapGrid,
  cancel: `.${store.noDragClassName}`,
  enableUserSelectHack: false,
  scale: store.viewport.zoom,
})

onBeforeMount(() => {
  store.updateNodePosition({ id: node.value.id, diff: { x: 0, y: 0 } })
})

onMounted(() => {
  debouncedWatch(
    () => store.viewport.zoom,
    () => {
      scale.value = store.viewport.zoom
    },
    { debounce: 5, flush: 'post' },
  )
})

onMounted(() => {
  const observer = useResizeObserver(nodeElement, () =>
    store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value, forceUpdate: true }]),
  )

  watch(
    [() => node.value.type, () => node.value.sourcePosition, () => node.value.targetPosition],
    () => {
      store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value }])
    },
    { flush: 'post' },
  )

  onBeforeUnmount(() => observer.stop())

  store.updateNodeDimensions([{ id: node.value.id, nodeElement: nodeElement.value, forceUpdate: true }])
})

watch(
  [
    () => node.value.position,
    () => store.getNode(node.value.parentNode!)?.computedPosition,
    () => node.value.selected,
    () => store.getNode(node.value.parentNode!)?.selected,
  ],
  ([pos, parent]) => {
    const xyzPos = {
      ...pos,
      z: node.value.dragging || node.value.selected ? 1000 : 0,
    }

    if (parent) {
      node.value.computedPosition = getXYZPos(parent, xyzPos)
    } else {
      node.value.computedPosition = xyzPos
    }

    node.value.handleBounds = getHandleBounds(nodeElement.value, scale.value)
  },
  { deep: true, flush: 'post' },
)

onUnmounted(() => {
  nodeElement.value = undefined
})

const onMouseEnter = (event: MouseEvent) => {
  if (!node.value.dragging) {
    store.hooks.nodeMouseEnter.trigger({ event, node: node.value })
  }
}

const onMouseMove = (event: MouseEvent) => {
  if (!node.value.dragging) {
    store.hooks.nodeMouseMove.trigger({ event, node: node.value })
  }
}

const onMouseLeave = (event: MouseEvent) => {
  if (!node.value.dragging) {
    store.hooks.nodeMouseLeave.trigger({ event, node: node.value })
  }
}

const onContextMenu = (event: MouseEvent) => {
  store.hooks.nodeContextMenu.trigger({
    event,
    node: node.value,
  })
}

const onDoubleClick = (event: MouseEvent) => store.hooks.nodeDoubleClick.trigger({ event, node: node.value })

const onSelectNode = (event: MouseEvent) => {
  if (!props.draggable) {
    if (props.selectable) {
      store.nodesSelectionActive = false
      if (!node.value.selected) store.addSelectedNodes([node.value])
    }
    store.hooks.nodeClick.trigger({ event, node: node.value })
  }
}

const type = computed(() => {
  let nodeType = node.value.template ?? store.getNodeTypes[name.value]
  const instance = getCurrentInstance()

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

onDragStart(({ event }) => {
  store.addSelectedNodes([])
  store.hooks.nodeDragStart.trigger({ event, node: node.value })

  if (store.selectNodesOnDrag && props.selectable) {
    store.nodesSelectionActive = false

    if (!node.value.selected) store.addSelectedNodes([node.value])
  } else if (!store.selectNodesOnDrag && !node.value.selected && props.selectable) {
    store.nodesSelectionActive = false
    store.addSelectedNodes([])
  }
})

onDrag(({ event, data: { deltaX, deltaY } }) => {
  store.updateNodePosition({ id: node.value.id, diff: { x: deltaX, y: deltaY }, dragging: true })
  store.hooks.nodeDrag.trigger({ event, node: node.value })
})

onDragStop(({ event, data: { deltaX, deltaY } }) => {
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
})

const getClass = computed(() => {
  const extraClass = node.value.class instanceof Function ? node.value.class(node.value) : node.value.class
  return [
    'vue-flow__node',
    `vue-flow__node-${name.value}`,
    store.noPanClassName,
    {
      dragging: node.value.dragging,
      selected: node.value.selected,
      selectable: props.selectable,
    },
    extraClass,
  ]
})

const getStyle = computed(() => {
  const styles = (node.value.style instanceof Function ? node.value.style(node.value) : node.value.style) || {}
  const width = node.value.width instanceof Function ? node.value.width(node.value) : node.value.width
  const height = node.value.height instanceof Function ? node.value.height(node.value) : node.value.height
  if (width) styles.width = typeof width === 'string' ? width : `${width}px`
  if (height) styles.height = typeof height === 'string' ? height : `${height}px`

  return {
    zIndex: node.value.computedPosition.z,
    transform: `translate(${node.value.computedPosition.x}px,${node.value.computedPosition.y}px)`,
    pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
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
      :connectable="props.connectable"
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
