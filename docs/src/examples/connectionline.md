---
pageClass: examples

---

# Custom Connection Line

If the default connection lines aren't to your liking, or you want to expand on the existing 
functionality you can pass a custom connection line component to Vue Flow.

Simply pass a component in the designated template slot, and you're good to go.

```vue:no-line-numbers
<template>
  <VueFlow>
    <template #connection-line="props">
      <MyCustomConnectionLine v-bind="props" />
    </template>
  </VueFlow>
</template>
```

You can see a working example in the sandbox.

<div class="mt-6">
  <iframe src="https://codesandbox.io/embed/vue-flow-custom-connection-line-0okgze?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=dark"
    class="hidden dark:block bg-black h-full w-full min-h-[75vh]"
    title="Vue Flow: Custom Connection Line"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <iframe src="https://codesandbox.io/embed/vue-flow-custom-connection-line-0okgze?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=light"
     class="block dark:hidden h-full w-full min-h-[75vh]"
      title="Vue Flow: Custom Connection Line"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
