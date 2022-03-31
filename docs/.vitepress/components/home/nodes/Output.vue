<script lang="ts" setup>
import { Handle, NodeProps, Position } from '@braks/vue-flow'
interface RBGOutputNodeProps extends NodeProps {
  rgb: string
}
const props = defineProps<RBGOutputNodeProps>()
const emit = defineEmits(['next'])
const next = () => emit('next')
</script>
<template>
  <div :style="{ backgroundColor: props.rgb }" class="px-6 py-2 rounded-xl text-white text-center" @click="next">
    <div class="text-xl font-bold">Color Output</div>
    <div class="font-semibold">{{ props.rgb }}</div>
    <Handle type="target" :position="Position.Left" />
  </div>
</template>
