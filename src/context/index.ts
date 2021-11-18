import { InjectionKey } from 'vue'
import { ElementId, FlowHooks, FlowStore } from '~/types'

export const Store: InjectionKey<FlowStore> = Symbol('store')
export const Hooks: InjectionKey<FlowHooks> = Symbol('hooks')
export const NodeId: InjectionKey<ElementId> = Symbol('nodeId')
