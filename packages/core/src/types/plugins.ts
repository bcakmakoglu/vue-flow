import type { EventHookOn } from '@vueuse/core'
import type { FlowOptions } from './flow'
import type { VueFlowStore } from './store'

export interface PluginHooks {
  onBeforeCreate: EventHookOn<[string, FlowOptions | undefined]>
  created: EventHookOn<VueFlowStore>
  beforeDestroy: EventHookOn<VueFlowStore>
  destroyed: EventHookOn<string>
}

export type Plugin = (hooks: PluginHooks) => void
