<script lang="ts" setup>
import { ref } from 'vue'
import { VueFlow, MiniMap, Background, Controls, Elements, MarkerType, FlowEvents } from '@braks/vue-flow'

interface Props {
  next: (node: string[], duration: number) => void
}
const props = defineProps<Props>()

const elements = ref<Elements>([
  { id: '1', type: 'input', label: 'Back To The Start', position: { x: 200, y: 0 } },
  { id: '2', label: 'Node 2', position: { x: 0, y: 130 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 130 } },
  { id: 'e1-2', source: '1', target: '2', markerEnd: MarkerType.Arrow },
  { id: 'e1-3', source: '1', target: '3', markerEnd: MarkerType.Arrow },
])

const onLoad = ({ fitView }) => fitView({ padding: 0.5 })
const onNodeClick = ({ node }: FlowEvents['nodeClick']) => {
  if (node.type === 'input') props.next(['intro', 'examples', 'tour', 'documentation'], 4000)
}
</script>
<template>
  <div
    ref="page"
    class="!pointer-events-auto font-mono flex flex flex-col md:flex-row bg-white w-[100vw] h-[80vh]"
    :style="{ borderRadius: 0 }"
  >
    <VueFlow
      id="features-flow"
      v-model="elements"
      class="relative font-mono"
      :pane-moveable="true"
      @pane-ready="onLoad"
      @node-click="onNodeClick"
    >
      <Controls />
      <Background />
      <MiniMap />
    </VueFlow>
    <div class="flex bg-light-800 flex-col justify-center gap-2 md:gap-4 p-6 w-full md:w-1/3">
      <h1 class="pointer-events-none text-xl lg:text-4xl">Everything you need</h1>
      <h2 class="pointer-events-none text-sm lg:text-xl text-black font-normal">
        Vue Flow ships with a <strong>Minimap-, Background- and Controls-Component</strong>. On top of that we add
        <strong>Zoom & Pan utilities</strong> with which you can create the exact same transitions that are used on this site!
      </h2>
      <div class="!pointer-events-auto transform scale-75 lg:scale-100 flex flex-row justify-center items-center gap-4">
        <a class="p-4 bg-green-500 hover:bg-black rounded-xl !text-white font-semibold text-lg" href="/docs">
          Documentation
        </a>
        <a
          class="!pointer-events-auto p-4 bg-white hover:bg-black rounded-xl bg-blue-500 !text-white font-semibold text-lg"
          href="/examples"
        >
          Examples
        </a>
      </div>
    </div>
  </div>
</template>
