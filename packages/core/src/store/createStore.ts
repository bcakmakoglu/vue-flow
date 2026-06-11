import type { Ref } from 'vue'
import { reactive, ref, toRefs, watch } from 'vue'
import type { Edge, EdgeLookup, FlowProps, GraphEdge, GraphNode, Node, NodeLookup, VueFlowStore } from '../types'
import { useActions } from './actions'
import { useGetters } from './getters'
import { useState } from './state'

/**
 * External backing refs for a store's nodes/edges. When `<VueFlow>` passes its `v-model` refs here, the
 * store reads/writes them directly (single source of truth, like svelte's `$bindable` proxy) so a
 * separate v-model sync layer isn't needed. Omitted → the store uses internal refs.
 */
export interface StoreSignals<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
  nodes?: Ref<NodeType[]>
  edges?: Ref<GraphEdge<EdgeType>[]>
}

/**
 * Builds a fully-wired VueFlow store instance (reactive state, lookups, getters, actions, hooks).
 *
 * Standalone factory so store ownership lives in the component that creates it — `<VueFlow>` or
 * `<VueFlowProvider>` via `useCreateVueFlow` — which `provide`s it to descendants. There is no global
 * registry; `useVueFlow()` resolves the store purely through `inject`.
 *
 * @internal
 */
