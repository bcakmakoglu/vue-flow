<script lang="ts" setup>
import { ref } from "vue";
import {
  Elements,
  VueFlow,
  MiniMap,
  Controls,
  Background,
  FlowInstance,
  Position,
  GraphEdge,
  GraphNode
} from "@braks/vue-flow";
import { useBreakpoints, whenever } from "@vueuse/core";

const breakpoints = useBreakpoints({
  mobile: 360,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
});

const getStyle = (el: GraphNode) => {
  const classes = ["font-semibold", "!border-2", "transition-colors", "duration-300", "ease-in-out"];
  if (el.selected) classes.push(...["!border-green-500/80", "!shadow-md", "!shadow-green-500/50", "!bg-green-100/45", "!text-gray-700"]);
  if (el.selected && !el.dragging) classes.push("animate-pulse");
  return classes.join(" ");
};

const elements = ref<Elements>([
  {
    id: "1",
    type: "input",
    label: "input",
    position: { x: 250, y: 5 },
    class: getStyle
  },
  {
    id: "2",
    label: "default",
    position: { x: 100, y: 100 },
    class: getStyle
  },
  { id: "3", label: "default", position: { x: 400, y: 100 }, class: getStyle },
  {
    id: "4",
    type: "output",
    label: "output",
    position: { x: 250, y: 225 },
    class: getStyle
  },
  {
    id: "e1-2",
    source: "1",
    label: "animated edge",
    target: "2",
    animated: true,
    class: "transition-all duration-1000",
    style: (el: GraphEdge) => {
      const sourceNodeSelected = el.sourceNode.selected;
      return {
        transition: "stroke ease-in-out 300ms",
        stroke: el.selected || sourceNodeSelected ? "var(--secondary)" : undefined
      };
    }
  },
  {
    id: "e1-3", source: "1", label: "default edge", target: "3", style: (el: GraphEdge) => {
      const sourceNodeSelected = el.sourceNode.selected;
      return {
        transition: "stroke ease-in-out 300ms",
        stroke: el.selected || sourceNodeSelected ? "red" : undefined
      };
    }
  },
  {
    id: "e2-4", source: "2", type: "step", target: "4", animated: true, style: (el: GraphEdge) => {
      const sourceNodeSelected = el.sourceNode.selected;
      return {
        transition: "stroke ease-in-out 300ms",
        stroke: el.selected || sourceNodeSelected ? "var(--secondary)" : undefined
      };
    }
  }
]);

const customizableElements = ref<Elements>([
  { id: "1", type: "text-input", label: "First Name", position: { x: 0, y: 0 } },
  { id: "2", type: "text-input", label: "Last Name", position: { x: 400, y: 0 } },
  { id: "3", type: "text-output", label: "Node 3", position: { x: 240, y: 200 } },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true }
]);

const additionalElements = ref<Elements>([
  {
    id: "1",
    type: "input",
    sourcePosition: Position.Right,
    label: "input",
    style: { width: "75px" },
    position: { x: 25, y: 120 }
  },
  {
    id: "2",
    label: "A",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 150, y: 25 },
    style: { width: "75px" }
  },
  {
    id: "3",
    label: "B",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 250, y: 25 },
    style: { width: "75px" }
  },
  {
    id: "4",
    label: "C",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 350, y: 25 },
    style: { width: "75px" }
  },
  {
    id: "5",
    label: "D",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 150, y: 220 },
    style: { width: "75px" }
  },
  {
    id: "6",
    label: "E",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 250, y: 220 },
    style: { width: "75px" }
  },
  {
    id: "7",
    label: "F",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 350, y: 220 },
    style: { width: "75px" }
  },
  {
    id: "8",
    type: "output",
    label: "Output",
    targetPosition: Position.Left,
    position: { x: 500, y: 120 },
    style: { width: "75px" }
  },
  { id: "e1-2", type: "step", source: "1", target: "2" },
  { id: "e2-3", type: "step", source: "2", target: "3" },
  { id: "e3-4", type: "step", source: "3", target: "4" },
  { id: "e4-8", type: "step", source: "4", target: "8" },
  { id: "e1-5", type: "step", source: "1", target: "5", animated: true },
  { id: "e5-6", type: "step", source: "5", target: "6", animated: true },
  { id: "e6-7", type: "step", source: "6", target: "7", animated: true },
  { id: "e6-8", type: "step", source: "7", target: "8", animated: true }
]);

const label = ref({
  first: "",
  last: ""
});

const instance = ref<FlowInstance>();
const onChange = ({ name, val }: { name: "first" | "last"; val: string }) => (label.value[name] = val);
const onLoad = (vf: FlowInstance) => {
  if (!instance.value) instance.value = vf;
  vf.fitView();
};
whenever(breakpoints.greater("tablet"), () => instance.value.fitView());
whenever(breakpoints.smaller("tablet"), () => instance.value.fitView());
</script>
<template>
  <div class="w-full">
    <div
      class="flex flex-col gap-12 md:gap-24 lg:gap-36 max-w-9/12 md:max-w-11/12 lg:max-w-9/12 m-auto py-12 md:py-24 text-center md:text-left">
      <div class="flex flex-col md:flex-row gap-12 md:gap-24">
        <div class="md:max-w-1/3 flex flex-col justify-center">
          <div class="flex flex-col gap-2 items-center md:items-start">
            <h1>Feature-rich</h1>
            <p>
              Vue Flow comes with seamless zooming & panning, different edge and node types, single and multi-selection,
              controls,
              several event handlers and more.
            </p>
            <a class="button max-w-max" href="/docs">
              Documentation
            </a>
          </div>
        </div>
        <div
          class="w-full md:min-h-[300px] shadow-xl rounded-xl font-mono uppercase border-1 border-secondary overflow-hidden">
          <VueFlow v-model="elements" @pane-ready="onLoad">
            <Controls />
            <Background pattern-color="#aaa" style="background: #f8f8f8" :gap="8" />
          </VueFlow>
        </div>
      </div>
      <div class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
        <div
          class="w-full md:min-h-[300px] shadow-xl rounded-xl font-mono uppercase overflow-hidden bg-gray-800">
          <RGB />
        </div>
        <div class="md:max-w-1/3 flex flex-col md:flex-row gap-12 justify-end">
          <div class="gap-2 flex flex-col justify-center">
            <h1>Customizable</h1>
            <p>
              You can create your own node and edge types or just pass a custom style.
              Implement custom UIs
              inside your nodes
              and add functionality to your edges.
            </p>
            <a class="button max-w-max" href="/docs">Documentation</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.button {
  @apply
  shadow-lg transition-colors duration-200 hover:bg-black font-semibold text-lg mt-4 px-5 py-3 rounded-xl bg-green-500 text-white;
}
</style>
