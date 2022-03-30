<script lang="ts" setup>
import { Handle, Position } from '@braks/vue-flow'

const emit = defineEmits(['next'])
</script>
<template>
  <div class="px-4 py-2 bg-white shadow-lg rounded-md border-2 border-solid border-black">
    <slot />
    <Handle id="a" type="source" :position="Position.Bottom" />
  </div>
</template>
