<script setup>
import { Panel, storeToRefs, useStore, useVueFlow } from '@vue-flow/core';
import Icon from './Icon.vue';

const flowKey = 'vue-flow--save-restore';

const { addNodes, toObject, setNodes, setEdges, setViewport } = useVueFlow();

const { nodes, dimensions } = storeToRefs(useStore());

function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject()));
}

function onRestore() {
  const flow = JSON.parse(localStorage.getItem(flowKey));

  if (flow) {
    // `fromObject` was removed in v2 — restore explicitly so you control when it runs.
    // The flow is already initialized here (restore is a user action), so `setViewport` applies immediately.
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setViewport(flow.viewport);
  }
}

function onAdd() {
  const id = nodes.value.length + 1;

  const newNode = {
    id: `random_node-${id}`,
    data: { label: `Node ${id}` },
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  };

  addNodes([newNode]);
}
</script>

<template>
  <Panel position="top-right">
    <div class="buttons">
      <button title="save graph" @click="onSave">
        <Icon name="save" />
      </button>
      <button title="restore graph" @click="onRestore">
        <Icon name="restore" />
      </button>
      <button title="add random node" @click="onAdd">
        <Icon name="add" />
      </button>
    </div>
  </Panel>
</template>
