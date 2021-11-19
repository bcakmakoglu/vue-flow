<script lang="ts" setup>
import { Handle, NodeProps, Position } from '~/index'

interface RBGOutputNodeProps extends NodeProps {
  rgb: string
}

const props = defineProps<RBGOutputNodeProps>()
</script>
<template>
  <div :style="{ backgroundColor: props.rgb }" class="p-3 rounded-xl text-left text-white">
    <div class="text-md uppercase">{{ props.rgb }}</div>
    <Handle type="source" :position="Position.Left" />
  </div>
</template>
