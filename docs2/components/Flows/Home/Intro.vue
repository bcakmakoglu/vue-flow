<script lang="ts" setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Background } from '@vue-flow/background'
import { CreditNode, DocsNode, ExamplesNode, IntroNode } from './Nodes'

const breakpoints = useBreakpoints(breakpointsTailwind)

const dark = ref(false)

onMounted(() => {
  const html = document.getElementsByTagName('html')![0]

  const observer = new MutationObserver(() => {
    dark.value = html.classList.contains('dark')
  })

  observer.observe(html, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
  })
})

const nodeTypes = {
  intro: markRaw(IntroNode),
  examples: markRaw(ExamplesNode),
  documentation: markRaw(DocsNode),
  acknowledgement: markRaw(CreditNode),
}

const initialEdges = [
  {
    id: 'eintro-examples',
    sourceHandle: 'a',
    source: 'intro',
    target: 'examples',
    animated: true,
    style: { strokeWidth: 4, stroke: '#ef467e' },
  },
  {
    id: 'eintro-documentation',
    sourceHandle: 'a',
    source: 'intro',
    target: 'documentation',
    animated: true,
    style: { strokeWidth: 4, stroke: '#f97316' },
  },
  {
    id: 'eintro-acknowledgement',
    sourceHandle: 'a',
    source: 'intro',
    target: 'acknowledgement',
    animated: true,
    style: { strokeWidth: 4, stroke: '#0ea5e9' },
  },
]
const { getNodes, findNode, setEdges, updateNodeInternals, dimensions, onNodesInitialized } = useVueFlow({
  nodeTypes,
  nodes: [
    { id: 'intro', type: 'intro', position: { x: 0, y: 0 } },
    { id: 'examples', type: 'examples', position: { x: -50, y: 400 } },
    { id: 'documentation', type: 'documentation', position: { x: 300, y: 400 } },
    { id: 'acknowledgement', type: 'acknowledgement', position: { x: 150, y: 500 } },
  ],
  edges: initialEdges,
  elementsSelectable: true,
  panOnDrag: false,
  zoomOnScroll: false,
  zoomOnDoubleClick: false,
  zoomOnPinch: false,
  preventScrolling: false,
  elevateEdgesOnSelect: true,
})

onNodesInitialized(setElements)

const el = templateRef<HTMLDivElement>('el', null)

function setElements() {
  const offsetX = dimensions.value.width / 2
  const offsetY = dimensions.value.height / 4

  if (breakpoints.isSmaller('md')) {
    const mainNode = findNode('intro')!

    getNodes.value.forEach((node) => {
      switch (node.id) {
        case 'intro':
          if (node.dimensions.width >= dimensions.value.width) {
            node.width = dimensions.value.width - 50
          } else {
            node.width = node.dimensions.width
          }

          node.position = {
            x: offsetX - ((node.width as number) ?? node.dimensions.width) / 2,
            y: offsetY - node.dimensions.height / 2,
          }
          break
        case 'examples':
          node.position = {
            x: offsetX - node.dimensions.width / 2,
            y: mainNode.position.y + mainNode.dimensions.height * 1.5,
          }
          break
        case 'documentation':
          node.position = {
            x: offsetX - node.dimensions.width / 2,
            y: mainNode.position.y + mainNode.dimensions.height * 2 + 50,
          }
          break
        case 'acknowledgement':
          node.position = {
            x: offsetX - node.dimensions.width / 2,
            y: mainNode.position.y + mainNode.dimensions.height * 3,
          }
          break
      }
    })

    setEdges(() => {
      return [
        {
          id: 'eintro-examples',
          sourceHandle: 'a',
          source: 'intro',
          target: 'examples',
          animated: true,
          style: { strokeWidth: 4, stroke: '#ef467e' },
        },
        {
          id: 'eexamples-documentation',
          source: 'examples',
          target: 'documentation',
          animated: true,
          style: { strokeWidth: 4, stroke: '#f97316' },
        },
        {
          id: 'edocumentation-acknowledgement',
          source: 'documentation',
          target: 'acknowledgement',
          animated: true,
          style: { strokeWidth: 4, stroke: '#0ea5e9' },
        },
      ]
    })
  } else {
    getNodes.value.forEach((node) => {
      const mainNode = findNode('intro')!
      switch (node.id) {
        case 'intro':
          node.width = undefined
          node.position = { x: offsetX - node.dimensions.width / 2, y: offsetY - node.dimensions.height / 2 }
          break
        case 'examples':
          node.position = {
            x: mainNode.position.x - node.dimensions.width / 2,
            y: mainNode.position.y + mainNode.dimensions.height * 1.5,
          }
          break
        case 'documentation':
          node.position = {
            x: mainNode.position.x + mainNode.dimensions.width - node.dimensions.width / 2,
            y: mainNode.position.y + mainNode.dimensions.height * 1.5,
          }
          break
        case 'acknowledgement':
          node.position = {
            x: offsetX - node.dimensions.width / 2,
            y: mainNode.position.y + mainNode.dimensions.height * 2,
          }
          break
      }
    })

    setEdges(initialEdges)
  }

  nextTick(() => {
    updateNodeInternals()
  })
}
const { stop } = useResizeObserver(el, useDebounceFn(setElements, 5))
onBeforeUnmount(stop)
</script>

<template>
  <VueFlow ref="el">
    <Background variant="lines" :pattern-color="dark ? '#ffffff' : '#000000'" :size="0.7" :gap="100" />
  </VueFlow>
</template>

<style>
.intro {
  @apply cursor-pointer
  bg-green-500
  text-white
  transform
  transition-transform
  duration-300
  hover:(ring ring-white);
}

.intro-link {
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
</style>
