<script lang="ts" setup>
import type { Connection, Edge, Node, Styles, VueFlowInstance } from '@vue-flow/core';
import { Background, ConnectionLineType, Controls, VueFlow } from '@vue-flow/core';

import Cross from '~icons/mdi/window-close';

const emit = defineEmits(['pane']);

// In 2.0 `class`/`style` are plain values (the `ClassFunc`/`StyleFunc` callback types are gone).
// The base classes/styles are applied statically here; selection-dependent styling is handled in CSS
// via the `.selected` class Vue Flow adds to node/edge wrappers (see the `<style>` block below).
const nodeClass = 'font-semibold !border-2 transition-colors duration-300 ease-in-out';

const edgeClass = 'transition-colors duration-300';

const edgeStyle: Styles = {
  transition: 'stroke ease-in-out 300ms',
  strokeWidth: 2,
};

// `<VueFlow>` exposes its store via `defineExpose`; reach `viewport`/`addEdges` through a template ref
// (pure-provider: no `useVueFlow()` outside a provider).
const flow = ref<VueFlowInstance>();

const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
    class: nodeClass,
  },
  {
    id: '2',
    data: { label: 'Waypoint' },
    position: { x: 100, y: 100 },
    class: nodeClass,
  },
  { id: '3', data: { label: 'Waypoint' }, position: { x: 400, y: 100 }, class: nodeClass },
  {
    id: '4',
    type: 'output',
    data: { label: 'End' },
    position: { x: 250, y: 225 },
    class: nodeClass,
  },
]);

const edges = ref<Edge[]>([
  {
    id: 'e1-2',
    source: '1',
    label: 'animated edge',
    target: '2',
    animated: true,
    class: edgeClass,
    style: edgeStyle,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: 'default edge',
    class: edgeClass,
    style: { transition: 'stroke ease-in-out 300ms' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'step',
    animated: true,
    class: edgeClass,
    style: edgeStyle,
  },
]);

function onConnect(param: Connection) {
  flow.value?.addEdges([
    {
      ...param,
      type: 'smoothstep',
      animated: true,
    },
  ]);
}

function onInit(instance: VueFlowInstance) {
  emit('pane', instance);
}
</script>

<template>
  <div class="md:max-w-1/3 flex flex-col justify-center">
    <div class="flex flex-col items-center md:items-start">
      <h1>Interactive Graphs</h1>

      <p>
        Vue Flow comes with built-in features like zoom & pan and dedicated controls, single & multi-selections, draggable
        elements, customizable nodes and edges and a bunch of event handlers.
      </p>

      <a class="docs-button" href="/guide/"> Documentation </a>
    </div>
  </div>

  <div
    class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase border-1 border-secondary overflow-hidden"
  >
    <VueFlow
      ref="flow"
      v-model:nodes="nodes"
      v-model:edges="edges"
      class="basic"
      :connection-line-options="{
        type: ConnectionLineType.SmoothStep,
        style: { strokeDasharray: 5, animation: 'dashdraw 0.5s linear infinite' },
      }"
      @init="onInit"
      @connect="onConnect"
    >
      <Controls position="bottom-right" />
      <Background :gap="60">
        <template #pattern>
          <Cross :style="{ fontSize: `${8 * (flow?.viewport?.value?.zoom ?? 1) || 1}px` }" class="text-[#10b981] opacity-50" />
        </template>
      </Background>
    </VueFlow>
  </div>
</template>

<style>
/* selection-state styling that previously lived in the `class`/`style` callbacks (removed in 2.0) */
.basic .vue-flow__node.selected {
  @apply !border-primary/80 !shadow-lg shadow-secondary !bg-primary-100/50 !text-gray-700;
}

.dark .basic .vue-flow__node.selected {
  @apply dark:(!shadow-primary/50) dark:(!bg-primary-300/80) dark:(!text-white);
}

.basic .vue-flow__edge.selected .vue-flow__edge-path,
.basic .vue-flow__edge.selected .vue-flow__edge-text {
  @apply font-semibold;
  stroke: var(--primary);
}

.basic .vue-flow__node-input.selected .vue-flow__handle {
  @apply bg-primary;
}

.basic .vue-flow__node-default.selected .vue-flow__handle {
  @apply bg-primary;
}

.basic .vue-flow__node-output.selected .vue-flow__handle {
  @apply bg-primary;
}
</style>
