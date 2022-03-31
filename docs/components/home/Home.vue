<script lang="ts" setup>
import { watch } from 'vue'
import { VueFlow, Handle, Position, useVueFlow } from '@braks/vue-flow'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import BoxNode from './nodes/Box.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

const { dimensions, instance, onPaneReady, getNodes, getNode } = useVueFlow({
  nodes: [
    { id: 'intro', type: 'box', position: { x: 0, y: 0 } },
    { id: 'examples', type: 'box', position: { x: -50, y: 400 } },
    { id: 'documentation', type: 'box', position: { x: 300, y: 400 } },
  ],
  edges: [
    {
      id: 'eintro-examples',
      type: 'smoothstep',
      sourceHandle: 'a',
      source: 'intro',
      target: 'examples',
      animated: true,
      style: { strokeWidth: 2, stroke: '#8b5cf6' },
    },
    {
      id: 'eintro-documentation',
      type: 'smoothstep',
      sourceHandle: 'a',
      source: 'intro',
      target: 'documentation',
      animated: true,
      style: { strokeWidth: 2, stroke: '#f97316' },
    },
  ],
  elementsSelectable: true,
  nodesDraggable: false,
  panOnDrag: false,
  zoomOnScroll: false,
})

onPaneReady(({ fitView }) => {
  fitView({
    nodes: ['intro', 'examples', 'documentation'],
    duration: 1500,
  })

  setTimeout(() => {
    watch([breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl, breakpoints['2xl']], () =>
      setTimeout(() => {
        instance.value?.fitView()
      }, 5),
    )
  }, 1500)
})
</script>
<template>
  <div class="h-[90vh] md:h-[75vh]">
    <VueFlow class="dark:bg-black bg-white transition-colors duration-200 ease-in-out">
      <template #node-box="props">
        <template v-if="props.id === 'intro'">
          <div class="max-w-[500px]">
            <BoxNode class="intro">
              <div class="font-mono flex flex-col gap-4 p-4 items-center">
                <h1 class="pointer-events-none text-2xl lg:text-4xl text-center">Visualize your ideas with Vue Flow</h1>
                <h2 class="pointer-events-none text-lg lg:text-xl font-normal">
                  A customizable Vue.js library for building node-based editors and diagrams.
                </h2>
              </div>
            </BoxNode>
          </div>
        </template>
        <template v-else-if="props.id === 'documentation'">
          <div class="flex">
            <a class="link group bg-orange-500" href="/docs"> Read The Documentation </a>
          </div>
          <Handle type="target" :position="Position.Top" />
          <Handle type="source" :position="Position.Bottom" />
        </template>
        <template v-else-if="props.id === 'examples'">
          <div class="flex">
            <a class="link group bg-purple-500" href="/examples"> Check The Examples </a>
          </div>
          <Handle type="target" :position="Position.Top" />
          <Handle type="source" :position="Position.Bottom" />
        </template>
      </template>
    </VueFlow>
  </div>
</template>
<style scoped>
.intro {
  @apply cursor-pointer
  bg-green-500
  text-white
  transform
  transition-transform
  duration-300
  hover:(scale-105 ring ring-white);
}

.link {
  @apply flex
  gap-3
  items-center
  p-4
  shadow-lg
  transform
  transition-transform
  duration-300
  hover:(scale-102 bg-black dark:(bg-white text-black))
  transition-colors
  ease-in-out
  rounded-lg
  text-white
  font-semibold
  text-lg;
}

button:focus {
  outline: none;
}
</style>
