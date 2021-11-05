<script lang="ts" setup>
import { useStore } from '@braks/vue-flow'
const store = useStore()

const nodes = computed(() => store.nodes)
const transform = computed(() => store.transform)

const selectAll = () => {
  store.selectedElements = nodes.value
  store.unsetUserSelection()
}
</script>
<template>
  <aside>
    <div class="description">This is an example of how you can access the internal state outside of the Vue Flow component.</div>
    <div class="title">Zoom & pan transform</div>
    <div class="transform">{{ [transform[0].toFixed(2), transform[1].toFixed(2), transform[2].toFixed(2)] }}</div>
    <div class="title">Nodes</div>
    <div v-for="node of nodes" :key="node.id">
      Node {{ node.id }} - x: {{ node.__rf.position.x.toFixed(2) }}, y: {{ node.__rf.position.y.toFixed(2) }}
    </div>

    <div class="selectall">
      <button class="button" @click="selectAll">select all nodes</button>
    </div>
  </aside>
</template>
