<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useVueFlow } from '../../composables'
import { groupEdgesByZLevel } from '../../utils'
import { Slots } from '../../context'
import { EdgeComponent } from '../../types'
import MarkerDefinitions from './MarkerDefinitions.vue'

const { store } = useVueFlow()

const slots = inject(Slots)

const names: Record<string, string> = reactive({})

const getType = (name = 'default') => {
  const instance = getCurrentInstance()
  let edgeType = store.getEdgeTypes[name]
  if (typeof edgeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        edgeType = resolveComponent(name, false) as EdgeComponent
      }
    }
  }

  if (typeof edgeType !== 'string') {
    names[name] = name
    return edgeType
  }

  const slot = slots?.[`node-${name}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Edge type "${name}" not found and no edge-slot detected. Using fallback type "default".`)
    names[name] = 'default'
    return store.getEdgeTypes.default
  }

  names[name] = name
  return slot
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
const groups = computed(() => groupEdgesByZLevel(store.getEdges, store.getNodes))
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
    :width="store.dimensions.width"
    :height="store.dimensions.height"
    class="vue-flow__edges vue-flow__container"
    :style="`z-index: ${group.level}`"
  >
    <MarkerDefinitions v-if="group.isMaxLevel" :default-color="store.defaultMarkerColor" />
    <g>
      <EdgeWrapper
        v-for="edge of group.edges"
        :id="edge.id"
        :key="edge.id"
        :edge="edge"
        :name="names[edge.type] || 'default'"
        :selectable="typeof edge.selectable === 'undefined' ? store.elementsSelectable : edge.selectable"
        :updatable="typeof edge.updatable === 'undefined' ? store.edgesUpdatable : edge.updatable"
      >
        <template #default="props">
          <component :is="getType(edge.type)" v-bind="props" />
        </template>
      </EdgeWrapper>
      <ConnectionLine v-if="connectionLineVisible && sourceNode" :source-node="sourceNode">
        <slot name="connection-line" />
      </ConnectionLine>
    </g>
  </svg>
</template>
