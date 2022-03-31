<script lang="ts" setup>
import { ref } from "vue";
import {
  Elements,
  FlowInstance,
  VueFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  GraphNode, StringFunc
} from "@braks/vue-flow";
import { templateRef, useBreakpoints, useElementBounding, whenever } from "@vueuse/core";
import CustomEdge from "./edges/Custom.vue";
import RGBNode from "./nodes/Input.vue";
import RGBOutputNode from "./nodes/Output.vue";

type Colors = {
  red: number
  green: number
  blue: number
}

const breakpoints = useBreakpoints({
  mobile: 360,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
});

const elements = ref<Elements>([
  { id: "1", type: "rgb", data: { color: "g" }, position: { x: -25, y: 0 } },
  { id: "2", type: "rgb", data: { color: "r" }, position: { x: 50, y: -110 } },
  { id: "3", type: "rgb", data: { color: "b" }, position: { x: 0, y: 110 } },
  { id: "4", type: "rgb-output", label: "RGB", position: { x: 400, y: -25 } },
  { id: "e1-4", type: "rgb-line", data: { color: "green" }, source: "1", target: "4", animated: true },
  { id: "e2-4", type: "rgb-line", data: { color: "red" }, source: "2", target: "4", animated: true },
  { id: "e3-4", type: "rgb-line", data: { color: "blue" }, source: "3", target: "4", animated: true }
]);
const instance = ref<FlowInstance>();

const el = templateRef<HTMLDivElement>("page", null);

const bounds = useElementBounding(el);
const onLoad = (flowInstance: FlowInstance) => {
  instance.value = flowInstance;
  instance.value.fitView();
};
whenever(breakpoints.greater("tablet"), () => onLoad(instance.value));
whenever(breakpoints.smaller("tablet"), () => onLoad(instance.value));

const color = ref<Colors>({
  red: 100,
  green: 150,
  blue: 100
});
const onChange = ({ color: c, val }: { color: keyof Colors; val: number }) => (color.value[c] = Number(val));
const bg = ref(BackgroundVariant.Lines);
const bgSize = ref(1);
const bgGap = ref(48);
const backgroundChange = (variant: BackgroundVariant) => (bg.value = variant);
const sizeChange = (size: number) => (bgSize.value = size);

const nodeColor: StringFunc = (node: GraphNode) => {
  switch (node.id) {
    case "1":
      return "green";
    case "2":
      return "red";
    case "3":
      return "blue";
    case "4":
      return `rgb(${color.value.red}, ${color.value.green}, ${color.value.blue})`;
  }
};
</script>
<template>
  <div ref="page" class="flex flex-col-reverse md:flex-row flex-unwrap gap-12 md:gap-24">
    <div
      class="w-full md:min-h-[300px] shadow-xl rounded-xl font-mono uppercase overflow-hidden bg-gray-800 border-2"
      :style="{ borderColor: `rgb(${color.red}, ${color.green}, ${color.blue})` }">
      <VueFlow id="rgb-flow" v-model="elements" class="relative font-mono" :zoom-on-scroll="false"
               :node-extent="[[-50, -150], [500, 300]]" @pane-ready="onLoad">
        <template #edge-rgb-line="rgbLineProps">
          <CustomEdge
            v-bind="{ ...rgbLineProps, data: { text: color[rgbLineProps.data?.color], ...rgbLineProps.data } }" />
        </template>
        <template #node-rgb="rgbProps">
          <RGBNode v-bind="rgbProps" :amount="color" @change="onChange" />
        </template>
        <template #node-rgb-output="rgbOutputProps">
          <RGBOutputNode v-bind="rgbOutputProps" :rgb="`rgb(${color.red}, ${color.green}, ${color.blue})`" />
        </template>
        <Controls />
        <Background :variant="bg" :pattern-color="`rgb(${color.red}, ${color.green}, ${color.blue})`" :gap="bgGap"
                    :size="bgSize" />
        <MiniMap class="transform scale-75 origin-bottom-right" :node-color="nodeColor" />
      </VueFlow>
    </div>
  </div>
</template>
