import type { FlowProps, Node, VueFlowStore } from '../types'
import { createVueFlowStore } from './createStore'

/**
 * Module-level registry of store instances by id. Replaces the former global `Storage` singleton
 * (which was stashed on `app.config.globalProperties.$vueFlowStorage`). It exists for the cases a
 * context provider can't serve on its own: explicit `useVueFlow(id)` lookups and calls made outside a
 * component setup (where `inject` is unavailable). The preferred way to scope/share a store is
 * `<VueFlowProvider>` (provide/inject); this registry is the escape hatch.
 *
 * Note: module-scoped (shared across the JS context), not per-Vue-app like the old hack. For multiple
 * independent flows, address them by distinct ids or wrap each tree in its own provider.
 */
const flows = new Map<string, VueFlowStore>()

let flowCount = 0

/** Generate a fresh, unused flow id. */
export function generateFlowId(): string {
  return `vue-flow-${flowCount++}`
}

/** Look up a previously-registered store by id. */
export function getFlowStore<NodeType extends Node = Node>(id: string): VueFlowStore<NodeType> | undefined {
  return flows.get(id) as VueFlowStore<NodeType> | undefined
}

/** Create a store, register it, and auto-unregister on `$destroy`. */
export function createFlowStore<NodeType extends Node = Node>(
  id: string,
  preloadedState?: FlowProps<NodeType>,
): VueFlowStore<NodeType> {
  const flow = createVueFlowStore<NodeType>(id, preloadedState, (flowId) => {
    flows.delete(flowId)
  })

  flows.set(id, flow as unknown as VueFlowStore)

  return flow
}
