<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import type { ValueNodeData } from './types'

const props = defineProps<Pick<NodeProps<ValueNodeData>, 'id' | 'data'>>()

const { updateNodeData } = useVueFlow()

function onChange(event: Event) {
  const evt = event as InputEvent

  const target = evt.target as HTMLInputElement

  const value = Number.parseFloat(target.value)

  if (!Number.isNaN(value)) {
    updateNodeData(props.id, { value })
  }
}
</script>

<template>
  <label :for="`${id}-input`">Value</label>
  <input :id="`${id}-input`" :value="data.value" type="number" class="nodrag" @change="onChange" />

  <Handle type="source" :position="Position.Right" :connectable="false" />
</template>
