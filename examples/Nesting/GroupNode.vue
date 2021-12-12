<script lang="ts" setup>
import { Handle, Position, getNodesInside, useVueFlow } from '~/index'
import type { NodeProps } from '~/types/node'

const props = defineProps<NodeProps>()
const store = useVueFlow()
store.hooks.nodeDragStop.on(({ node }) => {
  const nodes = getNodesInside(
    store.getNodes,
    {
      ...props.dimensions,
      x: props.computedPosition.x,
      y: props.computedPosition.y,
    },
    store.transform,
  )
  console.log(nodes)
  if (nodes.some((n) => n.id === node.id && n.id !== props.id)) {
    node.label = `In ${props.id}`
    node.data = {
      group: props.id,
    }
  } else if (node.data?.group === props.id) {
    node.data.group = undefined
    node.label = node.id
  }
})
</script>
<template>
  <div class="vue-flow__group-node">
    <Handle type="target" :position="Position.Top" />
    <strong>Group {{ label }}</strong>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
<style>
.vue-flow__group-node {
  padding: 15px;
  width: 300px;
  height: 300px;
  border: solid 1px black;
}
</style>
