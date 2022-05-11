<script lang="ts" setup>
import type { NodeProps } from '@braks/vue-flow'
import { Handle, Position } from '@braks/vue-flow'

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
let color = 'red'
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
}
const onChange = (e: any) => emit('change', { color, val: e.target.value })
</script>

<template>
  <div class="px-4 py-2 bg-white rounded-md border-2 border-solid border-black text-left transform scale-75 lg:scale-100">
    <div class="text-md" :style="{ color }">{{ `${color} Amount`.toUpperCase() }}</div>
    <input
      v-model="props.amount[color]"
      class="slider nodrag"
      :style="{ '--color': color }"
      type="range"
      min="0"
      max="255"
      @input="onChange"
    />
    <Handle type="source" :position="Position.Right" :style="{ backgroundColor: color }" />
  </div>
</template>
