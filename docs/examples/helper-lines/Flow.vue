<script setup lang="ts">
import type { InternalNode, Node, NodeChange } from '@vue-flow/core';
import { useVueFlow, VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import HelperLines from './HelperLines.vue';
import { initialNodes } from './initialElements';
import { getHelperLines } from './utils';

const { applyNodeChanges } = useVueFlow();

const nodes = ref<Node[]>(initialNodes);

const helperLineHorizontal = ref<number | undefined>(undefined);
const helperLineVertical = ref<number | undefined>(undefined);

function updateHelperLines(changes: NodeChange[], nodes: InternalNode[]) {
  helperLineHorizontal.value = undefined;
  helperLineVertical.value = undefined;

  if (changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position) {
    const helperLines = getHelperLines(changes[0], nodes);

    // if we have a helper line, we snap the node to the helper line position
    // this is being done by manipulating the node position inside the change object
    changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x;
    changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y;

    // if helper lines are returned, we set them so that they can be displayed
    helperLineHorizontal.value = helperLines.horizontal;
    helperLineVertical.value = helperLines.vertical;
  }

  return changes;
}

function onNodesChange(changes: NodeChange[]) {
  const updatedChanges = updateHelperLines(changes, nodes.value as InternalNode[]);
  nodes.value = applyNodeChanges(updatedChanges);
}
</script>

<template>
  <VueFlow :nodes="nodes" fit-view @nodes-change="onNodesChange">
    <HelperLines :horizontal="helperLineHorizontal" :vertical="helperLineVertical" />
  </VueFlow>
</template>
