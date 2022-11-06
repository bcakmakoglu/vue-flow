import type { ConfigFactory, FlowOptions, Plugin, State, VueFlowStore } from '~/types'
import { useActions, useGetters, useState } from '~/store'

/**
 * Global Vue Flow App
 *
 * Stores all store instances and provides access to them
 *
 * Holds global config that is passed to all store instances
 *
 * Provides hooks for plugins to access the store
 */
export class VueFlowApp {
  static instance: VueFlowApp

  public currentId = 0

  public flows = new Map<string, VueFlowStore>()

  private hooks = {
    beforeCreate: createEventHook<[string, FlowOptions | undefined]>(),
    created: createEventHook<VueFlowStore>(),
    beforeDestroy: createEventHook<VueFlowStore>(),
    destroyed: createEventHook<string>(),
  }

  /** Used by each store instance that is created as default values for store */
  public config: ConfigFactory = () => ({})

  public static getInstance(): VueFlowApp {
    if (!VueFlowApp.instance) {
      VueFlowApp.instance = new VueFlowApp()
    }

    return VueFlowApp.instance
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

  public create(id: string, initialOptions?: FlowOptions): VueFlowStore {
    const initialState = { ...this.config, ...initialOptions }

    this.hooks.beforeCreate.trigger([id, initialState])

    const state: State = useState(initialState)

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

    if (initialState) {
      if (initialState.modelValue) actions.setElements(initialState.modelValue)
      if (initialState.nodes) actions.setNodes(initialState.nodes)
      if (initialState.edges) actions.setEdges(initialState.edges)
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

  /**
   * Helper to install plugin
   */
  public use(plugin: Plugin) {
    plugin({
      beforeCreate: this.hooks.beforeCreate.on,
      created: this.hooks.created.on,
      beforeDestroy: this.hooks.beforeDestroy.on,
      destroyed: this.hooks.destroyed.on,
    })

    return this
  }

  /**
   * Set global config factory function
   * @param options
   */
  public setConfig(options: ConfigFactory) {
    this.config = options

    return this
  }
}

export const createVueFlow = (options?: ConfigFactory) => {
  const app = VueFlowApp.getInstance()

  if (options) app.setConfig(options)

  return app
}
