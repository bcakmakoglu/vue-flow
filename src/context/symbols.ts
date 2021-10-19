import { InjectionKey } from 'vue'
import { FlowHooks, FlowStore } from '~/types'

export const Store: InjectionKey<FlowStore> = Symbol('store')
export const Hooks: InjectionKey<FlowHooks> = Symbol('hooks')
