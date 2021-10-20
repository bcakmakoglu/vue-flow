<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { getSourceTargetNodes } from './utils'
import MarkerDefinitions from './MarkerDefinitions.vue'
import Edge from '~/components/Edges/Edge.vue'
import ConnectionLine from '~/components/ConnectionLine/ConnectionLine.vue'
import { ConnectionLineType, CustomConnectionLine, Dimensions, EdgeType, Transform } from '~/types'
import { Store } from '~/context'

interface EdgeRendererProps {
  edgeTypes: Record<string, EdgeType>
  dimensions: Dimensions
  transform: Transform
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  customConnectionLine?: CustomConnectionLine
  arrowHeadColor?: string
  markerEndId?: string
  edgeUpdaterRadius?: number
}

const props = withDefaults(defineProps<EdgeRendererProps>(), {
  transform: () => [0, 0, 1],
  arrowHeadColor: '#b1b1b7',
  dimensions: () => ({ width: 0, height: 0 }),
  connectionLineType: ConnectionLineType.Bezier,
  edgeUpdaterRadius: 10,
})

const store = inject(Store)!

const sourceNode = computed(() => store.nodes.find((n) => n.id === store.connectionNodeId))
const connectionLineVisible = computed(
  () => store.nodesConnectable && sourceNode.value && store.connectionNodeId && store.connectionHandleType,
)
</script>
<template>
  <svg :width="props.dimensions.width" :height="props.dimensions.height" class="revue-flow__edges">
    <MarkerDefinitions :color="props.arrowHeadColor" />
    <g
      :transform="props.transform.length && `translate(${props.transform[0]},${props.transform[1]}) scale(${props.transform[2]})`"
    >
      <template v-for="edge of store.edges" :key="edge.id">
        <Edge
          v-if="!edge.isHidden"
          :edge="edge"
          :nodes="getSourceTargetNodes(edge, store.nodes)"
          :type="props.edgeTypes[edge.type || 'default']"
          :dimensions="props.dimensions"
          :transform="props.transform"
          :marker-end-id="props.markerEndId"
          :edge-updater-radius="props.edgeUpdaterRadius"
        />
      </template>
      <ConnectionLine
        v-if="connectionLineVisible"
        :source-node="sourceNode"
        :connection-line-style="props.connectionLineStyle"
        :connection-line-type="props.connectionLineType"
        :custom-connection-line="props.customConnectionLine"
      />
    </g>
  </svg>
</template>
