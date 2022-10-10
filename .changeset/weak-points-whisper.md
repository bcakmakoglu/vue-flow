---
'@vue-flow/core': minor
'vueflow': minor
---

Add plugin API to Vue Flow Storage

## Summary

- Add plugin API to Vue Flow Storage
- Allows to add plugins that can add custom functionality to the store
- Provides hooks for
  - `beforeCreate` - before a store is created
  - `created` - after a store has been created
  - `beforeDestroy` - before a store is destroyed
  - `destroyed` - after a store has been destroyed
