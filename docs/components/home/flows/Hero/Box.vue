<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <div class="box max-w-75 md:max-w-125">
    <div class="intro px-4 py-2 shadow-lg rounded-md border-2 border-solid border-black">
      <div class="font-mono flex flex-col gap-4 p-4 items-center text-center">
        <h1 class="text-2xl lg:text-4xl !my-0 !pt-0 font-bold">Vue Flow</h1>

        <h2 class="text-lg lg:text-xl font-normal !border-0">
          The customizable Vue 3 component bringing interactivity to flowcharts and graphs.
        </h2>
      </div>

      <Handle
        :connectable="false"
        style="height: 12px; width: 6rem; bottom: -6px; background: #aaa; border-radius: 2px"
        type="source"
        :position="Position.Bottom"
      />
    </div>
  </div>
</template>
