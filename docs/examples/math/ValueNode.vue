<script setup>
import { computed } from 'vue'
import { Handle, Position, useVueFlow } from '@vue-flow/core'

const props = defineProps(['id', 'data'])

const { updateNodeData } = useVueFlow()

const value = computed({
  get: () => props.data.value,
  set: (value) => updateNodeData(props.id, { value }),
})
</script>

<template>
  <input :id="`${id}-input`" v-model="value" type="number" class="nodrag" />

  <Handle type="source" :position="Position.Right" :connectable="false" />
</template>
