import { InjectionKey } from 'vue'
import { UseVueFlow } from '~/types'

export const VueFlow: InjectionKey<UseVueFlow> = Symbol('vueFlow') as InjectionKey<UseVueFlow>
export const NodeId: InjectionKey<string> = Symbol('nodeId') as InjectionKey<string>
