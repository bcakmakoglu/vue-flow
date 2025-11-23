import { toRefs } from '@vueuse/core'
import { computed, getCurrentInstance, reactive } from 'vue'
import type { FlowProps, GraphEdge, GraphNode, Node, VueFlowStore } from '../types'
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
      hooksOn[name] = h.on
    }

    const emits = <any>{}
    for (const [n, h] of Object.entries(reactiveState.hooks)) {
      emits[n] = h.trigger
    }

    // for lookup purposes
    const nodeLookup = computed(() => {
      const nodesMap = new Map<string, GraphNode<NodeType>>()
      for (const node of reactiveState.nodes) {
        nodesMap.set(node.id, node)
      }

      return nodesMap
    })

    const edgeLookup = computed(() => {
      const edgesMap = new Map<string, GraphEdge>()

      for (const edge of reactiveState.edges) {
        edgesMap.set(edge.id, edge)
      }

      return edgesMap
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
