<script lang="ts" setup>
import { CSSProperties } from 'vue'
import MarkerDefinitions from './MarkerDefinitions.vue'
import Edge from '~/components/Edges/Edge.vue'
import ConnectionLine from '~/components/ConnectionLine/ConnectionLine.vue'
import { ConnectionLineType, EdgeType } from '~/types'
import { useStore } from '~/composables'

interface EdgeRendererProps {
  edgeTypes: Record<string, EdgeType>
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
const edges = computed(() => store.edges.filter((edge) => !edge.isHidden))
</script>
<template>
  <svg :width="store.dimensions.width" :height="store.dimensions.height" class="vue-flow__edges">
    <MarkerDefinitions :color="props.arrowHeadColor" />
    <g :transform="`translate(${store.transform[0]},${store.transform[1]}) scale(${store.transform[2]})`">
      <template v-for="edge of edges" :key="edge.id">
        <Edge
          :edge="edge"
          :type="props.edgeTypes[edge.type || 'default']"
          :marker-end-id="props.markerEndId"
          :edge-updater-radius="props.edgeUpdaterRadius"
        >
          <template #default="edgeProps">
            <slot :name="`edge-${edge.type}`" v-bind="edgeProps"></slot>
          </template>
        </Edge>
      </template>
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
