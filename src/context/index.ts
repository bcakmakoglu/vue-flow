import { InjectionKey } from 'vue'
import { ElementId, FlowStore } from '~/types'

export const Store: InjectionKey<FlowStore> = Symbol('store')
export const NodeId: InjectionKey<ElementId> = Symbol('nodeId')
