import { EmitFunc, FlowHooks, FlowEvents, FlowStore } from '~/types'

// flow event hooks
export const createHooks = (): FlowHooks => ({
  edgesChange: createEventHook(),
  nodesChange: createEventHook(),
  elementClick: createEventHook(),
  nodeDoubleClick: createEventHook(),
  nodeClick: createEventHook(),
  nodeMouseEnter: createEventHook(),
  nodeMouseMove: createEventHook(),
  nodeMouseLeave: createEventHook(),
  nodeContextMenu: createEventHook(),
  nodeDragStart: createEventHook(),
  nodeDrag: createEventHook(),
  nodeDragStop: createEventHook(),
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
})

const bind = (emit: EmitFunc, hooks: FlowHooks) => {
  for (const [key, value] of Object.entries(hooks)) {
    value.on((data: FlowEvents[keyof FlowHooks]) => {
      emit(key as keyof FlowHooks, data)
    })
  }
}

export default (store: FlowStore, emit: EmitFunc) => bind(emit, store.hooks)
