---
title: Migrating to 2.0
---

# Migrating to Vue Flow 2.0

Vue Flow 2.0 rebuilds the core on top of [`@xyflow/system`](https://github.com/xyflow/xyflow) — the
framework-agnostic engine that also powers React Flow and Svelte Flow. The payoff is a smaller, faster,
and far more consistent API: the same node/edge model, the same accessor names, and the same store shape
across the three libraries.

That alignment means **breaking changes**. This guide walks through them, grouped by theme, with
before/after for each. If you just want the lookup tables, jump to the [cheat sheet](#cheat-sheet).

> Most apps are touched by **§1 (one package)**, **§2 (v-model)**, and **§3 (immutability)** — start there.

## 1. One package

`@vue-flow/core` now ships every built-in: `Background`, `Controls`, `MiniMap`, `NodeToolbar`,
`NodeResizer`/`NodeResizeControl`. The separate `@vue-flow/node-resizer`, `@vue-flow/node-toolbar`,
`@vue-flow/background`, `@vue-flow/controls`, and `@vue-flow/minimap` packages are gone.

```ts
// before
import { NodeResizer } from '@vue-flow/node-resizer'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import '@vue-flow/node-resizer/dist/style.css'

// after — everything from core
import { NodeResizer, NodeToolbar } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css' // ships the resize-control styles too
```

Uninstall the old packages and bump the peer: Vue Flow 2.0 requires **`@vueuse/core` v14**.

## 2. Binding nodes & edges

The combined `v-model="elements"` (and the whole mixed-elements API) is **removed**. Nodes and edges are
separate.

```vue
<!-- before -->
<VueFlow v-model="elements" />

<!-- after — separate, two-way bindings -->
<VueFlow v-model:nodes="nodes" v-model:edges="edges" />
<!-- or one-way -->
<VueFlow :nodes="nodes" :edges="edges" />
```

The element-bucket actions are gone too — use the node/edge equivalents:

| Removed | Use |
|---|---|
| `setElements(...)` | `setNodes(...)` + `setEdges(...)` |
| `addSelectedElements(...)` | `addSelectedNodes(...)` / `addSelectedEdges(...)` |
| `removeSelectedElements(...)` | `removeSelectedNodes(...)` / `removeSelectedEdges(...)` |
| `getElements` / `getSelectedElements` | `getNodes` / `getEdges` / `getSelectedNodes` / `getSelectedEdges` |

## 3. Nodes and edges are immutable

This is the most important behavioral change. To skip deep-reactifying every node and edge (a big perf
win on large graphs), Vue Flow no longer tracks **in-place mutations** of the objects you pass in.

```ts
// ❌ no longer triggers a re-render
const node = getNode('1')
node.position = { x: 10, y: 10 }
node.data.label = 'changed'
node.selected = true

edge.animated = !edge.animated
```

Update through the store helpers, or reassign your `v-model` array immutably:

```ts
const { updateNode, updateNodeData, updateEdge, updateEdgeData, setNodes, setEdges } = useVueFlow()

updateNode('1', { position: { x: 10, y: 10 } })
updateNodeData('1', { label: 'changed' })
updateEdge('e1-2', { animated: true })

// or immutable reassignment of the bound array
nodes.value = nodes.value.map((n) => (n.id === '1' ? { ...n, selected: true } : n))
```

Two related changes:

- **Node defaults are no longer stamped.** A node passed without `data` keeps `data: undefined` (was `{}`);
  `selected`/`dragging` stay `undefined` until set. Guard optional reads: `node.data?.label`.
- **`getNodes`/`getEdges`/`getSelectedNodes`/`getSelectedEdges` return `readonly` arrays.** `.filter`/`.map`
  work fine; reassign/`push` is a type error — change membership via `setNodes`/`addNodes`/etc.

## 4. The node shape: `Node` vs `InternalNode`

Your nodes array (`v-model:nodes`, `store.nodes`, `getNodes()`, `getNode(id)`) now returns the **raw `Node`s
you passed in** — no store-computed fields. The enriched node (absolute position, z-index, measured size,
handle bounds) is the `InternalNode`, kept in `nodeLookup` and reached via new accessors:

```ts
const { getInternalNode } = useVueFlow()
const internal = getInternalNode('1') // InternalNode
internal.internals.positionAbsolute
internal.measured // { width, height }

// or as a composable (re-resolves reactively)
import { useInternalNode } from '@vue-flow/core'
const node = useInternalNode('1')
```

Field moves on the node:

| Before (top-level) | After |
|---|---|
| `node.parentNode` | `node.parentId` |
| `node.computedPosition` | `node.internals.positionAbsolute` (+ `node.internals.z`) |
| `node.dimensions` | `node.measured` |
| `node.handleBounds` | `node.internals.handleBounds` |
| `node.isParent` | `parentLookup.get(node.id)?.size > 0` |
| `node.label` (top-level) | `node.data.label` |

> Custom node components are unaffected — they still receive `position`, dimensions, etc. through their
> props. And drag/selection/context-menu **event payloads still emit the enriched `InternalNode`**, so
> handlers reading `node.computedPosition` from an event keep working.

## 5. The edge shape: no more `GraphEdge`

Edges are stored verbatim as your plain `Edge` objects — there is no enriched edge representation.

- **`GraphEdge` and `isGraphEdge` are removed** — use `Edge`.
- `edge.sourceNode` / `edge.targetNode` / `edge.sourceX` no longer exist. In a custom edge, resolve nodes
  with `useInternalNode(() => props.source)` and read positions straight off `EdgeProps`
  (`sourceX`, `sourceY`, …).
- **`EdgeProps`** drops `sourceNode`/`targetNode`, exposes handles as `sourceHandleId`/`targetHandleId`,
  gains `selectable`/`deletable`, and makes `type`/`data` optional.
- `useEdge().edge` is now a `ComputedRef`.

## 6. The store split: `useVueFlow` + `useStore`

`useVueFlow()` is now the curated **instance** — actions, computed getters, and event hooks. The raw
reactive state moved to `useStore()`, with `storeToRefs()` as the Pinia-style destructure bridge.

```ts
// before — everything off useVueFlow()
const { nodes, transform, nodeLookup, setViewport, onConnect } = useVueFlow()

// after
const { setViewport, onConnect, getNodes } = useVueFlow()      // actions + getters + hooks
const { nodes, transform } = storeToRefs(useStore())           // value-type state → refs
const { nodeLookup } = useStore()                              // reactive-Map lookups (no .value)
```

| Before | After |
|---|---|
| `const { nodes } = useVueFlow()` | `const { nodes } = storeToRefs(useStore())` |
| `const { transform, dimensions, nodesDraggable } = useVueFlow()` | `const { transform, dimensions, nodesDraggable } = storeToRefs(useStore())` |
| `const { nodeLookup } = useVueFlow()` | `const { nodeLookup } = useStore()` |
| `const { setViewport, getNodes, onConnect } = useVueFlow()` | unchanged |

There is intentionally **no `useStoreApi`** — Vue's reactivity makes it redundant (`useStore()` serves both
reactive reads and current-value reads; subscribe with `watch(() => store.x, …)`).

## 7. No global registry — the provider model

`useVueFlow()` no longer takes any argument; it's a pure consumer that returns the store from the nearest
`<VueFlow>` / `<VueFlowProvider>` ancestor (and throws if there isn't one). The global flow registry and the
`$vueFlowStorage` singleton are gone.

```ts
// before
const { ... } = useVueFlow({ nodes, edges, id: 'my-flow' })
const { ... } = useVueFlow('my-flow') // reach a flow from outside

// after
// pass options as props:
// <VueFlow :nodes="nodes" :edges="edges" />
// reach a flow from a sibling/outside: wrap the subtree and consume from any descendant
// <VueFlowProvider><Toolbar /><VueFlow ... /></VueFlowProvider>
const { ... } = useVueFlow()
```

Multiple flows on a page each get their own `<VueFlowProvider>` (or `<VueFlow>`) tree — they no longer share
a registry, so they can't collide and don't need distinct ids.

## 8. API renames (xyflow parity)

```ts
findNode(id)            → getNode(id)
findEdge(id)            → getEdge(id)
project(point)          → screenToFlowPosition(point)
screenToFlowCoordinate  → screenToFlowPosition
flowToScreenCoordinate  → flowToScreenPosition
```

**Edge "update" → "reconnect"** (xyflow v12 vocabulary):

| Before | After |
|---|---|
| `updateEdge(oldEdge, connection)` | `reconnectEdge(oldEdge, connection)` |
| `@edge-update-start` / `@edge-update` / `@edge-update-end` | `@reconnect-start` / `@reconnect` / `@reconnect-end` |
| `edgeUpdaterRadius` | `reconnectRadius` |
| `edges-updatable` / `edge.updatable` | `edges-reconnectable` / `edge.reconnectable` |
| `EdgeUpdatable` / `EdgeUpdateEvent` | `EdgeReconnectable` / `EdgeReconnectEvent` |

> `updateEdge` is **reused** for a new purpose: `updateEdge(id, edgeUpdate, { replace? })` — a partial edge
> update (the edge analogue of `updateNode`). Edge *reconnection* is now `reconnectEdge`.

**`useConnection`** returns a `ComputedRef<ConnectionState>` — `{ inProgress, isValid, from, fromHandle,
fromPosition, fromNode, to, toHandle, toPosition, toNode, pointer }` — instead of `{ startHandle, endHandle,
status, position }`.

**`VueFlowStore` → `VueFlowInstance`** (the type returned by `useVueFlow()` / exposed by a `<VueFlow>` template
ref). `VueFlowStore` is kept as an alias.

## 9. `connectionMode` defaults to `strict`

In `strict` mode a source handle only connects to a target handle (and vice-versa) — same-type connections
are rejected. To restore the old behavior where every handle acts as a source:

```vue
<VueFlow connection-mode="loose" />
```

## 10. Init / fit props

| Before | After |
|---|---|
| `:fit-view-on-init="true"` | `:fit-view="true"` |
| (initial fit was not configurable) | `:fit-view-options="{ padding: 0.2, maxZoom: 1 }"` |

`nodeOrigin` is now actually honored (it was previously ignored), and a new `nodeClickDistance` prop sets how
far the pointer may move and still count as a node click.

## 11. Deleting elements

- **`removeNodes` removes connected edges by default** (`removeNodes(nodes, removeConnectedEdges = true,
  removeChildren = false)`). Pass `false` to keep the edges.
- New **`onBeforeDelete`** prop — a guard consulted before delete-key / `deleteElements` removals; return
  `false` to cancel, `true` to proceed, or `{ nodes, edges }` to delete a subset. Replaces the old
  `auto-apply-changes="false"` + change-interception pattern for delete confirmation.
- New **`deleteElements({ nodes, edges })`** action — deletes the given elements plus their connected edges
  and children (gated by `onBeforeDelete`), resolving to the removed set.

## 12. Removed deprecated APIs

| Removed | Use |
|---|---|
| `useHandleConnections` | `useNodeConnections` (`type`→`handleType` (optional), `id`→`handleId`) |
| `HandleConnection` type | `NodeConnection` |
| `connectionLineType` / `connectionLineStyle` props | `connectionLineOptions.type` / `.style` |
| `PanelPosition` enum | the `PanelPositionType` string union (`'top-left'`, …) |
| `paneReady` event | `init` (`@init` / `onInit`) |
| `FlowExportObject.position` / `.zoom` | `FlowExportObject.viewport` (`{ x, y, zoom }`) |
| `GraphEdge.events` | edge events via the store (`onEdgeClick`, …) |

## 13. Types & change shapes

- **`NodeProps`/`EdgeProps` take the element type**, not the data type:
  `NodeProps<MyData>` → `NodeProps<Node<MyData, 'myType'>>` (same for `EdgeProps<Edge<MyData, 'myType'>>`).
- **`useVueFlow<NodeType, EdgeType>()`** is fully typed on both generics (xyflow order). `GraphNode<NodeType>`
  / `GraphEdge` is now `GraphEdge<EdgeType>`.
- **Change types mirror `@xyflow/system`:**
  - `NodeDimensionChange.updateStyle` → `setAttributes` (`true | 'width' | 'height'`)
  - `NodePositionChange.from` → `positionAbsolute`
  - `NodeAddChange.item` / `EdgeAddChange.item` are the user `Node` / `Edge` (not `GraphNode`/`GraphEdge`); both gain an optional `index`
  - `EdgeRemoveChange` is `{ id, type: 'remove' }` only — read `source`/`target`/handles from the edge via `getEdge(id)` before the change applies

## Cheat sheet

```ts
// packages
'@vue-flow/node-resizer' | '@vue-flow/node-toolbar' | …  → '@vue-flow/core'

// binding
<VueFlow v-model="elements">  → <VueFlow v-model:nodes="nodes" v-model:edges="edges">

// store
useVueFlow().nodes / .transform / .nodeLookup  → storeToRefs(useStore()) / useStore()
useVueFlow(id | options)                        → useVueFlow() inside <VueFlowProvider>

// accessors & helpers
findNode/findEdge      → getNode/getEdge
project                → screenToFlowPosition
updateEdge(old, conn)  → reconnectEdge(old, conn)
@edge-update*          → @reconnect*

// node fields
node.parentNode        → node.parentId
node.computedPosition  → getInternalNode(id).internals.positionAbsolute
node.dimensions        → getInternalNode(id).measured
node.label             → node.data.label

// types
VueFlowStore           → VueFlowInstance
GraphEdge              → Edge
NodeProps<Data>        → NodeProps<Node<Data, 'type'>>

// behavior
node.x = …             → updateNode(id, { x: … }) / immutable reassignment
removeNodes(id)        → also removes connected edges (pass `false` to keep them)
connectionMode         → defaults to 'strict'
```

Hitting something this guide doesn't cover? [Open an issue](https://github.com/bcakmakoglu/vue-flow/issues) —
it likely belongs here.
