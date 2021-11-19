<script lang="ts" setup>
import { invoke } from '@vueuse/core'
import { Node as TNode } from '../../types'
import { useStore } from '../../composables'
import Node from '../../components/Nodes/Node.vue'

interface NodeRendererProps {
  selectNodesOnDrag?: boolean
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  selectNodesOnDrag: true,
})

const store = useStore()

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
const snapGrid = computed(() => (store.snapToGrid ? store.snapGrid : undefined))

const type = (node: TNode) => {
  const nodeType = node.type || 'default'
  const type = store.getNodeTypes[nodeType] || store.getNodeTypes.default
  if (!store.getNodeTypes[nodeType]) {
    console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`)
  }
  return type
}
invoke(async () => {
  await until(store.getNodes).toMatch((y) => y.length > 0)
  await until(store.transform).toMatch(([x, y, z]) => x !== 0 && y !== 0 && z !== 1)
})
</script>
<template>
  <div class="vue-flow__nodes" :style="{ transform }">
    <Suspense>
      <Node
        v-for="node of store.getNodes"
        :key="node.id"
        :node="node"
        :type="type(node)"
        :snap-grid="snapGrid"
        :select-nodes-on-drag="props.selectNodesOnDrag"
      >
        <template #default="nodeProps">
          <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
        </template>
      </Node>
    </Suspense>
  </div>
</template>
