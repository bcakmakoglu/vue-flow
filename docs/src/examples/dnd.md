---
pageClass: examples

---

# Drag & Drop

Adding nodes to an already existing graph can be done multiple ways. To create an interactive editor, you would probably
like them to be inserted with drag and drop.

In this example we demonstrate how to build a basic Sidebar and implement drag and drop handlers to create new nodes.

## State access

This example shows another key feature of Vue Flow. You can initialize the Flow state at any point before the `VueFlow` component
is actually mounted. This can be achieved by using the [`useVueFlow`](/guide/composables.html#usevueflow) composable.

<div class="mt-6">
  <iframe src="https://codesandbox.io/embed/vue-flow-drag-drop-tpbm7d?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=dark"
    class="hidden dark:block bg-black h-full w-full min-h-[75vh]"
    title="Vue Flow: Drag & Drop"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <iframe src="https://codesandbox.io/embed/vue-flow-drag-drop-tpbm7d?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=light"
    class="block dark:hidden h-full w-full min-h-[75vh]"
    title="Vue Flow: Drag & Drop"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
