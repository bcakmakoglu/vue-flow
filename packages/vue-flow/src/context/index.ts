import type { InjectionKey, Slots as TSlots } from 'vue'
import type { VueFlowStore } from '~/types'

export const VueFlow: InjectionKey<VueFlowStore> = Symbol('vueFlow')
export const NodeId: InjectionKey<string> = Symbol('nodeId')
export const Slots: InjectionKey<TSlots> = Symbol('slots')
