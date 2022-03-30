import { InjectionKey, Slots as TSlots } from 'vue'
import { UseVueFlow } from '~/types'

export const VueFlow: InjectionKey<UseVueFlow> = Symbol('vueFlow')
export const NodeId: InjectionKey<string> = Symbol('nodeId')
export const Slots: InjectionKey<TSlots> = Symbol('slots')
