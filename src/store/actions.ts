import useState from './state'
import {
  CoordinateExtent,
  EdgeChange,
  Actions,
  ComputedGetters,
  State,
  GraphNode,
  Node,
  NodeChange,
  NodeDimensionChange,
  Edge,
  Connection,
  GraphEdge,
  NodePositionChange,
} from '~/types'
import {
  applyChanges,
  connectionExists,
  createPositionChange,
  createSelectionChange,
  getDimensions,
  getEdgeId,
  getHandleBounds,
  getSelectionChanges,
  isEdge,
  isGraphEdge,
  isGraphNode,
  isNode,
  isParentSelected,
  parseEdge,
  parseNode,
} from '~/utils'

const isDef = <T>(val: T): val is NonNullable<T> => typeof val !== 'undefined'

const getParent = (root: Node[], id: string): GraphNode | undefined => {
  let node
  root.some((n) => {
    if (n.id === id) return (node = n)
    if (n.children) return (node = getParent(n.children, id))
    return false
  })
  return node
}

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

const updateEdgeAction = (edge: GraphEdge, newConnection: Connection, edges: GraphEdge[], add: Actions['addEdges']): boolean => {
  if (!newConnection.source || !newConnection.target) {
    console.warn("Can't create new edge. An edge needs a source and a target.")
    return false
  }

  const foundEdge = edges.find((e) => isGraphEdge(e) && e.id === edge.id)

  if (!foundEdge) {
    console.warn(`The old edge with id=${edge.id} does not exist.`)
    return false
  }

  edges.splice(edges.indexOf(edge), 1)
  add([
    {
      ...edge,
      id: getEdgeId(newConnection),
      source: newConnection.source,
      target: newConnection.target,
      sourceHandle: newConnection.sourceHandle,
      targetHandle: newConnection.targetHandle,
    },
  ])

  return true
}

const applyEdgeChangesAction = (changes: EdgeChange[], edges: GraphEdge[]) => applyChanges(changes, edges)
const applyNodeChangesAction = (changes: NodeChange[], nodes: GraphNode[]) => applyChanges(changes, nodes)

export const parseChildren = (
  n: Node,
  p: GraphNode | undefined,
  arr: GraphNode[],
  extent: CoordinateExtent,
  getNode: (id: string) => GraphNode | undefined,
) => {
  const parent = typeof p === 'undefined' || typeof p !== 'object' ? getParent(arr, n.id) : p
  const parsed = parseNode(n, extent, {
    ...getNode(n.id),
    parentNode: parent,
  })
  arr.push(parsed)
  if (n.children && n.children.length) {
    n.children.forEach((c) => parseChildren(c, parsed, arr, extent, getNode))
  }
}

