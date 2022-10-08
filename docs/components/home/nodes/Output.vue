<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

interface RBGOutputNodeProps extends NodeProps {
  rgb: string
}

const props = defineProps<RBGOutputNodeProps>()
</script>

<template>
  <div
    :style="{ backgroundColor: props.rgb }"
    class="px-6 py-2 rounded-xl text-white text-center min-w-[220px] border-2 border-white"
  >
    <div class="text-xl font-bold">Color Output</div>
    <div class="font-semibold">{{ props.rgb }}</div>
    <Handle type="target" :position="Position.Left" />
  </div>
</template>
