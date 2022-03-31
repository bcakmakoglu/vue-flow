<script lang="ts" setup>
import { GraphEdge, useVueFlow, VueFlow, Background, Controls, ClassFunc } from "@braks/vue-flow";

const getClass: ClassFunc = (el) => {
  const classes = ["font-semibold", "!border-2", "transition-colors", "duration-300", "ease-in-out"];
  if (el.selected) classes.push(
    ...[
      "!border-green-500/80",
      "!shadow-md",
      "!shadow-green-500/50",
      "!bg-green-100/45",
      "!text-gray-700"
    ]
  );

  return classes.join(" ");
};

const emit = defineEmits(["pane"]);

const { onPaneReady } = useVueFlow({
  modelValue: [
    {
      id: "1",
      type: "input",
      label: "input",
      position: { x: 250, y: 5 },
      class: getClass
    },
    {
      id: "2",
      label: "default",
      position: { x: 100, y: 100 },
      class: getClass
    },
    { id: "3", label: "default", position: { x: 400, y: 100 }, class: getClass },
    {
      id: "4",
      type: "output",
      label: "output",
      position: { x: 250, y: 225 },
      class: getClass
    },
    {
      id: "e1-2",
      source: "1",
      label: "animated edge",
      target: "2",
      animated: true,
      class: (el: GraphEdge) => {
        const classes = ["transition-colors duration-300", el.sourceNode.selected ? "font-semibold" : ""];
        return classes.join(" ");
      },
      style: (el: GraphEdge) => {
        const sourceNodeSelected = el.sourceNode.selected;
        return {
          transition: "stroke ease-in-out 300ms",
          stroke: el.selected || sourceNodeSelected ? "var(--secondary)" : undefined
        };
      }
    },
    {
      id: "e1-3",
      source: "1",
      target: "3",
      label: "default edge",
      class: (el: GraphEdge) => {
        const classes = ["transition-colors duration-300", el.sourceNode.selected ? 'font-semibold' : '']
        return classes.join(" ")
      },
      style: (el: GraphEdge) => {
        const sourceNodeSelected = el.sourceNode.selected;
        return {
          transition: "stroke ease-in-out 300ms",
          stroke: el.selected || sourceNodeSelected ? "red" : undefined
        };
      }
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      type: "step",
      animated: true,
      class: (el: GraphEdge) => {
        const classes = ["transition-colors duration-300", el.sourceNode.selected ? 'font-semibold' : '']
        return classes.join(" ")
      },
      style: (el: GraphEdge) => {
        const sourceNodeSelected = el.sourceNode.selected;
        return {
          transition: "stroke ease-in-out 300ms",
          stroke: el.selected || sourceNodeSelected ? "var(--secondary)" : undefined
        };
      }
    }
  ]
});

onPaneReady((i) => emit("pane", i));
</script>
<template>
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
    class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase border-1 border-secondary overflow-hidden">
    <VueFlow class="basic">
      <Controls class="md:!left-auto md:!right-[10px]" />
      <Background pattern-color="#aaa" :gap="16" />
    </VueFlow>
  </div>
</template>
<style>
.basic .vue-flow__node-input.selected .vue-flow__handle {
  @apply bg-green-500;
}

.basic .vue-flow__node-default.selected .vue-flow__handle {
  @apply bg-green-500;
}

.basic .vue-flow__node-output.selected .vue-flow__handle {
  @apply bg-green-500;
}
</style>
