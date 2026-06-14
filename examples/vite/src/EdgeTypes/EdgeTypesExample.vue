<script lang="ts" setup>
import type { Edge, Node } from '@vue-flow/core';
import { Controls, isEdge, isNode, MiniMap, VueFlow } from '@vue-flow/core';

import { getElements } from './utils';

const initialElements = getElements();
const nodes = ref<Node[]>(initialElements.filter(isNode));
const edges = ref<Edge[]>(initialElements.filter(isEdge));
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" :min-zoom="0.2" fit-view>
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
