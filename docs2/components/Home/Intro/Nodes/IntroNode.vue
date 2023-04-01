<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="max-w-[500px]">
    <div
      class="intro intro-link bg-secondary-400 dark:(!bg-secondary-600) px-4 py-2 shadow-lg rounded-md border-2 border-solid border-black"
    >
      <div class="flex flex-col gap-4 p-4 items-center text-center w-3/4 mx-auto">
        <h1 class="text-2xl lg:text-4xl !my-0 !pt-0 font-bold">Vue Flow</h1>

        <h2 class="text-lg lg:text-xl font-normal !border-0">
          The customizable Vue 3 component bringing interactivity to flowcharts and graphs.
        </h2>
      </div>
      <Handle id="a" type="source" :position="Position.Bottom" />
    </div>
  </div>
</template>
