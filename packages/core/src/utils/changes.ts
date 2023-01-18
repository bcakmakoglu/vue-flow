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
  StyleFunc,
  Styles,
} from '~/types'

function handleParentExpand(updateItem: GraphNode, parent: GraphNode) {
  if (parent) {
    const extendWidth = updateItem.position.x + updateItem.dimensions.width - parent.dimensions.width
    const extendHeight = updateItem.position.y + updateItem.dimensions.height - parent.dimensions.height

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      let parentStyles: Styles = {}

      if (isFunction(parent.style)) parentStyles = { ...parent.style(parent) }
      else if (parent.style) parentStyles = { ...parent.style }

      parentStyles.width = parentStyles.width ?? `${parent.dimensions.width}px`
      parentStyles.height = parentStyles.height ?? `${parent.dimensions.height}px`

      if (extendWidth > 0) {
        if (isString(parentStyles.width)) {
          const currWidth = Number(parentStyles.width.replace('px', ''))
          parentStyles.width = `${currWidth + extendWidth}px`
        } else {
          parentStyles.width += extendWidth
        }
      }

      if (extendHeight > 0) {
        if (isString(parentStyles.height)) {
          const currWidth = Number(parentStyles.height.replace('px', ''))
          parentStyles.height = `${currWidth + extendHeight}px`
        } else {
          parentStyles.height += extendHeight
        }
      }

      if (updateItem.position.x < 0) {
        const xDiff = Math.abs(updateItem.position.x)
        parent.position.x = parent.position.x - xDiff

        if (isString(parentStyles.width)) {
          const currWidth = Number(parentStyles.width.replace('px', ''))
          parentStyles.width = `${currWidth + xDiff}px`
        } else {
          parentStyles.width += xDiff
        }

        updateItem.position.x = 0
      }

      if (updateItem.position.y < 0) {
        const yDiff = Math.abs(updateItem.position.y)
        parent.position.y = parent.position.y - yDiff

        if (isString(parentStyles.height)) {
          const currWidth = Number(parentStyles.height.replace('px', ''))
          parentStyles.height = `${currWidth + yDiff}px`
        } else {
          parentStyles.height += yDiff
        }

        updateItem.position.y = 0
      }

      parent.dimensions.width = Number(parentStyles.width.toString().replace('px', ''))
      parent.dimensions.height = Number(parentStyles.height.toString().replace('px', ''))

      if (isFunction(parent.style)) {
        parent.style = (p) => {
          const styleFunc = parent.style as StyleFunc

          return {
            ...styleFunc(p),
            ...parentStyles,
          }
        }
      } else {
        parent.style = {
          ...parent.style,
          ...parentStyles,
        }
      }
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
    if (change.type === 'add') {
      elements.push(<T>change.item)
    } else if (change.type === 'remove') {
      const index = elements.findIndex((el) => el.id === change.id)
      if (index !== -1) elements.splice(index, 1)
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

            if (typeof currentChange.resizing !== 'undefined') element.resizing = currentChange.resizing

            if (element.expandParent && element.parentNode) {
              const parent = elements[elementIds.indexOf(element.parentNode)]

              if (parent && isGraphNode(parent)) {
                if (!parent.initialized) {
                  nextTick(() => {
                    handleParentExpand(element, parent)
                  })
                } else {
                  handleParentExpand(element, parent)
                }
              }
            }

            if (!element.initialized) element.initialized = true
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
      let willBeSelected = selectedIds.includes(item.id)

      if (isDef(item.selectable) && !item.selectable) {
        willBeSelected = false
      }

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
