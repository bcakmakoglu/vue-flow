import useState from './state'
import type {
  Actions,
  ComputedGetters,
  CoordinateExtent,
  EdgeChange,
  EdgeRemoveChange,
  FlowExportObject,
  GraphEdge,
  GraphNode,
  NodeChange,
  NodeDimensionChange,
  NodePositionChange,
  NodeRemoveChange,
  State,
} from '~/types'
import {
  addEdgeToStore,
  applyChanges,
  createAdditionChange,
  createGraphNodes,
  createRemoveChange,
  createSelectionChange,
  getConnectedEdges,
  getDimensions,
  getHandleBounds,
  getSelectionChanges,
  isDef,
  isEdge,
  isGraphEdge,
  isGraphNode,
  isNode,
  parseEdge,
  pointToRendererPoint,
  updateEdgeAction,
} from '~/utils'
import { useZoomPanHelper } from '~/composables'

export default (state: State, getters: ComputedGetters): Actions => {
  const updateNodePositions: Actions['updateNodePositions'] = (dragItems, changed, dragging) => {
    const changes: NodePositionChange[] = []

    dragItems.forEach((node) => {
      const change: Partial<NodePositionChange> = {
        id: node.id,
        type: 'position',
        dragging,
      }

      if (changed) {
        change.computedPosition = node.position
        change.position = node.position

        if (node.parentNode) {
          const parentNode = getters.getNode.value(node.parentNode)

          change.position = {
            x: change.position.x - (parentNode?.computedPosition?.x ?? 0),
            y: change.position.y - (parentNode?.computedPosition?.y ?? 0),
          }
        }
      }

      changes.push(change as NodePositionChange)
    })

    if (changes?.length) {
      state.hooks.nodesChange.trigger(changes)
    }
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
    else changedNodes = getSelectionChanges(state.nodes, nodeIds)

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
  }

  const edgeSelectionHandler = (edges: GraphEdge[], selected: boolean) => {
    const edgeIds = edges.map((e) => e.id)

    let changedEdges: EdgeChange[]
    if (state.multiSelectionActive) changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, selected))
    else changedEdges = getSelectionChanges(state.edges, edgeIds)

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
      removeSelectedNodes([])
      removeSelectedEdges([])
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
      if (missingSource) console.warn(`[vue-flow]: Couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
      if (missingTarget) console.warn(`[vue-flow]: Couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)
      if (missingSource || missingTarget) return res

      const storedEdge = getters.getEdge.value(edge.id)

      res.push(
        shallowReactive({
          ...parseEdge(edge, Object.assign({}, storedEdge, state.defaultEdgeOptions)),
          sourceNode,
          targetNode,
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

    const graphNodes = createGraphNodes(curr, getters.getNode.value, state.nodes, extent ?? state.nodeExtent)
    const changes = graphNodes.map(createAdditionChange)

    if (changes.length) state.hooks.nodesChange.trigger(changes)
  }

  const addEdges: Actions['addEdges'] = (params) => {
    const curr = params instanceof Function ? params(state.edges) : params

    const changes = curr.reduce((acc, param) => {
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
          createAdditionChange<GraphEdge>(
            shallowReactive({
              ...edge,
              sourceNode,
              targetNode,
            }),
          ),
        )
      }

      return acc
    }, [] as EdgeChange[])

    if (changes.length) state.hooks.edgesChange.trigger(changes)
  }

  const removeNodes: Actions['removeNodes'] = (nodes, removeConnectedEdges = true) => {
    const curr = nodes instanceof Function ? nodes(state.nodes) : nodes
    const nodeChanges: NodeRemoveChange[] = []
    const edgeChanges: EdgeRemoveChange[] = []
    curr.forEach((item) => {
      nodeChanges.push(createRemoveChange(typeof item === 'string' ? item : item.id))
      if (removeConnectedEdges) {
        const connections = getConnectedEdges([typeof item === 'string' ? ({ id: item } as any) : item], state.edges)
        edgeChanges.push(...connections.map((connection) => createRemoveChange(connection.id)))
      }
    })

    if (nodeChanges.length) {
      state.hooks.nodesChange.trigger(nodeChanges)
    }

    if (edgeChanges.length) {
      state.hooks.edgesChange.trigger(edgeChanges)
    }
  }

  const removeEdges: Actions['removeEdges'] = (edges) => {
    const curr = edges instanceof Function ? edges(state.edges) : edges
    const changes: EdgeRemoveChange[] = []
    curr.forEach((item) => {
      changes.push(createRemoveChange(typeof item === 'string' ? item : item.id))
    })

    state.hooks.edgesChange.trigger(changes)
  }

  const updateEdge: Actions['updateEdge'] = (oldEdge, newConnection) =>
    updateEdgeAction(oldEdge, newConnection, state.edges, addEdges)

  const applyNodeChanges: Actions['applyNodeChanges'] = (changes) => applyChanges(changes, state.nodes)

  const applyEdgeChanges: Actions['applyEdgeChanges'] = (changes) => applyChanges(changes, state.edges)

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

  const toObject = () => {
    // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
    return JSON.parse(
      JSON.stringify({
        nodes: state.nodes,
        edges: state.edges,
        position: [state.viewport.x, state.viewport.y],
        zoom: state.viewport.zoom,
      } as FlowExportObject),
    )
  }

  const updateNodeInternals: Actions['updateNodeInternals'] = (ids) => {
    state.hooks.updateNodeInternals.trigger(ids)
  }

  let zoomPanHelper: ReturnType<typeof useZoomPanHelper>

  state.hooks.paneReady.on(({ id }) => {
    zoomPanHelper = useZoomPanHelper(id)
  })

  const paneReady = async () => {
    return new Promise<typeof zoomPanHelper>((resolve) => {
      if (!zoomPanHelper) {
        until(() => zoomPanHelper)
          .toBeTruthy()
          .then(() => resolve(zoomPanHelper))
      } else {
        resolve(zoomPanHelper)
      }
    })
  }

  return {
    updateNodePositions,
    updateNodeDimensions,
    setElements,
    setNodes,
    setEdges,
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
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
    fitView: async (params = { padding: 0.1 }) => {
      const { fitView } = await paneReady()
      fitView(params)
    },
    zoomIn: async (options) => {
      const { zoomIn } = await paneReady()
      zoomIn(options)
    },
    zoomOut: async (options) => {
      const { zoomOut } = await paneReady()
      zoomOut(options)
    },
    zoomTo: async (zoomLevel, options) => {
      const { zoomTo } = await paneReady()
      zoomTo(zoomLevel, options)
    },
    setTransform: async (transform, options) => {
      const { setTransform } = await paneReady()
      setTransform(transform, options)
    },
    getTransform: () => ({
      x: state.viewport.x,
      y: state.viewport.y,
      zoom: state.viewport.zoom,
    }),
    setCenter: async (x, y, options) => {
      const { setCenter } = await paneReady()
      setCenter(x, y, options)
    },
    fitBounds: async (bounds, options) => {
      const { fitBounds } = await paneReady()
      fitBounds(bounds, options)
    },
    project: (position) => pointToRendererPoint(position, state.viewport, state.snapToGrid, state.snapGrid),
    fullscreen: async (isFullscreen) => {
      const { fullscreen } = await paneReady()
      await fullscreen(isFullscreen)
    },
    toObject,
    updateNodeInternals,
    $reset: () => {
      setState(useState())
    },
  }
}
