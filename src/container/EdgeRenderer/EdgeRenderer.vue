<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useStore } from '../../composables'
import MarkerDefinitions from './MarkerDefinitions.vue'

const store = useStore()
const getType = (type?: string) => {
  const t = type ?? 'default'
  let edgeType = store.getEdgeTypes[t]
  if (!edgeType) {
    edgeType = store.getEdgeTypes.default
    console.warn(`Edge type "${type}" not found. Using fallback type "default".`)
  }
  return edgeType
}

const sourceNode = controlledComputed(
  () => store.connectionNodeId,
  () => {
    if (store.connectionNodeId) return store.getNodes[store.getNodes.map((n) => n.id).indexOf(store.connectionNodeId)]
  },
)
const connectionLineVisible = controlledComputed(
  () => store.connectionNodeId,
  () =>
    !!(
      sourceNode.value &&
      (typeof sourceNode.value.connectable === 'undefined' ? store.nodesConnectable : sourceNode.value.connectable) &&
      store.connectionNodeId &&
      store.connectionHandleType
    ),
)
const transform = computed(() => `translate(${store.transform[0]},${store.transform[1]}) scale(${store.transform[2]})`)
</script>
<script lang="ts">
export default {
  name: 'Edges',
}
</script>
<template>
  <svg :width="store.dimensions.width" :height="store.dimensions.height" class="vue-flow__edges">
    <MarkerDefinitions :color="store.arrowHeadColor" />
    <g :transform="transform">
      <EdgeWrapper
        v-for="(edge, i) of store.getEdges"
        :key="`${edge.id}-${i}`"
        :edge="edge"
        :component="getType(edge.type)"
        :selectable="store.elementsSelectable"
        :updatable="typeof edge.updatable === 'undefined' ? store.edgesUpdatable : edge.updatable"
        :edge-updater-radius="store.edgeUpdaterRadius"
        :dimensions="store.dimensions"
        :transform="store.transform"
      >
        <template #default="edgeProps">
          <slot :name="`edge-${edge.type}`" v-bind="edgeProps"></slot>
        </template>
      </EdgeWrapper>
      <ConnectionLine v-if="connectionLineVisible && sourceNode" :source-node="sourceNode">
        <template #default="customConnectionLineProps">
          <slot name="custom-connection-line" v-bind="customConnectionLineProps"></slot>
        </template>
      </ConnectionLine>
    </g>
  </svg>
</template>
