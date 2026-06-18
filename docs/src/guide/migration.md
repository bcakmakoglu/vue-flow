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

Uninstall the old packages and bump the peers: Vue Flow 2.0 requires **Vue `>=3.5`** (it uses `useId()`) and
**`@vueuse/core` v14**.

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

| Removed                               | Use                                                               |
|---------------------------------------|-------------------------------------------------------------------|
| `setElements(...)`                    | `setNodes(...)` + `setEdges(...)`                                 |
| `addSelectedElements(...)`            | `addSelectedNodes(...)` / `addSelectedEdges(...)`                 |
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

| Before (top-level)       | After                                                    |
|--------------------------|----------------------------------------------------------|
| `node.parentNode`        | `node.parentId`                                          |
| `node.computedPosition`  | `node.internals.positionAbsolute` (+ `node.internals.z`) |
| `node.dimensions`        | `node.measured`                                          |
| `node.handleBounds`      | `node.internals.handleBounds`                            |
| `node.isParent`          | `parentLookup.get(node.id)?.size > 0`                    |
| `node.label` (top-level) | `node.data.label`                                        |

> Custom node components are unaffected — they still receive `position`, dimensions, etc. through their
> props. But **node event payloads now carry the user `Node`, not the `InternalNode`** (xyflow parity) —
> `onNodeClick`, `onNodeDrag*`, the minimap node events, `nodesInitialized`, etc. emit your raw node. If a
> handler read store-computed fields off the event node (`computedPosition` / `internals.positionAbsolute`,
> authoritative `measured`, `internals.handleBounds`), resolve the enriched node by id: `getInternalNode(node.id)`.

## 5. The edge shape: no more `GraphEdge`

Edges are stored verbatim as your plain `Edge` objects — there is no enriched edge representation.

- **`GraphEdge` and `isGraphEdge` are removed** — use `Edge`.
- `edge.sourceNode` / `edge.targetNode` / `edge.sourceX` no longer exist. In a custom edge, resolve nodes
  with `useInternalNode(() => props.source)` and read positions straight off `EdgeProps`
  (`sourceX`, `sourceY`, …).
- **`EdgeProps`** drops `sourceNode`/`targetNode`, exposes handles as `sourceHandleId`/`targetHandleId`,
  gains `selectable`/`deletable`, and makes `type`/`data` optional.
- `useEdge().edge` is now a `ComputedRef`.
- **Auto-generated edge IDs use the `xy-edge__` prefix** (was `vueflow__edge-`), matching react/svelte — this
  only affects edges created without an explicit `id`. Update any CSS/selectors or persisted references that
  matched `vueflow__edge-`.

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

> **Inside a component (incl. custom nodes/edges), prefer reading the store directly** —
> `const store = useStore()` then `store.transform`, `store.nodesDraggable`, … . Reads inside a
> computed/render track reactively without `.value`, and you skip re-projecting the whole state into refs
> on every instance. Reach for `storeToRefs` only when you need to destructure refs and pass them around
> outside a reactive scope.

| Before                                                           | After                                                                       |
|------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `const { nodes } = useVueFlow()`                                 | `const { nodes } = storeToRefs(useStore())`                                 |
| `const { transform, dimensions, nodesDraggable } = useVueFlow()` | `const { transform, dimensions, nodesDraggable } = storeToRefs(useStore())` |
| `const { nodeLookup } = useVueFlow()`                            | `const { nodeLookup } = useStore()`                                         |
| `const { setViewport, getNodes, onConnect } = useVueFlow()`      | unchanged                                                                   |

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

| Before                                                     | After                                                |
|------------------------------------------------------------|------------------------------------------------------|
| `updateEdge(oldEdge, connection)`                          | `reconnectEdge(oldEdge, connection)`                 |
| `@edge-update-start` / `@edge-update` / `@edge-update-end` | `@reconnect-start` / `@reconnect` / `@reconnect-end` |
| `edgeUpdaterRadius`                                        | `reconnectRadius`                                    |
| `edges-updatable` / `edge.updatable`                       | `edges-reconnectable` / `edge.reconnectable`         |
| `EdgeUpdatable` / `EdgeUpdateEvent`                        | `EdgeReconnectable` / `EdgeReconnectEvent`           |

> `updateEdge` is **reused** for a new purpose: `updateEdge(id, edgeUpdate, { replace? })` — a partial edge
> update (the edge analogue of `updateNode`). Edge *reconnection* is now `reconnectEdge`.

