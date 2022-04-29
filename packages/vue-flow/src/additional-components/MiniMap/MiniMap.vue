<script lang="ts" setup>
import type { GraphNode, MiniMapNodeFunc, ShapeRendering } from '../../types'
import { useVueFlow, useWindow } from '../../composables'
import { getBoundsofRects, getConnectedEdges, getRectOfNodes } from '../../utils'
import type { MiniMapProps } from '../../types/components'
import MiniMapNode from './MiniMapNode'

const {
  width,
  height,
  nodeStrokeColor = '#555',
  nodeColor = '#fff',
  nodeClassName,
  nodeBorderRadius = 5,
  nodeStrokeWidth = 2,
  maskColor = 'rgb(240, 242, 243, 0.7)',
} = defineProps<MiniMapProps>()

const emit = defineEmits(['nodeClick', 'nodeDblclick', 'nodeMouseenter', 'nodeMousemove', 'nodeMouseleave'])

const attrs: Record<string, any> = useAttrs()

const window = useWindow()

const defaultWidth = 200
const defaultHeight = 150

const { edges, viewport, dimensions, emits, getNodes } = $(useVueFlow())

const elementWidth = $computed(() => width ?? attrs.style?.width ?? defaultWidth)

const elementHeight = $computed(() => height ?? attrs.style?.height ?? defaultHeight)

const nodeColorFunc: MiniMapNodeFunc = nodeColor instanceof Function ? nodeColor : () => nodeColor as string

const nodeStrokeColorFunc: MiniMapNodeFunc =
  nodeStrokeColor instanceof Function ? nodeStrokeColor : () => nodeStrokeColor as string

const nodeClassNameFunc = nodeClassName instanceof Function ? nodeClassName : ((() => nodeClassName) as MiniMapNodeFunc)

const shapeRendering: ShapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'

const bb = $computed(() => {
  return getRectOfNodes(getNodes)
})

const viewBB = $computed(() => ({
  x: -viewport.x / viewport.zoom,
  y: -viewport.y / viewport.zoom,
  width: dimensions.width / viewport.zoom,
  height: dimensions.height / viewport.zoom,
}))

const viewBox = $(
  controlledComputed($$(viewBB), () => {
    const boundingRect = getNodes && getNodes.length ? getBoundsofRects(bb, viewBB) : viewBB
    const scaledWidth = boundingRect.width / elementWidth
    const scaledHeight = boundingRect.height / elementHeight
    const viewScale = Math.max(scaledWidth, scaledHeight)
    const viewWidth = viewScale * elementWidth
    const viewHeight = viewScale * elementHeight
    const offset = 5 * viewScale
    return {
      offset,
      x: boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset,
      y: boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset,
      width: viewWidth + offset * 2,
      height: viewHeight + offset * 2,
    }
  }),
)

const d = controlledComputed($$(viewBox), () => {
  if (viewBox.x && viewBox.y) {
    return `
    M${viewBox.x - viewBox.offset},${viewBox.y - viewBox.offset}
    h${viewBox.width + viewBox.offset * 2}
    v${viewBox.height + viewBox.offset * 2}
    h${-viewBox.width - viewBox.offset * 2}z
    M${viewBB.x},${viewBB.y}
    h${viewBB.width}
    v${viewBB.height}
    h${-viewBB.width}z`
  } else {
    return ''
  }
})

const onNodeClick = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges) }
  emits.miniMapNodeClick(param)
  emit('nodeClick', param)
}

const onNodeDblClick = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges) }
  emits.miniMapNodeDoubleClick(param)
  emit('nodeDblclick', param)
}

const onNodeMouseEnter = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges) }
  emits.miniMapNodeMouseEnter(param)
  emit('nodeMouseenter', param)
}

const onNodeMouseMove = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges) }
  emits.miniMapNodeMouseMove(param)
  emit('nodeMousemove', param)
}

const onNodeMouseLeave = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges) }
  emits.miniMapNodeMouseLeave(param)
  emit('nodeMouseleave', param)
}
</script>

<script lang="ts">
export default {
  name: 'MiniMap',
}
</script>

<template>
  <svg
    :width="elementWidth"
    :height="elementHeight"
    :viewBox="[viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(' ')"
    class="vue-flow__minimap"
  >
    <MiniMapNode
      v-for="node of getNodes"
      :id="node.id"
      :key="node.id"
      :position="node.computedPosition"
      :dimensions="node.dimensions"
      :style="node.style"
      :class="nodeClassNameFunc(node)"
      :color="nodeColorFunc(node)"
      :border-radius="nodeBorderRadius"
      :stroke-color="nodeStrokeColorFunc(node)"
      :stroke-width="nodeStrokeWidth"
      :shape-rendering="shapeRendering"
      @click="onNodeClick($event, node)"
      @dblclick="onNodeDblClick($event, node)"
      @mouseenter="onNodeMouseEnter($event, node)"
      @mousemove="onNodeMouseMove($event, node)"
      @mouseleave="onNodeMouseLeave($event, node)"
    >
      <slot
        :id="node.id"
        :name="`node-${node.type}`"
        :parent-node="node.parentNode"
        :selected="node.selected"
        :position="node.computedPosition"
        :dimensions="node.dimensions"
        :style="node.style"
        :class="nodeClassNameFunc(node)"
        :color="nodeColorFunc(node)"
        :border-radius="nodeBorderRadius"
        :stroke-color="nodeStrokeColorFunc(node)"
        :stroke-width="nodeStrokeWidth"
        :shape-rendering="shapeRendering"
      />
    </MiniMapNode>
    <path class="vue-flow__minimap-mask" :d="d" :fill="maskColor" fill-rule="evenodd" />
  </svg>
</template>
