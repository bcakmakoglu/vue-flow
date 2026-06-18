<script lang="ts" setup>
import { computed } from 'vue';
import EdgeWrapper from '../../components/Edges/EdgeWrapper';
import { useVueFlow } from '../../composables';
import MarkerDefinitions from './MarkerDefinitions.vue';

const { getEdges } = useVueFlow();

// value-stable id list (see NodeRenderer): keeps this v-for's render effect from re-running on every
// edge commit — an edge data/selection update then re-renders only that edge's own wrapper, not all of them.
const edgeIds = computed<string[]>((prev) => {
  const ids = getEdges.value.map(edge => edge.id);
  return prev && prev.length === ids.length && prev.every((id, i) => id === ids[i]) ? prev : ids;
});
</script>

<script lang="ts">
export default {
  name: 'Edges',
  compatConfig: { MODE: 3 },
};
</script>

<template>
  <div class="vue-flow__edges">
    <MarkerDefinitions />

    <!-- iterate stable ids + v-memo so this v-for only re-runs on edge membership changes; an edge
    data/selection update re-renders just that edge's wrapper, and a node drag never touches it -->
    <EdgeWrapper v-for="id of edgeIds" :id="id" :key="id" v-memo="[id]" />
  </div>
</template>
