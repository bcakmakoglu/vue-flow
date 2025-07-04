<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import NestedFlow from './NestedFlow.vue'

const { data, ancestorZoom } = defineProps(['data', 'ancestorZoom'])

// The purpose of this component is to avoid <Handle> and <VueFlow> being used in the same component. Otherwise useVueFlow will detect wrong instance ID.
</script>

<template>
  <Handle id="source-left" type="source" :position="Position.Left" />
  <Handle id="source-right" type="source" :position="Position.Right" />
  <Handle id="target-left" type="target" :position="Position.Left" />
  <Handle id="target-right" type="target" :position="Position.Right" />
  <div class="container">
    <div class="title">{{ data.label }}</div>
    <div class="content nodrag">
      <NestedFlow :ancestor-zoom="ancestorZoom" />
    </div>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid #ddd;
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 4px 4px 0 0;
  background-color: black;
  color: white;
  font-weight: bold;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 0 0 4px 4px;
  background: rgba(255, 255, 255, 0.75);
}
</style>