export default (state: State, getters: ComputedGetters): Actions => {
  const updateNodePosition: Actions['updateNodePosition'] = ({ id, diff = { x: 0, y: 0 }, dragging }) => {
    const changes: NodePositionChange[] = []

    state.nodes.forEach((node) => {
      if (node.selected) {
        if (!node.parentNode) {
          changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent, dragging }))
        } else if (!isParentSelected(node)) {
          changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent, dragging }))
        }
      } else if (node.id === id) {
        changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent, dragging }))
      }
    })

    if (changes.length) state.hooks.nodesChange.trigger(changes)
  }
  const updateNodeDimensions: Actions['updateNodeDimensions'] = (updates) => {
    const changes: NodeDimensionChange[] = updates.reduce<NodeDimensionChange[]>((res, update) => {
      const node = getters.getNode.value(update.id)

      if (node) {
        const dimensions = getDimensions(update.nodeElement)
        const doUpdate = !!(
          dimensions.width &&
          dimensions.height &&
          (node.dimensions.width !== dimensions.width || node.dimensions.height !== dimensions.height || update.forceUpdate)
        )

        if (doUpdate) {
          const handleBounds = getHandleBounds(update.nodeElement, state.transform[2])
          node.dimensions = dimensions
          node.handleBounds = handleBounds

          res.push({
            id: node.id,
            type: 'dimensions',
            dimensions,
          })
        }
      }

      return res
    }, [])

    if (changes.length) state.hooks.nodesChange.trigger(changes)
  }
  const addSelectedNodes: Actions['addSelectedNodes'] = (nodes) => {
    const selectedNodesIds = nodes.map((n) => n.id)

    let changedNodes: NodeChange[]
    if (state.multiSelectionActive) changedNodes = selectedNodesIds.map((nodeId) => createSelectionChange(nodeId, true))
    else changedNodes = getSelectionChanges(state.nodes, selectedNodesIds)

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
  }
  const addSelectedEdges: Actions['addSelectedEdges'] = (edges) => {
    const selectedEdgesIds = edges.map((e) => e.id)

    let changedEdges: EdgeChange[]
    if (state.multiSelectionActive) changedEdges = selectedEdgesIds.map((nodeId) => createSelectionChange(nodeId, true))
    else changedEdges = getSelectionChanges(state.nodes, selectedEdgesIds)

    if (changedEdges.length) state.hooks.edgesChange.trigger(changedEdges)
  }
  const addSelectedElements: Actions['addSelectedElements'] = (elements) => {
    addSelectedNodes(elements.filter(isGraphNode))
    addSelectedEdges(elements.filter(isGraphEdge))
  }
  const setMinZoom: Actions['setMinZoom'] = (minZoom: any) => {
    state.d3Zoom?.scaleExtent([minZoom, state.maxZoom])
    state.minZoom = minZoom
  }
  const setMaxZoom: Actions['setMaxZoom'] = (maxZoom: any) => {
    state.d3Zoom?.scaleExtent([state.minZoom, maxZoom])
    state.maxZoom = maxZoom
  }
  const setTranslateExtent: Actions['setTranslateExtent'] = (translateExtent: any) => {
    state.d3Zoom?.translateExtent(translateExtent)
    state.translateExtent = translateExtent
  }
  const resetSelectedElements: Actions['resetSelectedElements'] = () => {
    addSelectedNodes([])
    addSelectedEdges([])
  }
  const setConnectionNodeId: Actions['setConnectionNodeId'] = ({
    connectionHandleId,
    connectionHandleType,
    connectionNodeId,
  }) => {
    state.connectionNodeId = connectionNodeId
    state.connectionHandleId = connectionHandleId
    state.connectionHandleType = connectionHandleType
  }
  const setInteractive: Actions['setInteractive'] = (isInteractive) => {
    state.nodesDraggable = isInteractive
    state.nodesConnectable = isInteractive
    state.elementsSelectable = isInteractive
  }

  const setNodes: Actions['setNodes'] = (nodes, extent?: CoordinateExtent) => {
    if (!state.initialized && !nodes.length) return
    nodes = nodes.flatMap((node) => {
      const children: GraphNode[] = []
      parseChildren(node, undefined, children, extent ?? state.nodeExtent, getters.getNode.value)
      return children
    })
    state.nodes = <GraphNode[]>nodes
  }
  const setEdges: Actions['setEdges'] = (edges) => {
    if (!state.initialized && !edges.length) return
    state.edges = edges.map((edge) => {
      const sourceNode = getters.getNode.value(edge.source)!
      const targetNode = getters.getNode.value(edge.target)!
      if (!sourceNode || typeof sourceNode === 'undefined')
        console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
      if (!targetNode || typeof targetNode === 'undefined')
        console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

      return {
        ...parseEdge(edge, {
          ...getters.getEdge.value(edge.id),
        }),
        sourceNode,
        targetNode,
      }
    })
  }

  const setElements: Actions['setElements'] = (elements, extent) => {
    if ((!state.initialized && !elements.length) || !elements) return
    setNodes(elements.filter(isNode), extent)
    setEdges(elements.filter(isEdge))
  }

  const addNodes: Actions['addNodes'] = (nodes, options) => {
    const parsed = nodes.flatMap((node) => {
      const children: GraphNode[] = []
      const parent =
        options && (typeof options.parentNode === 'string' ? getters.getNode.value(options.parentNode) : options.parentNode)
      parseChildren(node, parent, children, options?.extent ?? state.nodeExtent, getters.getNode.value)
      return children
    })
    state.nodes.push(...parsed)
  }

  const addEdges: Actions['addEdges'] = (params) => {
    params.forEach((param) => {
      const edge = addEdge(param, state.edges)
      if (edge) {
        const sourceNode = getters.getNode.value(edge.source)!
        const targetNode = getters.getNode.value(edge.target)!
        if (!sourceNode || typeof sourceNode === 'undefined')
          console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
        if (!targetNode || typeof targetNode === 'undefined')
          console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

        state.edges.push({
          ...edge,
          sourceNode,
          targetNode,
        })
      }
    })
  }

  const updateEdge: Actions['updateEdge'] = (oldEdge, newConnection) =>
    updateEdgeAction(oldEdge, newConnection, state.edges, addEdges)
  const applyNodeChanges: Actions['applyNodeChanges'] = (changes) => applyNodeChangesAction(changes, state.nodes)
  const applyEdgeChanges: Actions['applyEdgeChanges'] = (changes) => applyEdgeChangesAction(changes, state.edges)

  const setState: Actions['setState'] = (opts) => {
    const skip = ['modelValue', 'nodes', 'edges', 'maxZoom', 'minZoom', 'translateExtent']
    if (typeof opts.modelValue !== 'undefined') setElements(opts.modelValue, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.nodes !== 'undefined') setNodes(opts.nodes, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.edges !== 'undefined') setEdges(opts.edges)
    Object.keys(opts).forEach((o) => {
      const option = opts[o as keyof typeof opts]
      if (!skip.indexOf(o) && isDef(option)) (<any>state)[o] = option
    })
    if (!state.paneReady)
      until(() => state.d3Zoom)
        .not.toBeUndefined()
        .then(() => {
          if (typeof opts.maxZoom !== 'undefined') setMaxZoom(opts.maxZoom)
          if (typeof opts.minZoom !== 'undefined') setMinZoom(opts.minZoom)
          if (typeof opts.translateExtent !== 'undefined') setTranslateExtent(opts.translateExtent)
        })
    else {
      if (typeof opts.maxZoom !== 'undefined') setMaxZoom(opts.maxZoom)
      if (typeof opts.minZoom !== 'undefined') setMinZoom(opts.minZoom)
      if (typeof opts.translateExtent !== 'undefined') setTranslateExtent(opts.translateExtent)
    }
    if (!state.initialized) state.initialized = true
  }
  return {
    updateNodePosition,
    updateNodeDimensions,
    setElements,
    setNodes,
    setEdges,
    addNodes,
    addEdges,
    updateEdge,
    applyEdgeChanges,
    applyNodeChanges,
    addSelectedElements,
    addSelectedNodes,
    addSelectedEdges,
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    resetSelectedElements,
    setConnectionNodeId,
    setInteractive,
    setState,
    $reset: () => {
      setState(useState())
    },
  }
}
