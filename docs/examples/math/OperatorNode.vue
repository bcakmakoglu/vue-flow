<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import Icon from './Icon.vue'

const props = defineProps(['id', 'data'])

const operators = ['+', '-', '*', '/']

const { updateNodeData } = useVueFlow()
</script>

<template>
  <div class="buttons nodrag">
    <button
      v-for="operator of operators"
      :key="`${id}-${operator}-operator`"
      :class="{ selected: data.operator === operator }"
      @click="updateNodeData(props.id, { operator })"
    >
      <Icon :name="operator" />
    </button>
  </div>

  <Handle type="source" :position="Position.Right" :connectable="false" />
  <Handle id="target-a" type="target" :position="Position.Left" :connectable="false" />
  <Handle id="target-b" type="target" :position="Position.Left" :connectable="false" />
</template>
