<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
import { FlowInstance } from "@braks/vue-flow";

const breakpoints = useBreakpoints(breakpointsTailwind);

const instances = reactive<FlowInstance[]>([]);

const onLoad = (instance: FlowInstance) => {
  instances.push(instance);
  instance.fitView();
};

const fitViews = () => {
  instances.forEach(i => i.fitView());
};

watch(
  [
    breakpoints.sm,
    breakpoints.md,
    breakpoints.lg,
    breakpoints.xl,
    breakpoints["2xl"]
  ],
  () => setTimeout(() => {
    fitViews()
  }, 5)
);
</script>
<template>
  <div class="w-full">
    <div
      class="flex flex-col gap-12 md:gap-24 lg:gap-36 max-w-9/12 md:max-w-11/12 lg:max-w-9/12 m-auto py-12 md:py-24 text-center md:text-left">
      <div class="flex flex-col md:flex-row gap-12 md:gap-24">
        <Basic @pane="onLoad" />
      </div>
      <div class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
        <RGB @pane="onLoad" />
      </div>
      <div class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
        <Nested @pane="onLoad" />
      </div>
    </div>
  </div>
</template>
<style>
.button {
  @apply
  shadow-lg transition-colors duration-200 hover:bg-black font-semibold text-lg mt-4 px-5 py-3 rounded-xl bg-green-500 text-white;
}
</style>
