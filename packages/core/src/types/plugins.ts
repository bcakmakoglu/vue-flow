import type { EventHook } from '@vueuse/core'
import type { FlowOptions } from './flow'
import type { VueFlowStore } from './store'

export interface PluginHooks {
  beforeCreate: EventHook<[string, FlowOptions | undefined]>
  created: EventHook<[VueFlowStore, (plugin: Partial<VueFlowStore>) => void]>
  beforeDestroy: EventHook<VueFlowStore>
  destroyed: EventHook<string>
}

export type Plugin = (hooks: { [key in keyof PluginHooks]: PluginHooks[key]['on'] }) => void
