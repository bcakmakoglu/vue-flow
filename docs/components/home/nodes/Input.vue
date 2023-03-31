<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

interface RGBNodeProps extends NodeProps {
  data: {
    color: 'r' | 'g' | 'b'
  }
  amount: {
    red: number
    green: number
    blue: number
  }
}

const props = defineProps<RGBNodeProps>()

const emit = defineEmits(['change'])

const currentColor = computed(() => {
  let color

  switch (props.data?.color) {
    case 'r':
      color = 'red'
      break
    case 'g':
      color = 'green'
      break
    case 'b':
      color = 'blue'
      break
    default:
      color = 'red'
  }

  return color
})

function onChange(e: any) {
  return emit('change', { color: currentColor.value, val: e.target.value })
}
</script>

<template>
  <div class="px-4 py-2 bg-white rounded-md border-2 border-solid border-black text-left transform scale-75 lg:scale-100">
    <div class="text-md" :style="{ color: currentColor }">{{ `${currentColor} Amount`.toUpperCase() }}</div>

    <input
      :model-value="amount[currentColor]"
      class="slider nodrag"
      :style="{ '--color': currentColor }"
      type="range"
      min="0"
      max="255"
      @input="onChange"
    />

    <Handle type="source" :position="Position.Right" :style="{ backgroundColor: color }" />
  </div>
</template>
