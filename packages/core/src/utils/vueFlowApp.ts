import { createEventHook, toRefs } from '@vueuse/core'
import { computed, reactive } from 'vue'
import type { ConfigFactory, FlowOptions, Plugin, PluginHooks, State, VueFlowStore } from '~/types'
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

  private hooks: PluginHooks = {
    beforeCreate: createEventHook(),
    created: createEventHook(),
    beforeDestroy: createEventHook(),
    destroyed: createEventHook(),
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

    // todo: can we await this so we can possibly extend the initialState?
    this.hooks.beforeCreate.trigger([id, initialState])

    const state: State = useState(initialState)

    const reactiveState = reactive(state)

    const nodeIds = computed(() => reactiveState.nodes.map((n) => n.id))
    const edgeIds = computed(() => reactiveState.edges.map((e) => e.id))

    const getters = useGetters(reactiveState, nodeIds, edgeIds)

    const actions = useActions(reactiveState, getters, nodeIds, edgeIds)

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

    const flow: VueFlowStore = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
      emits,
      id,
      $destroy: () => {
        // todo: can we await this so we can possibly cancel the destroy?
        this.hooks.beforeDestroy.trigger(flow)
        this.remove(id)
        this.hooks.destroyed.trigger(id)
      },
      vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : 'UNKNOWN',
    }

    this.set(id, flow)

    this.hooks.created.trigger([
      flow,
      // this helper function lets you extend the store with additional properties
      (plugin) => {
        this.set(id, { ...this.get(id)!, ...plugin })
      },
    ])

    return this.get(id)!
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

export function createVueFlow(options?: ConfigFactory) {
  const app = VueFlowApp.getInstance()

  if (options) {
    app.setConfig(options)
  }

  return app
}
