<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, Position, NodeProps } from '~/index'

interface CustomNodeProps extends NodeProps {
  data: any
}
const nodeStyles: CSSProperties = { padding: 10, border: '1px solid #ddd' }

const props = defineProps<CustomNodeProps>()
</script>
<template>
  <div :style="nodeStyles">
    <Handle type="target" :position="Position.Left" />
    <div>output handle count: {{ props.data.handleCount }}</div>
    <Handle
      v-for="i of props.data.handleCount"
      :id="`handle-${i}`"
      :key="`handle-${i}`"
      type="source"
      :position="Position.Right"
      :style="{ top: 10 * i + props.data.handlePosition * 10 }"
    />
  </div>
</template>
