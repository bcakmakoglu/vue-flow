<script setup>
import { Handle, Position, useNodeId, useVueFlow } from '@vue-flow/core'
import { colors } from './presets.js'

defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const nodeId = useNodeId()

const { updateNodeData } = useVueFlow()

function onSelect(color) {
  updateNodeData(nodeId, { color }, { replace: true })
}

function onGradient() {
  updateNodeData(nodeId, { isGradient: true }, { replace: true })
}
</script>

<template>
  <div>Select a color</div>

  <div class="color-selector nodrag nopan">
    <button
      v-for="{ name: colorName, value: color } of colors"
      :key="colorName"
      :title="colorName"
      :style="{ backgroundColor: color }"
      type="button"
      @click="onSelect(color)"
    />

    <button class="animated-bg-gradient" title="gradient" type="button" @click="onGradient" />
  </div>

  <Handle id="a" type="source" :position="Position.Right" />
</template>
