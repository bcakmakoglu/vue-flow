<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, NodeProps, Position } from '@braks/vue-flow'

interface CustomNodeProps extends NodeProps {
  id: string
}
const props = defineProps<CustomNodeProps>()
const nodeStyles: CSSProperties = { padding: '10px 15px', border: '1px solid #ddd' }
</script>
<template>
  <div :style="nodeStyles">
    <div>node {{ props.id }}</div>
    <Handle id="left" type="source" :position="Position.Left" />
    <Handle id="right" type="source" :position="Position.Right" />
    <Handle id="top" type="source" :position="Position.Top" />
    <Handle id="bottom" type="source" :position="Position.Bottom" />
  </div>
</template>
