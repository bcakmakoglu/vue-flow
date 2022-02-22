<script lang="ts" setup>
import { useVueFlow } from '~/index'
const { nodesSelectionActive, addSelectedNodes, getNodes, transform } = useVueFlow()

const selectAll = () => {
  addSelectedNodes(getNodes.value)
  nodesSelectionActive.value = true
}
</script>
<template>
  <aside>
    <div class="description">
      This is an example of how you can access the internal state outside of the Vue VueFlow component.
    </div>
    <div class="title">Zoom & pan transform</div>
    <div class="transform">
      {{ [transform[0].toFixed(2), transform[1].toFixed(2), transform[2].toFixed(2)] }}
    </div>
    <div class="title">Nodes</div>
    <div v-for="node of getNodes" :key="node.id">
      Node {{ node.id }} - x: {{ node.position.x.toFixed(2) }}, y: {{ node.position.y.toFixed(2) }}
    </div>

    <div class="selectall">
      <button @click="selectAll">select all nodes</button>
    </div>
  </aside>
</template>
