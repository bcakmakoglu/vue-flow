<script setup>
import { Background, VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import { initialEdges, initialNodes } from './initial-elements.js';
import OperatorNode from './OperatorNode.vue';
import ResultNode from './ResultNode.vue';
import ValueNode from './ValueNode.vue';

const nodes = ref(initialNodes);

const edges = ref(initialEdges);
</script>

<template>
  <VueFlow class="math-flow" :nodes="nodes" :edges="edges" fit-view>
    <template #node-value="props">
      <ValueNode :id="props.id" :data="props.data" />
    </template>

    <template #node-operator="props">
      <OperatorNode :id="props.id" :data="props.data" />
    </template>

    <template #node-result="props">
      <ResultNode :id="props.id" />
    </template>

    <Background />
  </VueFlow>
</template>
