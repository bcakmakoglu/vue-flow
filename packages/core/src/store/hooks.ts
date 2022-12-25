import type { Ref } from 'vue'
import type { Emits, FlowHooks } from '~/types'

// flow event hooks
export const createHooks = (): FlowHooks => ({
  edgesChange: createEventHook(),
  nodesChange: createEventHook(),
  nodeDoubleClick: createEventHook(),
  nodeClick: createEventHook(),
  nodeMouseEnter: createEventHook(),
  nodeMouseMove: createEventHook(),
  nodeMouseLeave: createEventHook(),
  nodeContextMenu: createEventHook(),
  nodeDragStart: createEventHook(),
  nodeDrag: createEventHook(),
  nodeDragStop: createEventHook(),
  nodesInitialized: createEventHook(),
  miniMapNodeClick: createEventHook(),
  miniMapNodeDoubleClick: createEventHook(),
  miniMapNodeMouseEnter: createEventHook(),
  miniMapNodeMouseMove: createEventHook(),
  miniMapNodeMouseLeave: createEventHook(),
  connect: createEventHook(),
  connectStart: createEventHook(),
  connectEnd: createEventHook(),
  paneReady: createEventHook(),
  move: createEventHook(),
  moveStart: createEventHook(),
  moveEnd: createEventHook(),
  selectionDragStart: createEventHook(),
  selectionDrag: createEventHook(),
  selectionDragStop: createEventHook(),
  selectionContextMenu: createEventHook(),
  selectionStart: createEventHook(),
  selectionEnd: createEventHook(),
  viewportChangeStart: createEventHook(),
  viewportChange: createEventHook(),
  viewportChangeEnd: createEventHook(),
  paneScroll: createEventHook(),
  paneClick: createEventHook(),
  paneContextMenu: createEventHook(),
  paneMouseEnter: createEventHook(),
  paneMouseMove: createEventHook(),
  paneMouseLeave: createEventHook(),
  edgeContextMenu: createEventHook(),
  edgeMouseEnter: createEventHook(),
  edgeMouseMove: createEventHook(),
  edgeMouseLeave: createEventHook(),
  edgeDoubleClick: createEventHook(),
  edgeClick: createEventHook(),
  edgeUpdateStart: createEventHook(),
  edgeUpdate: createEventHook(),
  edgeUpdateEnd: createEventHook(),
  updateNodeInternals: createEventHook(),
})

type EventKey = keyof FlowHooks & 'update:edges' & 'updateNodes' & 'update:modelValue'

export function useHooks(emit: Emits, hooks: Ref<FlowHooks>) {
  onBeforeMount(() => {
    for (const [key, value] of Object.entries(hooks.value)) {
      const listener = (data: any) => {
        emit(key as EventKey, data)
      }

      value.on(listener)

      tryOnScopeDispose(() => {
        value.off(listener)
      })
    }
  })
}
