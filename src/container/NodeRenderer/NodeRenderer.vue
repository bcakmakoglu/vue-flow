<script lang="ts" setup>
import { useStore } from '../../composables'
import Node from '../../components/Nodes/NodeWrapper.vue'
import { SnapGrid } from '../../types'

interface NodeRendererProps {
  selectNodesOnDrag?: boolean
  snapToGrid?: boolean
  snapGrid?: SnapGrid
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  selectNodesOnDrag: true,
})

const store = useStore()

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
const snapGrid = computed(() => (props.snapToGrid || store.snapToGrid ? props.snapGrid ?? store.snapGrid : undefined))
</script>
<script lang="ts">
export default {
  name: 'Nodes',
}
</script>
<template>
  <div class="vue-flow__nodes" :style="{ transform }">
    <Node
      v-for="node of store.getNodes"
      :key="node.id"
      :node="node"
      :snap-grid="snapGrid"
      :select-nodes-on-drag="props.selectNodesOnDrag"
    >
      <template #default="nodeProps">
        <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
      </template>
    </Node>
  </div>
</template>
