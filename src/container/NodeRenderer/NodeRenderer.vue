<script lang="ts" setup>
import { invoke } from '@vueuse/core'
import { useStore } from '../../composables'
import Node from '../../components/Nodes/Node.vue'

interface NodeRendererProps {
  selectNodesOnDrag?: boolean
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  selectNodesOnDrag: true,
})

const store = useStore()

invoke(async () => {
  await until(store.getNodes).toMatch((y) => y && y.length > 0)
  await until(store.transform).toMatch(([x, y, z]) => !isNaN(x) && x !== 0 && !isNaN(y) && y !== 0 && isNaN(z) && z !== 1)
})
const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
const snapGrid = computed(() => (store.snapToGrid ? store.snapGrid : undefined))
</script>
<template>
  <Suspense>
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
  </Suspense>
</template>
