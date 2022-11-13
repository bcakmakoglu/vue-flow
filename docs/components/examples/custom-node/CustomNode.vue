<script setup>
import { Handle, Position } from '@vue-flow/core'
import { computed } from 'vue'
import { colors } from './presets.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['change', 'gradient'])

const onSelect = (color) => {
  emit('change', color)
}

const onGradient = () => {
  emit('gradient')
}

const sourceHandleStyleA = computed(() => ({ backgroundColor: props.data.color, filter: 'invert(100%)', top: '10px' }))

const sourceHandleStyleB = computed(() => ({
  backgroundColor: props.data.color,
  filter: 'invert(100%)',
  bottom: '10px',
  top: 'auto',
}))
</script>

<template>
  <div>Select a color</div>

  <div
    style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; max-width: 90%; margin: auto; gap: 3px"
  >
    <template v-for="color of colors" :key="color.name">
      <button :title="color.name" :style="{ backgroundColor: color.value }" type="button" @click="onSelect(color)"></button>
    </template>

    <button class="animated-bg-gradient" title="gradient" type="button" @click="onGradient"></button>
  </div>

  <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA" />

  <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB" />
</template>
