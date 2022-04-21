<script lang="ts" setup>
import { ShapeRendering, MiniMapNodeFunc, GraphNode } from '../../types'
import { useVueFlow, useWindow } from '../../composables'
import { getBoundsofRects, getRectOfNodes } from '../../utils'
import type { MiniMapProps } from '../../types/components'
import MiniMapNode from './MiniMapNode.vue'

const props = withDefaults(defineProps<MiniMapProps>(), {
  nodeStrokeColor: '#555',
  nodeColor: '#fff',
  nodeClassName: '',
  nodeBorderRadius: 5,
  nodeStrokeWidth: 2,
  maskColor: 'rgb(240, 242, 243, 0.7)',
})

const attrs: Record<string, any> = useAttrs()
const window = useWindow()

const defaultWidth = 200
const defaultHeight = 150

const { store } = useVueFlow()

const elementWidth = attrs.style?.width ?? defaultWidth
const elementHeight = attrs.style?.height ?? defaultHeight
const nodeColorFunc: MiniMapNodeFunc = props.nodeColor instanceof Function ? props.nodeColor : () => props.nodeColor as string
const nodeStrokeColorFunc: MiniMapNodeFunc =
  props.nodeStrokeColor instanceof Function ? props.nodeStrokeColor : () => props.nodeStrokeColor as string

const nodeClassNameFunc =
  props.nodeClassName instanceof Function ? props.nodeClassName : () => props.nodeClassName as MiniMapNodeFunc

const shapeRendering: ShapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'

const bb = computed(() => {
  return getRectOfNodes(store.getNodes)
})

const viewBB = controlledComputed(bb, () => ({
  x: -store.viewport.x / store.viewport.zoom,
  y: -store.viewport.y / store.viewport.zoom,
  width: store.dimensions.width / store.viewport.zoom,
  height: store.dimensions.height / store.viewport.zoom,
}))

const viewBox = controlledComputed(viewBB, () => {
  const boundingRect = store.getNodes && store.getNodes.length ? getBoundsofRects(bb.value, viewBB.value) : viewBB.value
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
})

const d = controlledComputed(viewBox, () => {
  if (viewBox.value.x && viewBox.value.y)
    return `
    M${viewBox.value.x - viewBox.value.offset},${viewBox.value.y - viewBox.value.offset}
    h${viewBox.value.width + viewBox.value.offset * 2}
    v${viewBox.value.height + viewBox.value.offset * 2}
    h${-viewBox.value.width - viewBox.value.offset * 2}z
    M${viewBB.value.x},${viewBB.value.y}
    h${viewBB.value.width}
    v${viewBB.value.height}
    h${-viewBB.value.width}z`
  else return ''
})

const onNodeClick = (event: MouseEvent, node: GraphNode) => {
  store.hooks.miniMapNodeClick.trigger({ event, node })
}

const onNodeDblClick = (event: MouseEvent, node: GraphNode) => {
  store.hooks.miniMapNodeDoubleClick.trigger({ event, node })
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
    :viewBox="[viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(',')"
    class="vue-flow__minimap"
  >
    <MiniMapNode
      v-for="node of store.getNodes"
      :id="node.id"
      :key="node.id"
      v-memo="[node.computedPosition, node.dimensions]"
      :position="node.computedPosition"
      :dimensions="node.dimensions"
      :style="node.style"
      :class="nodeClassNameFunc(node)"
      :color="nodeColorFunc(node)"
      :border-radius="props.nodeBorderRadius"
      :stroke-color="nodeStrokeColorFunc(node)"
      :stroke-width="props.nodeStrokeWidth"
      :shape-rendering="shapeRendering"
      @click="(e) => onNodeClick(e, node)"
      @dblclick="(e) => onNodeDblClick(e, node)"
    >
      <slot
        :id="node.id"
        :name="`node-${node.type}`"
        :parent-node="node.parentNode"
        :selected="node.selected"
        :dragging="node.dragging"
        :position="node.computedPosition"
        :dimensions="node.dimensions"
        :style="node.style"
        :class="nodeClassNameFunc(node)"
        :color="nodeColorFunc(node)"
        :border-radius="props.nodeBorderRadius"
        :stroke-color="nodeStrokeColorFunc(node)"
        :stroke-width="props.nodeStrokeWidth"
        :shape-rendering="shapeRendering"
      />
    </MiniMapNode>
    <path class="vue-flow__minimap-mask" :d="d" :fill="props.maskColor" fill-rule="evenodd" />
  </svg>
</template>
