---
pageClass: examples

---

# Update Node

Updating internal node data is simple.
After initializing your elements and parsing them into either `GraphNode` or `GraphEdge`
Vue Flow will emit the changes back into your initial `ref`.

That means you can manipulate any property of your original nodes, and it will trigger changes in the graph.

You can of course also access the nodes directly from the state and change their properties from there.

<div class="mt-6">
  <iframe src="https://codesandbox.io/embed/vue-flow-update-node-example-q5hjp3?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=dark"
    class="hidden dark:block bg-black h-full w-full min-h-[75vh]"
    title="Vue Flow: Update Node Example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <iframe src="https://codesandbox.io/embed/vue-flow-update-node-example-q5hjp3?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=light"
     class="block dark:hidden h-full w-full min-h-[75vh]"
      title="Vue Flow: Update Node Example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
