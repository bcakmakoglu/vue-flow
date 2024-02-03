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

const { updateNodeData } = useVueFlow()

function onSelect(color) {
  updateNodeData(props.id, { color: color.value }, { replace: true })
}

function onGradient() {
  updateNodeData(props.id, { isGradient: true }, { replace: true })
}
</script>

<template>
  <div>Select a color</div>

  <div
    class="color-selector"
    style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; max-width: 90%; margin: auto; gap: 4px"
  >
    <template v-for="color of colors" :key="color.name">
      <button :title="color.name" :style="{ backgroundColor: color.value }" type="button" @click="onSelect(color)" />
    </template>

    <button class="animated-bg-gradient" title="gradient" type="button" @click="onGradient" />
  </div>

  <!-- When using multiple handles of the same type, each handle should have a unique id -->
  <Handle
    id="a"
    type="source"
    :position="Position.Right"
    :style="{ backgroundColor: data.color, filter: 'invert(100%)', top: '10px' }"
  />

  <Handle
    id="b"
    type="source"
    :position="Position.Right"
    :style="{
      backgroundColor: data.color,
      filter: 'invert(100%)',
      bottom: '10px',
      top: 'auto',
    }"
  />
</template>
