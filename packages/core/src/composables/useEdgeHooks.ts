import type { EdgeEventsEmit, EdgeEventsOn, GraphEdge, VueFlowStore } from '~/types'

const createEdgeHooks = () => ({
  doubleClick: createEventHook(),
  click: createEventHook(),
  mouseEnter: createEventHook(),
  mouseMove: createEventHook(),
  mouseLeave: createEventHook(),
  contextMenu: createEventHook(),
  updateStart: createEventHook(),
  update: createEventHook(),
  updateEnd: createEventHook(),
})

export default function useEdgeHooks(edge: GraphEdge, emits: VueFlowStore['emits']): { emit: EdgeEventsEmit; on: EdgeEventsOn } {
  const edgeHooks = createEdgeHooks()

  edgeHooks.doubleClick.on((event) => {
    emits.edgeDoubleClick(event)
    edge.events.doubleClick?.(event)
  })

  edgeHooks.click.on((event) => {
    emits.edgeClick(event)
    edge.events.click?.(event)
  })

  edgeHooks.mouseEnter.on((event) => {
    emits.edgeMouseEnter(event)
    edge.events.mouseEnter?.(event)
  })

  edgeHooks.mouseMove.on((event) => {
    emits.edgeMouseMove(event)
    edge.events.mouseMove?.(event)
  })

  edgeHooks.mouseLeave.on((event) => {
    emits.edgeMouseLeave(event)
    edge.events.mouseLeave?.(event)
  })

  edgeHooks.contextMenu.on((event) => {
    emits.edgeContextMenu(event)
    edge.events.contextMenu?.(event)
  })

  edgeHooks.updateStart.on((event) => {
    emits.edgeUpdateStart(event)
    edge.events.updateStart?.(event)
  })

  edgeHooks.update.on((event) => {
    emits.edgeUpdate(event)
    edge.events.update?.(event)
  })

  edgeHooks.updateEnd.on((event) => {
    emits.edgeUpdateEnd(event)
    edge.events.updateEnd?.(event)
  })

  return Object.entries(edgeHooks).reduce(
    (hooks, [key, value]) => {
      hooks.emit[key as keyof EdgeEventsEmit] = value.trigger
      hooks.on[key as keyof EdgeEventsOn] = value.on

      return hooks
    },
    { emit: {} as EdgeEventsEmit, on: {} as EdgeEventsOn },
  )
}
