---
title: Introduction
---

<script setup>
import PowerPlug from '~icons/mdi/power-plug';
import Flash from '~icons/mdi/flash';
import Lifebuoy from '~icons/mdi/lifebuoy';
import Puzzle from '~icons/mdi/puzzle';
import Speedometer from '~icons/mdi/speedometer';
import Cogs from '~icons/mdi/cogs';
import CubeOutline from '~icons/mdi/cube-outline';
import Image from '~icons/mdi/image';
import MapMarkerPath from '~icons/mdi/map-marker-path';
import Gamepad from '~icons/mdi/gamepad';
import Wrench from '~icons/mdi/wrench';
import ArrowExpand from '~icons/mdi/arrow-expand';
import LockCheck from '~icons/mdi/lock-check';
import VueJs from '~icons/mdi/vuejs';
import LogosJavascript from '~icons/logos/javascript';
import LogosTypescript from '~icons/logos/typescript-icon';
</script>

# Welcome to Vue Flow!

Vue Flow is a bridge to the world of interactive flowcharts and graphs, empowering you to bring dynamism and
interactivity to flowcharts and graphic representations.
Whether it's crafting personal diagrams, generating dynamic editors, or anything else your imagination conjures up, Vue
Flow is your creative companion.

Vue Flow makes it effortless to customize and extend basic functionalities by allowing the integration of your own
bespoke nodes and edges.
Additional components such as Background, Minimap, and Controls further enrich the interface,
transforming your creations into engaging platforms.

## <span class="flex gap-2 items-center"> <VueJs class="text-primary" /> Play Online</span>

Try out the sandbox starter templates for Vue Flow in JavaScript and TypeScript and get a feel for the library.

<div class="flex flex-col gap-4 md:flex-row md:gap-8">
  <a href="https://new.vueflow.dev/js" target="_blank" class="flex-1 !no-underline">
    <div class="flex items-center gap-4 p-4 rounded-lg border-1 border-primary dark:bg-secondary">
      <LogosJavascript class="text-accent text-2xl" />
      <h3 class="!m-0 font-semibold">new.vueflow.dev/js</h3>
    </div>
  </a>
  <a href="https://new.vueflow.dev/ts" target="_blank" class="flex-1 !no-underline">
    <div class="flex items-center gap-4 p-4 rounded-lg shadow-md border-1 border-primary dark:bg-secondary">
      <LogosTypescript class="text-accent text-2xl" />
      <h3 class="!m-0 font-semibold">new.vueflow.dev/ts</h3>
    </div>
  </a>
</div>

## <span class="flex gap-2 items-center"><Flash class="text-yellow-500" /> Key Features</span>

### <span class="flex gap-2 items-center"><Lifebuoy class="text-red-500" /> Seamless Setup</span>

Vue Flow gets you into the action quickly. With built-in features like element dragging, zooming and panning, and
selection, Vue Flow is ready to go right out of the box.

### <span class="flex gap-2 items-center"><Puzzle class="text-green-500" /> Customizable</span>

Vue Flow is yours to shape. From custom nodes and edges to connection lines, you can extend the functionality of Vue
Flow to fit your creative needs.

### <span class="flex gap-2 items-center"><Speedometer class="text-" /> Efficient and Responsive</span>

Changes are tracked reactively by Vue Flow, ensuring that only the necessary elements are re-rendered.

### <span class="flex gap-2 items-center"><Cogs class="text-gray-400" /> Utilities and Composability</span>

Vue Flow is designed for complex uses, with built-in graph helper and state composable functions.

### <span class="flex gap-2 items-center"><CubeOutline class="text-accent" /> Additional Components</span>

Vue Flow comes with supplementary components to enhance the user interface.

- <Image class="text-blue-500" /> [Background](/guide/components/background): Vue Flow offers two built-in patterns, with further configurations like
  height, width, or color for personalizations.
- <MapMarkerPath class="text-pink-500" /> [MiniMap](/guide/components/minimap): This feature provides a birds-eye view of your nodes in a small map,
  located at the bottom-right corner.
- <Gamepad class="text-purple-500" /> [Controls](/guide/components/controls): Vue Flow lets you handle zoom functions from a control panel on the bottom
  left.
- <Wrench class="text-fuchsia-500" /> [NodeToolbar](/guide/components/node-toolbar): Get access to essential tools directly from the Node itself for easy manipulation and control of the Node
- <ArrowExpand class="text-yellow-500" /> [NodeResizer](/guide/components/node-resizer): Seamlessly adjust the size of your Node to fit your needs and preferences.

### <span class="flex gap-2 items-center"><LockCheck class="text-blue-500" /> Reliable</span>

Vue Flow is written fully in TypeScript, ensuring a reliable and secure experience for developers.
