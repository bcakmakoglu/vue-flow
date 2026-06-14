<script lang="ts" setup>
import type { Edge, Node } from '@vue-flow/core';
import { Background, ConnectionMode, Controls, VueFlow } from '@vue-flow/core';
import { breakpointsTailwind } from '@vueuse/core';

const emit = defineEmits(['pane']);

const breakpoints = useBreakpoints(breakpointsTailwind);

const nodeClasses = ['!normal-case font-semibold !text-white', '!border-1', 'shadow-md'].join(' ');
const childClasses = `${nodeClasses} !bg-primary-500/70 !border-white`;

const panOnDrag = ref(true);

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Outer Node' }, position: { x: 0, y: 0 }, class: childClasses },
  {
    id: '2',
    data: { label: 'Parent Node' },
    position: { x: -125, y: 100 },
    class: `${nodeClasses} !bg-primary-500/30 !border-primary-500`,
    style: { width: '400px', height: '160px' },
  },
  {
    id: '2a',
    data: { label: 'Child Node' },
    position: { x: 17, y: 30 },
    parentId: '2',
    extent: 'parent',
    class: childClasses,
  },
  { id: '2b', data: { label: 'Child Node' }, position: { x: 225, y: 30 }, parentId: '2', extent: 'parent', class: childClasses },
  { id: '2c', data: { label: 'Child Node' }, position: { x: 125, y: 100 }, parentId: '2', extent: 'parent', class: childClasses },
  { id: '3', type: 'output', data: { label: 'Outer Node' }, position: { x: 0, y: 300 }, class: childClasses },
]);

const edges = ref<Edge[]>([
  { id: 'e1-2a', source: '1', target: '2a', type: 'smoothstep', style: { stroke: 'white', strokeWidth: '2' } },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: 'white', strokeWidth: '2' } },
]);

watch(
  [breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl, breakpoints['2xl']],
  () => {
    panOnDrag.value = !breakpoints.isSmaller('md');
  },
  { immediate: true },
);
</script>

<template>
  <div class="md:max-w-1/3 flex flex-col justify-center <md:pt-12">
    <div class="flex flex-col gap-2 items-center md:items-start">
      <h1>Complex Flows</h1>
      <p>
        You want to visualize more complex ideas?
        <br>
        No worries! Vue Flow supports creating nested nodes and nested graphs out-of-the-box.
      </p>
      <a class="docs-button max-w-max" href="/guide/"> Documentation </a>
    </div>
  </div>
  <div
    class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase border-1 border-primary-500 overflow-hidden"
  >
    <VueFlow
      class="nested"
      :nodes="nodes"
      :edges="edges"
      :pan-on-drag="panOnDrag"
      fit-view
      :connection-mode="ConnectionMode.Loose"
      :zoom-on-scroll="false"
      :prevent-scrolling="false"
      elevate-edges-on-select
      :translate-extent="[
        [-500, -100],
        [600, 500],
      ]"
      @init="(i) => emit('pane', i)"
    >
      <Controls class="md:(!left-auto !right-[10px])" />
      <Background color="#aaa" class="!bg-gray-800" :gap="18" />
    </VueFlow>
  </div>
</template>

<style>
.nested .vue-flow__handle {
  opacity: 0;
}
</style>
