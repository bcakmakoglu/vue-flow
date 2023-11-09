import type { InjectionKey, Ref } from 'vue'
import type { FlowSlots, VueFlowStore } from '~/types'

export const VueFlow: InjectionKey<VueFlowStore> = Symbol('vueFlow')
export const NodeId: InjectionKey<string> = Symbol('nodeId')
export const NodeRef: InjectionKey<Ref<HTMLDivElement | null>> = Symbol('nodeRef')
export const EdgeId: InjectionKey<string> = Symbol('edgeId')
export const EdgeRef: InjectionKey<Ref<SVGElement | null>> = Symbol('edgeRef')
export const Slots: InjectionKey<Readonly<FlowSlots>> = Symbol('slots')
