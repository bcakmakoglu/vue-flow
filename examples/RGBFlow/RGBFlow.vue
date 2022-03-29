<script lang="ts" setup>
import { templateRef } from '@vueuse/core'
import RGBNode from './RGBNode.vue'
import RGBOutputNode from './RGBOutputNode.vue'
import { Elements, FlowInstance, VueFlow } from '@braks/vue-flow'

type Colors = {
  red: number
  green: number
  blue: number
}
const elements = ref<Elements>([
  { id: '1', type: 'rgb', data: { color: 'r' }, position: { x: -25, y: 50 } },
  { id: '2', type: 'rgb', data: { color: 'g' }, position: { x: 50, y: -100 } },
  { id: '3', type: 'rgb', data: { color: 'b' }, position: { x: 0, y: 200 } },
  { id: '4', type: 'rgb-output', data: { label: 'RGB' }, position: { x: 400, y: 50 } },
  { id: 'e1-4', data: { color: 'red' }, source: '1', target: '4', animated: true },
  { id: 'e2-4', data: { color: 'green' }, source: '2', target: '4', animated: true },
  { id: 'e3-4', data: { color: 'blue' }, source: '3', target: '4', animated: true },
])

const el = templateRef<HTMLDivElement>('page', null)

const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 1 })
}
const color = ref<Colors>({
  red: 100,
  green: 150,
  blue: 100,
})
const onChange = ({ color: c, val }: { color: keyof Colors; val: number }) => (color.value[c] = Number(val))
</script>
<template>
  <div ref="page" class="demo-flow">
    <VueFlow v-model="elements" @pane-ready="onLoad">
      <template #node-rgb="props">
        <RGBNode v-bind="props" :amount="color" @change="onChange" />
      </template>
      <template #node-rgb-output="props">
        <RGBOutputNode v-bind="props" :rgb="`rgb(${color.red}, ${color.green}, ${color.blue})`" />
      </template>
    </VueFlow>
  </div>
</template>
<style>
.demo-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  border-radius: 0;
}
</style>
