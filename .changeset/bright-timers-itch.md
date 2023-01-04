---
'@vue-flow/core': minor
---

Allow setting `padding` option for `node.extent: 'parent'`

Padding can be a `number[]` containing a maximum of 4 values.
The values are applied in the same order as CSS padding: top, right, bottom, left.
You can omit values at the end of the array, so `[10, 20]` is equivalent to `[10, 20, 10, 20]` etc.

#### Usage

```js
const nodes = ref([
  {
    id: '4',
    label: 'Node 4',
    position: { x: 320, y: 200 },
    style: { backgroundColor: 'rgba(255, 0, 0, 0.7)', width: '300px', height: '300px' },
  },
  {
    id: '4a',
    label: 'Node 4a',
    position: { x: 15, y: 65 },
    class: 'light',
    extent: {
      range: 'parent',
      // apply 10 px padding to all four sides
      padding: [10],
    },
    parentNode: '4',
  },
])
```