**`useConnection`** returns a `ComputedRef<ConnectionState>` — `{ inProgress, isValid, from, fromHandle,
fromPosition, fromNode, to, toHandle, toPosition, toNode, pointer }` — instead of `{ startHandle, endHandle,
status, position }`.

**`VueFlowStore` → `VueFlowInstance`** (the type returned by `useVueFlow()` / exposed by a `<VueFlow>` template
ref). The old `VueFlowStore` name is removed.

**`applyDefault` → `autoApplyChanges`** — the prop/option that toggles whether Vue Flow automatically applies
node/edge changes (drag, resize, select, add/remove) back to your arrays. Same default (`true`); rename the
prop `:apply-default` → `:auto-apply-changes`.

## 9. `connectionMode` defaults to `strict`

In `strict` mode a source handle only connects to a target handle (and vice-versa) — same-type connections
are rejected. To restore the old behavior where every handle acts as a source:

```vue
<VueFlow connection-mode="loose" />
```

## 10. Init / fit props

| Before                             | After                                              |
|------------------------------------|----------------------------------------------------|
| `:fit-view-on-init="true"`         | `:fit-view="true"`                                 |
| (initial fit was not configurable) | `:fit-view-options="{ padding: 0.2, maxZoom: 1 }"` |

`nodeOrigin` is now actually honored (it was previously ignored), and a new `nodeClickDistance` prop sets how
far the pointer may move and still count as a node click.

**Viewport option types now reuse `@xyflow/system`** (renamed; same shape unless noted):

| Before (vue-flow)      | After (`@xyflow/system`)        |
|------------------------|---------------------------------|
| `FitViewParams`        | `FitViewOptions`                |
| `TransitionOptions`    | `ViewportHelperFunctionOptions` |
| `ViewportPositionFunc` | `Project`                       |

- **`fitView({ nodes })` takes node objects, not ids:** `nodes?: string[]` → `nodes?: (Node | { id: string })[]`
  (xyflow's shape). Wrap bare ids — `fitView({ nodes: ['a', 'b'] })` → `fitView({ nodes: [{ id: 'a' }, { id: 'b' }] })`.
- **`fitView`'s `offset` option is removed** — it was superseded by `padding`; use `padding` (a `Padding`:
  a number, a `'10px'`/`'5%'` string, or `{ top, right, bottom, left }`) to inset the fitted view.
- **New `ease` + `interpolate` options** on every viewport function (`fitView`/`setViewport`/`setCenter`/
  `fitBounds`/`zoomTo`/`zoomIn`/`zoomOut`), alongside `duration`: `ease?: (t: number) => number` and
  `interpolate?: 'smooth' | 'linear'` control the transition curve.

## 11. Deleting elements

- **`removeNodes` removes connected edges by default** (`removeNodes(nodes, removeConnectedEdges = true,
  removeChildren = false)`). Pass `false` to keep the edges.
- New **`onBeforeDelete`** prop — a guard consulted before delete-key / `deleteElements` removals; return
  `false` to cancel, `true` to proceed, or `{ nodes, edges }` to delete a subset. Replaces the old
  `auto-apply-changes="false"` + change-interception pattern for delete confirmation.
- New **`deleteElements({ nodes, edges })`** action — deletes the given elements plus their connected edges
  and children (gated by `onBeforeDelete`), resolving to the removed set.

## 12. Removed deprecated APIs

| Removed                                            | Use                                                                                                        |
|----------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `useHandleConnections`                             | `useNodeConnections` (`type`→`handleType` (optional), `id`→`handleId`)                                     |
| `HandleConnection` type                            | `NodeConnection`                                                                                           |
| `connectionLineType` / `connectionLineStyle` props | `connectionLineOptions.type` / `.style`                                                                    |
| `PanelPosition` enum                               | the `PanelPositionType` string union (`'top-left'`, …)                                                     |
| `paneReady` event                                  | `init` (`@init` / `onInit`)                                                                                |
| `FlowExportObject.position` / `.zoom`              | `FlowExportObject.viewport` (`{ x, y, zoom }`)                                                             |
| `GraphEdge.events`                                 | edge events via the store (`onEdgeClick`, …)                                                               |
| `addEdge` / `updateEdge` standalone utils          | the `addEdges` / `updateEdge` / `reconnectEdge` store actions                                              |
| `useZoomPanHelper`                                 | `useVueFlow()` zoom/pan actions (`zoomIn`, `zoomOut`, `fitView`, `setViewport`)                            |
| `useVueFlow().fromObject()` / `FlowImportObject`   | removed — restore manually after `onInit` (set `nodes`/`edges` + `setViewport`); `toObject()` is unchanged |

## 13. Types & change shapes

