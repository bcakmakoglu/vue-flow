<script setup>
import { Position, VueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import ToolbarNode from './ToolbarNode.vue'

const defaultNodeStyle = {
  border: '1px solid #10b981',
  background: '#ef467e',
  color: 'white',
  borderRadius: '99px',
}

const elements = ref([
  {
    id: '1',
    type: 'toolbar',
    label: 'toolbar top',
    data: { toolbarPosition: Position.Top },
    position: { x: 200, y: 0 },
    style: defaultNodeStyle,
  },
  {
    id: '2',
    type: 'toolbar',
    label: 'toolbar right',
    data: { toolbarPosition: Position.Right },
    position: { x: -50, y: 100 },
    style: defaultNodeStyle,
  },
  {
    id: '3',
    type: 'toolbar',
    label: 'toolbar bottom',
    data: { toolbarPosition: Position.Bottom },
    position: { x: 0, y: 200 },
    style: defaultNodeStyle,
  },
  {
    id: '4',
    type: 'toolbar',
    label: 'toolbar left',
    data: { toolbarPosition: Position.Left },
    position: { x: 200, y: 300 },
    style: defaultNodeStyle,
  },
  {
    id: '5',
    type: 'toolbar',
    label: 'toolbar always open',
    data: { toolbarPosition: Position.Top, toolbarVisible: true },
    position: { x: 0, y: -100 },
    style: defaultNodeStyle,
  },
])
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init class="vue-flow-basic-example">
    <template #node-toolbar="nodeProps">
      <ToolbarNode :data="nodeProps.data" :label="nodeProps.label" />
    </template>
  </VueFlow>
</template>
