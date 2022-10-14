<script lang="ts" setup>
import type { ClassFunc, GraphEdge, GraphNode, StyleFunc } from '@vue-flow/core'
import { ConnectionLineType, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background, Controls } from '@vue-flow/additional-components'
import Cross from '~icons/mdi/window-close'

const emit = defineEmits(['pane'])

const getNodeClass: ClassFunc<GraphNode> = (el) => {
  const classes = ['font-semibold', '!border-2', 'transition-colors', 'duration-300', 'ease-in-out']
  if (el.selected)
    classes.push(
      ...['!border-green-500/80', '!shadow-md', '!shadow-green-500/50', '!bg-green-100/80 dark:(!bg-white)', '!text-gray-700'],
    )

  return classes.join(' ')
}

const getEdgeClass: ClassFunc<GraphEdge> = (el) => {
  const classes = ['transition-colors duration-300', el.selected || el.sourceNode.selected ? 'font-semibold' : '']
  return classes.join(' ')
}

const getEdgeStyle: StyleFunc<GraphEdge> = (el) => {
  const sourceNodeSelected = el.sourceNode.selected
  return {
    transition: 'stroke ease-in-out 300ms',
    stroke: el.selected || sourceNodeSelected ? 'var(--secondary)' : '',
  }
}

const { onPaneReady, onConnect, addEdges, viewport } = useVueFlow({
  connectionLineType: ConnectionLineType.SmoothStep,
  connectionLineStyle: {
    strokeDasharray: 5,
    animation: 'dashdraw 0.5s linear infinite',
  },
  modelValue: [
    {
      id: '1',
      type: 'input',
      label: 'Start',
      position: { x: 250, y: 5 },
      class: getNodeClass,
    },
    {
      id: '2',
      label: 'Waypoint',
      position: { x: 100, y: 100 },
      class: getNodeClass,
    },
    { id: '3', label: 'Waypoint', position: { x: 400, y: 100 }, class: getNodeClass },
    {
      id: '4',
      type: 'output',
      label: 'End',
      position: { x: 250, y: 225 },
      class: getNodeClass,
    },
    {
      id: 'e1-2',
      source: '1',
      label: 'animated edge',
      target: '2',
      animated: true,
      class: getEdgeClass,
      style: getEdgeStyle,
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      label: 'default edge',
      class: getEdgeClass,
      style: (el: GraphEdge) => {
        const sourceNodeSelected = el.sourceNode.selected
        return {
          transition: 'stroke ease-in-out 300ms',
          stroke: el.selected || sourceNodeSelected ? 'red' : '',
        }
      },
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
onConnect((param) => {
  addEdges([
    {
      ...param,
      type: 'smoothstep',
      animated: true,
    },
  ])
})
</script>

<template>
  <div class="md:max-w-1/3 flex flex-col justify-center">
    <div class="flex flex-col items-center md:items-start">
      <h1>Interactive Graphs</h1>
      <p>
        Vue Flow comes with built-in features like zoom & pan and dedicated controls, single & multi-selections, draggable
        elements, customizable nodes and edges and a bunch of event handlers.
      </p>
      <a class="docs-button max-w-max" href="/guide/"> Documentation </a>
    </div>
  </div>
  <div
    class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase border-1 border-secondary overflow-hidden"
  >
    <VueFlow class="basic">
      <Controls position="bottom-right" />
      <Background :gap="60">
        <template #pattern>
          <Cross :style="{ fontSize: `${8 * viewport.zoom || 1}px` }" class="text-[#10b981] opacity-50" />
        </template>
      </Background>
    </VueFlow>
  </div>
</template>

<style>
.basic .vue-flow__node-input.selected .vue-flow__handle {
  @apply bg-green-500;
}

.basic .vue-flow__node-default.selected .vue-flow__handle {
  @apply bg-green-500;
}

.basic .vue-flow__node-output.selected .vue-flow__handle {
  @apply bg-green-500;
}
</style>
