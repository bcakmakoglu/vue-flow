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
  Getters,
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

const applyEdgeChangesAction = (changes: EdgeChange[], edges: GraphEdge[], getNode: Getters['getNode']) =>
  applyChanges(changes, edges, getNode)
const applyNodeChangesAction = (changes: NodeChange[], nodes: GraphNode[], getNode: Getters['getNode']) =>
  applyChanges(changes, nodes, getNode)

const createGraphNodes = (nodes: Node[], getNode: Getters['getNode'], currGraphNodes: GraphNode[], extent: CoordinateExtent) => {
  const parentNodes: Record<string, true> = {}

  const graphNodes = nodes.map((node) => {
    const parsed = parseNode(node, extent, {
      ...getNode(node.id),
      parentNode: node.parentNode,
    })
    if (node.parentNode) {
      parentNodes[node.parentNode] = true
    }

    return parsed
  })

  graphNodes.forEach((node) => {
    if (node.parentNode && ![...graphNodes, ...currGraphNodes].find((n) => n.id === node.parentNode)) {
      throw new Error(`Parent node ${node.parentNode} not found`)
    }

    if (node.parentNode || parentNodes[node.id]) {
      if (parentNodes[node.id]) {
        node.isParent = true
      }
      const parent = node.parentNode ? getNode(node.parentNode) : undefined
      if (parent) parent.isParent = true
    }
  })

  return graphNodes
}

export default (state: State, getters: ComputedGetters): Actions => {
  const updateNodePosition: Actions['updateNodePosition'] = ({ id, diff = { x: 0, y: 0 }, dragging }) => {
    const changes: NodePositionChange[] = []

    state.nodes.forEach((node) => {
      if (node.selected) {
        if (!node.parentNode) {
          changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent, dragging }, getters.getNode.value))
        } else if (!isParentSelected(node, getters.getNode.value)) {
          changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent, dragging }, getters.getNode.value))
        }
      } else if (node.id === id) {
        changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent, dragging }, getters.getNode.value))
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
    else changedNodes = getSelectionChanges(state.nodes, selectedNodesIds, getters.getNode.value)

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
  }
  const addSelectedEdges: Actions['addSelectedEdges'] = (edges) => {
    const selectedEdgesIds = edges.map((e) => e.id)

    let changedEdges: EdgeChange[]
    if (state.multiSelectionActive) changedEdges = selectedEdgesIds.map((nodeId) => createSelectionChange(nodeId, true))
    else changedEdges = getSelectionChanges(state.edges, selectedEdgesIds, getters.getNode.value)

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
  const setInteractive: Actions['setInteractive'] = (isInteractive) => {
    state.nodesDraggable = isInteractive
    state.nodesConnectable = isInteractive
    state.elementsSelectable = isInteractive
  }

  const setNodes: Actions['setNodes'] = (nodes, extent?: CoordinateExtent) => {
    if (!state.initialized && !nodes.length) return
    state.nodes = createGraphNodes(nodes, getters.getNode.value, state.nodes, extent ?? state.nodeExtent)
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
          ...state.defaultEdgeOptions,
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

  const addNodes: Actions['addNodes'] = (nodes, extent) => {
    state.nodes.push(...createGraphNodes(nodes, getters.getNode.value, state.nodes, extent ?? state.nodeExtent))
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
          ...state.defaultEdgeOptions,
          ...edge,
          sourceNode,
          targetNode,
        })
      }
    })
  }

  const updateEdge: Actions['updateEdge'] = (oldEdge, newConnection) =>
    updateEdgeAction(oldEdge, newConnection, state.edges, addEdges)
  const applyNodeChanges: Actions['applyNodeChanges'] = (changes) =>
    applyNodeChangesAction(changes, state.nodes, getters.getNode.value)
  const applyEdgeChanges: Actions['applyEdgeChanges'] = (changes) =>
    applyEdgeChangesAction(changes, state.edges, getters.getNode.value)

  const setState: Actions['setState'] = (opts) => {
    const skip = ['modelValue', 'nodes', 'edges', 'maxZoom', 'minZoom', 'translateExtent']
    if (typeof opts.modelValue !== 'undefined') setElements(opts.modelValue, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.nodes !== 'undefined') setNodes(opts.nodes, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.edges !== 'undefined') setEdges(opts.edges)
    Object.keys(opts).forEach((o) => {
      const option = opts[o as keyof typeof opts]
      if (!skip.includes(o) && isDef(option)) (<any>state)[o] = option
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
    setInteractive,
    setState,
    $reset: () => {
      setState(useState())
    },
  }
}
