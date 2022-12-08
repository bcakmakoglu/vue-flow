import type { Ref } from 'vue'
import type { ComputedGetters, CoordinateExtent, Getters, GraphNode, NodeDragItem, XYPosition } from '~/types'

export function hasSelector(target: Element, selector: string, node: Ref<Element>): boolean {
  let current = target

  do {
    if (current && current.matches(selector)) return true
    else if (current === node.value) return false

    current = current.parentElement as Element
  } while (current)

  return false
}

export function getDragItems(
  nodes: GraphNode[],
  mousePos: XYPosition,
  getNode: Getters['getNode'],
  nodeId?: string,
): NodeDragItem[] {
  return nodes
    .filter((n) => (n.selected || n.id === nodeId) && (!n.parentNode || !isParentSelected(n, getNode)))
    .map((n) =>
      markRaw({
        id: n.id,
        position: n.computedPosition || { x: 0, y: 0, z: 0 },
        distance: {
          x: mousePos.x - n.computedPosition?.x || 0,
          y: mousePos.y - n.computedPosition?.y || 0,
        },
        from: n.computedPosition,
        extent: n.extent,
        parentNode: n.parentNode,
        dimensions: n.dimensions,
      }),
    )
}

export function getEventHandlerParams({
  id,
  dragItems,
  getNode,
}: {
  id?: string
  dragItems: NodeDragItem[]
  getNode: ComputedGetters['getNode']
}): [GraphNode, GraphNode[]] {
  const extendedDragItems: GraphNode[] = dragItems.map((n) => {
    const node = getNode.value(n.id)!

    return {
      ...node,
    }
  })

  return [id ? extendedDragItems.find((n) => n.id === id)! : extendedDragItems[0], extendedDragItems]
}

export function applyExtent<T extends NodeDragItem | GraphNode>(item: T, extent?: CoordinateExtent, parent?: GraphNode) {
  const currentExtent = item.extent ?? extent
  let nextExtent = currentExtent

  if (currentExtent === 'parent' && parent) {
    nextExtent = [
      [parent.computedPosition.x, parent.computedPosition.y],
      [
        parent.computedPosition.x + parent.dimensions.width - item.dimensions.width,
        parent.computedPosition.y + parent.dimensions.height - item.dimensions.height,
      ],
    ]
  } else if (currentExtent !== 'parent' && currentExtent && parent) {
    const itemExtent = currentExtent
    const parentX = parent.computedPosition.x
    const parentY = parent.computedPosition.y

    nextExtent = [
      [itemExtent[0][0] + parentX, itemExtent[0][1] + parentY],
      [itemExtent[1][0] + parentX, itemExtent[1][1] + parentY],
    ]
  }

  return nextExtent as CoordinateExtent
}
