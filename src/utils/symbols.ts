import { InjectionKey } from 'vue'
import { RevueFlowStore } from '../types'
import { RevueFlowHooks } from '../hooks/RevueFlowHooks'

export const StoreKey: InjectionKey<RevueFlowStore> = Symbol('store')
export const HooksKey: InjectionKey<RevueFlowHooks> = Symbol('hooks')
export const NodeIdContextKey: InjectionKey<string> = Symbol('NodeIdContext')
