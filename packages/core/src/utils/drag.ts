import type { Ref } from 'vue'
import { isNumber } from '@vueuse/shared'
import type {
  ComputedGetters,
  CoordinateExtent,
  ExtendedParentExtent,
  Getters,
  GraphNode,
  NodeDragItem,
  XYPosition,
} from '~/types'

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
        position: n.position || { x: 0, y: 0 },
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

function getExtentPadding(padding: number[]) {
  switch (padding.length) {
    case 1:
      return [padding[0], padding[0], padding[0], padding[0]]
    case 2:
      return [padding[0], padding[1], padding[0], padding[1]]
    case 3:
      return [padding[0], padding[1], padding[2], padding[1]]
    default:
      return padding || [0, 0, 0, 0]
  }
}

function getParentExtent(
  currentExtent: ExtendedParentExtent | 'parent',
  node: GraphNode | NodeDragItem,
  parent: GraphNode,
): CoordinateExtent | false {
  const [top, right, bottom, left] = typeof currentExtent !== 'string' ? getExtentPadding(currentExtent.padding) : [0, 0, 0, 0]

  if (
    parent &&
    isNumber(parent.computedPosition.x) &&
    isNumber(parent.computedPosition.y) &&
    isNumber(parent.dimensions.width) &&
    isNumber(parent.dimensions.height)
  ) {
    return [
      [parent.computedPosition.x + left, parent.computedPosition.y + top],
      [
        parent.computedPosition.x + (parent.dimensions.width - node.dimensions.width) - right,
        parent.computedPosition.y + (parent.dimensions.height - node.dimensions.height) - bottom,
      ],
    ]
  }

  return false
}

export function getExtent<T extends NodeDragItem | GraphNode>(item: T, extent?: CoordinateExtent, parent?: GraphNode) {
  let currentExtent = item.extent || extent

  if (item.extent === 'parent' || (!Array.isArray(item.extent) && item.extent?.range === 'parent')) {
    if (item.parentNode && parent && item.dimensions.width && item.dimensions.height) {
      const parentExtent = getParentExtent(item.extent, item, parent)

      if (parentExtent) {
        currentExtent = parentExtent
      }
    } else {
      warn('Only child nodes can use a parent extent.')

      currentExtent = extent
    }
  } else if (Array.isArray(item.extent) && item.extent && parent) {
    const parentX = parent.computedPosition.x
    const parentY = parent.computedPosition.y

    currentExtent = [
      [item.extent[0][0] + parentX, item.extent[0][1] + parentY],
      [item.extent[1][0] + parentX, item.extent[1][1] + parentY],
    ]
  }

  return currentExtent as CoordinateExtent
}
export const calcNextPosition = (
  node: GraphNode | NodeDragItem,
  nextPosition: XYPosition,
  nodeExtent?: CoordinateExtent,
  parentNode?: GraphNode,
) => {
  const extent = getExtent(node, nodeExtent, parentNode)

  const clampedPos = clampPosition(nextPosition, extent)

  return {
    position: clampedPos,
  }
}
