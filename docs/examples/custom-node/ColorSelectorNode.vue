<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { colors } from './presets.js'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const { updateNodeData, getConnectedEdges } = useVueFlow()

function onSelect(color) {
  updateNodeData(props.id, { color, isGradient: false })

  const connectedEdges = getConnectedEdges(props.id)
  for (const edge of connectedEdges) {
    edge.style = {
      stroke: color,
    }
  }
}

function onGradient() {
  updateNodeData(props.id, { isGradient: true })
}
</script>

<template>
  <div>Select a color</div>

  <div class="color-selector nodrag nopan">
    <button
      v-for="{ name: colorName, value: color } of colors"
      :key="colorName"
      :title="colorName"
      :class="{ selected: color === data.color }"
      :style="{ backgroundColor: color }"
      type="button"
      @click="onSelect(color)"
    />

    <button class="animated-bg-gradient" title="gradient" type="button" @click="onGradient" />
  </div>

  <Handle id="a" type="source" :position="Position.Right" />
</template>
