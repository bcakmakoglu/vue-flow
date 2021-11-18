import useStore from './useStore'
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
  FlowEvents,
} from '~/types'
import { Hooks } from '~/context'

// flow event hooks
export const createHooks = (): FlowHooks => {
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
    edgeUpdateEnd: createEventHook<MouseEvent>(),
  }
}

const bind = (emit: EmitFunc, hooks: FlowHooks) => {
  for (const [key, value] of Object.entries(hooks)) {
    value.on((data: FlowEvents[keyof FlowHooks]) => {
      emit(key as keyof FlowHooks, data)
    })
  }
}

export default (emit?: EmitFunc) => {
  let hooks = inject(Hooks)!
  if (!hooks) {
    const store = useStore()
    if (import.meta.env.DEV) console.warn('hooks context not found; creating default hooks')
    hooks = store.hooks
    if (typeof emit === 'function') bind(emit, hooks)
    provide(Hooks, hooks)
  }

  return hooks
}
