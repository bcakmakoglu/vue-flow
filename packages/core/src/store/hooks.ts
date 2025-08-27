import { tryOnScopeDispose } from '@vueuse/core'
import type { Ref } from 'vue'
import { getCurrentInstance, onBeforeMount } from 'vue'
import type { FlowEvents, FlowHooks } from '../types'
import { createExtendedEventHook, warn } from '../utils'

export function createHooks(): FlowHooks {
  return {
    edgesChange: createExtendedEventHook(),
    nodesChange: createExtendedEventHook(),
    nodeDoubleClick: createExtendedEventHook(),
    nodeClick: createExtendedEventHook(),
    nodeMouseEnter: createExtendedEventHook(),
    nodeMouseMove: createExtendedEventHook(),
    nodeMouseLeave: createExtendedEventHook(),
    nodeContextMenu: createExtendedEventHook(),
    nodeDragStart: createExtendedEventHook(),
    nodeDrag: createExtendedEventHook(),
    nodeDragStop: createExtendedEventHook(),
    nodesInitialized: createExtendedEventHook(),
    miniMapNodeClick: createExtendedEventHook(),
    miniMapNodeDoubleClick: createExtendedEventHook(),
    miniMapNodeMouseEnter: createExtendedEventHook(),
    miniMapNodeMouseMove: createExtendedEventHook(),
    miniMapNodeMouseLeave: createExtendedEventHook(),
    connect: createExtendedEventHook(),
    connectStart: createExtendedEventHook(),
    connectEnd: createExtendedEventHook(),
    clickConnectStart: createExtendedEventHook(),
    clickConnectEnd: createExtendedEventHook(),
    paneReady: createExtendedEventHook(),
    init: createExtendedEventHook(),
    move: createExtendedEventHook(),
    moveStart: createExtendedEventHook(),
    moveEnd: createExtendedEventHook(),
    selectionDragStart: createExtendedEventHook(),
    selectionDrag: createExtendedEventHook(),
    selectionDragStop: createExtendedEventHook(),
    selectionContextMenu: createExtendedEventHook(),
    selectionStart: createExtendedEventHook(),
    selectionEnd: createExtendedEventHook(),
    viewportChangeStart: createExtendedEventHook(),
    viewportChange: createExtendedEventHook(),
    viewportChangeEnd: createExtendedEventHook(),
    paneScroll: createExtendedEventHook(),
    paneClick: createExtendedEventHook(),
    paneContextMenu: createExtendedEventHook(),
    paneMouseEnter: createExtendedEventHook(),
    paneMouseMove: createExtendedEventHook(),
    paneMouseLeave: createExtendedEventHook(),
    edgeContextMenu: createExtendedEventHook(),
    edgeMouseEnter: createExtendedEventHook(),
    edgeMouseMove: createExtendedEventHook(),
    edgeMouseLeave: createExtendedEventHook(),
    edgeDoubleClick: createExtendedEventHook(),
    edgeClick: createExtendedEventHook(),
    edgeUpdateStart: createExtendedEventHook(),
    edgeUpdate: createExtendedEventHook(),
    edgeUpdateEnd: createExtendedEventHook(),
    updateNodeInternals: createExtendedEventHook(),
    error: createExtendedEventHook((err) => warn(err.message)),
  }
}

export function useHooks(emit: (...args: any[]) => void, hooks: Ref<FlowHooks>) {
  const inst = getCurrentInstance()

  onBeforeMount(() => {
    for (const [key, value] of Object.entries(hooks.value)) {
      const listener = (data: unknown) => {
        emit(key, data)
      }

      // push into fns instead of using `on` to avoid overwriting default handlers - the emitter should be called in addition to the default handlers
      value.setEmitter(listener)
      tryOnScopeDispose(value.removeEmitter)

      value.setHasEmitListeners(() => hasVNodeListener(key as keyof FlowEvents))
      tryOnScopeDispose(value.removeHasEmitListeners)
    }
  })

  function hasVNodeListener(event: keyof FlowEvents) {
    const key = toHandlerKey(event)
    // listeners live on vnode.props; value can be a Function or an array of Functions
    const h = inst?.vnode.props?.[key]
    return !!h
  }
}

/**
 * Converts an event name to the corresponding handler key.
 * E.g. 'nodeClick' -> 'onNodeClick'
 *
 * @param event The event name to convert.
 * @returns The corresponding handler key.
 */
function toHandlerKey(event: string) {
  const [head, ...rest] = event.split(':')
  const camel = head.replace(/(?:^|-)(\w)/g, (_, c: string) => c.toUpperCase())
  return `on${camel}${rest.length ? `:${rest.join(':')}` : ''}`
}