export function createVueFlowStore<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  id: string,
  preloadedState?: FlowProps<NodeType, EdgeType>,
  onDestroy?: (id: string) => void,
  signals?: StoreSignals<NodeType, EdgeType>,
): VueFlowStore<NodeType, EdgeType> {
  // nodes/edges are backed by (optionally injected) signal refs — the single source of truth. When
  // `<VueFlow>` passes its v-model refs, mutating the store *is* the v-model update (svelte's
  // bindable-prop proxy), so no separate sync layer is needed. Default: internal `ref`s (deep-reactive,
  // matching the previous `reactive(state).nodes` behaviour).
  const nodesSignal = signals?.nodes ?? ref<NodeType[]>([])
  const edgesSignal = signals?.edges ?? ref<GraphEdge<EdgeType>[]>([])

  // The array references the store itself last wrote (through the `state.nodes`/`.edges` setters below).
  // The single-source binding watch (further down) uses these to tell its own writes apart from an
  // external `v-model` reassignment — no pause/resume flags needed.
  let lastWriteNodes: NodeType[] | undefined
  let lastWriteEdges: GraphEdge<EdgeType>[] | undefined

  // Stable empty fallbacks: an injected `v-model` ref is `undefined` until bound (e.g. `<VueFlow>` with no
  // `:nodes`), so reads must never surface `undefined` (everything iterates `state.nodes`/`.edges`). A
  // stable reference avoids reactivity churn while unbound; `setState`/`commit` replace it with a real array.
  const emptyNodes: NodeType[] = []
  const emptyEdges: GraphEdge<EdgeType>[] = []

  const state = useState<NodeType, EdgeType>()

  // Proxy `state.nodes`/`.edges` through the signals via accessors (svelte's `get nodes()` pattern), so
  // every existing `state.nodes` read/write stays unchanged while the backing becomes injectable.
  Object.defineProperty(state, 'nodes', {
    get: () => nodesSignal.value ?? emptyNodes,
    set: (value: NodeType[]) => {
      lastWriteNodes = value
      nodesSignal.value = value
    },
    enumerable: true,
    configurable: true,
  })
  Object.defineProperty(state, 'edges', {
    get: () => edgesSignal.value ?? emptyEdges,
    set: (value: GraphEdge<EdgeType>[]) => {
      lastWriteEdges = value
      edgesSignal.value = value
    },
    enumerable: true,
    configurable: true,
  })

  const reactiveState = reactive(state) as any

  const hooksOn = <any>{}
  for (const [n, h] of Object.entries(reactiveState.hooks)) {
    const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`
    hooksOn[name] = (h as any).on
  }

  const emits = <any>{}
  for (const [n, h] of Object.entries(reactiveState.hooks)) {
    emits[n] = (h as any).trigger
  }

  // Lookup maps are the PRIMARY node/edge structures (Step 3 of the inversion). They are held as
  // `reactive(Map)` so Map identity is stable across mutations and — critical for the later steps —
  // `@xyflow/system` helpers can `.set` clones in place while reads via `.get` stay reactive
  // (validated by the Step 0 spike). The store actions mutate these directly (via `commitNodes` /
  // `commitEdges` in `useActions`) and keep `reactiveState.nodes`/`.edges` as array mirrors for the
  // internal reads + the public `store.nodes`/`store.edges` refs that still consume arrays. There is
  // no derivation watcher: actions write maps + mirror in a single imperative pass, so there is no
  // rebuild thrash and no forward/backward maintainer loop.
  //
  // The `as` casts undo `reactive()`'s `UnwrapNestedRefs` return type: over a Map of the *generic*
  // `GraphNode<NodeType>`, TS can't prove the element type has no refs to unwrap and widens the value
  // type. At runtime the proxy is exactly a `Map<string, GraphNode>`, so the assertion is sound (this
  // is the documented Vue + generics friction, not an `any`-style escape hatch).
  const nodeLookup = reactive(new Map<string, GraphNode<NodeType>>()) as NodeLookup<NodeType>
  // map parentId -> Map<childId, GraphNode>. Matches `@xyflow/system`'s `ParentLookup` shape so we can
  // pass it directly into `adoptUserNodes` / `updateAbsolutePositions` / `handleExpandParent` without
  // translation. `.size` still answers "is this node a parent?" in O(1).
  const parentLookup = reactive(new Map<string, Map<string, GraphNode<NodeType>>>()) as Map<
    string,
    Map<string, GraphNode<NodeType>>
  >
  const edgeLookup = reactive(new Map<string, GraphEdge<EdgeType>>()) as EdgeLookup<EdgeType>

  const getters = useGetters<NodeType, EdgeType>(reactiveState, nodeLookup, edgeLookup)

  const actions = useActions<NodeType, EdgeType>(reactiveState, nodeLookup, parentLookup, edgeLookup)

  actions.setState({ ...reactiveState, ...preloadedState } as any)

  // Single-source `v-model` binding. When `<VueFlow>` passes its model refs as signals, the store's
  // nodes/edges ARE those refs: internal mutations (drag, `addEdges`, `applyNodeChanges`, …) write them
  // through the `state.nodes`/`.edges` setters, which IS the v-model write-back — the OUT direction is
  // free, no watcher. The only thing left is adopting an EXTERNAL reassignment (`nodes.value = [...]` in
  // user land) so the lookups rebuild. The store's own writes are recorded in `lastWriteNodes`; a user
  // reassignment writes the signal directly, bypassing the setter, so we re-adopt only then (mirrors
  // svelte-flow re-running `adoptUserNodes` via `$derived` on a reference change — no pause/resume).
  if (signals?.nodes) {
    watch(nodesSignal, () => {
      if (nodesSignal.value && nodesSignal.value !== lastWriteNodes) {
        actions.setNodes(nodesSignal.value as NodeType[])
      }
    })
  }
  if (signals?.edges) {
    watch(edgesSignal, () => {
      if (edgesSignal.value && edgesSignal.value !== lastWriteEdges) {
        actions.setEdges(edgesSignal.value as unknown as EdgeType[])
      }
    })
  }

  const flow: VueFlowStore<NodeType, EdgeType> = {
    ...hooksOn,
    ...getters,
    ...actions,
    ...toRefs(reactiveState),
    nodeLookup,
    parentLookup,
    edgeLookup,
    emits,
    id,
    vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : 'UNKNOWN',
    $destroy: () => {
      onDestroy?.(id)
    },
  }

  return flow as VueFlowStore<NodeType, EdgeType>
}
