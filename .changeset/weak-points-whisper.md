---
'@vue-flow/core': minor

---

Add plugin API to Vue Flow App

## What's changed?

- Allow setting global store config that is applied as default to all stores that are created
- A simple API to extend the vue flow store (⚠️ *NOT* a Vue Plugin)
- Provide hooks to hook into store lifecycle (`beforeCreate`, `created`, `beforeDestroy`, `destroyed`)
- Add some simple plugins to start off
  - DnD Plugin
  - Dagre Layout
  - Screenshot

## Plugin

```ts
interface PluginHooks {
  beforeCreate: EventHookOn<[string, FlowOptions | undefined]>
  created: EventHookOn<VueFlowStore>
  beforeDestroy: EventHookOn<VueFlowStore>
  destroyed: EventHookOn<string>
}

type Plugin = (hooks: PluginHooks) => void
```

## Example

```ts
// main.ts or your App entry point
import { createVueFlow, Plugin } from '@vue-flow/core'

const plugin: Plugin = (hooks) => {
 hooks.beforeCreate(([id, preloadedState]) => {
  // do something before a store instance is created
 })
    
 // after a store has been created
 hooks.created((storeInstance) => {})
    
 // before a store is destroyed
 hooks.beforeDestroy((storeInstance) => {})

 // after a store is destroyed
 hooks.destroyed(() => {})
}

// You can pass a factory function to set default values to each new store instance
const vueFlowApp = createVueFlow(() => ({ 
  fitViewOnInit: true,
}))

vueFlowApp.use(plugin)
```

## Extending Store Type (TypeScript)

```ts
// my-shims.d.ts
declare module '@vue-flow/core' {
    // the StoreBase interface can be used to extend the VueFlowStore type
  interface StoreBase {
    myProperty: boolean
    myRefProperty: Ref<boolean>
  }
}
```
