<script setup>
import { Handle, Position } from '@braks/vue-flow'
import { computed } from 'vue'
import { presets } from './presets.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['change'])

const targetHandleStyle = { background: '#555' }
const sourceHandleStyleA = { ...targetHandleStyle, top: '10px' }
const sourceHandleStyleB = { ...targetHandleStyle, bottom: '10px', top: 'auto' }

const onConnect = (params) => console.log('handle onConnect', params)

const onSelect = (color) => {
  emit('change', color)
}

const colors = computed(() => {
  return Object.keys(presets).map((color) => {
    return {
      name: color,
      value: presets[color],
    }
  })
})

const selectedColor = computed(() => {
  return colors.value.find((color) => color.value === props.data.color)
})
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="selectedColor">
    Select a color
  </div>
  <div
    style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; max-width: 90%; margin: auto; gap: 3px"
  >
    <template v-for="color of colors" :key="color.name">
      <button
        :title="color.name"
        :style="{ backgroundColor: color.value }"
        style="padding: 3px; width: 25px; height: 25px"
        type="button"
        @click="onSelect(color)"
      ></button>
    </template>
  </div>
  <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA" />
  <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB" />
</template>
