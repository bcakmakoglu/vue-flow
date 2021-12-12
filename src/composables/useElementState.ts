import {
  FlowStore,
  GraphEdge,
  NodeChange,
  EdgeChange,
  UseEdgesStateOptions,
  UseEdgeState,
  Edge,
  Connection,
  GraphNode,
  UseNodesStateOptions,
  UseNodesState,
} from '~/types'
import { connectionExists, getEdgeId, isEdge, isGraphEdge, parseEdge } from '~/utils'
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

export const useEdgesState = (
  store: FlowStore,
  apply: (changes: EdgeChange[]) => GraphEdge[],
): ((options?: UseEdgesStateOptions) => UseEdgeState) => {
  return ({ edges, applyDefault } = { applyDefault: false }) => {
    if (edges && edges.length) store.setEdges(edges)
    if (applyDefault) store.hooksOn.OnEdgesChange((e) => apply(e))
    return {
      edges: store.edges,
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
      OnEdgesChange: store.hooksOn.OnEdgesChange,
    }
  }
}

export const useNodesState = (
  store: FlowStore,
  apply: (changes: NodeChange[]) => GraphNode[],
): ((options?: UseNodesStateOptions) => UseNodesState) => {
  return ({ nodes, applyDefault } = { applyDefault: false }) => {
    if (nodes && nodes.length) store.setNodes(nodes)
    if (applyDefault) store.hooksOn.OnNodesChange((e) => apply(e))
    return {
      nodes: store.nodes,
      setNodes: store.setNodes,
      addNodes: (nodes, extent) => {
        const parsed = nodes.flatMap((node) => {
          const children: GraphNode[] = []
          parseChildren(node, undefined, children, extent ?? store.nodeExtent, store.getNode)
          return children
        })
        store.nodes.concat(parsed)
        return store.nodes
      },
      OnNodesChange: store.hooksOn.OnNodesChange,
    }
  }
}
