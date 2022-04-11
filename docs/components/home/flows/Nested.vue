<script lang="ts" setup>
import { ConnectionMode, useVueFlow, VueFlow, Background, Controls } from '@braks/vue-flow'
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const emit = defineEmits(['pane'])

const nodeClasses = ['!normal-case font-semibold !text-white', '!border-1', 'shadow-md'].join(' ')
const childClasses = `${nodeClasses} !bg-green-500/70 !border-white`

const { onPaneReady, panOnDrag } = useVueFlow({
  fitViewOnInit: true,
  connectionMode: ConnectionMode.Loose,
  zoomOnScroll: false,
  preventScrolling: false,
  translateExtent: [
    [-500, -100],
    [600, 500],
  ],
  nodes: [
    { id: '1', type: 'input', label: 'Outer Node', position: { x: 0, y: 0 }, class: childClasses },
    {
      id: '2',
      label: 'Parent Node',
      position: { x: -125, y: 100 },
      class: `${nodeClasses} !bg-green-500/30 !border-green-500`,
      style: { width: '400px', height: '160px' },
    },
    {
      id: '2a',
      label: 'Child Node',
      position: { x: 17, y: 30 },
      parentNode: '2',
      extent: 'parent',
      class: childClasses,
    },
    { id: '2b', label: 'Child Node', position: { x: 225, y: 30 }, parentNode: '2', extent: 'parent', class: childClasses },
    { id: '2c', label: 'Child Node', position: { x: 125, y: 100 }, parentNode: '2', extent: 'parent', class: childClasses },
    { id: '3', type: 'output', label: 'Outer Node', position: { x: 0, y: 300 }, class: childClasses },
  ],
  edges: [
    { id: 'e1-2a', source: '1', target: '2a', type: 'smoothstep', style: { stroke: 'white', strokeWidth: '2' } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: 'white', strokeWidth: '2' } },
  ],
})

watch(
  [breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl, breakpoints['2xl']],
  () => {
    panOnDrag.value = !breakpoints.isSmaller('md')
  },
  { immediate: true },
)

onPaneReady((i) => emit('pane', i))
</script>
<template>
  <div class="md:max-w-1/3 flex flex-col justify-center <md:pt-12">
    <div class="flex flex-col gap-2 items-center md:items-start">
      <h1>Complex Flows</h1>
      <p>
        You want to visualize more complex ideas?
        <br />
        No worries! Vue Flow supports creating nested nodes and nested graphs out-of-the-box.
      </p>
      <router-link class="button max-w-max" to="/guide/"> Documentation </router-link>
    </div>
  </div>
  <div
    class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase border-1 border-green-500 overflow-hidden"
  >
    <VueFlow class="nested">
      <Controls class="md:!left-auto md:!right-[10px]" />
      <Background pattern-color="#aaa" class="!bg-gray-800" :gap="18" />
    </VueFlow>
  </div>
</template>
<style>
.nested .vue-flow__handle {
  opacity: 0;
}
</style>
