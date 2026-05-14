<script lang="ts" setup>
import type { Edge, Node } from '@vue-flow/core'
import { Position, VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const defaultNodeStyle = {
  border: '2px solid #ff0071',
  background: 'white',
  borderRadius: '20px',
}

const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'custom',
    data: { label: 'toolbar top', toolbarPosition: Position.Top },
    position: { x: 200, y: 0 },
    style: defaultNodeStyle,
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'toolbar right', toolbarPosition: Position.Right },
    position: { x: -50, y: 100 },
    style: defaultNodeStyle,
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'toolbar bottom', toolbarPosition: Position.Bottom },
    position: { x: 0, y: 200 },
    style: defaultNodeStyle,
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'toolbar left', toolbarPosition: Position.Left },
    position: { x: 200, y: 300 },
    style: defaultNodeStyle,
  },
  {
    id: '5',
    type: 'custom',
    data: { label: 'toolbar always open', toolbarPosition: Position.Top, toolbarVisible: true },
    position: { x: 0, y: -100 },
    style: defaultNodeStyle,
  },
])

const edges = ref<Edge[]>([])
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" fit-view-on-init class="vue-flow-basic-example">
    <template #node-custom="nodeProps">
      <CustomNode :data="nodeProps.data" :label="nodeProps.data?.label" />
    </template>
  </VueFlow>
</template>
