import type { EffectScope } from 'vue'
import { effectScope, getCurrentScope, inject, provide, watch } from 'vue'
import type { EdgeChange, FlowOptions, Node, NodeChange, VueFlowStore } from '../types'
import { VueFlow } from '../context'
import { Storage } from '../utils/storage'

type Scope = (EffectScope & { vueFlowId?: string }) | undefined

// todo: maybe replace the storage with a context based solution; This would break calling useVueFlow outside a setup function though, which should be fine
/**
 * Composable that provides access to a store instance
 *
 * If no id is provided, the store instance is injected from context
 *
 * If no store instance is found in context, a new store instance is created and registered in storage
 *
 * @public
 * @returns a vue flow store instance
 * @param idOrOptions - id of the store instance, or options to create a new store instance
 */
export function useVueFlow<NodeType extends Node = Node>(id?: string): VueFlowStore<NodeType>
export function useVueFlow<NodeType extends Node = Node>(options?: FlowOptions<NodeType>): VueFlowStore<NodeType>
export function useVueFlow<NodeType extends Node = Node>(idOrOptions?: string | FlowOptions<NodeType>): VueFlowStore<NodeType> {
  const storage = Storage.getInstance()

  const scope = getCurrentScope() as Scope

  const isOptsObj = typeof idOrOptions === 'object' && idOrOptions !== null

  const options = (isOptsObj ? idOrOptions : { id: idOrOptions }) as FlowOptions<NodeType> & { id?: string }
  const id = options.id

  /**
   * Resolve the id to look up:
   * 1. an explicit id passed by the caller
   * 2. an id previously attached to this effect scope (from a sibling `useVueFlow` call in the same setup)
   * 3. otherwise create a fresh one below
   *
   * NOTE: Vue's `inject` only sees provides from ancestor components — not the current one. So when a
   * composable provides a store and a sibling composable in the same setup wants to read it, `inject` is
   * not enough. We piggy-back the id on the current effect scope so siblings can find it.
   */
  const vueFlowId = id ?? scope?.vueFlowId

  let vueFlow: VueFlowStore<NodeType> | null | undefined

  /**
   * Prefer an injected store from an ancestor component (this is the normal case once `<VueFlow>` is mounted).
   */
  const injectedState = inject(VueFlow, null) as VueFlowStore<NodeType> | null
  if (typeof injectedState !== 'undefined' && injectedState !== null && (!vueFlowId || injectedState.id === vueFlowId)) {
    vueFlow = injectedState
  }

  /**
   * Fall back to looking up the store directly from storage by id. This handles both an explicit id and
   * the scope-bound id used by sibling composable invocations.
   */
  if (!vueFlow && vueFlowId) {
    vueFlow = storage.get(vueFlowId) as unknown as VueFlowStore<NodeType>
  }

  /**
   * If we still don't have a store (and ids don't conflict), create one and register it.
   */
  const created = !vueFlow || (id && vueFlow.id !== id)
  if (created) {
    const name = id ?? storage.getId()

    vueFlow = storage.create(
      name,
      isOptsObj ? (idOrOptions as FlowOptions<NodeType>) : undefined,
    ) as unknown as VueFlowStore<NodeType>

    /**
     * Register default change handlers so that `addNodes`/`addEdges`/etc. mutate the store even
     * before <VueFlow> is mounted. Disabling `applyDefault` (the user is handling changes manually)
     * removes them. Mirrors xyflow/react default behaviour.
     */
    const vfScope = scope ?? effectScope(true)
    const flow = vueFlow as VueFlowStore<NodeType>
    vfScope.run(() => {
      watch(
        flow.applyDefault,
        (shouldApplyDefault, _prev, onCleanup) => {
          const nodesChangeHandler = (changes: NodeChange[]) => {
            flow.applyNodeChanges(changes as NodeChange<NodeType>[])
          }
          const edgesChangeHandler = (changes: EdgeChange[]) => {
            flow.applyEdgeChanges(changes)
          }

          if (shouldApplyDefault) {
            flow.onNodesChange(nodesChangeHandler)
            flow.onEdgesChange(edgesChangeHandler)
          } else {
            flow.hooks.value.nodesChange.off(nodesChangeHandler)
            flow.hooks.value.edgesChange.off(edgesChangeHandler)
          }

          onCleanup(() => {
            flow.hooks.value.nodesChange.off(nodesChangeHandler)
            flow.hooks.value.edgesChange.off(edgesChangeHandler)
          })
        },
        { immediate: true },
      )
    })
  }

  // If options were passed but we reused an existing store (e.g. <VueFlow id="…" /> mounts and finds
  // a store previously created by `useVueFlow({ id })` in the test/setup), forward those options
  // through setState so things like `defaultEdgeOptions` are applied before nodes/edges parse.
  const resolved = vueFlow as VueFlowStore<NodeType>
  if (!created && isOptsObj && resolved) {
    resolved.setState(idOrOptions as Parameters<typeof resolved.setState>[0])
  }

  // Provide a fresh instance into context for descendant components
  if (scope) {
    provide(VueFlow, resolved as unknown as VueFlowStore)
    // Tag the current scope so subsequent sibling `useVueFlow` calls in the same setup share the store.
    if (!scope.vueFlowId) {
      scope.vueFlowId = resolved.id
    }
  }

  return vueFlow as VueFlowStore<NodeType>
}
