import useVueFlow from './useVueFlow'
import {
  GraphEdge,
  NodeChange,
  EdgeChange,
  UseEdgesStateOptions,
  UseEdgesState,
  Edge,
  Connection,
  GraphNode,
  UseNodesStateOptions,
  UseNodesState,
  UseElementsStateOptions,
  UseElementsState,
} from '~/types'
import { applyChanges, connectionExists, getEdgeId, isEdge, isGraphEdge, parseEdge } from '~/utils'
import { parseChildren } from '~/store'

const addEdge = (edgeParams: Edge | Connection, edges: Edge[]) => {
  if (!edgeParams.source || !edgeParams.target) {
    console.warn("Can't create edge. An edge needs a source and a target.")
    return false
  }

  let edge
  if (isEdge(edgeParams)) {
    edge = { ...edgeParams }
  } else {
    edge = {
      ...edgeParams,
      id: getEdgeId(edgeParams),
    } as Edge
  }
  edge = parseEdge(edge)
  if (connectionExists(edge, edges)) return false
  return edge
}

const updateEdge = (edge: GraphEdge, newConnection: Connection, edges: GraphEdge[]) => {
  if (!newConnection.source || !newConnection.target) {
    console.warn("Can't create new edge. An edge needs a source and a target.")
    return false
  }

  const foundEdge = edges.find((e) => isGraphEdge(e) && e.id === edge.id)

  if (!foundEdge) {
    console.warn(`The old edge with id=${edge.id} does not exist.`)
    return false
  }

  edge.id = getEdgeId(newConnection)
  edge.source = newConnection.source
  edge.target = newConnection.target
  edge.sourceHandle = newConnection.sourceHandle
  edge.targetHandle = newConnection.targetHandle

  return edge
}

export const applyEdgeChanges = (changes: EdgeChange[], edges: GraphEdge[]) => applyChanges(changes, edges)
export const applyNodeChanges = (changes: NodeChange[], nodes: GraphNode[]) => applyChanges(changes, nodes)

export const useEdgesState = ({ edges, options }: UseEdgesStateOptions = { options: { applyDefault: true } }): UseEdgesState => {
  const { store } = useVueFlow(options)
  if (edges && edges.length) store.setEdges(edges)
  return {
    edges: store.edges,
    applyEdgeChanges: (changes) => applyEdgeChanges(changes, store.edges),
    setEdges: store.setEdges,
    addEdges: (params) => {
      params.forEach((param) => {
        const edge = addEdge(param, store.edges)
        if (edge) {
          const sourceNode = store.getNode(edge.source)!
          const targetNode = store.getNode(edge.target)!
          if (!sourceNode || typeof sourceNode === 'undefined')
            console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
          if (!targetNode || typeof targetNode === 'undefined')
            console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

          store.edges.push({
            ...edge,
            sourceNode,
            targetNode,
          })
        }
      })
      return store.edges
    },
    updateEdge: (oldEdge, newConnection) => updateEdge(oldEdge, newConnection, store.edges),
    onEdgesChange: store.hooksOn.onEdgesChange,
  }
}

export const useNodesState = ({ nodes, options }: UseNodesStateOptions = { options: { applyDefault: true } }): UseNodesState => {
  const { store } = useVueFlow(options)
  if (nodes && nodes.length) store.setNodes(nodes)
  return {
    nodes: store.nodes,
    applyNodeChanges: (changes) => applyNodeChanges(changes, store.nodes),
    setNodes: store.setNodes,
    addNodes: (nodes, extent) => {
      const parsed = nodes.flatMap((node) => {
        const children: GraphNode[] = []
        parseChildren(node, undefined, children, extent ?? store.nodeExtent, store.getNode)
        return children
      })
      store.nodes.push(...parsed)
      return store.nodes
    },
    onNodesChange: store.hooksOn.onNodesChange,
  }
}

export const useElementsState = (
  { edges, nodes, options }: UseElementsStateOptions = { options: { applyDefault: true } },
): UseElementsState => {
  const nodesState = useNodesState({ nodes, options })
  const edgesState = useEdgesState({ edges, options })

  return {
    ...nodesState,
    ...edgesState,
  }
}
