<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="flex">
    <a class="intro-link group bg-[#ef467e]" href="/examples/"> Examples </a>
  </div>
  <Handle type="target" :position="Position.Top" />
  <Handle class="block md:hidden" type="source" :position="Position.Bottom" />
</template>
