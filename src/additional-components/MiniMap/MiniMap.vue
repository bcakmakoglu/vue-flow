<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import MiniMapNode from './MiniMapNode.vue'
import { getBoundsofRects, getRectOfNodes } from '~/utils'
import { Node } from '~/types'
import { useStore } from '~/composables'

type StringFunc = (node: Node) => string

export interface MiniMapProps extends HTMLAttributes {
  nodeColor?: string | StringFunc
  nodeStrokeColor?: string | StringFunc
  nodeClassName?: string | StringFunc
  nodeBorderRadius?: number
  nodeStrokeWidth?: number
  maskColor?: string
}

const props = withDefaults(defineProps<MiniMapProps>(), {
  nodeStrokeColor: '#555',
  nodeColor: '#fff',
  nodeClassName: '',
  nodeBorderRadius: 5,
  nodeStrokeWidth: 2,
  maskColor: 'rgb(240, 242, 243, 0.7)',
})
const attrs: any = useAttrs()

declare const window: any

const defaultWidth = 200
const defaultHeight = 150

const store = useStore()

const elementWidth = attrs.style?.width ?? defaultWidth
const elementHeight = attrs.style?.height ?? defaultHeight
const nodeColorFunc = props.nodeColor instanceof Function ? props.nodeColor : () => props.nodeColor as StringFunc
const nodeStrokeColorFunc =
  props.nodeStrokeColor instanceof Function ? props.nodeStrokeColor : () => props.nodeStrokeColor as StringFunc

const nodeClassNameFunc = props.nodeClassName instanceof Function ? props.nodeClassName : () => props.nodeClassName as StringFunc

const shapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'

const viewBox = computed(() => {
  const bb = getRectOfNodes(store.nodes)
  const viewBB = {
    x: -store.transform[0] / store.transform[2],
    y: -store.transform[1] / store.transform[2],
    width: store.dimensions.width / store.transform[2],
    height: store.dimensions.height / store.transform[2],
  }
  const boundingRect = store.nodes && store.nodes.length ? getBoundsofRects(bb, viewBB) : viewBB
  const scaledWidth = boundingRect.width / elementWidth
  const scaledHeight = boundingRect.height / elementHeight
  const viewScale = Math.max(scaledWidth, scaledHeight)
  const viewWidth = viewScale * elementWidth
  const viewHeight = viewScale * elementHeight
  const offset = 5 * viewScale
  return {
    viewBB,
    offset,
    x: boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset,
    y: boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset,
    width: viewWidth + offset * 2,
    height: viewHeight + offset * 2,
  }
})
</script>
<template>
  <svg
    :width="elementWidth"
    :height="elementHeight"
    :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`"
    class="revue-flow__minimap"
  >
    <slot name="mini-map-nodes" :nodes="store.nodes" :view-box="viewBox">
      <template v-for="(node, i) of store.nodes" :key="`mini-map-node-${i}`">
        <MiniMapNode
          v-if="!node.isHidden"
          :x="node.__rf.position.x"
          :y="node.__rf.position.y"
          :width="node.__rf.width"
          :height="node.__rf.height"
          :style="node.style"
          :class="nodeClassNameFunc(node)"
          :color="nodeColorFunc(node)"
          :border-radius="props.nodeBorderRadius"
          :stroke-color="nodeStrokeColorFunc(node)"
          :stroke-width="props.nodeStrokeWidth"
          :shape-rendering="shapeRendering"
        />
      </template>
    </slot>
    <path
      class="revue-flow__minimap-mask"
      :d="`
      M${viewBox.x - viewBox.offset},${viewBox.y - viewBox.offset}h${viewBox.width + viewBox.offset * 2}
      v${viewBox.height + viewBox.offset * 2}
      h${-viewBox.width - viewBox.offset * 2}z
      M${viewBox.viewBB.x},${viewBox.viewBB.y}h${viewBox.viewBB.width}v${viewBox.viewBB.height}h${-viewBox.viewBB.width}z`"
      :fill="props.maskColor"
      fill-rule="evenodd"
    />
  </svg>
</template>
