import {
  CreatePositionChangeParams,
  EdgeChange,
  FlowElement,
  FlowElements,
  GraphNode,
  NodeChange,
  NodeDimensionChange,
  SelectionChange,
} from '~/types'
import { clampPosition, isGraphNode } from '~/utils/graph'

export const applyChanges = <
  T extends FlowElement = GraphNode,
  C extends NodeChange = T extends GraphNode ? NodeChange : EdgeChange,
>(
  changes: C[],
  elements: T[],
): T[] => {
  let elementIds = elements.map((el) => el.id)
  changes.forEach((change) => {
    const i = elementIds.indexOf(change.id)
    const el = elements[i]
    if (el) {
      switch (change.type) {
        case 'select':
          el.selected = change.selected
          break
        case 'dimensions':
          if (isGraphNode(el)) {
            if (typeof change.dimensions !== 'undefined') el.dimensions = change.dimensions
            if (typeof change.position !== 'undefined') el.position = change.position
            if (typeof change.dragging !== 'undefined') el.dragging = change.dragging
          }
          break
        case 'remove':
          elements.splice(i, 1)
          elementIds = elements.map((el) => el.id)
          break
      }
    }
  })

  return elements
}

export const createSelectionChange = (id: string, selected: boolean): SelectionChange => ({
  id,
  type: 'select',
  selected,
})

export const createPositionChange = ({ node, diff, dragging, nodeExtent }: CreatePositionChangeParams): NodeDimensionChange => {
  const change: NodeDimensionChange = {
    id: node.id,
    type: 'dimensions',
    dragging: !!dragging,
    handleBounds: node.handleBounds,
  }

  if (diff) {
    const nextPosition = { x: node.position.x + diff.x, y: node.position.y + diff.y }
    let currentExtent = nodeExtent || node.extent

    if (node.extent === 'parent' && node.parentNode && node.dimensions.width && node.dimensions.height) {
      currentExtent =
        node.parentNode?.dimensions.width && node.parentNode?.dimensions.height
          ? [
              [0, 0],
              [
                node.parentNode.dimensions.width - node.dimensions.width,
                node.parentNode.dimensions.height - node.dimensions.height,
              ],
            ]
          : currentExtent
    }

    change.position = currentExtent ? clampPosition(nextPosition, currentExtent) : nextPosition
  }

  return change
}

export const getSelectionChanges = (items: FlowElements, selectedIds: string[]) => {
  return items.reduce((res, item) => {
    const willBeSelected =
      selectedIds.includes(item.id) || !!(isGraphNode(item) && item.parentNode && selectedIds.includes(item.parentNode?.id))

    if (!item.selected && willBeSelected) {
      res.push(createSelectionChange(item.id, true))
    } else if (item.selected && !willBeSelected) {
      res.push(createSelectionChange(item.id, false))
    }

    return res
  }, [] as SelectionChange[])
}
