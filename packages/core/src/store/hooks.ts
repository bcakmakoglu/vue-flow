import { tryOnScopeDispose } from '@vueuse/core'
import type { Ref } from 'vue'
import { onBeforeMount } from 'vue'
import type { FlowHooks } from '../types'
import { createExtendedEventHook, warn } from '../utils'

// flow event hooks
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

export function useHooks(emit: (...args: unknown[]) => void, hooks: Ref<FlowHooks>) {
  onBeforeMount(() => {
    for (const [key, value] of Object.entries(hooks.value)) {
      // push into fns instead of using `on` to avoid overwriting default handlers - the emits should be called in addition to the default handlers
      value.setEmitter((data) => {
        emit(key, data)
      })

      tryOnScopeDispose(() => {
        value.removeEmitter()
      })
    }
  })
}
