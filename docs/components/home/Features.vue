<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { VueFlowStore } from '@vue-flow/renderer'

const breakpoints = useBreakpoints(breakpointsTailwind)

const el = ref()
const instances: VueFlowStore[] = []

const onLoad = (instance: VueFlowStore) => {
  instances.push(instance)
  instance.fitView()
}

const fitViews = () => {
  instances.forEach((i) => i.fitView())
}

const { stop } = useResizeObserver(
  el,
  useDebounceFn(() => fitViews(), 5),
)
onBeforeUnmount(stop)
</script>

<template>
  <div ref="el" class="w-full dark:(bg-black text-white)">
    <div
      class="flex flex-col divide-y divide-gray-500 md:divide-y-0 gap-12 md:gap-24 lg:gap-36 max-w-9/12 md:max-w-11/12 lg:max-w-9/12 m-auto py-12 md:py-24 text-center md:text-left"
    >
      <XyzTransition appear-visible xyz="fade down ease-out-back">
        <div class="flex flex-col md:flex-row gap-12 md:gap-24">
          <Basic @pane="onLoad" />
        </div>
      </XyzTransition>

      <XyzTransition appear-visible xyz="fade down ease-out-back">
        <div class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
          <RGB @pane="onLoad" />
        </div>
      </XyzTransition>

      <XyzTransition appear-visible xyz="fade down ease-out-back">
        <div class="flex flex-col md:flex-row flex-unwrap gap-12 md:gap-24">
          <Nested @pane="onLoad" />
        </div>
      </XyzTransition>

      <XyzTransition appear-visible xyz="fade down ease-out-back">
        <div class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
          <Additional @pane="onLoad" />
        </div>
      </XyzTransition>
    </div>
  </div>
</template>
