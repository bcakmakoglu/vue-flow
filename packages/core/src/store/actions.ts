import useState from './state'
import type {
  Actions,
  ComputedGetters,
  CoordinateExtent,
  EdgeChange,
  EdgeRemoveChange,
  EdgeSelectionChange,
  Elements,
  FlowExportObject,
  GraphEdge,
  GraphNode,
  Node,
  NodeChange,
  NodeDimensionChange,
  NodePositionChange,
  NodeRemoveChange,
  NodeSelectionChange,
  Rect,
  State,
} from '~/types'

export default (state: State, getters: ComputedGetters): Actions => {
  const updateNodeInternals: Actions['updateNodeInternals'] = (ids) => {
    state.hooks.updateNodeInternals.trigger(ids)
  }

  const zoomPanHelper = ref<ReturnType<typeof useZoomPanHelper>>()

  state.hooks.paneReady.on(({ id }) => {
    zoomPanHelper.value = useZoomPanHelper(id)
  })

  const paneReady = async () => {
    return new Promise<ReturnType<typeof useZoomPanHelper>>((resolve) => {
      if (!zoomPanHelper.value) {
        until(zoomPanHelper)
          .not.toBeUndefined()
          .then(() => resolve(zoomPanHelper.value!))
      } else {
        resolve(zoomPanHelper.value)
      }
    })
  }

  const updateNodePositions: Actions['updateNodePositions'] = (dragItems, changed, dragging) => {
    const changes: NodePositionChange[] = []

    dragItems.forEach((node) => {
      const change: Partial<NodePositionChange> = {
        id: node.id,
        type: 'position',
        dragging,
        from: node.from,
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
    if (!state.vueFlowRef) return

    const viewportNodes = state.vueFlowRef.querySelectorAll('.vue-flow__transformationpane')

    if (!viewportNodes.length) return

    const changes: NodeDimensionChange[] = updates.reduce<NodeDimensionChange[]>((res, update) => {
      const node = getters.getNode.value(update.id)

      if (node) {
        const dimensions = getDimensions(update.nodeElement)

        // use each transformationpane to calculate the zoom factor (this is necessary when flows are nested, like a flow is used inside a node)
        let zoom: number
        viewportNodes.forEach((vp) => {
          const style = window.getComputedStyle(vp)
          const { m22 } = new window.DOMMatrixReadOnly(style.transform)

          if (!zoom) zoom = m22
          else zoom = zoom / m22
        })

        const doUpdate =
          !!(
            dimensions.width &&
            dimensions.height &&
            (node.dimensions.width !== dimensions.width || node.dimensions.height !== dimensions.height)
          ) || update.forceUpdate

        if (doUpdate) {
          node.handleBounds.source = getHandleBounds('.source', update.nodeElement, zoom!)
          node.handleBounds.target = getHandleBounds('.target', update.nodeElement, zoom!)

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
    let changedEdges: EdgeChange[] = []
    if (state.multiSelectionActive) changedNodes = nodeIds.map((nodeId) => createSelectionChange(nodeId, selected))
    else {
      const selectionChanges = getSelectionChanges([...state.nodes, ...state.edges], nodeIds)
      changedNodes = selectionChanges.changedNodes
      changedEdges = selectionChanges.changedEdges
    }

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
    if (changedEdges.length) state.hooks.edgesChange.trigger(changedEdges)
  }

  const edgeSelectionHandler = (edges: GraphEdge[], selected: boolean) => {
    const edgeIds = edges.map((n) => n.id)

    let changedNodes: NodeChange[] = []
    let changedEdges: EdgeChange[]
    if (state.multiSelectionActive) changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, selected))
    else {
      const selectionChanges = getSelectionChanges([...state.nodes, ...state.edges], edgeIds)
      changedNodes = selectionChanges.changedNodes
      changedEdges = selectionChanges.changedEdges
    }

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
    if (changedEdges.length) state.hooks.edgesChange.trigger(changedEdges)
  }

  const elementSelectionHandler = (elements: Elements, selected: boolean) => {
    const nodes = elements.filter(isGraphNode)
    const edges = elements.filter(isGraphEdge)

    const nodeIds = nodes.map((n) => n.id)
    const edgeIds = edges.map((e) => e.id)

    let { changedNodes, changedEdges } = getSelectionChanges([...state.nodes, ...state.edges], [...nodeIds, ...edgeIds])

    if (state.multiSelectionActive) changedNodes = nodeIds.map((nodeId) => createSelectionChange(nodeId, selected))
    if (state.multiSelectionActive) changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, selected))

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
    if (changedEdges.length) state.hooks.edgesChange.trigger(changedEdges)
  }

  const addSelectedNodes: Actions['addSelectedNodes'] = (nodes) => {
    nodeSelectionHandler(nodes, true)
  }

  const addSelectedEdges: Actions['addSelectedEdges'] = (edges) => {
    edgeSelectionHandler(edges, true)
  }

  const addSelectedElements: Actions['addSelectedElements'] = (elements) => {
    elementSelectionHandler(elements, true)
  }

  const removeSelectedNodes: Actions['removeSelectedNodes'] = (nodes) => {
    if (!nodes.length) return nodeSelectionHandler(nodes, false)

    const nodeIds = nodes.map((n) => n.id)

    const changedNodes = nodeIds.map((nodeId) => createSelectionChange(nodeId, false))

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
  }

  const removeSelectedEdges: Actions['removeSelectedEdges'] = (edges) => {
    if (!edges.length) return edgeSelectionHandler(edges, false)

    const edgeIds = edges.map((e) => e.id)

    const changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, false))

    if (changedEdges.length) state.hooks.edgesChange.trigger(changedEdges)
  }

  const removeSelectedElements: Actions['removeSelectedElements'] = (elements) => {
    if (!elements || !elements.length) return elementSelectionHandler([], false)

    const { changedNodes, changedEdges } = elements.reduce(
      (acc, curr) => {
        const selectionChange = createSelectionChange(curr.id, false)
        if (isGraphNode(curr)) acc.changedNodes.push(selectionChange)
        else acc.changedEdges.push(selectionChange)

        return acc
      },
      { changedNodes: [] as NodeSelectionChange[], changedEdges: [] as EdgeSelectionChange[] },
    )

    if (changedNodes.length) state.hooks.nodesChange.trigger(changedNodes)
    if (changedEdges.length) state.hooks.edgesChange.trigger(changedEdges)
  }

  const setMinZoom: Actions['setMinZoom'] = (minZoom: any) => {
    state.d3Zoom?.scaleExtent([minZoom, state.maxZoom])
    state.minZoom = minZoom
  }

  const setMaxZoom: Actions['setMaxZoom'] = (maxZoom: any) => {
    state.d3Zoom?.scaleExtent([state.minZoom, maxZoom])
    state.maxZoom = maxZoom
  }

  const setTranslateExtent: Actions['setTranslateExtent'] = (translateExtent) => {
    state.d3Zoom?.translateExtent(translateExtent)
    state.translateExtent = translateExtent
  }

  const setNodeExtent: Actions['setNodeExtent'] = async (nodeExtent) => {
    state.nodeExtent = nodeExtent

    if (zoomPanHelper.value) {
      const nodeIds = getters.getNodes.value.map((n) => n.id)
      updateNodeInternals(nodeIds)
    }
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
      if (missingSource) warn(`Couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
      if (missingTarget) warn(`Couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)
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
        if (missingSource) warn(`Couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
        if (missingTarget) warn(`Couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)
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

  const nodeIds = $computed(() => state.nodes.map((n) => n.id))
  const edgeIds = $computed(() => state.edges.map((e) => e.id))

  const findNode: Actions['findNode'] = (id) => {
    if (state.nodes && !nodeIds.length) return state.nodes.find((node) => node.id === id)

    return state.nodes[nodeIds.indexOf(id)]
  }

  const findEdge: Actions['findEdge'] = (id) => {
    if (state.edges && !edgeIds.length) return state.edges.find((edge) => edge.id === id)

    return state.edges[edgeIds.indexOf(id)]
  }

  const updateEdge: Actions['updateEdge'] = (oldEdge, newConnection) => updateEdgeAction(oldEdge, newConnection, state.edges)

  const applyNodeChanges: Actions['applyNodeChanges'] = (changes) => applyChanges(changes, state.nodes)

  const applyEdgeChanges: Actions['applyEdgeChanges'] = (changes) => applyChanges(changes, state.edges)

  const startConnection: Actions['startConnection'] = (startHandle, position, event, isClick = false) => {
    if (isClick) {
      state.connectionClickStartHandle = startHandle
    } else {
      state.connectionStartHandle = startHandle
    }

    if (position) state.connectionPosition = position

    state.hooks.connectStart.trigger({
      event,
      nodeId: startHandle.nodeId,
      handleId: startHandle.handleId,
      handleType: startHandle.type,
    })
  }

  const updateConnection: Actions['updateConnection'] = (position) => {
    state.connectionPosition = position
  }

  const endConnection: Actions['endConnection'] = (event, isClick) => {
    state.connectionPosition = { x: NaN, y: NaN }

    if (isClick) {
      state.connectionClickStartHandle = null
    } else {
      state.connectionStartHandle = null
    }

    state.hooks.connectEnd.trigger(event)
  }

  const getNodeRect = (
    nodeOrRect: (Partial<Node> & { id: Node['id'] }) | Rect,
  ): [Rect | null, Node | null | undefined, boolean] => {
    const isRectObj = isRect(nodeOrRect)
    const node = isRectObj ? null : findNode(nodeOrRect.id)

    if (!isRectObj && !node) {
      return [null, null, isRectObj]
    }

    const nodeRect = isRectObj ? nodeOrRect : nodeToRect(node!)

    return [nodeRect, node, isRectObj]
  }

  const getIntersectingNodes: Actions['getIntersectingNodes'] = (nodeOrRect, partially = true, nodes) => {
    const [nodeRect, node, isRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) return []

    return (nodes || state.nodes).filter((n) => {
      if (!isRect && (n.id === node!.id || !n.computedPosition)) return false

      const currNodeRect = nodeToRect(n)
      const overlappingArea = getOverlappingArea(currNodeRect, nodeRect)
      const partiallyVisible = partially && overlappingArea > 0

      return partiallyVisible || overlappingArea >= Number(nodeOrRect.width) * Number(nodeOrRect.height)
    })
  }

  const isNodeIntersecting: Actions['isNodeIntersecting'] = (nodeOrRect, area, partially = true) => {
    const [nodeRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) return false

    const overlappingArea = getOverlappingArea(nodeRect, area)
    const partiallyVisible = partially && overlappingArea > 0

    return partiallyVisible || overlappingArea >= Number(nodeOrRect.width) * Number(nodeOrRect.height)
  }

  const setState: Actions['setState'] = (options) => {
    const opts = options instanceof Function ? options(state) : options
    const skip: (keyof typeof opts)[] = [
      'modelValue',
      'nodes',
      'edges',
      'maxZoom',
      'minZoom',
      'translateExtent',
      'nodeExtent',
      'hooks',
    ]

    if (typeof opts.modelValue !== 'undefined') setElements(opts.modelValue, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.nodes !== 'undefined') setNodes(opts.nodes, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.edges !== 'undefined') setEdges(opts.edges)

    const setSkippedOptions = () => {
      if (typeof opts.maxZoom !== 'undefined') setMaxZoom(opts.maxZoom)
      if (typeof opts.minZoom !== 'undefined') setMinZoom(opts.minZoom)
      if (typeof opts.translateExtent !== 'undefined') setTranslateExtent(opts.translateExtent)
      if (typeof opts.nodeExtent !== 'undefined') setNodeExtent(opts.nodeExtent)
    }

    Object.keys(opts).forEach((o) => {
      const option = opts[o as keyof typeof opts]
      if (!skip.includes(o as keyof typeof opts) && isDef(option)) (<any>state)[o] = option
    })

    if (!state.d3Zoom) {
      until(() => state.d3Zoom)
        .not.toBeUndefined()
        .then(setSkippedOptions)
    } else {
      setSkippedOptions()
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
    findNode,
    findEdge,
    updateEdge,
    applyEdgeChanges,
    applyNodeChanges,
    addSelectedElements,
    addSelectedNodes,
    addSelectedEdges,
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    setNodeExtent,
    removeSelectedElements,
    removeSelectedNodes,
    removeSelectedEdges,
    startConnection,
    updateConnection,
    endConnection,
    setInteractive,
    setState,
    getIntersectingNodes,
    isNodeIntersecting,
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
    toObject,
    updateNodeInternals,
    $reset: () => {
      setState(useState())
    },
    $destroy: () => {},
  }
}
