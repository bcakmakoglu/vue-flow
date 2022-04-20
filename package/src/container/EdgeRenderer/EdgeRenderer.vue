<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useVueFlow } from '../../composables'
import { getRectOfNodes, groupEdgesByZLevel } from '../../utils'
import MarkerDefinitions from './MarkerDefinitions.vue'

const { store } = useVueFlow()

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

const getNode = computed(() => (node: string) => store.getNode(node)!)

const memoizedGroups = useMemoize(groupEdgesByZLevel)
const groups = computed(() => memoizedGroups(store.getEdges, getNode.value))

const rect = computed(() => {
  const bounds = getRectOfNodes(store.getNodes)
  const y = (bounds.y === 0 ? -50 : bounds.y) * 2
  const x = (bounds.x === 0 ? -50 : bounds.x) * 2
  const width = bounds.width + Math.abs(x) * 1.5
  const height = bounds.height + Math.abs(y) * 1.5

  return {
    width: `${width}px`,
    height: `${height}px`,
    transformSvg: y && x > 0 ? undefined : `translateY(${y > 0 ? 0 : y}px) translateX(${x > 0 ? 0 : x}px)`,
    transformPath: y && x > 0 ? undefined : `translateY(${Math.abs(y > 0 ? 0 : y)}px) translateX(${Math.abs(x > 0 ? 0 : x)}px)`,
  }
})
</script>
<script lang="ts">
export default {
  name: 'Edges',
}
</script>
<template>
  <svg
    v-for="group of groups"
    :key="group.level"
    class="vue-flow__edges vue-flow__container"
    :style="{
      zIndex: group.level,
      transform: rect.transformSvg,
      width: rect.width,
      height: rect.height,
    }"
  >
    <MarkerDefinitions v-if="group.isMaxLevel" :default-color="store.defaultMarkerColor" />
    <g :style="{ transform: rect.transformPath }">
      <EdgeWrapper
        v-for="edge of group.edges"
        :id="edge.id"
        :key="edge.id"
        :edge="edge"
        :source-node="getNode(edge.source)"
        :target-node="getNode(edge.target)"
        :selectable="typeof edge.selectable === 'undefined' ? store.elementsSelectable : edge.selectable"
        :updatable="typeof edge.updatable === 'undefined' ? store.edgesUpdatable : edge.updatable"
      />
      <ConnectionLine v-if="connectionLineVisible && sourceNode" :source-node="sourceNode" />
    </g>
  </svg>
</template>