- **`NodeProps`/`EdgeProps` take the element type**, not the data type:
  `NodeProps<MyData>` → `NodeProps<Node<MyData, 'myType'>>` (same for `EdgeProps<Edge<MyData, 'myType'>>`).
- **`GraphNode` is renamed to `InternalNode`** (mirroring xyflow/react), and the `isGraphNode` guard to
  `isInternalNode`. It's the enriched, store-internal node returned by
  `getInternalNode`/`useInternalNode`/`nodeLookup`; the `GraphNode` name is removed, so replace
  `GraphNode<T>` with `InternalNode<T>`.
- **`useVueFlow<NodeType, EdgeType>()`** is fully typed on both generics (xyflow order); `getInternalNode`
  /`nodeLookup` return `InternalNode<NodeType>`.
- **Padding uses `@xyflow/system`'s `Padding` type** for both `fitView`/`fitBounds` options and a node
  `extent`'s `{ range, padding }`. A plain number still works; you can also pass a `'10px'`/`'5%'` string or a
  per-side object `{ top, right, bottom, left }` (with `x`/`y` shorthands). The old positional-tuple extent
  padding is **removed**: `padding: [10, 20]` → `padding: { y: 10, x: 20 }`, and
  `padding: [t, r, b, l]` → `padding: { top: t, right: r, bottom: b, left: l }`.
- **Custom connection lines use `from*`/`to*` props.** The `#connection-line` slot's `ConnectionLineProps`
  moved from `source*`/`target*` to xyflow's `from*`/`to*`: `sourceX`/`sourceY`/`sourcePosition` →
  `fromX`/`fromY`/`fromPosition`, `targetX`/`targetY`/`targetPosition` → `toX`/`toY`/`toPosition`,
  `sourceNode`/`sourceHandle` → `fromNode`/`fromHandle`, `targetNode`/`targetHandle` → `toNode`/`toHandle`.
  `markerStart`/`markerEnd` are now optional.
- **An edge's `data` defaults to `Record<string, unknown>`** (was `any`, via the now-removed `ElementData`) —
  same as `Node`; narrow before use.
- **Change types mirror `@xyflow/system`:**
  - `NodeDimensionChange.updateStyle` → `setAttributes` (`true | 'width' | 'height'`)
  - `NodePositionChange.from` → `positionAbsolute`
  - `NodeAddChange.item` / `EdgeAddChange.item` are the user `Node` / `Edge` (not the internal `InternalNode`); both gain an optional `index`
  - `EdgeRemoveChange` is `{ id, type: 'remove' }` only — read `source`/`target`/handles from the edge via `getEdge(id)` before the change applies
