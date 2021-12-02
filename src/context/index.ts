import { InjectionKey } from 'vue'
import { ElementId, Store as TStore } from '~/types'

export const StoreSymbol: InjectionKey<TStore> = Symbol('store')
export const NodeId: InjectionKey<ElementId> = Symbol('nodeId')
