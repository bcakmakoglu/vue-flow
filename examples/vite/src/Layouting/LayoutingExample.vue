<script lang="ts" setup>
import { Panel, PanelPosition, VueFlow, useVueFlow } from '@vue-flow/core'
import type { Direction } from '@vue-flow/plugin-layout'
import { layout } from '@vue-flow/plugin-layout'
import initialElements from './initial-elements'

const elements = ref(initialElements)

const { nodes, edges, fitView } = useVueFlow()

const onLayout = (direction: Direction) => {
  layout(nodes.value, edges.value, { direction, onUpdated: fitView })
}
</script>

<template>
  <div style="flex: 1; position: relative">
    <VueFlow v-model="elements" @nodes-initialized="onLayout('TB')">
      <Panel style="display: flex; gap: 1rem" :position="PanelPosition.TopRight">
        <button @click="onLayout('TB')">vertical layout</button>
        <button @click="onLayout('LR')">horizontal layout</button>
      </Panel>
    </VueFlow>
  </div>
</template>
