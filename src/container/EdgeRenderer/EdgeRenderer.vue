<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { ConnectionLineType } from '../../types'
import { useStore } from '../../composables'
import Edge from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import MarkerDefinitions from './MarkerDefinitions.vue'

interface EdgeRendererProps {
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  arrowHeadColor?: string
  markerEndId?: string
  edgeUpdaterRadius?: number
}

const props = withDefaults(defineProps<EdgeRendererProps>(), {
  arrowHeadColor: '#b1b1b7',
  connectionLineType: ConnectionLineType.Bezier,
  edgeUpdaterRadius: 10,
})

const store = useStore()

const sourceNode = computed(() => store.nodes.find((n) => n.id === store.connectionNodeId))
const connectionLineVisible = computed(
  () => !!(store.nodesConnectable && sourceNode.value && store.connectionNodeId && store.connectionHandleType),
)
const dimensions = computed(() => store.dimensions)
const transform = computed(() => `translate(${store.transform[0]},${store.transform[1]}) scale(${store.transform[2]})`)
</script>
<script lang="ts">
export default {
  name: 'Edges',
}
</script>
<template>
  <svg :width="dimensions.width" :height="dimensions.height" class="vue-flow__edges">
    <MarkerDefinitions :color="props.arrowHeadColor" />
    <g :transform="transform">
      <Edge
        v-for="(edge, i) of store.getEdges"
        :id="edge.id"
        :key="`${edge.id}-${i}`"
        :edge="edge"
        :type="edge.type"
        :source="edge.source"
        :target="edge.target"
        :source-handle="edge.sourceHandle"
        :target-handle="edge.targetHandle"
        :selected="edge.selected"
        :source-position="edge.sourcePosition"
        :target-position="edge.targetPosition"
        :label="edge.label"
        :label-tyle="edge.labelStyle"
        :label-show-bg="edge.labelShowBg"
        :label-bg-style="edge.labelBgStyle"
        :label-bg-padding="edge.labelBgPadding"
        :label-bg-border-radius="edge.labelBgBorderRadius"
        :style="edge.style"
        :animated="edge.animated"
        :arrow-head-type="edge.arrowHeadType"
        :data="edge.data"
        :class="edge.class"
        :is-hidden="edge.isHidden"
        :marker-end-id="edge.markerEndId ?? props.markerEndId"
        :edge-updater-radius="props.edgeUpdaterRadius"
      >
        <template #default="edgeProps">
          <slot :name="`edge-${edge.type}`" v-bind="edgeProps"></slot>
        </template>
      </Edge>
      <ConnectionLine
        v-if="connectionLineVisible && sourceNode"
        :source-node="sourceNode"
        :connection-line-style="props.connectionLineStyle"
        :connection-line-type="props.connectionLineType"
      >
        <template #default="customConnectionLineProps">
          <slot name="custom-connection-line" v-bind="customConnectionLineProps"></slot>
        </template>
      </ConnectionLine>
    </g>
  </svg>
</template>
