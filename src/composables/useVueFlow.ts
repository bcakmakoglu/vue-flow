import useHooks from './useHooks'
import {
  EdgeChange,
  EmitFunc,
  FlowOptions,
  FlowStore,
  NodeChange,
  UseVueFlow,
  FlowElements,
  FlowElement,
  GraphNode,
  GraphEdge,
} from '~/types'
import { useStore } from '~/store'
import { isGraphNode } from '~/utils'

const applyChanges = (changes: NodeChange[] | EdgeChange[], elements: FlowElements): FlowElements => {
  const initElements: FlowElements = []

  return elements.reduce((res: FlowElements, item: FlowElement) => {
    const currentChange = changes.find((c) => c.id === item.id)

    if (currentChange) {
      switch (currentChange.type) {
        case 'select': {
          res.push({ ...item, selected: currentChange.selected })
          return res
        }
        case 'dimensions': {
          const updateItem = { ...item }

          if (isGraphNode(updateItem)) {
            if (typeof currentChange.dimensions !== 'undefined') {
              updateItem.dimensions.width = currentChange.dimensions.width
              updateItem.dimensions.height = currentChange.dimensions.height
            }

            if (typeof currentChange.position !== 'undefined') {
              updateItem.position = currentChange.position
            }

            if (typeof currentChange.dragging !== 'undefined') {
              updateItem.dragging = currentChange.dragging
            }
          }

          res.push(updateItem)
          return res
        }
        case 'remove': {
          return res
        }
      }
    }

    res.push(item)
    return res
  }, initElements)
}

export const applyNodeChanges = (changes: NodeChange[], nodes: GraphNode[]): GraphNode[] =>
  <GraphNode[]>applyChanges(changes, nodes)

export const applyEdgeChanges = (changes: EdgeChange[], edges: GraphEdge[]): GraphEdge[] =>
  <GraphEdge[]>applyChanges(changes, edges)

export const createSelectionChange = (id: string, selected: boolean) => ({
  id,
  type: 'select',
  selected,
})

export const getSelectionChanges = (items: any[], selectedIds: string[]) => {
  return items.reduce((res, item) => {
    const willBeSelected = selectedIds.includes(item.id)

    if (!item.selected && willBeSelected) {
      item.selected = true
      res.push(createSelectionChange(item.id, true))
    } else if (item.selected && !willBeSelected) {
      item.selected = false
      res.push(createSelectionChange(item.id, false))
    }

    return res
  }, [])
}

export const initFlow = (emit: EmitFunc, id?: string): FlowStore => {
  const store = useStore({ id })
  useHooks(store, emit)
  return store
}

export default (options?: FlowOptions): UseVueFlow => {
  const store = useStore(options)
  return {
    store,
    applyNodeChanges: (changes) => applyNodeChanges(changes, store.nodes),
    applyEdgeChanges: (changes) => applyEdgeChanges(changes, store.edges),
    ...store.hooksOn,
  }
}
