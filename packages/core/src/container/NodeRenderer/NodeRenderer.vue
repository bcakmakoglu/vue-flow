<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';
import { NodeWrapper } from '../../components';
import { useStore, useVueFlow } from '../../composables';
import { useNodesInitialized } from '../../composables/useNodesInitialized';

const { getNodes, updateNodeDimensions, emits } = useVueFlow();

const { nodeLookup } = useStore();

// Iterate a value-stable id list so this v-for's render effect only re-runs when node *membership*
// changes — not on every commit (each position/data update replaces the whole `nodes` array). A moved
// node still re-renders through its own lookup-backed computed in NodeWrapper; this keeps a single-node
// drag from re-diffing all N children every frame.
const nodeIds = computed<string[]>((prev) => {
  const ids = getNodes.value.map(node => node.id);
  return prev && prev.length === ids.length && prev.every((id, i) => id === ids[i]) ? prev : ids;
});

const nodesInitialized = useNodesInitialized();

const resizeObserver = shallowRef<ResizeObserver>();

watch(
  nodesInitialized,
  (isInit) => {
    if (isInit) {
      nextTick(() => {
        emits.nodesInitialized(Array.from(nodeLookup.values(), node => node.internals.userNode));
      });
    }
  },
  { immediate: true },
);

onMounted(() => {
  resizeObserver.value = new ResizeObserver((entries) => {
    const updates = entries.map((entry) => {
      const id = entry.target.getAttribute('data-id') as string;

      return {
        id,
        nodeElement: entry.target as HTMLDivElement,
        forceUpdate: true,
      };
    });

    nextTick(() => updateNodeDimensions(updates));
  });
});

onBeforeUnmount(() => resizeObserver.value?.disconnect());
</script>

<script lang="ts">
export default {
  name: 'Nodes',
  compatConfig: { MODE: 3 },
};
</script>

<template>
  <div class="vue-flow__nodes vue-flow__container">
    <template v-if="resizeObserver">
      <NodeWrapper v-for="id of nodeIds" :id="id" :key="id" v-memo="[id]" :resize-observer="resizeObserver" />
    </template>
  </div>
</template>
