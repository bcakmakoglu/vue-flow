<script lang="ts" setup>
import { VueFlow, Handle, Position, useVueFlow } from '@braks/vue-flow'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import Blobity from 'blobity'
import BoxNode from './nodes/Box.vue'

const dark = useDark({
  selector: 'html',
})

const breakpoints = useBreakpoints(breakpointsTailwind)

onMounted(() => {
  if (!breakpoints.isSmaller('md')) {
    const blobity = new Blobity({
      color: dark.value ? '#ffffff' : '#000000',
      invert: true,
      zIndex: 0,
      magnetic: false,
      dotColor: '#10b981',
      radius: 8,
      focusableElementsOffsetX: 2,
      focusableElementsOffsetY: 2,
      mode: 'bouncy',
    })

    onBeforeUnmount(() => {
      blobity.destroy()
    })
  }
})

const { dimensions, instance, onPaneReady, getNodes, getNode, getEdge, updateEdge, edges } = useVueFlow({
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

const init = ref(false)
const edgeId = ref('eintro-documentation')
const el = templateRef<HTMLDivElement>('el', null)

onPaneReady(({ fitView }) => {
  fitView({
    duration: 1500,
  })

  const setNodes = () => {
    if (breakpoints.isSmaller('md')) {
      const mainNode = getNode.value('intro')!
      getNodes.value.forEach((node) => {
        switch (node.id) {
          case 'intro':
            node.position = { x: 0, y: 0 }
            break
          case 'examples':
            node.position = {
              x: mainNode.dimensions.width / 2 - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 1.5,
            }
            break
          case 'documentation':
            node.position = {
              x: mainNode.dimensions.width / 2 - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 2 + 50,
            }
            break
        }
      })

      const newEdge = updateEdge(getEdge.value(edgeId.value)!, {
        source: 'examples',
        target: 'documentation',
      })
      if (newEdge) edgeId.value = newEdge.id
    } else {
      getNodes.value.forEach((node) => {
        const mainNode = getNode.value('intro')!
        switch (node.id) {
          case 'intro':
            node.position = { x: 0, y: 0 }
            break
          case 'examples':
            node.position = { x: -node.dimensions.width / 2, y: mainNode.dimensions.height * 1.5 }
            break
          case 'documentation':
            console.log(mainNode.dimensions.width, node.dimensions.width)
            node.position = {
              x: mainNode.dimensions.width - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 1.5,
            }
            break
        }
      })

      const newEdge = updateEdge(getEdge.value(edgeId.value)!, {
        source: 'intro',
        target: 'documentation',
      })
      if (newEdge) edgeId.value = newEdge.id
    }

    setTimeout(
      () => {
        if (!init.value) init.value = true
        else instance.value?.fitView()
      },
      init.value ? 5 : 1505,
    )
  }

  useResizeObserver(el, setNodes)
})
</script>
<template>
  <div ref="el" class="h-[90vh] md:h-[75vh]">
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
            <router-link class="link group bg-orange-500" to="/guide/"> Read The Documentation </router-link>
          </div>
          <Handle type="target" :position="Position.Top" />
        </template>
        <template v-else-if="props.id === 'examples'">
          <div class="flex">
            <router-link class="link group bg-purple-500" to="/examples/"> Check The Examples </router-link>
          </div>
          <Handle type="target" :position="Position.Top" />
          <Handle class="block md:hidden" type="source" :position="Position.Bottom" />
        </template>
      </template>
    </VueFlow>
  </div>
</template>
<style>
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
  hover:(scale-102)
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

h1 {
  @apply text-xl lg:text-4xl mb-4 font-bold;
}

h2 {
  @apply text-lg lg:text-2xl mb-4 font-semibold;
}

p {
  @apply text-md lg:text-lg;
}

p ~ h1,
p ~ h2 {
  @apply mt-6;
}
</style>
