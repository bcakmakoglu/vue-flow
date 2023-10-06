<script lang="ts" setup>
import { Handle, Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Background } from '@vue-flow/background'
import Heart from '~icons/mdi/heart'

const breakpoints = useBreakpoints(breakpointsTailwind)

const currentBreakpoint = ref<string | null>(null)

const isDark = ref(false)

onMounted(() => {
  const html = document.getElementsByTagName('html')![0]

  isDark.value = html.classList.contains('dark')

  const observer = new MutationObserver(() => {
    isDark.value = html.classList.contains('dark')
  })

  observer.observe(html, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})

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
  nodes: [
    { id: 'intro', type: 'box', position: { x: 0, y: 0 } },
    { id: 'examples', type: 'box', position: { x: -50, y: 400 } },
    { id: 'documentation', type: 'box', position: { x: 300, y: 400 } },
    { id: 'acknowledgement', type: 'box', position: { x: 150, y: 500 } },
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

const el = templateRef<HTMLDivElement>('el', null)

const setElements = useDebounceFn(
  () => {
    const offsetX = dimensions.value.width / 2
    const offsetY = dimensions.value.height / 4

    if (breakpoints.isSmaller('md') && currentBreakpoint.value !== 'sm') {
      const mainNode = findNode('intro')!

      currentBreakpoint.value = 'sm'

      getNodes.value.forEach((node) => {
        switch (node.id) {
          case 'intro':
            node.position = {
              x: offsetX - node.dimensions.width / 2,
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
    } else if (!breakpoints.isSmaller('md')) {
      currentBreakpoint.value = 'md'

      getNodes.value.forEach((node) => {
        const mainNode = findNode('intro')!
        switch (node.id) {
          case 'intro':
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
  },
  () => (currentBreakpoint.value === null ? 5 : 50),
)

onNodesInitialized(() => {
  setElements()
})

useResizeObserver(el, setElements)

function scrollTo() {
  const el = document.getElementById('acknowledgement')

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <VueFlow ref="el">
    <Background id="dots" pattern-color="#aaa" :size="0.75" :gap="25" />
    <Background id="lines" variant="lines" :pattern-color="isDark ? '#fff' : '#000'" :size="1" :gap="100" />

    <template #node-box="props">
      <template v-if="props.id === 'intro'">
        <div class="box max-w-75 md:max-w-125">
          <div class="intro px-4 py-2 shadow-lg rounded-md border-2 border-solid border-black">
            <div class="font-mono flex flex-col gap-4 p-4 items-center text-center">
              <h1 class="text-2xl lg:text-4xl !my-0 !pt-0 font-bold">Vue Flow</h1>

              <h2 class="text-lg lg:text-xl font-normal !border-0">
                The customizable Vue 3 component bringing interactivity to flowcharts and graphs.
              </h2>
            </div>

            <Handle
              :connectable="false"
              style="height: 12px; width: 6rem; bottom: -6px; background: #aaa; border-radius: 2px"
              type="source"
              :position="Position.Bottom"
            />
          </div>
        </div>
      </template>

      <template v-else-if="props.id === 'documentation'">
        <div class="flex">
          <a class="intro-link group bg-[#f15a16]" href="/guide/"> Read The Documentation </a>
        </div>

        <Handle
          style="height: 12px; width: 2rem; top: -6px; background: #aaa; border-radius: 2px"
          type="target"
          :position="Position.Top"
        />

        <Handle
          style="height: 12px; width: 2rem; bottom: -6px; background: #aaa; border-radius: 2px"
          class="block md:hidden"
          type="source"
          :position="Position.Bottom"
        />
      </template>

      <template v-else-if="props.id === 'examples'">
        <div class="flex">
          <a class="intro-link group bg-pink-500" href="/examples/"> Check The Examples </a>
        </div>

        <Handle
          style="height: 12px; width: 2rem; top: -6px; background: #aaa; border-radius: 2px"
          type="target"
          :position="Position.Top"
        />

        <Handle
          style="height: 12px; width: 2rem; bottom: -6px; background: #aaa; border-radius: 2px"
          class="block md:hidden"
          type="source"
          :position="Position.Bottom"
        />
      </template>

      <template v-else-if="props.id === 'acknowledgement'">
        <div class="flex" @click="scrollTo">
          <button class="intro-link group bg-sky-500"><Heart class="text-red-500" /> Acknowledgement</button>
        </div>

        <Handle
          style="height: 12px; width: 2rem; top: -6px; background: #aaa; border-radius: 2px"
          type="target"
          :position="Position.Top"
        />
      </template>
    </template>
  </VueFlow>
</template>

<style>
.intro {
  @apply cursor-pointer
  bg-primary
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
