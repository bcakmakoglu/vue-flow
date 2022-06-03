<script lang="ts" setup>
import type { CSSProperties } from 'vue'
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
switch (props.data.color) {
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

const colorVal = computed({
  get: () => props.amount[color as 'red' | 'green' | 'blue'],
  set: (val) => {
    emit('change', { color, val })
  },
})

const style = { '--color': color } as CSSProperties
</script>

<template>
  <div class="wrapper">
    <div class="text-md" :style="{ color }">{{ `${color} Amount`.toUpperCase() }}</div>
    <input v-model="colorVal" class="slider nodrag" :style="style" type="range" min="0" max="255" />
    <Handle type="source" :position="Position.Right" :style="{ backgroundColor: color }" />
  </div>
</template>

<style>
.wrapper {
  padding: 16px;
  background: #fff;
  border-radius: 10px;
  border: 2px solid black;
  text-align: left;
}

.slider {
  --color: red;
  margin-top: 12px;
  background: gainsboro;
  width: 100%;
  height: 10px;
  outline: none;
  border-radius: 999px;
  -webkit-appearance: none;
  appearance: none;

  &::-moz-range-thumb,
  &::-webkit-slider-thumb {
    @apply w-[15px] h-[15px] cursor-pointer border-1 border-solid border-white rounded-full;
    -webkit-appearance: none;
    background: var(--color);
  }
}
</style>
