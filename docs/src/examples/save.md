---
pageClass: examples

---

# Save & Restore

::: warning BREAKING CHANGE
__Changes from 0.3.x to 0.4.x__
The "built-in" storage feature has been fully removed.
:::

There is no built-in storage feature, however creating a save & restore feature is simple.

This example demonstrates save & restore functionality using the `LocalStorage` of the browser.
You are of course free to implement your own logic (for example fetching the data from an API that's connected to a database).

<div class="mt-6">
  <iframe src="https://codesandbox.io/embed/vue-flow-save-restore-example-1u7u6t?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=dark"
    class="hidden dark:block bg-black h-full w-full min-h-[75vh]"
    title="Vue Flow: Save & Restore Example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <iframe src="https://codesandbox.io/embed/vue-flow-save-restore-example-1u7u6t?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=light"
     class="block dark:hidden h-full w-full min-h-[75vh]"
      title="Vue Flow: Save & Restore Example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
