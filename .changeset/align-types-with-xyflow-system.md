---
"@vue-flow/core": major
---

Align core types and change-pipeline shapes with `@xyflow/system` (the framework-agnostic engine that powers `xyflow/react` and `xyflow/svelte`). The vue-flow specific helpers — `useVueFlow`, hooks, slots, etc. — are unchanged; only the data shapes move.

### `Node` / `GraphNode`

`Node` keeps its public surface but adds `parentId?: string` (matching xyflow). The deprecated `parentNode` field is removed — use `parentId`.

`GraphNode` is now structurally assignable to `@xyflow/system`'s `InternalNodeBase`, which means the following vue-flow-only top-level fields are gone:

- `node.computedPosition` → use `node.internals.positionAbsolute` (and `node.internals.z` for the z-index).
- `node.dimensions` → use `node.measured`.
- `node.handleBounds` (top-level) → use `node.internals.handleBounds`.
- `node.isParent` → check the new `parentLookup` map exposed by the store (`useVueFlow().parentLookup.value.get(nodeId)?.size`). The flag was a derived value; treating it as derived removes a class of stale-flag bugs when nodes are added/removed dynamically.

### `NodeProps` / `EdgeProps`

`NodeProps<NodeType>` and `EdgeProps<EdgeType>` now take a `NodeType`/`EdgeType` generic, matching `xyflow/react`'s convention. Previous data-first usage (`NodeProps<MyData>`) should become `NodeProps<Node<MyData, 'myType'>>`.

The renderer now forwards the full `NodeProps` surface (`selectable`, `deletable`, `draggable`, `isConnectable`, `positionAbsoluteX`, `positionAbsoluteY`, `parentId`) so custom-node components see the same props they would in xyflow/react.

### Change types

The `NodeChange` / `EdgeChange` families mirror `@xyflow/system` exactly (no `replace` variant yet):

- `NodeDimensionChange.updateStyle` → `setAttributes` (`true | 'width' | 'height'`).
- `NodePositionChange.from` → `positionAbsolute`. Consumers tracking the "before" position now derive it themselves.
- `NodeAddChange.item` is the user-provided `Node` (not `GraphNode`); same for `EdgeAddChange.item` and `Edge`. Both add an optional `index`.
- `EdgeRemoveChange` is now `{ id, type: 'remove' }` only — vue-flow's extra `source`/`target`/`sourceHandle`/`targetHandle` fields are gone. Read those from the edge via `findEdge(id)` before the change is applied.
- `NodeDragItem` drops vue-flow's `from`/`dimensions`/`parentNode` extensions and adopts the system shape (`measured`, `internals.positionAbsolute`, `parentId`, `origin`, `dragging`).

### `useVueFlow` API

`useVueFlow(idOrOptions)` overloads are restored — `useVueFlow({ id, nodes, edges, defaultEdgeOptions, ... })` once again creates/populates a store from options, fixing a regression where passing options object would silently use it as an id (producing `pattern-[object Object]` on the background among other things). Repeated calls in the same setup share the same store via an effect-scope id (previously each `useVueFlow()` call could create a new store when injection didn't work across sibling composables in the same component).

`<VueFlow>` now forwards its props back through `useVueFlow(props)` so a store created externally by `useVueFlow({ id: 'foo' })` and a `<VueFlow id="foo" ... />` mount end up bound to the same store, with options like `defaultEdgeOptions` applied before edges parse.

The deprecated `paneReady` event is gone — listen to `init` (or `onInit`) instead. The deprecated mixed-elements API (`<VueFlow v-model="elements">`, `setElements`, `addSelectedElements`, `removeSelectedElements`, `getElements`, `getSelectedElements`) is removed — use the separate `nodes` / `edges` props and `setNodes` / `setEdges` / `addSelectedNodes` / `addSelectedEdges` / `removeSelectedNodes` / `removeSelectedEdges` / `getNodes` / `getEdges` / `getSelectedNodes` / `getSelectedEdges` actions and getters.

Default change handlers (`applyNodeChanges` / `applyEdgeChanges`) are now wired automatically inside `useVueFlow` (gated on `applyDefault`), so `addNodes` / `addEdges` mutate the store even before `<VueFlow>` mounts — matching xyflow/react.

### Built-in nodes (label rendering)

The built-in `input` / `default` / `output` node components read labels from `data.label`. The deprecated top-level `node.label` is no longer supported — move labels to `data: { label: 'My Node' }`.

### Migration cheat-sheet

| Old | New |
|---|---|
| `node.parentNode` | `node.parentId` |
| `node.computedPosition` | `node.internals.positionAbsolute` (+ `node.internals.z`) |
| `node.dimensions` | `node.measured` |
| `node.handleBounds` | `node.internals.handleBounds` |
| `node.isParent` | `parentLookup.value.get(node.id)?.size > 0` |
| `node.label` (top-level) | `node.data.label` |
| `NodeProps<MyData>` | `NodeProps<Node<MyData, 'myType'>>` |
| `EdgeProps<MyData>` | `EdgeProps<Edge<MyData, 'myType'>>` |
| `NodeDimensionChange.updateStyle` | `NodeDimensionChange.setAttributes` |
| `NodePositionChange.from` | `NodePositionChange.positionAbsolute` |
| `NodeAddChange.item: GraphNode` | `NodeAddChange.item: Node` |
| `EdgeAddChange.item: GraphEdge` | `EdgeAddChange.item: Edge` |
| `EdgeRemoveChange.{source,target,sourceHandle,targetHandle}` | look up the edge via `findEdge(id)` |
| `onPaneReady` / `@pane-ready` | `onInit` / `@init` |
| `<VueFlow v-model="elements">` | `<VueFlow :nodes="nodes" :edges="edges">` (or `v-model:nodes`/`v-model:edges`) |
| `store.setElements(...)` | `store.setNodes(...)` + `store.setEdges(...)` |
| `store.addSelectedElements(...)` | `store.addSelectedNodes(...)` / `store.addSelectedEdges(...)` |
| `store.removeSelectedElements(...)` | `store.removeSelectedNodes(...)` / `store.removeSelectedEdges(...)` |
| `store.getElements` / `store.getSelectedElements` | `store.getNodes` / `store.getEdges` / `store.getSelectedNodes` / `store.getSelectedEdges` |
