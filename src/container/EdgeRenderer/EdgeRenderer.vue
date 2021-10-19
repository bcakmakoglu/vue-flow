<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { getSourceTargetNodes } from './utils'
import MarkerDefinitions from './MarkerDefinitions.vue'
import Edge from '~/components/Edges/Edge.vue'
import ConnectionLine from '~/components/ConnectionLine/ConnectionLine.vue'
import {
  ConnectionLineType,
  ConnectionMode,
  CustomConnectionLine,
  Dimensions,
  EdgeType,
  RevueFlowStore,
  Transform,
} from '~/types'

interface EdgeRendererProps {
  edgeTypes: Record<string, EdgeType>
  dimensions: Dimensions
  transform: Transform
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  customConnectionLine?: CustomConnectionLine
  connectionMode?: ConnectionMode
  arrowHeadColor?: string
  markerEndId?: string
  onlyRenderVisibleElements?: boolean
}

const props = withDefaults(defineProps<EdgeRendererProps>(), {
  transform: () => [0, 0, 1],
  arrowHeadColor: '#b1b1b7',
  dimensions: () => ({ width: 0, height: 0 }),
  onlyRenderVisibleElements: false,
  connectionMode: ConnectionMode.Strict,
  connectionLineType: ConnectionLineType.Bezier,
})

const store = inject<RevueFlowStore>('store')!

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
      <template v-for="(edge, i) of store.edges" :key="`edge-${i}`">
        <Edge
          :edge="edge"
          :nodes="getSourceTargetNodes(edge, store.nodes)"
          :type="props.edgeTypes[edge.type || 'default']"
          :dimensions="props.dimensions"
          :transform="props.transform"
          :only-render-visible-elements="props.onlyRenderVisibleElements"
          :marker-end-id="props.markerEndId"
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
