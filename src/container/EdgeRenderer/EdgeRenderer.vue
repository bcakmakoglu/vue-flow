<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { getSourceTargetNodes } from './utils'
import MarkerDefinitions from './MarkerDefinitions.vue'
import Edge from '~/components/Edges/Edge.vue'
import ConnectionLine from '~/components/ConnectionLine/ConnectionLine.vue'
import { ConnectionLineType, EdgeType } from '~/types'
import { Store } from '~/context'

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

const store = inject(Store)!

const sourceNode = computed(() => store.nodes.find((n) => n.id === store.connectionNodeId))
const connectionLineVisible = computed(
  () => store.nodesConnectable && sourceNode.value && store.connectionNodeId && store.connectionHandleType,
)
</script>
<template>
  <svg :width="store.dimensions.width" :height="store.dimensions.height" class="revue-flow__edges">
    <MarkerDefinitions :color="props.arrowHeadColor" />
    <g
      :transform="store.transform.length && `translate(${store.transform[0]},${store.transform[1]}) scale(${store.transform[2]})`"
    >
      <template v-for="edge of store.edges" :key="edge.id">
        <Edge
          v-if="!edge.isHidden"
          :edge="edge"
          :nodes="getSourceTargetNodes(edge, store.nodes)"
          :type="props.edgeTypes[edge.type || 'default']"
          :marker-end-id="props.markerEndId"
          :edge-updater-radius="props.edgeUpdaterRadius"
        >
          <template #default="edgeProps">
            <slot name="edge" v-bind="edgeProps"></slot>
          </template>
        </Edge>
      </template>
      <ConnectionLine
        v-if="connectionLineVisible"
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
