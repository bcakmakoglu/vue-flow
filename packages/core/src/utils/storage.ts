import { toRefs } from '@vueuse/core'
import { effectScope, getCurrentInstance, reactive, watchEffect } from 'vue'
import type { EdgeLookup, FlowProps, GraphEdge, GraphNode, Node, NodeLookup, VueFlowStore } from '../types'
import { useActions, useGetters, useState } from '../store'

/**
 * @deprecated will be removed in the next major and replaced with a ctx based solution similar to `<ReactFlowProvider>`
 *
 * Stores all existing VueFlow state instances
 */
export class Storage {
  public currentId = 0
  public flows = new Map<string, VueFlowStore>()
  static instance: Storage

  public static getInstance(): Storage {
    // todo: this is just a workaround for now, in the next major this class won't exist and the state will be ctx-based (like React Provider)
    const vueApp = getCurrentInstance()?.appContext.app

    const existingInstance = vueApp?.config.globalProperties.$vueFlowStorage ?? Storage.instance

    Storage.instance = existingInstance ?? new Storage()

    if (vueApp) {
      vueApp.config.globalProperties.$vueFlowStorage = Storage.instance
    }

    return Storage.instance
  }

  public set<NodeType extends Node = Node>(id: string, flow: VueFlowStore<NodeType>) {
    return this.flows.set(id, flow as unknown as VueFlowStore)
  }

  public get<NodeType extends Node = Node>(id: string): VueFlowStore<NodeType> | undefined {
    return this.flows.get(id) as VueFlowStore<NodeType> | undefined
  }

  public remove(id: string) {
    return this.flows.delete(id)
  }

  public create<NodeType extends Node = Node>(id: string, preloadedState?: FlowProps<NodeType>): VueFlowStore<NodeType> {
    const state = useState<NodeType>()

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

    // Lookup maps held as `reactive(Map)` rather than Vue `computed`s. `reactive(Map)` gives a stable
    // Map identity across mutations and — critical for the in-progress lookup inversion — lets
    // `@xyflow/system` helpers `.set` clones in place while reads via `.get` stay reactive (validated by
    // the Step 0 spike). For now they remain *derived* from `reactiveState.nodes`/`.edges` by the
    // maintainer effects below (full clear+rebuild on structural change), so behaviour is unchanged;
    // Step 3 will make these the source of truth.
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
    const edgeLookup = reactive(new Map<string, GraphEdge>()) as EdgeLookup

    // Own effect scope so the maintainer watchers are disposed on `$destroy` (computeds were lazy and
    // self-collecting; eager effects are not).
    const lookupScope = effectScope(true)
    lookupScope.run(() => {
      // `flush: 'sync'` is essential: the previous `computed` recomputed lazily *on access*, so a
      // `findNode(...)` call made synchronously right after `state.nodes` was mutated (e.g. `setState`
      // parsing nodes then edges, which resolves each edge's source/target via `findNode`) always saw
      // a fresh map. A default ('pre') watcher would defer the rebuild to the next tick, leaving the
      // lookup stale for that synchronous read — surfacing as "edge source/target missing" / "parent
      // not found". Sync flush reproduces the computed's eager-on-write freshness.
      //
      // Rebuild node + parent lookups on structural change: the effect reads `node.id`/`node.parentId`
      // and the array (not `node.position`), so it re-runs on add/remove/id/parent changes only — the
      // same trigger surface as the old computeds. It writes the reactive maps but never reads them,
      // so there is no self-dependency / loop.
      watchEffect(
        () => {
          nodeLookup.clear()
          parentLookup.clear()
          const parents = new Map<string, Map<string, GraphNode<NodeType>>>()
          for (const node of reactiveState.nodes) {
            nodeLookup.set(node.id, node)
            const parentId = node.parentId
            if (parentId) {
              let children = parents.get(parentId)
              if (!children) {
                children = new Map<string, GraphNode<NodeType>>()
                parents.set(parentId, children)
              }
              children.set(node.id, node)
            }
          }
          for (const [parentId, children] of parents) {
            parentLookup.set(parentId, children)
          }
        },
        { flush: 'sync' },
      )

      watchEffect(
        () => {
          edgeLookup.clear()
          for (const edge of reactiveState.edges) {
            edgeLookup.set(edge.id, edge)
          }
        },
        { flush: 'sync' },
      )
    })

    const getters = useGetters(reactiveState, nodeLookup, edgeLookup)

    const actions = useActions<NodeType>(reactiveState, nodeLookup, edgeLookup)

    actions.setState({ ...reactiveState, ...preloadedState } as any)

    const flow: VueFlowStore<NodeType> = {
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
        lookupScope.stop()
        this.remove(id)
      },
    }

    this.set(id, flow)

    return flow as VueFlowStore<NodeType>
  }

  public getId() {
    return `vue-flow-${this.currentId++}`
  }
}
