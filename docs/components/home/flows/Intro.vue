<script lang="ts" setup>
import type { Edge, Node, VueFlowInstance } from '@vue-flow/core';
import { Background, Handle, Position, VueFlow } from '@vue-flow/core';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Heart from '~icons/mdi/heart';

const breakpoints = useBreakpoints(breakpointsTailwind);

const currentBreakpoint = ref<string | null>(null);

const isDark = ref(false);

onMounted(() => {
  const html = document.getElementsByTagName('html')![0];

  isDark.value = html.classList.contains('dark');

  const observer = new MutationObserver(() => {
    isDark.value = html.classList.contains('dark');
  });

  observer.observe(html, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});

const initialNodes: Node[] = [
  { id: 'intro', type: 'box', position: { x: 0, y: 0 }, data: {} },
  { id: 'examples', type: 'box', position: { x: -50, y: 400 }, data: {} },
  { id: 'documentation', type: 'box', position: { x: 300, y: 400 }, data: {} },
  { id: 'acknowledgement', type: 'box', position: { x: 150, y: 500 }, data: {} },
];

const initialEdges: Edge[] = [
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
];

// `<VueFlow>` exposes its store via `defineExpose`, so a template ref is the pure-provider way to reach
// the store (getNodes/getNode/setEdges/updateNodeInternals) from the component that renders the flow
// (no `useVueFlow()` outside a provider needed). The container size comes from the wrapper element —
// the instance no longer exposes `dimensions` / `vueFlowRef`.
const flow = ref<VueFlowInstance>();

const flowWrapper = ref<HTMLElement>();

const setElements = useDebounceFn(() => {
  if (!flow.value || !flowWrapper.value) {
    return;
  }

  const { getInternalNode, setNodes, setEdges, updateNodeInternals } = flow.value;

  const { width, height } = flowWrapper.value.getBoundingClientRect();
  const offsetX = width / 2;
  const offsetY = height / 4;

  // anchor the layout on the centered `intro` position, computed up front. Reading
  // `getNode('intro').position` inside the `setNodes` map would be a frame behind (it still holds the
  // pre-update value), so the other nodes would be placed relative to intro's *old* spot — which left
  // them mis-aligned (e.g. `examples` off-screen) until a second resize happened to re-converge.
  const mainInternal = getInternalNode('intro')!;
  const mainWidth = mainInternal.measured.width ?? 0;
  const mainHeight = mainInternal.measured.height ?? 0;
  const mainX = offsetX - mainWidth / 2;
  const mainY = offsetY - mainHeight / 2;

  if (breakpoints.isSmaller('md') && currentBreakpoint.value !== 'sm') {
    currentBreakpoint.value = 'sm';

    setNodes(nodes =>
      nodes.map((node) => {
        const internal = getInternalNode(node.id)!;

        switch (node.id) {
          case 'intro':
            return {
              ...node,
              position: { x: mainX, y: mainY },
            };
          case 'examples':
            return {
              ...node,
              position: {
                x: offsetX - (internal.measured.width ?? 0) / 2,
                y: mainY + mainHeight * 1.5,
              },
            };
          case 'documentation':
            return {
              ...node,
              position: {
                x: offsetX - (internal.measured.width ?? 0) / 2,
                y: mainY + mainHeight * 2 + 50,
              },
            };
          case 'acknowledgement':
            return {
              ...node,
              position: {
                x: offsetX - (internal.measured.width ?? 0) / 2,
                y: mainY + mainHeight * 3,
              },
            };
          default:
            return node;
        }
      }),
    );

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
      ];
    });
  }
  else if (!breakpoints.isSmaller('md')) {
    currentBreakpoint.value = 'md';

    setNodes(nodes =>
      nodes.map((node) => {
        const internal = getInternalNode(node.id)!;

        switch (node.id) {
          case 'intro':
            return {
              ...node,
              position: { x: mainX, y: mainY },
            };
          case 'examples':
            return {
              ...node,
              position: {
                x: mainX - (internal.measured.width ?? 0) / 2,
                y: mainY + mainHeight * 1.5,
              },
            };
          case 'documentation':
            return {
              ...node,
              position: {
                x: mainX + mainWidth - (internal.measured.width ?? 0) / 2,
                y: mainY + mainHeight * 1.5,
              },
            };
          case 'acknowledgement':
            return {
              ...node,
              position: {
                x: offsetX - (internal.measured.width ?? 0) / 2,
                y: mainY + mainHeight * 2,
              },
            };
          default:
            return node;
        }
      }),
    );

    setEdges(initialEdges);
  }

  nextTick(() => {
    updateNodeInternals();
  });
}, 1);

useResizeObserver(flowWrapper, setElements);

function scrollTo() {
  const el = document.getElementById('acknowledgement');

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <div ref="flowWrapper" class="h-full w-full">
    <VueFlow
      ref="flow"
      :nodes="initialNodes"
      :edges="initialEdges"
      :elements-selectable="true"
      :pan-on-drag="false"
      :zoom-on-scroll="false"
      :zoom-on-double-click="false"
      :zoom-on-pinch="false"
      :prevent-scrolling="false"
      :elevate-edges-on-select="true"
      :style="{ opacity: !!currentBreakpoint ? 1 : 0 }"
    >
      <Background id="dots" color="#aaa" :size="0.75" :gap="25" />
      <Background id="lines" variant="lines" :color="isDark ? '#fff' : '#000'" :size="1" :gap="100" />

      <template #node-box="props">
        <template v-if="props.id === 'intro'">
          <div class="box max-w-75 md:max-w-125">
            <div class="intro px-4 py-2 shadow-lg rounded-md border-2 border-solid border-black">
              <div class="font-mono flex flex-col gap-4 p-4 items-center text-center">
                <h1 class="text-2xl lg:text-4xl !my-0 !pt-0 font-bold">
                  Vue Flow
                </h1>

                <h2 class="!text-lg !lg:text-xl !tracking-normal !font-normal !p-0 !m-0 !border-0 !mb-4">
                  The customizable Vue 3 component bringing interactivity to flowcharts and graphs.
                </h2>
              </div>

              <Handle
                :is-connectable="false"
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
            <button class="intro-link group bg-sky-500">
              <Heart class="text-red-500" /> Acknowledgement
            </button>
          </div>

          <Handle
            style="height: 12px; width: 2rem; top: -6px; background: #aaa; border-radius: 2px"
            type="target"
            :position="Position.Top"
          />
        </template>
      </template>
    </VueFlow>
  </div>
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
  !text-white
  !font-semibold
  !no-underline
  text-lg;
}
</style>
