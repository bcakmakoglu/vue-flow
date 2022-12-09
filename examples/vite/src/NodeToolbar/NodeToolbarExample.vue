<script lang="ts" setup>
import { Position, VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const defaultNodeStyle = {
  border: '2px solid #ff0071',
  background: 'white',
  borderRadius: '20px',
}

const elements = ref([
  {
    id: '1',
    type: 'custom',
    label: 'toolbar top',
    data: { toolbarPosition: Position.Top },
    position: { x: 200, y: 0 },
    style: defaultNodeStyle,
  },
  {
    id: '2',
    type: 'custom',
    label: 'toolbar right',
    data: { toolbarPosition: Position.Right },
    position: { x: -50, y: 100 },
    style: defaultNodeStyle,
  },
  {
    id: '3',
    type: 'custom',
    label: 'toolbar bottom',
    data: { toolbarPosition: Position.Bottom },
    position: { x: 0, y: 200 },
    style: defaultNodeStyle,
  },
  {
    id: '4',
    type: 'custom',
    label: 'toolbar left',
    data: { toolbarPosition: Position.Left },
    position: { x: 200, y: 300 },
    style: defaultNodeStyle,
  },
  {
    id: '5',
    type: 'custom',
    label: 'toolbar always open',
    data: { toolbarPosition: Position.Top, toolbarVisible: true },
    position: { x: 0, y: -100 },
    style: defaultNodeStyle,
  },
])
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init class="vue-flow-basic-example">
    <template #node-custom="nodeProps">
      <CustomNode :data="nodeProps.data" :label="nodeProps.label" />
    </template>
  </VueFlow>
</template>
