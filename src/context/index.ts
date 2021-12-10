import { InjectionKey } from 'vue'
import { Store as TStore } from '~/types'

export const StoreSymbol: InjectionKey<TStore> = Symbol('store')
export const NodeId: InjectionKey<string> = Symbol('nodeId')
