---
'@vue-flow/additional-components': major
'@vue-flow/pathfinding-edge': major
'@vue-flow/resize-rotate-node': major
'@vue-flow/core': major
---

# What's changed?

- Change pkg scope from 'braks' to 'vue-flow'
  - Add `@vue-flow/core` package
  - Add `@vue-flow/additional-components` package
  - Add `@vue-flow/pathfinding-edge` package
  - Add `@vue-flow/resize-rotate-node` package

# Features

- `useNode` and `useEdge` composables
  - can be used to access current node/edge (or by id) and their respective element refs (if used inside the elements' context, i.e. a custom node/edge) 
- `selectionKeyCode` as `true`
  - allows for figma style selection (i.e. create a selection rect without holding shift or any other key)
- Handles to trigger handle bounds calculation on mount
  - if no handle bounds are found, a Handle will try to calculate its bounds on mount
  - should remove the need for `updateNodeInternals` on dynamic handles
- Testing for various features using Cypress 10

# Bugfixes

- Fix `removeSelectedEdges` and `removeSelectedNodes` actions not properly removing elements from store

# Breaking Changes

- `@vue-flow/core` package is now required to use vue-flow
- `@vue-flow/additional-components` package contains `Background`, `MiniMap` and `Controls` components and related types
  - When switching to the new pkg scope, you need to change the import path. 

Before:
```js 
import { VueFlow, Background, MiniMap, Controls } from '@braks/vue-flow'
```
    
After
```js
import { VueFlow } from '@vue-flow/core'
import { Background, MiniMap, Controls } from '@vue-flow/additional-components'
```
