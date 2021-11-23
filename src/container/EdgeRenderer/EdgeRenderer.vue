<script lang="ts" setup>
import { CSSProperties } from 'vue'
import {
  ConnectionLineType,
  ConnectionMode,
  Dimensions,
  EdgeComponent,
  ElementId,
  GraphEdge,
  GraphNode,
  HandleType,
  Transform,
  XYPosition,
} from '../../types'
import EdgeWrapper from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import MarkerDefinitions from './MarkerDefinitions.vue'

interface EdgeRendererProps {
  edges: GraphEdge[]
  nodes: GraphNode[]
  edgeTypes: Record<string, EdgeComponent>
  transform: Transform
  dimensions: Dimensions
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  arrowHeadColor?: string
  markerEndId?: string
  elementsSelectable?: boolean
  edgeUpdaterRadius?: number
  connectionNodeId?: ElementId
  connectionHandleType?: HandleType
  connectionHandleId?: ElementId
  connectionPosition?: XYPosition
  connectionMode: ConnectionMode
  nodesConnectable?: boolean
}

const props = withDefaults(defineProps<EdgeRendererProps>(), {
  arrowHeadColor: '#b1b1b7',
  connectionLineType: ConnectionLineType.Bezier,
  edgeUpdaterRadius: 10,
})

const getType = (type?: string) => {
  const t = type ?? 'default'
  let edgeType = props.edgeTypes[t]
  if (!edgeType) {
    edgeType = props.edgeTypes.default
    console.warn(`Edge type "${type}" not found. Using fallback type "default".`)
  }
  return edgeType
}

const sourceNode = controlledComputed(
  () => props.connectionNodeId,
  () => {
    if (props.connectionNodeId) return props.nodes[props.nodes.map((n) => n.id).indexOf(props.connectionNodeId)]
  },
)
const connectionLineVisible = controlledComputed(
  () => props.connectionNodeId,
  () =>
    !!(
      sourceNode.value &&
      (typeof sourceNode.value.connectable === 'undefined' ? props.nodesConnectable : sourceNode.value.connectable) &&
      props.connectionNodeId &&
      props.connectionHandleType
    ),
)
const transform = computed(() => `translate(${props.transform[0]},${props.transform[1]}) scale(${props.transform[2]})`)
</script>
<script lang="ts">
export default {
  name: 'Edges',
}
</script>
<template>
  <svg :width="props.dimensions.width" :height="props.dimensions.height" class="vue-flow__edges">
    <MarkerDefinitions :color="props.arrowHeadColor" />
    <g :transform="transform">
      <EdgeWrapper
        v-for="(edge, i) of props.edges"
        :key="`${edge.id}-${i}`"
        :edge="edge"
        :component="getType(edge.type)"
        :selectable="props.elementsSelectable"
        :edge-updater-radius="props.edgeUpdaterRadius"
        :dimensions="props.dimensions"
        :transform="props.transform"
      >
        <template #default="edgeProps">
          <slot :name="`edge-${edge.type}`" v-bind="edgeProps"></slot>
        </template>
      </EdgeWrapper>
      <ConnectionLine
        v-if="connectionLineVisible && sourceNode"
        :vf="sourceNode?.__vf"
        :connection-line-style="props.connectionLineStyle"
        :connection-line-type="props.connectionLineType"
        :connection-handle-id="props.connectionHandleId"
        :connection-node-id="props.connectionNodeId"
        :connection-handle-type="props.connectionHandleType"
        :connection-position="props.connectionPosition"
        :connection-mode="props.connectionMode"
        :nodes="props.nodes"
        :transform="props.transform"
      >
        <template #default="customConnectionLineProps">
          <slot name="custom-connection-line" v-bind="customConnectionLineProps"></slot>
        </template>
      </ConnectionLine>
    </g>
  </svg>
</template>
