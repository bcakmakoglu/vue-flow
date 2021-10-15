<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Edge from '~/components/Edges/Edge'
import { ConnectionLineComponent, ConnectionLineType, ConnectionMode, Dimensions, Edge as TEdge, Transform } from '~/types'
import MarkerDefinitions from '~/container/MarkerDefinitions.vue'

interface EdgeRendererProps {
  edges: TEdge[]
  edgeTypes: any
  transform: Transform
  connectionLineType: ConnectionLineType
  connectionLineStyle?: CSSProperties
  connectionLineComponent?: ConnectionLineComponent
  connectionMode?: ConnectionMode
  arrowHeadColor: string
  markerEndId?: string
  onlyRenderVisibleElements: boolean
  edgeUpdaterRadius?: number
  dimensions: Dimensions
}

const props = withDefaults(defineProps<EdgeRendererProps>(), {
  transform: () => [0, 0, 1],
  edges: () => [],
  arrowHeadColor: '#fff',
  dimensions: () => ({ width: 0, height: 0 }),
})
</script>
<template>
  <svg :width="props.dimensions.width" :height="props.dimensions.height" class="revue-flow__edges">
    <MarkerDefinitions :color="props.arrowHeadColor" />
    <g
      :transform="
        props.transform &&
        props.transform.length &&
        `translate(${props.transform[0]},${props.transform[1]}) scale(${props.transform[2]})`
      "
    >
      <template v-for="(edge, i) of props.edges" :key="`edge-${i}`">
        <Edge
          :edge="edge"
          :type="props.edgeTypes[edge.type || 'default']"
          :only-render-visible-elements="props.onlyRenderVisibleElements"
          :marker-end-id="props.markerEndId"
        />
      </template>
    </g>
  </svg>
</template>
