---
'@vue-flow/core': minor
---

Add autopan options. Pans viewport on node drag and/or when drawing a connection line.

### Usage

```ts
useVueFlow({
  autoPanOnNodeDrag: true,
  autoPanOnConnect: true,
})
```

```vue
<VueFlow v-model="elements" :autoPanOnNodeDrag="true" :autoPanOnConnect="true" />
```
