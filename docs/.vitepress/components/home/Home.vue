<script lang="ts" setup>
import { VueFlow, Handle, Position, useVueFlow } from "@braks/vue-flow";
import { useBreakpoints } from "@vueuse/core";
import BoxNode from "./nodes/Box.vue";
import RGBFlow from "./RGB.vue";
import BasicFlow from "./Basic.vue";
import FeaturesFlow from "./Features.vue";

const breakpoints = useBreakpoints({
  mobile: 320,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
});

const desktop = breakpoints.greater("tablet");

const { dimensions, instance, onPaneReady } = useVueFlow({
  nodes: [
    { id: "intro", type: "box", position: { x: 480, y: 50 }, draggable: true, extent: [[0, -100], [1000, 300]] },
    { id: "examples", type: "box", position: { x: 800, y: 400 } },
    { id: "tour", type: "box", position: { x: 650, y: 550 } },
    { id: "documentation", type: "box", position: { x: 400, y: 400 } },
    { id: 'basic', type: 'basic', position: { x: 250, y: 2500 }, style: { cursor: 'default' } },
  ],
  edges: [
    {
      id: "eintro-examples",
      type: "smoothstep",
      sourceHandle: "a",
      source: "intro",
      target: "examples",
      animated: true,
      style: { strokeWidth: 2, stroke: "#8b5cf6" }
    },
    {
      id: "eexamples-tour",
      type: "smoothstep",
      sourceHandle: "a",
      source: "examples",
      target: "tour",
      animated: true,
      style: { strokeWidth: 3, stroke: "#3b82f6" }
    },
    {
      id: "edocumentation-tour",
      type: "smoothstep",
      sourceHandle: "a",
      source: "documentation",
      target: "tour",
      animated: true,
      style: { strokeWidth: 3, stroke: "#3b82f6" }
    },
    {
      id: "eintro-documentation",
      type: "smoothstep",
      sourceHandle: "a",
      source: "intro",
      target: "documentation",
      animated: true,
      style: { strokeWidth: 2, stroke: "#f97316" }
    }
  ],
  elementsSelectable: true,
  nodesDraggable: false,
  panOnDrag: false,
  zoomOnScroll: false
});

onPaneReady(({ fitView }) => {
  setTimeout(() => {
    fitView({
      nodes: ["intro", "examples", "tour", "documentation"],
      duration: 1500
    });
  });
});

const nextNode = (id: string[], duration = 2000, padding = 0) => instance.value.fitView({
  padding,
  nodes: id,
  duration
});
</script>
<template>
  <div class="home-page">
    <div class="flex h-[60vh] md:h-[80vh] w-full gap-4" style="border-radius: 0">
      <VueFlow>
        <template #node-box="props">
          <template v-if="props.id === 'intro'">
            <div class="max-w-[500px]">
              <BoxNode class="bg-green-500 text-white">
                <div class="font-mono flex flex-col gap-4 p-4 items-center">
                  <h1 class="pointer-events-none text-2xl lg:text-4xl">Visualize your ideas with Vue Flow</h1>
                  <h2 class="pointer-events-none text-lg lg:text-xl font-normal">
                    A customizable Vue.js library for building node-based editors and diagrams.
                  </h2>
                </div>
              </BoxNode>
            </div>
          </template>
          <template v-else-if="props.id === 'documentation'">
            <div class="flex">
              <a
                class="
                  flex flex-row
                  gap-3
                  items-center
                  p-4
                  shadow-lg
                  bg-orange-500
                  hover:bg-black
                  rounded-xl
                  !text-white
                  font-semibold
                  text-lg
                "
                href="/docs"
              >
                <i class="icon-sm icon-file-document !text-blue-700" />Read The Documentation
              </a>
            </div>
            <Handle type="target" :position="Position.Top" />
            <Handle type="source" :position="Position.Bottom" />
          </template>
          <template v-else-if="props.id === 'tour'">
            <button
              class="
                flex flex-row
                gap-3
                items-center
                p-4
                shadow-lg
                hover:bg-black
                bg-blue-500
                rounded-xl
                !text-white
                font-semibold
                text-lg
              "
              @click="nextNode(['basic'])"
            >
              <i class="icon-sm icon-heart !text-red-300" />Start the Tour
            </button>
            <Handle type="target" :position="Position.Top" />
            <Handle type="source" :position="Position.Bottom" />
          </template>
          <template v-else-if="props.id === 'examples'">
            <div class="flex">
              <a
                class="
                  flex flex-row
                  gap-3
                  items-center
                  p-4
                  shadow-lg
                  hover:bg-black
                  bg-purple-500
                  rounded-xl
                  !text-white
                  font-semibold
                  text-lg
                "
                href="/examples"
              >
                <i class="icon-sun icon-sm !text-yellow-300" />Check The Examples
              </a>
            </div>
            <Handle type="target" :position="Position.Top" />
            <Handle type="source" :position="Position.Bottom" />
          </template>
        </template>
        <template #node-basic>
          <BasicFlow>
            <button
              class="
                flex flex-row
                gap-3
                items-center
                p-4
                shadow-lg
                hover:bg-black
                dark:(bg-black) dark:hover:bg-blue-500
                bg-blue-500
                rounded-xl
                !text-white
                font-semibold
                text-lg
              "
              @click="nextNode(['rgb'], 3500)"
            >
              <i class="icon-sm icon-heart !text-red-300" />Continue Demo
            </button>
            <Handle type="target" :position="Position.Top" />
          </BasicFlow>
          <Handle id="basic-a" type="source" :position="Position.Right" />
          <Handle id="basic-b" type="target" :position="Position.Top" />
        </template>
      </VueFlow>
    </div>
  </div>
</template>
<style scoped>
a {
  @apply text-green-500 font-semibold hover:text-green-300;
}

button:focus {
  outline: none;
}
</style>
