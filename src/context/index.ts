import { InjectionKey } from 'vue'
import { UseVueFlow } from '~/types'

export const VueFlow: InjectionKey<UseVueFlow> = Symbol('vueFlow')
export const NodeId: InjectionKey<string> = Symbol('nodeId')
