<script lang="ts" setup>
import { Handle, Position, getNodesInside, useVueFlow } from '~/index'
import type { NodeProps } from '~/types/node'

const props = defineProps<NodeProps>()
const store = useVueFlow()
store.hooks.nodeDragStop.on(({ node }) => {
  const nodes = getNodesInside(
    store.getNodes,
    {
      height: props.__vf.height,
      width: props.__vf.width,
      x: props.position.x,
      y: props.position.y,
    },
    store.transform,
  )
  if (nodes.some((n) => n.id === node.id)) {
    node.data.label = `In ${props.id}`
    node.data.group = props.id
  } else if (node.data.group === props.id) {
    node.data.group = undefined
    node.data.label = node.id
  }
})
</script>
<template>
  <div class="vue-flow__group-node">
    <Handle type="target" :position="Position.Top" />
    <strong>Group {{ data.label }}</strong>
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
