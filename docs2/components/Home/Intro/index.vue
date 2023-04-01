<script lang="ts" setup>
import { Panel, PanelPosition, VueFlow, useVueFlow } from '@vue-flow/core'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Background, BackgroundVariant } from '@vue-flow/background'
import { CreditNode, DocsNode, ExamplesNode, IntroNode } from './Nodes'
import { initialEdges, initialNodes, mobileEdges } from './utils'

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

const { getNodes, findNode, setEdges, updateNodeInternals, dimensions, onNodesInitialized } = useVueFlow({
  nodeTypes: {
    intro: markRaw(IntroNode),
    examples: markRaw(ExamplesNode),
    documentation: markRaw(DocsNode),
    acknowledgement: markRaw(CreditNode),
  },
  nodes: initialNodes,
  edges: initialEdges,
  elementsSelectable: true,
  panOnDrag: false,
  zoomOnScroll: false,
  zoomOnDoubleClick: false,
  zoomOnPinch: false,
  preventScrolling: false,
  elevateEdgesOnSelect: true,
})

const el = templateRef<HTMLDivElement>('el', null)

const { stop } = useResizeObserver(el, useDebounceFn(setElements, 5))

onNodesInitialized(setElements)

onBeforeUnmount(stop)

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

    setEdges(mobileEdges)
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

  nextTick(updateNodeInternals)
}
</script>

<template>
  <VueFlow ref="el">
    <Background id="a" :variant="BackgroundVariant.Dots" :pattern-color="dark ? '#ffffff' : '#000000'" :size="3" :gap="50" />
    <Background id="b" :variant="BackgroundVariant.Lines" :pattern-color="dark ? '#ffffff' : '#000000'" :gap="100" />

    <Panel :position="PanelPosition.TopRight" class="lg:(pt-4 px-6)">
      <h1 class="primary-gradient text-transparent bg-clip-text inline-block text-6xl lg:text-7xl font-bold">Vue Flow</h1>
      <h2 class="text-3xl lg:text-5xl font-bold dark:text-white px-4">Connect the Dots.</h2>
    </Panel>
  </VueFlow>
</template>

<style>
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
  dark:(shadow-white/15)
  transition-colors
  ease-in-out
  rounded-lg
  text-white
  font-semibold
  text-lg;
}
</style>
