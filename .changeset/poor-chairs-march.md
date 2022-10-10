---
'@vue-flow/additional-components': minor
---

# What's changed?

* Add `Panel` component
  * Wrap `MiniMap` and `Controls` with `Panel`
* Add `position` prop to `MiniMap` and `Controls`
Example:
```vue
<VueFlow v-model="elements">
  <MiniMap position="top-right" />
  <Controls position="top-left" />
</VueFlow>
```

# Bugfixes

* Fix `MiniMap` and `Controls` cancelling selections
