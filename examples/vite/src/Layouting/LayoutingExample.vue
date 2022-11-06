<script lang="ts" setup>
import { VueFlow, useVueFlow, Panel, PanelPosition } from '@vue-flow/core'
import type { Direction } from '@vue-flow/plugin-dagre'
import { useDagreLayout } from '@vue-flow/plugin-dagre'
import initialElements from './initial-elements'

const elements = ref(initialElements)

const { fitView } = useVueFlow()

const { layout } = useDagreLayout()

const onLayout = (direction: Direction) => {
  layout(direction)

  nextTick(() => {
    fitView()
  })
}
</script>

<template>
  <div style="flex: 1; position: relative">
    <VueFlow v-model="elements" @nodes-initialized="onLayout('TB')">
      <Panel :position="PanelPosition.TopRight">
        <button :style="{ marginRight: '10px' }" @click="onLayout('TB')">vertical layout</button>
        <button @click="onLayout('LR')">horizontal layout</button>
      </Panel>
    </VueFlow>
  </div>
</template>
