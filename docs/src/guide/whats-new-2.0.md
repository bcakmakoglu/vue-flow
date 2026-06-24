# Why Vue Flow 2.0

Vue Flow 2.0 is a ground-up alignment with the **xyflow** ecosystem: it now runs on
[`@xyflow/system`](https://github.com/xyflow/xyflow) — the same framework-agnostic engine that powers
React Flow and Svelte Flow — and mirrors their API, types, behavior, and styling. The result is a
library that is **faster, more correct, better-typed, leaner, and instantly familiar** to anyone who
has used Flow in another framework.

This document summarizes what you gain by moving from 1.0 to 2.0. For *how* to upgrade, see the
[migration guide](/guide/migration).

---

## At a glance

| | Vue Flow 1.x | Vue Flow 2.0 |
|---|---|---|
| **Packages** | `@vue-flow/core` + `@vue-flow/minimap` / `controls` / `background` / `node-resizer` / `node-toolbar` | **one package** — everything in `@vue-flow/core` |
| **Engine** | custom Vue-only geometry, d3-zoom, custom drag/handle math | **`@xyflow/system`** (shared with React/Svelte Flow) + panzoom |
| **Node/edge updates** | deep-reactive objects, in-place mutation, two-way `watchPausable` sync | **immutable + `v-model`**, `shallowRef`-friendly, single source of truth |
| **Node type** | one mutable `GraphNode` (user + internal fields mixed) | **`Node`** (clean user object) + **`InternalNode`** (store-computed) |
| **Store access** | one big `useVueFlow()` with global registry | **`useVueFlow()`** (curated instance) + **`useStore()`** (raw state), provider-scoped |
| **Theming** | `--vf-*` variables, multiple stylesheets | **`--xy-*`** shared system, `colorMode` (light/dark/system) |
| **Types** | partial generics, frequent `TS2589` on common patterns | **generics threaded throughout**, discriminated slots, clean typechecking |
| **API names** | `findNode`, `project`, `updateEdge`, `@edge-update*`, `applyDefault` | **xyflow names** — `getNode`, `screenToFlowPosition`, `reconnectEdge`, `@reconnect*`, `autoApplyChanges` |

---

## 1. Built on `@xyflow/system` — the shared engine

The biggest structural change: vue-flow no longer reimplements graph mechanics in Vue. It delegates to
`@xyflow/system`, the engine behind React Flow and Svelte Flow.

- **Positioning & layout** — absolute positions, parent-aware coordinates, `expandParent`, and node
  extents are computed by the system (`adoptUserNodes`, `updateAbsolutePositions`, `handleExpandParent`)
  instead of vue-flow's bespoke parent-chain math.
- **Interaction** — drag-to-connect goes through the system's `XYHandle`; pan/zoom uses `panzoom`
  (replacing d3-zoom); the MiniMap uses the system's minimap instance.
- **Types & utilities** — `XYPosition`, `Rect`, `Connection`, `Position`, `ConnectionMode`, the change
  shapes, the geometry helpers, the type guards, edge z-index elevation — all reuse the system's
  definitions rather than local copies.

**Why it matters:** dramatically less custom surface to maintain, behavior that matches React/Svelte
Flow exactly, and you inherit fixes and features from the whole xyflow ecosystem instead of waiting for
a Vue-only reimplementation.

## 2. Parity with React Flow & Svelte Flow

2.0 deliberately mirrors xyflow's public API, so knowledge (and docs, and examples) transfer directly:

- **Renamed to match xyflow** — `findNode → getNode`, `project → screenToFlowPosition`,
  `updateEdge → reconnectEdge`, `@edge-update* → @reconnect*`, `GraphNode → InternalNode`,
  `GraphEdge → Edge`, `applyDefault → autoApplyChanges`, `useNodeConnections({ nodeId }) → ({ id })`.
- **Aligned event payloads** — connection/reconnect events carry `connectionState`/`handleType`; node
  events carry the user `Node` (not the enriched internal one); new `selectionChange` event.
- **`<VueFlowProvider>`** mirrors `<ReactFlowProvider>` / `<SvelteFlowProvider>`.
- **`connectionMode` defaults to `'strict'`**, matching xyflow.

## 3. Performance — built to be fast at scale

2.0 was profiled against a 900-node / 900-edge stress flow and is engineered for it:

- **Shallow reactivity for nodes/edges.** Node/edge arrays use `shallowRef` semantics and opt out of
  Vue's deep `UnwrapRef` walking — the common `nodes.value = nodes.value.map(n => ({ ...n }))` no longer
  balloons type-checking or reactivity work (and the flaky `TS2589` it caused is gone).
- **`O(changed)` updates.** `nodeLookup`/`edgeLookup`/`parentLookup` are maintained reactive `Map`s the
  store mutates directly; re-committing nodes only re-processes what actually changed, not the whole graph.
- **Centralized derivation.** Absolute positions and edge z-index are computed once per mutation in the
  store instead of via a watcher on every `NodeWrapper`.
- **Single source of truth.** `v-model:nodes`/`v-model:edges` bind straight to the store — the old
  two-way `watchPausable` bridge (and its sync churn) is gone.
- **Render hygiene** — `v-memo`'d node rendering, hoisted reads, and built-in edges that skip
  per-frame attribute writes.

## 4. Type safety & developer experience

- **Generics threaded throughout.** `NodeType`/`EdgeType`/`Data` flow through `FlowProps`, `FlowEmits`,
  events, the store (`State`/`Actions`/`Getters`/`VueFlowInstance`), `NodeProps`/`EdgeProps`, and the
  slots — so a typed flow gives you typed `data` everywhere, including `ConnectionLineProps`.
- **Discriminated slots.** When `nodes`/`edges` are a discriminated union, each `#node-<type>` /
  `#edge-<type>` slot narrows its props to the matching variant — so a custom component gets its exact
  `data` type without a cast.
- **`TS2589` eliminated** on the patterns that triggered it (store read accessors and node/edge spreads).
- **`strictTemplates`-clean**, dual ESM/CJS type declarations, object-notation emits, and a `ClassValue`
  type that matches Vue's own class binding.

## 5. A cleaner, more predictable architecture

- **`Node` vs `InternalNode`.** Your node objects stay clean — `measured`, `internals`, and
  `handleBounds` live only on the store-computed `InternalNode` (via `getInternalNode`). No more mixed
  user/internal `GraphNode`.
- **Immutable nodes & edges.** Update by replacing (`v-model`, `setNodes`, `updateNode`,
  `applyNodeChanges`) rather than mutating in place — predictable, and what the reactive model expects.
- **Store split.** `useVueFlow()` is the curated instance (actions + computed getters + event hooks, and
  it throws if used outside a provider — catching a common misuse); `useStore()` exposes raw reactive
  state when you need it.
- **Provider model.** `<VueFlowProvider>` owns the store; the global registry singleton is retired — so
  multiple flows, scoping, and SSR all behave predictably with no cross-flow leakage.

## 6. New capabilities

- **Controlled viewport** — `v-model:viewport`.
- **`onBeforeDelete` + `deleteElements`** — intercept/confirm/filter deletions.
- **`colorMode`** — `'light' | 'dark' | 'system'`.
- **`connectionDragThreshold`**, raw **connection pointer** position, **`autoPanOnSelection`**,
  **`autoPanOnNodeFocus`**.
- **Viewport easing** — `ease`/`interpolate` options on `fitView`/`setViewport`/`setCenter`/…
- **`zIndexMode`** for edge elevation, **`stepPosition`** for smooth-step/step edges,
  **`autoScale`** for `NodeResizer`.

## 7. Accessibility

- **`ariaLabelConfig`** — customize every a11y string (node/edge descriptions, the aria-live "moved
  node" message, Controls/MiniMap/Handle labels), with defaults sourced from `@xyflow/system`.
- **Keyboard navigation** — `autoPanOnNodeFocus` pans an off-screen node into view when it's tabbed to.
- Controls buttons, the Control panel, and Handles now ship with accessible labels.

## 8. Theming & styling

- **`--xy-*` custom properties** replace `--vf-*`, shared with React/Svelte Flow — one theming system
  across the ecosystem, with a two-tier default fallback.
- **Themeable arrowheads** — markers can inherit `--xy-edge-stroke` (pass `defaultMarkerColor={null}`).
- **Handle positioning via `transform`** instead of fixed pixels.

## 9. Reliability — long-standing bugs fixed

A large batch of correctness fixes shipped with 2.0, including: the `fitView` prop / imperative
`fitView()` being ignored or firing before nodes are measured; `includeHiddenNodes` being dropped;
save/restore (`toObject()`) leaving nodes invisible; nodes/handles losing `measured`/`handleBounds` on
re-commit (e.g. after a dagre layout); reconnectable edges vanishing on a non-drag press; `MiniMap`
`nodeColor` not reacting to state; `isNodeIntersecting` containment; and several selection desync edge
cases.

## 10. Leaner & more modern

- **One package** — `MiniMap`, `Controls`, `Background`, `NodeResizer`/`NodeResizeControl`, and
  `NodeToolbar` are all exported from `@vue-flow/core` (no more juggling sub-packages).
- **Modern build** — migrated to [tsdown](https://tsdown.dev) (aligned with xyflow), producing one set
  of artifacts with correct dual type resolution.
- **Modern deps** — Vue `^3.5` peer (SSR-safe `useId()` for default ids), `@vueuse/core` 14.
- **Deprecation & dead-code sweep** — removed the experimental-features flag, the global registry, the
  `vueFlowVersion` field, `fromObject()`, and the long-deprecated APIs (`addEdge`, `updateEdge`,
  `useZoomPanHelper`, `useHandleConnections`, …), each with a documented replacement.

---

## Is it a drop-in upgrade?

No — 2.0 is a major release with intentional breaking changes (the renames, the immutable model, the
store split, the provider model, the `--xy-*` CSS variables). Each has a direct replacement, and the
[migration guide](/guide/migration) walks through all of them with a cheat sheet. The
payoff is a faster, better-typed, ecosystem-aligned library that will keep pace with xyflow going forward.
