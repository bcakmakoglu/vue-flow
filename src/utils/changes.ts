import {
  CreatePositionChangeParams,
  EdgeChange,
  EdgeSelectionChange,
  ElementChange,
  FlowElement,
  FlowElements,
  GraphNode,
  NodeChange,
  NodeSelectionChange,
  NodePositionChange,
} from '~/types'
import { clampPosition, isGraphNode } from '~/utils/graph'

function handleParentExpand(parent: GraphNode, updateItem: GraphNode) {
  if (parent) {
    const extendWidth = updateItem.position.x + updateItem.dimensions.width - parent.dimensions.width
    const extendHeight = updateItem.position.y + updateItem.dimensions.height - parent.dimensions.height

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      parent.style = { ...parent.style } || {}

      if (extendWidth > 0) {
        if (!parent.style.width) {
          parent.style.width = parent.dimensions.width
        }
        ;(<number>parent.style.width) += extendWidth
      }

      if (extendHeight > 0) {
        if (!parent.style.height) {
          parent.style.height = parent.dimensions.height
        }
        ;(<number>parent.style.height) += extendHeight
      }

      if (updateItem.position.x < 0) {
        const xDiff = Math.abs(updateItem.position.x)
        parent.position.x = parent.position.x - xDiff
        ;(<number>parent.style.width) += xDiff
        updateItem.position.x = 0
      }

      if (updateItem.position.y < 0) {
        const yDiff = Math.abs(updateItem.position.y)
        parent.position.y = parent.position.y - yDiff
        ;(<number>parent.style.height) += yDiff
        updateItem.position.y = 0
      }

      parent.dimensions.width = <number>parent.style.width
      parent.dimensions.height = <number>parent.style.height
    }
  }
}

export const applyChanges = <
  T extends FlowElement = GraphNode,
  C extends ElementChange = T extends GraphNode ? NodeChange : EdgeChange,
>(
  changes: C[],
  elements: T[],
): T[] => {
  let elementIds = elements.map((el) => el.id)
  changes.forEach((change) => {
    if (change.type === 'add') return elements.push(change.item as any)
    const i = elementIds.indexOf((<any>change).id)
    const el = elements[i]
    switch (change.type) {
      case 'select':
        el.selected = change.selected
        break
      case 'position':
        if (isGraphNode(el)) {
          if (typeof change.position !== 'undefined') el.position = change.position
          if (typeof change.dragging !== 'undefined') el.dragging = change.dragging
          if (el.expandParent && el.parentNode) handleParentExpand(el, el.parentNode)
        }
        break
      case 'dimensions':
        if (isGraphNode(el)) {
          if (typeof change.dimensions !== 'undefined') el.dimensions = change.dimensions
          if (el.expandParent && el.parentNode) handleParentExpand(el, el.parentNode)
        }
        break
      case 'remove':
        elements.splice(i, 1)
        elementIds = elements.map((el) => el.id)
        break
    }
  })

  return elements
}

export const createSelectionChange = (id: string, selected: boolean): NodeSelectionChange | EdgeSelectionChange => ({
  id,
  type: 'select',
  selected,
})

export const createPositionChange = ({ node, diff, dragging, nodeExtent }: CreatePositionChangeParams): NodePositionChange => {
  const change: NodePositionChange = {
    id: node.id,
    type: 'position',
    dragging: !!dragging,
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

const isParentSelected = (node: GraphNode, selectedIds: string[]): boolean => {
  if (!node.parentNode) return false
  if (selectedIds.includes(node.parentNode.id)) return true
  return isParentSelected(node.parentNode, selectedIds)
}

export const getSelectionChanges = (items: FlowElements, selectedIds: string[]) => {
  return items.reduce((res, item) => {
    const willBeSelected =
      selectedIds.includes(item.id) || !!(isGraphNode(item) && item.parentNode && isParentSelected(item, selectedIds))

    if (!item.selected && willBeSelected) {
      res.push(createSelectionChange(item.id, true))
    } else if (item.selected && !willBeSelected) {
      res.push(createSelectionChange(item.id, false))
    }

    return res
  }, [] as (NodeSelectionChange | EdgeSelectionChange)[])
}