- **`ConnectionLineType` is `@xyflow/system`'s enum.** Its `SimpleBezier` member's value changed from
  `'simple-bezier'` to `'simplebezier'` (matching system and vue-flow's own `'simplebezier'` edge-type key).
  Use the enum (`ConnectionLineType.SimpleBezier`) rather than the raw string and nothing changes.
- **`PanelPositionType` → `PanelPosition`** (`@xyflow/system`'s type). It now also accepts `'center-left'`
  and `'center-right'` in addition to the six corner/edge positions.

## 14. Styles & CSS variables

The stylesheets and theme variables now mirror `@xyflow/react`/`@xyflow/svelte`. The breaking changes:

**`theme-default.css` was removed.** `style.css` is now the full default theme (necessary structure *and* the built-in look) — import just that. A new `base.css` ships the structure with only minimal theming, for when you bring your own.

```ts
// before
import '@vue-flow/core/dist/style.css'          // structure only
import '@vue-flow/core/dist/theme-default.css'   // the default theme

// after — style.css IS the full theme
import '@vue-flow/core/dist/style.css'
// …or theme it yourself on top of the minimal base:
// import '@vue-flow/core/dist/base.css'
```

**`--vf-*` → `--xy-*`.** The theme custom properties are renamed to the shared `--xy-*` set (identical to react/svelte). Each rule reads `var(--xy-x, var(--xy-x-default))`, so override the un-suffixed variable and Vue Flow falls back to the shipped `--xy-x-default`. The common ones:

| before                 | after                                                                         |
|------------------------|-------------------------------------------------------------------------------|
| `--vf-node-bg`         | `--xy-node-background-color`                                                  |
| `--vf-node-text`       | `--xy-node-color`                                                             |
| `--vf-node-color`      | `--xy-node-border` / `--xy-node-boxshadow-*` / `--xy-handle-background-color` |
| `--vf-handle`          | `--xy-handle-background-color`                                                |
| `--vf-handle-border`   | `--xy-handle-border-color`                                                    |
| `--vf-connection-path` | `--xy-edge-stroke` / `--xy-connectionline-stroke`                             |
| `--vf-edge-text`       | `--xy-edge-label-color`                                                       |
| `--vf-edge-text-bg`    | `--xy-edge-label-background-color`                                            |
| `--vf-controls-bg`     | `--xy-controls-button-background-color`                                       |
| `--vf-minimap-bg`      | `--xy-minimap-background-color`                                               |

The old aggregate `--vf-node-color` (which drove border + box-shadow + handle at once) is gone — those are separate `--xy-*` variables now. The full list is in [`CSSVars`](/typedocs/type-aliases/CSSVars) and the [theming guide](/guide/theming#css-variables).

**Three element classes were renamed to match xyflow.** Vue Flow's internal DOM now nests exactly like `@xyflow/react`/`@xyflow/svelte` — `renderer` (outer pan/zoom container) › `pane` (drag/selection surface) › `viewport` (the transformed layer that carries the zoom transform) — so the element-class *suffixes* line up:

| before                          | after                           |
|---------------------------------|---------------------------------|
| `.vue-flow__transformationpane` | `.vue-flow__viewport`           |
| `.vue-flow__viewport`           | `.vue-flow__renderer`           |
| `.vue-flow__edge-labels`        | `.vue-flow__edgelabel-renderer` |

Note `viewport` now refers to the **transformed inner layer** (it was the outer container before); the outer container is now `renderer`. If you target any of these in custom CSS (or query them from JS), update the selector. (Everything keeps the `vue-flow__` prefix.)

**Uniform node accents.** The built-in `input`/`output` node types no longer have blue/pink accent borders — every default node type uses the same neutral `#1a192b` border (matching `@xyflow/react`). Re-add per-type colors with your own CSS if you want them.

## 15. `selectionKeyCode={true}` → `selectionOnDrag`

Drawing a selection box on a plain drag (no key held) used to be expressed by setting `selectionKeyCode` to `true`. That overloaded the key-code prop and was easy to misread. It's now an explicit boolean prop, `selectionOnDrag`, matching `@xyflow/react`:

```vue
<!-- before -->
<VueFlow :selection-key-code="true" :pan-on-drag="false" />

<!-- after -->
<VueFlow :selection-on-drag="true" :pan-on-drag="false" />
```

`selectionKeyCode` goes back to being just the key you hold to select (default `'Shift'`). Pair `selectionOnDrag` with `:pan-on-drag="false"` or a non-left button (e.g. `:pan-on-drag="[1, 2]"`) so a left-drag selects instead of panning. As a bonus, `paneClick` now fires correctly in this mode (it was previously swallowed by the pan/zoom click handling).

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
PanelPositionType      → PanelPosition       // + 'center-left' / 'center-right'
ConnectionLineType.SimpleBezier  → 'simplebezier'  // value was 'simple-bezier'
FitViewParams          → FitViewOptions
TransitionOptions      → ViewportHelperFunctionOptions
ViewportPositionFunc   → Project

// fitView nodes: ids → node objects (+ new ease / interpolate transition options)
fitView({ nodes: ['a'] })  → fitView({ nodes: [{ id: 'a' }] })
fitView({ offset })        → fitView({ padding })   // offset option removed

// padding (fitView / fitBounds / node extent)
padding: [10, 20]      → padding: { y: 10, x: 20 }   // positional tuple removed; px/% strings now allowed

// connection line (#connection-line slot props)
{ sourceX, sourceNode, … }  → { fromX, fromNode, … }   // source*/target* → from*/to*

// behavior
node.x = …             → updateNode(id, { x: … }) / immutable reassignment
removeNodes(id)        → also removes connected edges (pass `false` to keep them)
connectionMode         → defaults to 'strict'
applyDefault           → autoApplyChanges  (:apply-default → :auto-apply-changes)
:selection-key-code="true"  → :selection-on-drag="true"   // select-on-drag is its own prop now
node event payload     → user Node (was InternalNode); getInternalNode(id) for internals

// styles
import 'theme-default.css'   → removed; style.css is the full theme (or base.css for minimal)
--vf-node-bg / --vf-handle / --vf-edge-text  → --xy-node-background-color / --xy-handle-background-color / --xy-edge-label-color  (--xy-* set)
input/output node accents    → uniform #1a192b border (re-add via your own CSS)
```

Hitting something this guide doesn't cover? [Open an issue](https://github.com/bcakmakoglu/vue-flow/issues) —
it likely belongs here.
