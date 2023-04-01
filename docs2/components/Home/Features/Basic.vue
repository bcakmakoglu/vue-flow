<script lang="ts" setup>
import type { ClassFunc, GraphEdge, StyleFunc } from '@vue-flow/core'
import { PanelPosition, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

const emit = defineEmits(['pane'])

const getEdgeClass: ClassFunc<GraphEdge> = (el) => {
  const classes = [el.selected || el.sourceNode.selected ? 'font-semibold' : '']

  return classes.join(' ')
}

const getEdgeStyle: StyleFunc<GraphEdge> = (el) => {
  return {
    transition: 'stroke ease-in-out 300ms',
    stroke: el.selected || el.sourceNode.selected ? 'var(--secondary)' : '',
  }
}

const { onPaneReady, viewport } = useVueFlow({
  nodesConnectable: false,
  modelValue: [
    {
      id: '1',
      type: 'input',
      label: 'Start',
      position: { x: 250, y: 5 },
    },
    {
      id: '2',
      label: 'Node',
      position: { x: 100, y: 100 },
    },
    { id: '3', label: 'Node', position: { x: 400, y: 100 } },
    {
      id: '4',
      type: 'output',
      label: 'End',
      position: { x: 250, y: 225 },
    },
    {
      id: 'e1-2',
      source: '1',
      label: 'animated edge',
      target: '2',
      type: 'step',
      animated: true,
      labelStyle: {
        fill: 'var(--secondary)',
      },
      labelBgPadding: [8, 4],
      class: getEdgeClass,
      style: getEdgeStyle,
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'step',
      class: getEdgeClass,
      style: getEdgeStyle,
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      type: 'step',
      animated: true,
      class: getEdgeClass,
      style: getEdgeStyle,
    },
  ],
})

onPaneReady((i) => emit('pane', i))
</script>

<template>
  <div class="md:max-w-1/3 w-full flex flex-col justify-center">
    <div class="flex flex-col items-center md:items-start">
      <h1>Feature Rich</h1>

      <p class="mb-4">
        Vue Flow comes with a ton of built-in features like
        <List type="success" class="my-4 feature-list">
          <strong>zoom & pan</strong>
          <strong>single & multi-select</strong>
          <strong>draggable elements</strong>
          <strong>full customization of nodes and edges</strong>
        </List>
        and <strong>many more</strong>.
      </p>

      <a class="transition-colors duration-200 text-secondary-400 dark:text-secondary-600 text-xl font-bold pr-1" href="/guide/">
        <Icon name="material-symbols:arrow-right-alt-rounded" class="mr-1" />
        <span class="underline">Get Started</span>
      </a>
    </div>
  </div>

  <div
    class="w-full h-[300px] md:min-h-[400px] shadow-xl dark:shadow-white/10 rounded-xl uppercase border-1 border-secondary overflow-hidden"
  >
    <VueFlow class="basic">
      <Controls :show-interactive="false" :show-fit-view="false" :position="PanelPosition.BottomRight">
        <HomeGetCode />
      </Controls>

      <Background :gap="50">
        <template #pattern>
          <Icon name="mdi:window-close" :style="{ fontSize: `${8 * viewport.zoom || 1}px` }" class="text-[#10b981] opacity-50" />
        </template>
      </Background>
    </VueFlow>
  </div>
</template>

<style>
.basic .vue-flow__node.selected .vue-flow__handle,
.basic .vue-flow__node.selected .vue-flow__handle,
.basic .vue-flow__node.selected .vue-flow__handle {
  @apply bg-secondary-500;
}

.basic .vue-flow__node {
  @apply transition-colors duration-300 ease-in-out bg-white/25 dark:bg-secondary-100/25 dark:(text-white) !border-2;
  backdrop-filter: blur(0.6px);
}

.basic .vue-flow__node-default {
  @apply dark:border-white;
}

.basic .vue-flow__node.selected {
  @apply font-semibold border-secondary-500/80 shadow-lg shadow-secondary-500/25 bg-secondary-100/10 dark:bg-secondary-100/30;
}

.basic .vue-flow__edge {
  @apply transition-colors duration-300 ease-in-out;
}
</style>
