<script lang="ts" setup>
import { Position, Handle, Connection, NodeProps } from '~/index'

interface CustomNodeProps extends NodeProps {
  id: string
}

const props = defineProps<CustomNodeProps>()

const isValidConnection = (connection: Connection) => connection.target === 'B'
</script>
<template>
  <Handle type="target" :position="Position.Left" :is-valid-connection="isValidConnection" />
  <div>{{ props.id }}</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="isValidConnection" />
</template>
