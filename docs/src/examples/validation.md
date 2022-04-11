---
pageClass: examples

---

# Connection Validation

Connections can be validated before edges are created and nodes get connected. 

## Using a handle in a custom node
```vue:no-line-numbers
<div>
  [ ... ]

  <Handle type="source" :is-valid-connection="isValidConnection" />
</div>
```

## Passing as node option
```ts
const nodes = [
  {
    id: '1',
    label: 'Node 1',
    position: { x: 0 , y: 0 },
    isValidSourcePos: (connection) => {
      return connection.target === '2'
    }
  },
]
```

<div class="mt-6">
  <iframe src="https://codesandbox.io/embed/vue-flow-validation-example-zxbyus?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=dark"
    class="hidden dark:block bg-black h-full w-full min-h-[75vh]"
    title="Vue Flow: Validation Example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <iframe src="https://codesandbox.io/embed/vue-flow-validation-example-zxbyus?eslint=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FFlow.vue&theme=light"
     class="block dark:hidden h-full w-full min-h-[75vh]"
      title="Vue Flow: Validation Example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
