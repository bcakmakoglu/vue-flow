<script setup>
import { Panel, useVueFlow, VueFlow } from '@vue-flow/core';
import { computed, ref } from 'vue';

/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
const { onNodeDrag, getIntersectingNodes, isNodeIntersecting, updateNode, screenToFlowPosition } = useVueFlow();

const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 400, y: 400 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 0 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 0, y: 400 },
  },
  {
    id: '5',
    style: { borderColor: 'red' },
    data: { label: 'Drag me  over another node' },
    position: { x: 200, y: 200 },
  },
]);

const panelEl = ref();

const isIntersectingWithPanel = ref(false);

const panelPosition = computed(() => {
  if (!panelEl.value) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  const { left, top, width, height } = panelEl.value.$el.getBoundingClientRect();

  return {
    ...screenToFlowPosition({ x: left, y: top }),
    width,
    height,
  };
});

onNodeDrag(({ node: draggedNode }) => {
  const intersections = getIntersectingNodes(draggedNode);
  const intersectionIds = intersections.map(intersection => intersection.id);

  isIntersectingWithPanel.value = isNodeIntersecting(draggedNode, panelPosition.value);

  for (const node of nodes.value) {
    const isIntersecting = intersectionIds.includes(node.id);

    updateNode(node.id, { class: isIntersecting ? 'intersecting' : '' });
  }
});
</script>

<template>
  <VueFlow :nodes="nodes" fit-view>
    <Panel ref="panelEl" position="bottom-right" :class="{ intersecting: isIntersectingWithPanel }" />
  </VueFlow>
</template>
