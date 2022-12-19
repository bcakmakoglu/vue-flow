import { isFunction, isString } from '@vueuse/core'
import type {
  Edge,
  EdgeAddChange,
  EdgeChange,
  EdgeRemoveChange,
  EdgeSelectionChange,
  ElementChange,
  FlowElement,
  FlowElements,
  GraphEdge,
  GraphNode,
  Node,
  NodeAddChange,
  NodeChange,
  NodeRemoveChange,
  NodeSelectionChange,
} from '~/types'

function handleParentExpand(updateItem: GraphNode, parent: GraphNode) {
  if (parent) {
    const extendWidth = updateItem.position.x + updateItem.dimensions.width - parent.dimensions.width
    const extendHeight = updateItem.position.y + updateItem.dimensions.height - parent.dimensions.height

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      if (!parent.style) parent.style = {}
      else if (isFunction(parent.style)) parent.style = { ...parent.style(parent) }

      parent.style.width = parent.style.width ?? parent.dimensions.width
      parent.style.height = parent.style.height ?? parent.dimensions.height

      if (extendWidth > 0) {
        if (isString(parent.style.width)) {
          const currWidth = Number(parent.style.width.replace('px', ''))
          parent.style.width = `${currWidth + extendWidth}px`
        } else {
          parent.style.width += extendWidth
        }
      }

      if (extendHeight > 0) {
        if (isString(parent.style.height)) {
          const currWidth = Number(parent.style.height.replace('px', ''))
          parent.style.height = `${currWidth + extendHeight}px`
        } else {
          parent.style.height += extendHeight
        }
      }

      if (updateItem.position.x < 0) {
        const xDiff = Math.abs(updateItem.position.x)
        parent.position.x = parent.position.x - xDiff

        if (isString(parent.style.width)) {
          const currWidth = Number(parent.style.width.replace('px', ''))
          parent.style.width = `${currWidth + xDiff}px`
        } else {
          parent.style.width += xDiff
        }

        updateItem.position.x = 0
      }

      if (updateItem.position.y < 0) {
        const yDiff = Math.abs(updateItem.position.y)
        parent.position.y = parent.position.y - yDiff

        if (isString(parent.style.height)) {
          const currWidth = Number(parent.style.height.replace('px', ''))
          parent.style.height = `${currWidth + yDiff}px`
        } else {
          parent.style.height += yDiff
        }

        updateItem.position.y = 0
      }

      parent.dimensions.width = Number(parent.style.width.toString().replace('px', ''))
      parent.dimensions.height = Number(parent.style.height.toString().replace('px', ''))
    }
  }
}

export const applyChanges = <
  T extends Node | Edge | FlowElement = Node,
  C extends ElementChange = T extends GraphNode ? NodeChange : EdgeChange,
>(
  changes: C[],
  elements: T[],
): T[] => {
  const addRemoveChanges = changes.filter((c) => c.type === 'add' || c.type === 'remove') as (
    | NodeAddChange
    | EdgeAddChange
    | NodeRemoveChange
    | EdgeRemoveChange
  )[]
  addRemoveChanges.forEach((change) => {
    switch (change.type) {
      case 'add':
        elements.push(<T>change.item)
        break
      case 'remove':
        elements.splice(
          elements.findIndex((el) => el.id === change.id),
          1,
        )
        break
    }
  })

  const elementIds = elements.map((el) => el.id)

  elements.forEach((element) => {
    const currentChanges = changes.filter((c) => (<any>c).id === element.id)

    for (const currentChange of currentChanges) {
      switch (currentChange.type) {
        case 'select':
          ;(element as FlowElement).selected = currentChange.selected
          break
        case 'position':
          if (isGraphNode(element)) {
            if (typeof currentChange.position !== 'undefined') element.position = currentChange.position

            if (typeof currentChange.dragging !== 'undefined') element.dragging = currentChange.dragging

            if (element.expandParent && element.parentNode) {
              const parent = elements[elementIds.indexOf(element.parentNode)]

              if (parent && isGraphNode(parent)) {
                handleParentExpand(element, parent)
              }
            }
          }
          break
        case 'dimensions':
          if (isGraphNode(element)) {
            if (typeof currentChange.dimensions !== 'undefined') element.dimensions = currentChange.dimensions

            if (typeof currentChange.updateStyle !== 'undefined') {
              element.style = {
                ...(element.style || {}),
                width: `${currentChange.dimensions?.width}px`,
                height: `${currentChange.dimensions?.height}px`,
              }
            }

            if (typeof currentChange.resizing === 'boolean') element.resizing = currentChange.resizing

            if (element.expandParent && element.parentNode) {
              const parent = elements[elementIds.indexOf(element.parentNode)]

              if (parent && isGraphNode(parent)) {
                handleParentExpand(element, parent)
              }
            }
          }
          break
      }
    }
  })

  return elements
}

export const applyEdgeChanges = (changes: EdgeChange[], edges: GraphEdge[]) => applyChanges(changes, edges)
export const applyNodeChanges = (changes: NodeChange[], nodes: GraphNode[]) => applyChanges(changes, nodes)

export const createSelectionChange = (id: string, selected: boolean): NodeSelectionChange | EdgeSelectionChange => ({
  id,
  type: 'select',
  selected,
})

export const createAdditionChange = <
  T extends GraphNode | GraphEdge = GraphNode,
  C extends NodeAddChange | EdgeAddChange = T extends GraphNode ? NodeAddChange : EdgeAddChange,
>(
  item: T,
): C =>
  <C>{
    item,
    type: 'add',
  }

export const createRemoveChange = (id: string): NodeRemoveChange | EdgeRemoveChange => ({
  id,
  type: 'remove',
})

export const getSelectionChanges = (elements: FlowElements, selectedIds: string[]) => {
  return elements.reduce(
    (res, item) => {
      const willBeSelected = selectedIds.includes(item.id)
      const key = isGraphNode(item) ? 'changedNodes' : 'changedEdges'

      if (!item.selected && willBeSelected) {
        res[key].push(createSelectionChange(item.id, true))
      } else if (item.selected && !willBeSelected) {
        res[key].push(createSelectionChange(item.id, false))
      }

      return res
    },
    { changedNodes: [], changedEdges: [] } as { changedNodes: NodeSelectionChange[]; changedEdges: EdgeSelectionChange[] },
  )
}
