import type { Ref } from 'vue'
import { clampPosition, isParentSelected } from './graph'
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
    .map((n) => ({
      id: n.id,
      position: n.computedPosition || { x: 0, y: 0, z: 0 },
      distance: {
        x: mousePos.x - n.computedPosition?.x || 0,
        y: mousePos.y - n.computedPosition?.y || 0,
      },
      extent: n.extent,
      parentNode: n.parentNode,
      dimensions: n.dimensions,
    }))
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

export function updatePosition(
  dragItem: NodeDragItem,
  mousePos: XYPosition,
  parent?: GraphNode,
  nodeExtent?: CoordinateExtent,
): NodeDragItem {
  let currentExtent = dragItem.extent || nodeExtent
  const nextPosition = { x: mousePos.x - dragItem.distance.x, y: mousePos.y - dragItem.distance.y }

  if (dragItem.extent === 'parent' && parent) {
    if (dragItem.parentNode && dragItem.dimensions.width && dragItem.dimensions.height) {
      currentExtent =
        parent.computedPosition && parent.dimensions.width && parent.dimensions.height
          ? [
              [parent.computedPosition.x, parent.computedPosition.y],
              [
                parent.computedPosition.x + parent.dimensions.width - dragItem.dimensions.width,
                parent.computedPosition.y + parent.dimensions.height - dragItem.dimensions.height,
              ],
            ]
          : currentExtent
    }
  } else {
    currentExtent = nodeExtent
  }

  dragItem.position = currentExtent ? clampPosition(nextPosition, currentExtent as CoordinateExtent) : nextPosition

  return dragItem
}
