import {
  Connection,
  Edge,
  Elements,
  EmitFunc,
  FlowHooks,
  FlowTransform,
  Node,
  OnConnectStartParams,
  FlowInstance,
} from '../types'
import { Hooks } from '../context'

// flow event hooks
const hooks = (): FlowHooks => {
  return {
    elementClick: createEventHook<{ event: MouseEvent; element: Node | Edge }>(),
    elementsRemove: createEventHook<Elements>(),
    nodeDoubleClick: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeClick: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeMouseEnter: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeMouseMove: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeMouseLeave: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeContextMenu: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeDragStart: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeDrag: createEventHook<{ event: MouseEvent; node: Node }>(),
    nodeDragStop: createEventHook<{ event: MouseEvent; node: Node }>(),
    connect: createEventHook<Connection>(),
    connectStart: createEventHook<{
      event: MouseEvent
      params: OnConnectStartParams
    }>(),
    connectStop: createEventHook<MouseEvent>(),
    connectEnd: createEventHook<MouseEvent>(),
    load: createEventHook<FlowInstance>(),
    move: createEventHook<FlowTransform | undefined>(),
    moveStart: createEventHook<FlowTransform | undefined>(),
    moveEnd: createEventHook<FlowTransform | undefined>(),
    selectionChange: createEventHook<Elements | null>(),
    selectionDragStart: createEventHook<{ event: MouseEvent; nodes: Node[] }>(),
    selectionDrag: createEventHook<{ event: MouseEvent; nodes: Node[] }>(),
    selectionDragStop: createEventHook<{ event: MouseEvent; nodes: Node[] }>(),
    selectionContextMenu: createEventHook<{ event: MouseEvent; nodes: Node[] }>(),
    paneScroll: createEventHook<WheelEvent | undefined>(),
    paneClick: createEventHook<MouseEvent>(),
    paneContextMenu: createEventHook<MouseEvent>(),
    edgeUpdate: createEventHook<{ edge: Edge; connection: Connection }>(),
    edgeContextMenu: createEventHook<{ event: MouseEvent; edge: Edge }>(),
    edgeMouseEnter: createEventHook<{ event: MouseEvent; edge: Edge }>(),
    edgeMouseMove: createEventHook<{ event: MouseEvent; edge: Edge }>(),
    edgeMouseLeave: createEventHook<{ event: MouseEvent; edge: Edge }>(),
    edgeDoubleClick: createEventHook<{ event: MouseEvent; edge: Edge }>(),
    edgeClick: createEventHook<{ event: MouseEvent; edge: Edge }>(),
    edgeUpdateStart: createEventHook<{ event: MouseEvent; edge: Edge }>(),
    edgeUpdateEnd: createEventHook<{ event: MouseEvent; edge: Edge }>(),
  }
}
export const createHooks = (): FlowHooks & { bind: (emit: EmitFunc) => FlowHooks } => {
  const eventHooks = hooks()
  const bind = (emit: EmitFunc) => {
    for (const [key, value] of Object.entries(eventHooks)) {
      value.on((data: unknown) => {
        emit(key as keyof FlowHooks, data)
      })
    }

    return eventHooks
  }

  return {
    ...eventHooks,
    bind,
  }
}

export default (emit?: EmitFunc) => {
  let hooks = inject(Hooks)!
  if (!hooks) {
    console.warn('hooks context not found; creating default hooks')
    if (!emit) console.error('no emit function found for hook context.')
    else {
      hooks = createHooks().bind(emit)
      provide(Hooks, hooks)
    }
  }

  return hooks
}
