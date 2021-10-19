<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import MiniMapNodeDepr from './MiniMapNodeDepr'
import { getRectOfNodes, getBoundsofRects } from '~/utils/graph'
import { Node, Rect, RevueFlowStore } from '~/types'

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

const store = inject<RevueFlowStore>('store')!
const transform = computed(() => store.transform)
const elementWidth = computed(() => (attrs.style?.width ?? defaultWidth)! as number)
const elementHeight = computed(() => (attrs.style?.height ?? defaultHeight)! as number)
const nodeColorFunc = computed(
  () => (props.nodeColor instanceof Function ? props.nodeColor : () => props.nodeColor) as StringFunc,
)
const nodeStrokeColorFunc = computed(
  () => (props.nodeStrokeColor instanceof Function ? props.nodeStrokeColor : () => props.nodeStrokeColor) as StringFunc,
)
const nodeClassNameFunc = computed(
  () => (props.nodeClassName instanceof Function ? props.nodeClassName : () => props.nodeClassName) as StringFunc,
)
const hasNodes = computed(() => store.nodes && store.nodes.length)
const bb = computed(() => getRectOfNodes(store.nodes))
const viewBB = computed<Rect>(() => ({
  x: -transform.value[0] / transform.value[2],
  y: -transform.value[1] / transform.value[2],
  width: store.width / transform.value[2],
  height: store.height / transform.value[2],
}))
const boundingRect = computed(() => (hasNodes.value ? getBoundsofRects(bb.value, viewBB.value) : viewBB.value))
const scaledWidth = computed(() => boundingRect.value.width / elementWidth.value)
const scaledHeight = computed(() => boundingRect.value.height / elementHeight.value)
const viewScale = computed(() => Math.max(scaledWidth.value, scaledHeight.value))
const viewWidth = computed(() => viewScale.value * elementWidth.value)
const viewHeight = computed(() => viewScale.value * elementHeight.value)
const offset = computed(() => 5 * viewScale.value)
const x = computed(() => boundingRect.value.x - (viewWidth.value - boundingRect.value.width) / 2 - offset.value)
const y = computed(() => boundingRect.value.y - (viewHeight.value - boundingRect.value.height) / 2 - offset.value)
const width = computed(() => viewWidth.value + offset.value * 2)
const height = computed(() => viewHeight.value + offset.value * 2)
const shapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'
</script>
<template>
  <svg :width="elementWidth" :height="elementHeight" :viewBox="`${x} ${y} ${width} ${height}`" class="revue-flow__minimap">
    <template v-for="(node, i) of store.nodes" :key="`mini-map-node-${i}`">
      <MiniMapNodeDepr
        v-if="!node.isHidden"
        :x="node.__rf.position.x"
        :y="node.__rf.position.y"
        :width="node.__rf.width || 0"
        :height="node.__rf.height || 0"
        :style="node.style"
        :class="nodeClassNameFunc(node)"
        :color="nodeColorFunc(node)"
        :border-radius="props.nodeBorderRadius"
        :stroke-color="nodeStrokeColorFunc(node)"
        :stroke-width="props.nodeStrokeWidth"
        :shape-rendering="shapeRendering"
      />
    </template>
    <path
      class="revue-flow__minimap-mask"
      :d="`M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
      M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z`"
      :fill="props.maskColor"
      fill-rule="evenodd"
    />
  </svg>
</template>
