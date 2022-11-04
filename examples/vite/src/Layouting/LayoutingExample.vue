<script lang="ts" setup>
import { Panel, PanelPosition } from '@vue-flow/additional-components'
import { VueFlow } from '@vue-flow/core'
import { useDagreLayout } from '@vue-flow/plugin-dagre'
import initialElements from './initial-elements'

const elements = ref(initialElements)

const { layout } = useDagreLayout()

const onPaneReady = () => setTimeout(() => layout('TB'))
</script>

<template>
  <div style="flex: 1; position: relative">
    <VueFlow v-model="elements" @pane-ready="onPaneReady">
      <Panel :position="PanelPosition.TopRight">
        <button :style="{ marginRight: '10px' }" @click="layout('TB')">vertical layout</button>
        <button @click="layout('LR')">horizontal layout</button>
      </Panel>
    </VueFlow>
  </div>
</template>
