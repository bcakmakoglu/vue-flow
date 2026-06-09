import { provide, useId, watch } from 'vue'
import type { EdgeChange, FlowOptions, Node, NodeChange, VueFlowStore } from '../types'
import { VueFlow } from '../context'
import { createVueFlowStore } from '../store/createStore'
import type { StoreSignals } from '../store/createStore'

/**
 * Create a VueFlow store, register the default change handlers, and `provide` it to descendants.
 *
 * Owned by `<VueFlow>` / `<VueFlowProvider>`. This is the *only* place a store is created and provided;
 * the public `useVueFlow()` is a pure `inject` consumer. Must run in a component `setup` (it calls
 * `provide` + `watch` + `useId`, which bind to the component instance).
 *
 * @internal
 */
export function useCreateVueFlow<NodeType extends Node = Node>(
  options?: FlowOptions<NodeType>,
  signals?: StoreSignals<NodeType>,
): VueFlowStore<NodeType> {
  // the flow id is only an aria/debug label (not a lookup key), so default it to Vue's SSR-safe `useId()`
  const store = createVueFlowStore<NodeType>(options?.id ?? useId(), options, undefined, signals)

  /**
   * Register default change handlers so `addNodes`/`addEdges`/etc. mutate the store. Disabling
   * `applyDefault` (the user handles changes manually) removes them. Mirrors xyflow/react.
   */
  watch(
    store.applyDefault,
    (shouldApplyDefault, _prev, onCleanup) => {
      const nodesChangeHandler = (changes: NodeChange[]) => {
        store.applyNodeChanges(changes as NodeChange<NodeType>[])
      }
      const edgesChangeHandler = (changes: EdgeChange[]) => {
        store.applyEdgeChanges(changes)
      }

      if (shouldApplyDefault) {
        store.onNodesChange(nodesChangeHandler)
        store.onEdgesChange(edgesChangeHandler)
      } else {
        store.hooks.value.nodesChange.off(nodesChangeHandler)
        store.hooks.value.edgesChange.off(edgesChangeHandler)
      }

      onCleanup(() => {
        store.hooks.value.nodesChange.off(nodesChangeHandler)
        store.hooks.value.edgesChange.off(edgesChangeHandler)
      })
    },
    { immediate: true },
  )

  provide(VueFlow, store as unknown as VueFlowStore)

  return store
}
