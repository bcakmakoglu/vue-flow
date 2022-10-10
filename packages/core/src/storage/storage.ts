import type { FlowOptions, Plugin, State, VueFlowStore } from '~/types'
import { useActions, useGetters, useState } from '~/store'

/**
 * Stores all currently created store instances
 */
export class Storage {
  public currentId = 0
  public flows = new Map<string, VueFlowStore>()
  static instance: Storage
  private hooks = {
    beforeCreate: createEventHook<[string, FlowOptions | undefined]>(),
    created: createEventHook<VueFlowStore>(),
    beforeDestroy: createEventHook<VueFlowStore>(),
    destroyed: createEventHook<string>(),
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage()
    }

    return Storage.instance
  }

  public set(id: string, flow: VueFlowStore) {
    return this.flows.set(id, flow)
  }

  public get(id: string) {
    return this.flows.get(id)
  }

  public remove(id: string) {
    return this.flows.delete(id)
  }

  public create(id: string, preloadedState?: FlowOptions): VueFlowStore {
    this.hooks.beforeCreate.trigger([id, preloadedState])
    const state: State = useState(preloadedState)

    const reactiveState = reactive(state)

    const getters = useGetters(reactiveState)

    const actions = useActions(reactiveState, getters)

    const hooksOn = <any>{}
    Object.entries(reactiveState.hooks).forEach(([n, h]) => {
      const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`
      hooksOn[name] = h.on
    })

    const emits = <any>{}
    Object.entries(reactiveState.hooks).forEach(([n, h]) => {
      emits[n] = h.trigger
    })

    actions.setState(reactiveState)

    if (preloadedState) {
      if (preloadedState.modelValue) actions.setElements(preloadedState.modelValue)
      if (preloadedState.nodes) actions.setNodes(preloadedState.nodes)
      if (preloadedState.edges) actions.setEdges(preloadedState.edges)
    }

    const flow: VueFlowStore = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
      emits,
      id,
      $destroy: () => {
        this.hooks.beforeDestroy.trigger(flow)
        this.remove(id)
        this.hooks.destroyed.trigger(id)
      },
    }

    this.set(id, flow)

    this.hooks.created.trigger(flow)

    return flow
  }

  public getId() {
    return `vue-flow-${this.currentId++}`
  }

  public install(plugins: Plugin[]) {
    plugins.forEach((plugin) =>
      plugin({
        onBeforeCreate: this.hooks.beforeCreate.on,
        created: this.hooks.created.on,
        beforeDestroy: this.hooks.beforeDestroy.on,
        destroyed: this.hooks.destroyed.on,
      }),
    )
  }
}
