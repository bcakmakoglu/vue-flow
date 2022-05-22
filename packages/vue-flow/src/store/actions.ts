import useState from './state'
import type {
  Actions,
  ComputedGetters,
  CoordinateExtent,
  EdgeChange,
  GraphEdge,
  GraphNode,
  NodeChange,
  NodeDimensionChange,
  NodePositionChange,
  State,
} from '~/types'
import {
  addEdgeToStore,
  applyChanges,
  createGraphNodes,
  createPositionChange,
  createSelectionChange,
  getDimensions,
  getHandleBounds,
  getSelectionChanges,
  isDef,
  isEdge,
  isGraphEdge,
  isGraphNode,
  isNode,
  isParentSelected,
  parseEdge,
  updateEdgeAction,
} from '~/utils'

export default (state: State, getters: ComputedGetters): Actions => {
  const updateNodePosition: Actions['updateNodePosition'] = ({ id, diff = { x: 0, y: 0 } }) => {
    const nodePosPromise = new Promise<NodePositionChange[]>((resolve) => {
      const changes: NodePositionChange[] = []
      const curr = id ? getters.getNode.value(id)! : undefined
      if (curr) {
        changes.push(createPositionChange({ node: curr, diff, nodeExtent: state.nodeExtent }, getters.getNode.value))
      } else {
        getters.getSelectedNodes.value.forEach((node) => {
          if (!node.parentNode) {
            changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent }, getters.getNode.value))
          } else if (!isParentSelected(node, getters.getNode.value)) {
            changes.push(createPositionChange({ node, diff, nodeExtent: state.nodeExtent }, getters.getNode.value))
          }
        })
      }

      if (changes.length) resolve(changes)
    })

    nodePosPromise.then((changes) => {
      state.hooks.nodesChange.trigger(changes)
    })
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
        node.handleBounds = getHandleBounds(update.nodeElement, state.viewport.zoom)

        if (doUpdate) {
          node.dimensions = dimensions

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

  const nodeSelectionHandler = (nodes: GraphNode[], selected: boolean) => {
    const nodeIds = nodes.map((n) => n.id)

    let changedNodes: NodeChange[]
    if (state.multiSelectionActive) changedNodes = nodeIds.map((nodeId) => createSelectionChange(nodeId, selected))
    else changedNodes = getSelectionChanges(state.nodes, nodeIds, getters.getNode.value)

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
  }

  const edgeSelectionHandler = (edges: GraphEdge[], selected: boolean) => {
    const edgeIds = edges.map((e) => e.id)

    let changedEdges: EdgeChange[]
    if (state.multiSelectionActive) changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, selected))
    else changedEdges = getSelectionChanges(state.edges, edgeIds, getters.getNode.value)

    if (changedEdges.length) state.hooks.edgesChange.trigger(changedEdges)
  }

  const addSelectedNodes: Actions['addSelectedNodes'] = (nodes) => {
    nodeSelectionHandler(nodes, true)
  }

  const addSelectedEdges: Actions['addSelectedEdges'] = (edges) => {
    edgeSelectionHandler(edges, true)
  }

  const addSelectedElements: Actions['addSelectedElements'] = (elements) => {
    addSelectedNodes(elements.filter(isGraphNode))
    addSelectedEdges(elements.filter(isGraphEdge))
  }

  const removeSelectedNodes: Actions['removeSelectedNodes'] = (nodes) => {
    nodeSelectionHandler(nodes, false)
  }

  const removeSelectedEdges: Actions['removeSelectedEdges'] = (edges) => {
    edgeSelectionHandler(edges, false)
  }

  const removeSelectedElements: Actions['removeSelectedElements'] = (elements) => {
    if (!elements) {
      addSelectedNodes([])
      addSelectedEdges([])
    } else {
      if (elements.nodes) removeSelectedNodes(elements.nodes.filter(isGraphNode))
      if (elements.edges) removeSelectedEdges(elements.edges.filter(isGraphEdge))
    }
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

  const setInteractive: Actions['setInteractive'] = (isInteractive) => {
    state.nodesDraggable = isInteractive
    state.nodesConnectable = isInteractive
    state.elementsSelectable = isInteractive
  }

  const setNodes: Actions['setNodes'] = (nodes, extent?: CoordinateExtent) => {
    if (!state.initialized && !nodes.length) return
    if (!state.nodes) state.nodes = []
    const curr = nodes instanceof Function ? nodes(state.nodes) : nodes
    state.nodes = createGraphNodes(curr, getters.getNode.value, state.nodes, extent ?? state.nodeExtent)
  }

  const setEdges: Actions['setEdges'] = (edges) => {
    if (!state.initialized && !edges.length) return
    const curr = edges instanceof Function ? edges(state.edges) : edges

    state.edges = curr.reduce<GraphEdge[]>((res, edge) => {
      const sourceNode = getters.getNode.value(edge.source)!
      const targetNode = getters.getNode.value(edge.target)!

      const missingSource = !sourceNode || typeof sourceNode === 'undefined'
      const missingTarget = !targetNode || typeof targetNode === 'undefined'
      if (missingSource) console.warn(`[vueflow]: Couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
      if (missingTarget) console.warn(`[vueflow]: Couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)
      if (missingSource || missingTarget) return res

      const storedEdge = getters.getEdge.value(edge.id)

      res.push(
        shallowReactive({
          ...parseEdge(edge, {
            ...state.defaultEdgeOptions,
            ...storedEdge,
          }),
        }),
      )

      return res
    }, [])
  }

  const setElements: Actions['setElements'] = (elements, extent) => {
    if ((!state.initialized && !elements.length) || !elements) return
    const curr = elements instanceof Function ? elements([...state.nodes, ...state.edges]) : elements

    setNodes(curr.filter(isNode), extent)
    setEdges(curr.filter(isEdge))
  }

  const addNodes: Actions['addNodes'] = (nodes, extent) => {
    const curr = nodes instanceof Function ? nodes(state.nodes) : nodes

    state.nodes = [...state.nodes, ...createGraphNodes(curr, getters.getNode.value, state.nodes, extent ?? state.nodeExtent)]
  }

  const addEdges: Actions['addEdges'] = (params) => {
    const curr = params instanceof Function ? params(state.edges) : params

    curr.reduce<GraphEdge[]>((acc, param) => {
      const edge = addEdgeToStore(
        {
          ...param,
          ...state.defaultEdgeOptions,
        },
        state.edges,
      )
      if (edge) {
        const sourceNode = getters.getNode.value(edge.source)!
        const targetNode = getters.getNode.value(edge.target)!

        const missingSource = !sourceNode || typeof sourceNode === 'undefined'
        const missingTarget = !targetNode || typeof targetNode === 'undefined'
        if (missingSource) console.warn(`[vueflow]: Couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
        if (missingTarget) console.warn(`[vueflow]: Couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)
        if (missingTarget || missingSource) return acc

        acc.push(
          shallowReactive({
            ...state.defaultEdgeOptions,
            ...edge,
          }),
        )
      }

      return acc
    }, state.edges)
  }

  const updateEdge: Actions['updateEdge'] = (oldEdge, newConnection) =>
    updateEdgeAction(oldEdge, newConnection, state.edges, addEdges)

  const applyNodeChanges: Actions['applyNodeChanges'] = (changes) => applyChanges(changes, state.nodes, addNodes)

  const applyEdgeChanges: Actions['applyEdgeChanges'] = (changes) => applyChanges(changes, state.edges, addEdges)

  const setState: Actions['setState'] = (options) => {
    const skip = ['modelValue', 'nodes', 'edges', 'maxZoom', 'minZoom', 'translateExtent']
    const opts = options instanceof Function ? options(state) : options

    if (typeof opts.modelValue !== 'undefined') setElements(opts.modelValue, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.nodes !== 'undefined') setNodes(opts.nodes, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.edges !== 'undefined') setEdges(opts.edges)

    Object.keys(opts).forEach((o) => {
      const option = opts[o as keyof typeof opts]
      if (!skip.includes(o) && isDef(option)) (<any>state)[o] = option
    })
    if (!state.d3Zoom)
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
    removeSelectedElements,
    removeSelectedNodes,
    removeSelectedEdges,
    setInteractive,
    setState,
    $reset: () => {
      setState(useState())
    },
  }
}
