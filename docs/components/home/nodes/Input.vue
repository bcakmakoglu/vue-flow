<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'
import type { Colors } from '../flows/utils'

interface RGBNodeProps extends Pick<NodeProps<{ color: Colors }>, 'data'> {
  data: {
    color: Colors
  }
  amount: Record<Colors, number>
}

const props = defineProps<RGBNodeProps>()

const emit = defineEmits<{ (event: 'change', data: { color: Colors; val: number }): void }>()

const currentColor = toRef(props.data, 'color', 'red')

function onChange(e: InputEvent) {
  return emit('change', { color: currentColor.value, val: parseInt((e.target as HTMLInputElement).value) })
}
</script>

<template>
  <div class="px-4 py-2 bg-white rounded-md border-2 border-solid border-black text-left transform scale-75 lg:scale-100">
    <div class="text-md font-semibold text-center" :style="{ color: currentColor }">{{ `${currentColor}`.toUpperCase() }}</div>

    <input
      :value="amount[currentColor]"
      class="slider nodrag"
      :style="{ '--color': currentColor }"
      type="range"
      min="0"
      max="255"
      @input="onChange"
    />

    <Handle
      type="source"
      :position="Position.Right"
      :style="{ backgroundColor: currentColor, right: '-6px', width: '12px', height: '12px' }"
    />
  </div>
</template>
