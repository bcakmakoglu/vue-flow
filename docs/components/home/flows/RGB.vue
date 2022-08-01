<script lang="ts" setup>
import type { MiniMapNodeFunc } from '@braks/vue-flow'
import { Background, BackgroundVariant, Controls, MiniMap, VueFlow, useVueFlow } from '@braks/vue-flow'
import { breakpointsTailwind } from '@vueuse/core'
import CustomEdge from '../edges/Custom.vue'
import RGBNode from '../nodes/Input.vue'
import RGBOutputNode from '../nodes/Output.vue'

const emit = defineEmits(['pane'])

const breakpoints = useBreakpoints(breakpointsTailwind)

interface Colors {
  red: number
  green: number
  blue: number
}

const { onPaneReady, getNode, panOnDrag } = useVueFlow({
  id: 'rgb-flow',
  nodes: [
    { id: '1', type: 'rgb', data: { color: 'g' }, position: { x: -25, y: 0 } },
    { id: '2', type: 'rgb', data: { color: 'r' }, position: { x: 50, y: -110 } },
    { id: '3', type: 'rgb', data: { color: 'b' }, position: { x: 0, y: 110 } },
    { id: '4', type: 'rgb-output', label: 'RGB', position: { x: 400, y: -25 } },
  ],
  edges: [
    { id: 'e1-4', type: 'rgb-line', data: { color: 'green' }, source: '1', target: '4', animated: true },
    { id: 'e2-4', type: 'rgb-line', data: { color: 'red' }, source: '2', target: '4', animated: true },
    { id: 'e3-4', type: 'rgb-line', data: { color: 'blue' }, source: '3', target: '4', animated: true },
  ],
  zoomOnScroll: false,
  nodeExtent: [
    [-50, -150],
    [500, 300],
  ],
  preventScrolling: false,
})

onPaneReady((i) => emit('pane', i))

const el = templateRef<HTMLDivElement>('el', null)

const color = ref<Colors>({
  red: 222,
  green: 45,
  blue: 140,
})

watch(
  [breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl, breakpoints['2xl']],
  () => {
    const mobile = breakpoints.isSmaller('md')
    if (mobile) {
      getNode.value('4')!.position = { x: 300, y: -25 }
    }
    panOnDrag.value = !mobile
  },
  { immediate: true },
)

const onChange = ({ color: c, val }: { color: keyof Colors; val: number }) => (color.value[c] = Number(val))

const nodeColor: MiniMapNodeFunc = (node) => {
  switch (node.id) {
    case '1':
      return 'green'
    case '2':
      return 'red'
    case '3':
      return 'blue'
    case '4':
      return `rgb(${color.value.red}, ${color.value.green}, ${color.value.blue})`
  }
  return ''
}
</script>

<template>
  <div
    ref="el"
    class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase overflow-hidden bg-gray-800 border-2"
    :style="{ borderColor: `rgb(${color.red}, ${color.green}, ${color.blue})` }"
  >
    <VueFlow class="relative font-mono">
      <template #edge-rgb-line="rgbLineProps">
        <CustomEdge v-bind="{ ...rgbLineProps, data: { text: color[rgbLineProps.data?.color], ...rgbLineProps.data } }" />
      </template>
      <template #node-rgb="rgbProps">
        <RGBNode v-bind="rgbProps" :amount="color" @change="onChange" />
      </template>
      <template #node-rgb-output="rgbOutputProps">
        <RGBOutputNode v-bind="rgbOutputProps" :rgb="`rgb(${color.red}, ${color.green}, ${color.blue})`" />
      </template>
      <Controls class="hidden md:block" />
      <Background
        :variant="BackgroundVariant.Lines"
        :pattern-color="`rgb(${color.red}, ${color.green}, ${color.blue})`"
        :gap="48"
        :size="1"
      />
      <MiniMap class="hidden sm:block transform scale-25 md:scale-50 lg:scale-75 origin-bottom-right" :node-color="nodeColor" />
    </VueFlow>
  </div>
  <div class="md:max-w-1/3 flex flex-col gap-12 justify-center <md:pt-12">
    <div class="flex flex-col gap-2 items-center md:items-start">
      <h1>Customizable</h1>
      <p>
        You can expand on the existing features by using your own custom nodes and edges and implement any design and
        functionality you want.
      </p>
      <a class="docs-button max-w-max" href="/guide/">Documentation</a>
    </div>
  </div>
</template>
