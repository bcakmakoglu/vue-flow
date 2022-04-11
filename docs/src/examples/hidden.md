---
pageClass: examples

---

# Hidden

You can toggle the visibility of nodes by simply setting their `hidden` attribute to either `true` or `false`.

Edges that are connected to a hidden node will also be hidden.

If you set the `onlyRenderVisibleElements` prop to `true`, hidden elements will not be rendered at all instead of just hiding them with
css. This behavior is disabled by default, meaning all elements are rendered whether they are hidden or not.

<div class="mt-6">
  <iframe src="https://codesandbox.io/embed/vue-flow-hidden-example-nrpjl7?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=dark"
    class="hidden dark:block bg-black h-full w-full min-h-[75vh]"
    title="Vue Flow: Hidden Example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <iframe src="https://codesandbox.io/embed/vue-flow-hidden-example-nrpjl7?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=light"
     class="block dark:hidden h-full w-full min-h-[75vh]"
      title="Vue Flow: Hidden Example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
