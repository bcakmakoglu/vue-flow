<script lang="ts" setup>
import type { VueFlowInstance } from '@vue-flow/core';
import Additional from './flows/Additional.vue';
import Basic from './flows/Basic.vue';
import Nested from './flows/Nested.vue';
import RGB from './flows/RGB.vue';

const el = ref<HTMLDivElement>();
const instances: VueFlowInstance[] = [];

function onLoad(instance: VueFlowInstance) {
  instances.push(instance);

  // `@pane` fires on init — before the nodes are measured — so fit once they are (then stop listening)
  const { off } = instance.onNodesInitialized(() => {
    instance.fitView();
    off();
  });
}

function fitViews() {
  instances.forEach(i => i.fitView());
}

const { stop } = useResizeObserver(
  el,
  useDebounceFn(() => fitViews(), 5),
);
onBeforeUnmount(stop);
</script>

<template>
  <section id="features" ref="el" class="w-full">
    <div
      class="flex flex-col divide-y divide-secondary md:divide-y-0 gap-12 md:gap-24 lg:gap-36 max-w-5/6 2xl:max-w-7xl m-auto py-12 md:py-24 text-center md:text-left"
    >
      <div class="flex flex-col md:flex-row gap-12 md:gap-24">
        <Basic @pane="onLoad" />
      </div>

      <div class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
        <RGB @pane="onLoad" />
      </div>

      <div class="flex flex-col md:flex-row flex-unwrap gap-12 md:gap-24">
        <Nested @pane="onLoad" />
      </div>

      <div class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
        <Additional @pane="onLoad" />
      </div>
    </div>
  </section>
</template>
