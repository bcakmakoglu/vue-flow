---
title: Plugin API
---

# Introduction

## What is a Plugin?

A plugin is a function that takes Vue Flow app lifecycle hooks as an argument and returns void. 
It allows you to extend on the core functionalities of Vue Flow by using the existing store and hooks.

```ts
type Plugin = (hooks: PluginHooks) => void

interface PluginHooks {
  beforeCreate: EventHookOn<[string, FlowOptions | undefined]>
  created: EventHookOn<VueFlowStore>
  beforeDestroy: EventHookOn<VueFlowStore>
  destroyed: EventHookOn<string>
}
```

## How to use a Plugin?

To use a plugin, you first need to create a new Vue Flow app and then pass the plugin to the `use` method.

```ts
// main.ts
import { createApp } from 'vue'
import { createVueFlow } from '@vue-flow/core'

import { MyPlugin } from './my-plugin'

const app = createApp(App)

const vueFlow = createVueFlow()

vueFlow.use(MyPlugin)

app.mount('#app')
```

## How to create a Plugin?

To create a plugin, you need to create a function that takes the `PluginHooks` as an argument and returns void.

```ts
// my-plugin.ts
import { PluginHooks } from '@vue-flow/core'

export const MyPlugin: Plugin = (hooks) => {
  hooks.created((store) => {
    console.log('Vue Flow App instance created')
    store.myTestPlugin = () => console.log('Hello from my plugin!')
  })
}
```

## Plugin Hooks

### beforeCreate

The `beforeCreate` hook is called before the store is created. It takes the `id` and `options` as arguments.

```ts
hooks.beforeCreate(([id, options]) => {
  console.log('store is about to be created')
})
```

### created

The `created` hook is called after the store is created. It takes the `store` as an argument.

```ts
hooks.created((store) => {
  console.log('store created')
})
```

### beforeDestroy

The `beforeDestroy` hook is called before the store is destroyed. It takes the `store` as an argument.

```ts
hooks.beforeDestroy((store) => {
  console.log('store is about to be destroyed')
})
```

### destroyed

The `destroyed` hook is called after the store is destroyed. It takes the `id` as an argument.

```ts
hooks.destroyed((id) => {
  console.log('store destroyed')
})
```

## TypeScript

You can create a type for your plugin so users have proper IDE support for your custom properties on their store instance.

```ts
import type { UseTestPlugin } from './types'

declare module '@vue-flow/core' {
  // extend the StoreBase interface to add your custom properties  
  interface StoreBase {
    myTestPlugin: UseTestPlugin
  }
}
```
