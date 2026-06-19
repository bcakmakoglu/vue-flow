<script lang="ts" setup>
import type { MiniMapNodeFunc, Node, VueFlowInstance } from '@vue-flow/core';
import type { RGBEdge } from '../edges/Custom.vue';
import type { RGBNode as TRGBNode } from '../nodes/types.ts';
import type { Colors } from './utils';
import { Background, Controls, MiniMap, VueFlow } from '@vue-flow/core';

import { breakpointsTailwind } from '@vueuse/core';
import CustomEdge from '../edges/Custom.vue';
import RGBNode from '../nodes/Input.vue';
import RGBOutputNode from '../nodes/Output.vue';

const emit = defineEmits(['pane']);

const breakpoints = useBreakpoints(breakpointsTailwind);

const flow = ref<VueFlowInstance<Node, RGBEdge>>();

const panOnDrag = ref(true);

const color = ref<Record<Colors, number>>({
  red: 222,
  green: 45,
  blue: 140,
});

const rgb = computed(
  () => `rgb(${color.value.red}, ${color.value.green}, ${color.value.blue})`,
);

const nodes = ref<TRGBNode[]>([
  {
    id: '1',
    type: 'rgb-input',
    data: { color: 'green', val: toRef(() => color.value.green) },
    position: { x: -25, y: 0 },
  },
  {
    id: '2',
    type: 'rgb-input',
    data: { color: 'red', val: toRef(() => color.value.red) },
    position: { x: 50, y: -110 },
  },
  {
    id: '3',
    type: 'rgb-input',
    data: { color: 'blue', val: toRef(() => color.value.blue) },
    position: { x: 0, y: 110 },
  },
  {
    id: '4',
    type: 'rgb-output',
    data: {
      rgb,
    },
    position: { x: 400, y: -25 },
  },
]);

const edges = ref<RGBEdge[]>([
  {
    id: 'e1-4',
    type: 'rgb-line',
    data: { color: 'green' },
    source: '1',
    target: '4',
    animated: true,
  },
  {
    id: 'e2-4',
    type: 'rgb-line',
    data: { color: 'red' },
    source: '2',
    target: '4',
    animated: true,
  },
  {
    id: 'e3-4',
    type: 'rgb-line',
    data: { color: 'blue' },
    source: '3',
    target: '4',
    animated: true,
  },
]);

watch(
  [
    breakpoints.sm,
    breakpoints.md,
    breakpoints.lg,
    breakpoints.xl,
    breakpoints['2xl'],
  ],
  () => {
    const mobile = breakpoints.isSmaller('md');
    if (mobile) {
      flow.value?.updateNode('4', { position: { x: 300, y: -25 } });
    }

    panOnDrag.value = !mobile;
  },
  { immediate: true },
);

function onChange({ color: c, val }: { color: Colors; val: number }) {
  return (color.value[c] = Number(val));
}

const nodeColor: MiniMapNodeFunc = (node) => {
  switch (node.id) {
    case '1':
      return 'green';
    case '2':
      return 'red';
    case '3':
      return 'blue';
    case '4':
      return rgb.value;
  }
  return '';
};
</script>

<template>
  <div
    class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase overflow-hidden bg-gray-800 border-2"
    :style="{ borderColor: rgb }"
  >
    <VueFlow
      ref="flow"
      :nodes="nodes"
      :edges="edges"
      :pan-on-drag="panOnDrag"
      :zoom-on-scroll="false"
      :prevent-scrolling="false"
      class="relative font-mono"
      @init="emit('pane', $event)"
    >
      <template #edge-rgb-line="rgbLineProps">
        <CustomEdge
          v-bind="rgbLineProps"
          :data="{ ...rgbLineProps.data, text: String(color[rgbLineProps.data?.color as Colors]) }"
        />
      </template>

      <template #node-rgb-input="rgbProps">
        <RGBNode v-bind="rgbProps" @change="onChange" />
      </template>

      <template #node-rgb-output="rgbOutputProps">
        <RGBOutputNode v-bind="rgbOutputProps" />
      </template>

      <Controls class="hidden md:block" />

      <Background variant="lines" :color="rgb" :gap="48" :size="1" />

      <MiniMap
        class="hidden sm:block transform scale-25 md:scale-50 lg:scale-75 origin-bottom-right"
        :node-color="nodeColor"
      />
    </VueFlow>
  </div>

  <div class="md:max-w-1/3 flex flex-col gap-12 justify-center <md:pt-12">
    <div class="flex flex-col gap-2 items-center md:items-start">
      <h1>Customizable</h1>
      <p>
        You can expand on the existing features by using your own custom nodes
        and edges and implement any design and functionality you want.
      </p>
      <a class="docs-button max-w-max" href="/guide/">Documentation</a>
    </div>
  </div>
</template>
