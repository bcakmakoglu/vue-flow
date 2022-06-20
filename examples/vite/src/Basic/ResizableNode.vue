<script lang="ts" setup>
import type { Position, ValidConnectionFunc } from '@vue-flow/renderer'
import { Handle } from '@vue-flow/renderer'

interface Props {
  id: string
  selected?: boolean
  connectable?: boolean
  label?: string
  isValidSourcePos?: ValidConnectionFunc
  isValidTargetPos?: ValidConnectionFunc
  parentNode?: string
}

const props = withDefaults(defineProps<Props>(), {
  connectable: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
})
</script>

<script lang="ts">
export default {
  name: 'ResizableNode',
  inheritAttrs: false,
}
</script>

<template>
  <Handle
    type="target"
    :position="props.targetPosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidTargetPos"
  />
  <div class="resize-node">
    <div v-html="props.label"></div>
    <div ref="el" class="resizer nodrag" />
  </div>
  <Handle
    type="source"
    :position="props.sourcePosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidSourcePos"
  />
</template>

<style>
.resize-node {
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 4px;
  background: white;
}

.resizer {
  resize: both;
  width: 200px;
  height: 200px;
  outline: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow: hidden;
  background: aliceblue;
  border: 1px solid gray;
  border-radius: 4px;
}
</style>
