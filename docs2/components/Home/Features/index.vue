<script lang="ts" setup>
import type { VueFlowStore } from '@vue-flow/core'
import Basic from './Basic.vue'
import RGB from './RGB.vue'
import Nested from './Nested.vue'
import Additional from './Additional.vue'

const el = ref<HTMLDivElement>()

const instances: VueFlowStore[] = []

const { stop } = useResizeObserver(el, useDebounceFn(fitViews, 5))

onBeforeUnmount(stop)

function onLoad(instance: VueFlowStore) {
  instances.push(instance)
  instance.fitView()
}

function fitViews() {
  instances.forEach((i) => i.fitView())
}
</script>

<template>
  <div ref="el">
    <div
      class="flex flex-col divide-y divide-gray-500 md:divide-y-0 gap-12 md:gap-24 lg:gap-36 max-w-3/4 md:max-w-11/12 lg:max-w-9/12 m-auto text-center md:text-left"
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
  </div>
</template>
