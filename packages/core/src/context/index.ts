import type { InjectionKey, Ref, Slots as TSlots } from 'vue'
import type { VueFlowStore } from '~/types'

export const VueFlow: InjectionKey<VueFlowStore> = Symbol('vueFlow')
export const NodeId: InjectionKey<string> = Symbol('nodeId')
export const NodeRef: InjectionKey<Ref<HTMLDivElement>> = Symbol('nodeRef')
export const EdgeId: InjectionKey<string> = Symbol('edgeId')
export const EdgeRef: InjectionKey<Ref<SVGElement>> = Symbol('edgeRef')
export const Slots: InjectionKey<TSlots> = Symbol('slots')
