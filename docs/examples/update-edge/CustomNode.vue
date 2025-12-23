<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label'])
</script>

<template>
  <div class="custom-node">
    <Handle type="target" :position="Position.Top" />
    <div>{{ props.data.label }}</div>
    <Handle type="source" :position="Position.Bottom" connectionEdgeType="custom" />
  </div>
</template>

<style scoped>
.custom-node {
  width: 150px;
  height: 100px;
  background-color: rgb(187, 230, 230);
  border-radius: 5px;
  border: 1px solid #222138;
}
</style>