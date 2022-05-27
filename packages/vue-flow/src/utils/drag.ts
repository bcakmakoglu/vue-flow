import type { Ref } from 'vue'
import { clampPosition, isParentSelected } from './graph'
import type { CoordinateExtent, Getters, GraphNode, NodeDragItem, XYPosition } from '~/types'

export function getParentNodePosition(parent?: GraphNode): XYPosition {
  return {
    x: parent?.computedPosition?.x || 0,
    y: parent?.computedPosition?.y || 0,
  }
}

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
      position: n.position,
      distance: {
        x: mousePos.x - n.position.x,
        y: mousePos.y - n.position.y,
      },
      delta: {
        x: 0,
        y: 0,
      },
      extent: n.extent,
      parentNode: n.parentNode,
      dimensions: n.dimensions,
    }))
}

export function getEventHandlerParams({
  id,
  dragItems,
  node,
}: {
  id?: string
  dragItems: NodeDragItem[]
  node: GraphNode
}): [GraphNode, GraphNode[]] {
  const extendedDragItems: GraphNode[] = dragItems.map((n) => {
    return {
      ...node,
      position: n.position,
      computedPosition: {
        x: (node.computedPosition?.x || 0) + n.delta.x,
        y: (node.computedPosition?.y || 0) + n.delta.y,
        z: node.computedPosition.z,
      },
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
  let nextPosition = { x: mousePos.x - dragItem.distance.x, y: mousePos.y - dragItem.distance.y }

  if (dragItem.extent === 'parent' && parent) {
    if (dragItem.parentNode && dragItem.dimensions.width && dragItem.dimensions.height) {
      currentExtent =
        parent.dimensions.width && parent.dimensions.height
          ? [
              [0, 0],
              [parent.dimensions.width - dragItem.dimensions.width, parent.dimensions.height - dragItem.dimensions.height],
            ]
          : currentExtent
    }
  } else {
    currentExtent = nodeExtent
  }

  nextPosition = currentExtent ? clampPosition(nextPosition, currentExtent as CoordinateExtent) : nextPosition

  dragItem.delta = {
    x: nextPosition.x - dragItem.position.x,
    y: nextPosition.y - dragItem.position.y,
  }
  dragItem.position = nextPosition

  return dragItem
}
