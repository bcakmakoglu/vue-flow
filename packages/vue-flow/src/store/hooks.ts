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
  miniMapNodeClick: createEventHook(),
  miniMapNodeDoubleClick: createEventHook(),
  miniMapNodeMouseEnter: createEventHook(),
  miniMapNodeMouseMove: createEventHook(),
  miniMapNodeMouseLeave: createEventHook(),
  connect: createEventHook(),
  connectStart: createEventHook(),
  connectStop: createEventHook(),
  connectEnd: createEventHook(),
  paneReady: createEventHook(),
  move: createEventHook(),
  moveStart: createEventHook(),
  moveEnd: createEventHook(),
  selectionDragStart: createEventHook(),
  selectionDrag: createEventHook(),
  selectionDragStop: createEventHook(),
  selectionContextMenu: createEventHook(),
  paneScroll: createEventHook(),
  paneClick: createEventHook(),
  paneContextMenu: createEventHook(),
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

const bind = (emit: Emits, hooks: FlowHooks) => {
  for (const [key, value] of Object.entries(hooks)) {
    const listener = (data: any) => {
      emit(key as any, data)
    }

    value.on(listener)

    tryOnScopeDispose(() => {
      value.off(listener)
    })
  }
}

export default (emit: Emits, hooks: FlowHooks) => bind(emit, hooks)
