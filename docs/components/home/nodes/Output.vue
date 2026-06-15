<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core';
import type { RGBOutputNode } from './types';
import { Handle, Position } from '@vue-flow/core';

defineProps<NodeProps<RGBOutputNode>>();
</script>

<template>
  <div
    :style="{ backgroundColor: data.rgb.value }"
    class="px-6 py-2 rounded-xl text-white text-center min-w-[220px] border-2 border-white"
  >
    <div class="text-xl font-bold">
      Color Output
    </div>

    <div class="font-semibold">
      {{ data.rgb }}
    </div>

    <Handle
      type="target"
      :position="Position.Left"
      :style="{ left: '-6px', width: '12px', height: '12px' }"
    />
  </div>
</template>
