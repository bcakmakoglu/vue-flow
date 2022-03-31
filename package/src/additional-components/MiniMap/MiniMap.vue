<script lang="ts" setup>
import { ShapeRendering, MiniMapNodeFunc } from '../../types'
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

const nodeClassNameFunc = props.nodeClassName instanceof Function ? props.nodeClassName : () => props.nodeClassName as MiniMapNodeFunc

const shapeRendering: ShapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'

const bb = computed(() => getRectOfNodes(store.getNodes))
const viewBB = computed(() => ({
  x: -store.transform[0] / store.transform[2],
  y: -store.transform[1] / store.transform[2],
  width: store.dimensions.width / store.transform[2],
  height: store.dimensions.height / store.transform[2],
}))
const viewBox = computed(() => {
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

const d = computed(() => {
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
    :viewBox="`${viewBox.x || 0} ${viewBox.y || 0} ${viewBox.width || 0} ${viewBox.height || 0}`"
    class="vue-flow__minimap"
  >
    <template v-for="node of store.getNodes" :key="`mini-map-node-${node.id}`">
      <slot
        :name="`node-${node.type}`"
        :position="node.computedPosition"
        :dimensions="node.dimensions"
        :style="node.style"
        :class="nodeClassNameFunc(node)"
        :color="nodeColorFunc(node)"
        :border-radius="props.nodeBorderRadius"
        :stroke-color="nodeStrokeColorFunc(node)"
        :stroke-width="props.nodeStrokeWidth"
        :shape-rendering="shapeRendering"
      >
        <MiniMapNode
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
      </slot>
    </template>
    <path class="vue-flow__minimap-mask" :d="d" :fill="props.maskColor" fill-rule="evenodd" />
  </svg>
</template>
