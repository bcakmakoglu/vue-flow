import type { GraphNode, NodeEventsEmit, NodeEventsOn, VueFlowStore } from '~/types'

const createNodeHooks = () => ({
  doubleClick: createEventHook(),
  click: createEventHook(),
  mouseEnter: createEventHook(),
  mouseMove: createEventHook(),
  mouseLeave: createEventHook(),
  contextMenu: createEventHook(),
  dragStart: createEventHook(),
  drag: createEventHook(),
  dragStop: createEventHook(),
})

export default function useNodeHooks(node: GraphNode, emits: VueFlowStore['emits']): { emit: NodeEventsEmit; on: NodeEventsOn } {
  const nodeHooks = createNodeHooks()

  nodeHooks.doubleClick.on((event) => {
    emits.nodeDoubleClick(event)
    node.events?.doubleClick?.(event)
  })

  nodeHooks.click.on((event) => {
    emits.nodeClick(event)
    node.events?.click?.(event)
  })

  nodeHooks.mouseEnter.on((event) => {
    emits.nodeMouseEnter(event)
    node.events?.mouseEnter?.(event)
  })

  nodeHooks.mouseMove.on((event) => {
    emits.nodeMouseMove(event)
    node.events?.mouseMove?.(event)
  })

  nodeHooks.mouseLeave.on((event) => {
    emits.nodeMouseLeave(event)
    node.events?.mouseLeave?.(event)
  })

  nodeHooks.contextMenu.on((event) => {
    emits.nodeContextMenu(event)
    node.events?.contextMenu?.(event)
  })

  nodeHooks.dragStart.on((event) => {
    emits.nodeDragStart(event)
    node.events?.dragStart?.(event)
  })

  nodeHooks.drag.on((event) => {
    emits.nodeDrag(event)
    node.events?.drag?.(event)
  })

  nodeHooks.dragStop.on((event) => {
    emits.nodeDragStop(event)
    node.events?.dragStop?.(event)
  })

  return Object.entries(nodeHooks).reduce(
    (hooks, [key, value]) => {
      hooks.emit[key as keyof NodeEventsEmit] = value.trigger
      hooks.on[key as keyof NodeEventsOn] = value.on
      return hooks
    },
    { emit: {} as NodeEventsEmit, on: {} as NodeEventsOn },
  )
}
