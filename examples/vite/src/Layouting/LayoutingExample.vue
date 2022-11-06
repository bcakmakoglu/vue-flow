<script lang="ts" setup>
import { Panel, PanelPosition } from '@vue-flow/additional-components'
import { VueFlow, Panel, PanelPosition } from '@vue-flow/core'
import { useDagreLayout } from '@vue-flow/plugin-dagre'
import initialElements from './initial-elements'

const elements = ref(initialElements)

const { layout } = useDagreLayout()
</script>

<template>
  <div style="flex: 1; position: relative">
    <VueFlow v-model="elements" @nodes-initialized="layout('TB')">
      <Panel :position="PanelPosition.TopRight">
        <button :style="{ marginRight: '10px' }" @click="layout('TB')">vertical layout</button>
        <button @click="layout('LR')">horizontal layout</button>
      </Panel>
    </VueFlow>
  </div>
</template>
