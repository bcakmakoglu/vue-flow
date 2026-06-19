<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core';
import type { Colors } from '../flows/utils';
import type { RGBInputNode } from './types';
import { Handle, Position } from '@vue-flow/core';

const props = defineProps<NodeProps<RGBInputNode>>();

const emit = defineEmits<{
  change: [{ color: Colors; val: number }];
}>();

const currentColor = toRef(props.data, 'color', 'red');

function onChange(e: InputEvent) {
  emit('change', {
    color: currentColor.value,
    val: Number.parseInt((e.target as HTMLInputElement).value),
  });
}
</script>

<template>
  <div
    class="px-4 py-2 bg-white rounded-md border-2 border-solid border-black text-left transform scale-75 lg:scale-100"
  >
    <div
      class="text-md font-semibold text-center"
      :style="{ color: currentColor }"
    >
      {{ `${currentColor}`.toUpperCase() }}
    </div>

    <input
      :value="data.val"
      class="slider nodrag"
      :style="{ '--color': currentColor }"
      type="range"
      min="0"
      max="255"
      @input="onChange"
    >

    <Handle
      type="source"
      :position="Position.Right"
      :style="{
        backgroundColor: currentColor,
        right: '-6px',
        width: '12px',
        height: '12px',
      }"
    />
  </div>
</template>
