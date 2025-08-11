<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({ handleCount: { type: Number } })
</script>

<template>
  <div class="custom-node">
    <Handle
      v-for="n in props.handleCount"
      :id="String(n - 1)"
      :key="`${n}-${props.handleCount}`"
      type="target"
      :position="Position.Top"
      :style="{ left: `${100 * (n / (props.handleCount + 1))}%` }"
    />
    Custom
  </div>
</template>

<style>
.custom-node {
  min-width: 100px;
  gap: 4px;
  padding: 8px;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
}
</style>
