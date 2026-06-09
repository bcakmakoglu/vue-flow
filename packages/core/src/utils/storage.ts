import { toRefs } from '@vueuse/core'
import { getCurrentInstance, reactive } from 'vue'
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

    // Lookup maps are now the PRIMARY node/edge structures (Step 3 of the inversion). They are held as
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
    const edgeLookup = reactive(new Map<string, GraphEdge>()) as EdgeLookup

    const getters = useGetters(reactiveState, nodeLookup, edgeLookup)

    const actions = useActions<NodeType>(reactiveState, nodeLookup, parentLookup, edgeLookup)

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
