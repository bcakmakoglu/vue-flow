<script lang="ts" setup>
import type { GraphNode } from '@vue-flow/core'
import { getBoundsofRects, getConnectedEdges, getRectOfNodes, useVueFlow } from '@vue-flow/core'
import type { PanelPosition } from '../panel'
import { Panel } from '../panel'
import type { MiniMapNodeFunc, MiniMapProps, ShapeRendering } from './types'
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
  position = 'bottom-right' as PanelPosition,
} = defineProps<MiniMapProps>()

const emit = defineEmits(['nodeClick', 'nodeDblclick', 'nodeMouseenter', 'nodeMousemove', 'nodeMouseleave'])

const attrs: Record<string, any> = useAttrs()

const defaultWidth = 200
const defaultHeight = 150

const { id, edges, viewport, dimensions, emits, getNodes } = useVueFlow()

const elementWidth = computed(() => width ?? attrs.style?.width ?? defaultWidth)

const elementHeight = computed(() => height ?? attrs.style?.height ?? defaultHeight)

const nodeColorFunc: MiniMapNodeFunc = nodeColor instanceof Function ? nodeColor : () => nodeColor as string

const nodeStrokeColorFunc: MiniMapNodeFunc =
  nodeStrokeColor instanceof Function ? nodeStrokeColor : () => nodeStrokeColor as string

const nodeClassNameFunc = nodeClassName instanceof Function ? nodeClassName : ((() => nodeClassName) as MiniMapNodeFunc)

const shapeRendering: ShapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'

const bb = computed(() => getRectOfNodes(getNodes.value))

const viewBB = computed(() => ({
  x: -viewport.value.x / viewport.value.zoom,
  y: -viewport.value.y / viewport.value.zoom,
  width: dimensions.value.width / viewport.value.zoom,
  height: dimensions.value.height / viewport.value.zoom,
}))

const viewBox = computed(() => {
  const boundingRect = getNodes && getNodes.value.length ? getBoundsofRects(bb.value, viewBB.value) : viewBB.value
  const scaledWidth = boundingRect.width / elementWidth.value
  const scaledHeight = boundingRect.height / elementHeight.value
  const viewScale = Math.max(scaledWidth, scaledHeight)
  const viewWidth = viewScale * elementWidth.value
  const viewHeight = viewScale * elementHeight.value
  const offset = 5 * viewScale
  return {
    offset,
    x: boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset,
    y: boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset,
    width: viewWidth + offset * 2,
    height: viewHeight + offset * 2,
  }
})

const d = computed(() => {
  if (viewBox.value.x && viewBox.value.y) {
    return `
    M${viewBox.value.x - viewBox.value.offset},${viewBox.value.y - viewBox.value.offset}
    h${viewBox.value.width + viewBox.value.offset * 2}
    v${viewBox.value.height + viewBox.value.offset * 2}
    h${-viewBox.value.width - viewBox.value.offset * 2}z
    M${viewBB.value.x},${viewBB.value.y}
    h${viewBB.value.width}
    v${viewBB.value.height}
    h${-viewBB.value.width}z`
  } else {
    return ''
  }
})

const onNodeClick = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeClick(param)
  emit('nodeClick', param)
}

const onNodeDblClick = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeDoubleClick(param)
  emit('nodeDblclick', param)
}

const onNodeMouseEnter = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseEnter(param)
  emit('nodeMouseenter', param)
}

const onNodeMouseMove = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseMove(param)
  emit('nodeMousemove', param)
}

const onNodeMouseLeave = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
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
  <Panel :position="position" class="vue-flow__minimap">
    <svg
      :width="elementWidth"
      :height="elementHeight"
      :viewBox="[viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(' ')"
      role="img"
      :aria-labelledby="`vue-flow__minimap-${id}`"
    >
      <title :id="`vue-flow__minimap-${id}`">Vue Flow mini map</title>
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
  </Panel>
</template>
