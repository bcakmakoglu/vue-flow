import type { Ref } from 'vue'
import { isNumber } from '@vueuse/shared'
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
  let currentExtent = item.extent || extent

  if (item.extent === 'parent') {
    if (item.parentNode && parent && item.dimensions.width && item.dimensions.height) {
      currentExtent =
        parent &&
        isNumber(parent.computedPosition.x) &&
        isNumber(parent.computedPosition.y) &&
        isNumber(parent.dimensions.width) &&
        isNumber(parent.dimensions.height)
          ? [
              [parent.computedPosition.x, parent.computedPosition.y],
              [
                parent.computedPosition.x + parent.dimensions.width - item.dimensions.width,
                parent.computedPosition.y + parent.dimensions.height - item.dimensions.height,
              ],
            ]
          : currentExtent
    } else {
      warn('Only child nodes can use a parent extent.')

      currentExtent = extent
    }
  } else if (item.extent && parent) {
    const parentX = parent.computedPosition.x
    const parentY = parent.computedPosition.y

    currentExtent = [
      [item.extent[0][0] + parentX, item.extent[0][1] + parentY],
      [item.extent[1][0] + parentX, item.extent[1][1] + parentY],
    ]
  }

  return currentExtent as CoordinateExtent
}
