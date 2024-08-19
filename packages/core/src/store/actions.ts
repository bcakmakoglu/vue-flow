import { zoomIdentity } from 'd3-zoom'
import type { ComputedRef } from 'vue'
import { until } from '@vueuse/core'
import type {
  Actions,
  CoordinateExtent,
  EdgeAddChange,
  EdgeLookup,
  EdgeRemoveChange,
  EdgeSelectionChange,
  FlowExportObject,
  GraphEdge,
  GraphNode,
  Node,
  NodeAddChange,
  NodeDimensionChange,
  NodeLookup,
  NodePositionChange,
  NodeRemoveChange,
  Rect,
  State,
} from '../types'
import { useViewportHelper } from '../composables'
import {
  applyChanges,
  clamp,
  createAdditionChange,
  createEdgeRemoveChange,
  createGraphEdges,
  createGraphNodes,
  createNodeRemoveChange,
  createSelectionChange,
  getConnectedEdges as getConnectedEdgesBase,
  getDimensions,
  getHandleBounds,
  getIncomers as getIncomersBase,
  getOutgoers as getOutgoersBase,
  getOverlappingArea,
  getSelectionChanges,
  isDef,
  isGraphNode,
  isRect,
  nodeToRect,
  updateConnectionLookup,
} from '../utils'
import { storeOptionsToSkip, useState } from './state'

export function useActions(state: State, nodeLookup: ComputedRef<NodeLookup>, edgeLookup: ComputedRef<EdgeLookup>): Actions {
  const viewportHelper = useViewportHelper(state)

  const updateNodeInternals: Actions['updateNodeInternals'] = (ids) => {
    const updateIds = ids ?? []

    state.hooks.updateNodeInternals.trigger(updateIds)
  }

  const getIncomers: Actions['getIncomers'] = (nodeOrId) => {
    return getIncomersBase(nodeOrId, state.nodes, state.edges)
  }

  const getOutgoers: Actions['getOutgoers'] = (nodeOrId) => {
    return getOutgoersBase(nodeOrId, state.nodes, state.edges)
  }

  const getConnectedEdges: Actions['getConnectedEdges'] = (nodesOrId) => {
    return getConnectedEdgesBase(nodesOrId, state.edges)
  }

  const getNode: Actions['getNode'] = (id) => {
    if (!id) {
      return
    }

    return nodeLookup.value.get(id)
  }

  const getEdge: Actions['getEdge'] = (id) => {
    if (!id) {
      return
    }

    return edgeLookup.value.get(id)
  }

  const updateNodePositions: Actions['updateNodePositions'] = (dragItems, changed, dragging) => {
    const changes: NodePositionChange[] = []

    for (const node of dragItems) {
      const change: Partial<NodePositionChange> = {
        id: node.id,
        type: 'position',
        dragging,
        from: node.from,
      }

      if (changed) {
        change.position = node.position

        if (node.parentNode) {
          const parentNode = getNode(node.parentNode)

          change.position = {
            x: change.position.x - (parentNode?.computedPosition?.x ?? 0),
            y: change.position.y - (parentNode?.computedPosition?.y ?? 0),
          }
        }
      }

      changes.push(change as NodePositionChange)
    }

    if (changes?.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const updateNodeDimensions: Actions['updateNodeDimensions'] = (updates) => {
    if (!state.vueFlowRef) {
      return
    }

    const viewportNode = state.vueFlowRef.querySelector('.vue-flow__transformationpane') as HTMLElement

    if (!viewportNode) {
      return
    }

    const style = window.getComputedStyle(viewportNode)
    const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform)

    const changes: NodeDimensionChange[] = []

    for (let i = 0; i < updates.length; ++i) {
      const update = updates[i]

      const node = getNode(update.id)

      if (node) {
        const dimensions = getDimensions(update.nodeElement)

        const doUpdate = !!(
          dimensions.width &&
          dimensions.height &&
          (node.dimensions.width !== dimensions.width || node.dimensions.height !== dimensions.height || update.forceUpdate)
        )

        if (doUpdate) {
          const nodeBounds = update.nodeElement.getBoundingClientRect()
          node.dimensions = dimensions
          node.handleBounds.source = getHandleBounds('.source', update.nodeElement, nodeBounds, zoom)
          node.handleBounds.target = getHandleBounds('.target', update.nodeElement, nodeBounds, zoom)

          changes[i] = {
            id: node.id,
            type: 'dimensions',
            dimensions,
          }
        }
      }
    }

    if (!state.fitViewOnInitDone && state.fitViewOnInit) {
      viewportHelper.value.fitView().then(() => {
        state.fitViewOnInitDone = true
      })
    }

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const addSelectedNodes: Actions['addSelectedNodes'] = (nodes) => {
    if (state.multiSelectionActive) {
      const nodeChanges = nodes.map((node) => createSelectionChange(node.id, true))
      state.hooks.nodesChange.trigger(nodeChanges)
      return
    }

    state.hooks.nodesChange.trigger(getSelectionChanges(nodeLookup.value, new Set(nodes.map((n) => n.id)), true))
    state.hooks.edgesChange.trigger(getSelectionChanges(edgeLookup.value))
  }

  const addSelectedEdges: Actions['addSelectedEdges'] = (edges) => {
    if (state.multiSelectionActive) {
      const changedEdges = edges.map((edge) => createSelectionChange(edge.id, true))
      state.hooks.edgesChange.trigger(changedEdges as EdgeSelectionChange[])
      return
    }

    state.hooks.edgesChange.trigger(getSelectionChanges(edgeLookup.value, new Set(edges.map((e) => e.id))))
    state.hooks.nodesChange.trigger(getSelectionChanges(nodeLookup.value, new Set(), true))
  }

  const removeSelectedNodes: Actions['removeSelectedNodes'] = (nodes) => {
    const nodesToUnselect = nodes || state.nodes

    const nodeChanges = nodesToUnselect.map((n) => {
      n.selected = false
      return createSelectionChange(n.id, false)
    })

    state.hooks.nodesChange.trigger(nodeChanges)
  }

  const removeSelectedEdges: Actions['removeSelectedEdges'] = (edges) => {
    const edgesToUnselect = edges || state.edges

    const edgeChanges = edgesToUnselect.map((e) => {
      e.selected = false
      return createSelectionChange(e.id, false)
    })

    state.hooks.edgesChange.trigger(edgeChanges)
  }

  const setMinZoom: Actions['setMinZoom'] = (minZoom) => {
    state.d3Zoom?.scaleExtent([minZoom, state.maxZoom])
    state.minZoom = minZoom
  }

  const setMaxZoom: Actions['setMaxZoom'] = (maxZoom) => {
    state.d3Zoom?.scaleExtent([state.minZoom, maxZoom])
    state.maxZoom = maxZoom
  }

  const setTranslateExtent: Actions['setTranslateExtent'] = (translateExtent) => {
    state.d3Zoom?.translateExtent(translateExtent)
    state.translateExtent = translateExtent
  }

  const setNodeExtent: Actions['setNodeExtent'] = (nodeExtent) => {
    state.nodeExtent = nodeExtent
    updateNodeInternals()
  }

  const setPaneClickDistance: Actions['setPaneClickDistance'] = (clickDistance) => {
    state.d3Zoom?.clickDistance(clickDistance)
  }

  const setInteractive: Actions['setInteractive'] = (isInteractive) => {
    state.nodesDraggable = isInteractive
    state.nodesConnectable = isInteractive
    state.elementsSelectable = isInteractive
  }

  const setNodes: Actions['setNodes'] = (nodes) => {
    const nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes

    if (!state.initialized && !nextNodes.length) {
      return
    }

    state.nodes = createGraphNodes(nextNodes, getNode, state.hooks.error.trigger)
  }

  const setEdges: Actions['setEdges'] = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges

    if (!state.initialized && !nextEdges.length) {
      return
    }

    const validEdges: GraphEdge[] = createGraphEdges(
      nextEdges,
      state.isValidConnection,
      getNode,
      getEdge,
      state.hooks.error.trigger,
      state.defaultEdgeOptions,
      state.nodes,
      state.edges,
    )

    updateConnectionLookup(state.connectionLookup, validEdges)

    state.edges = validEdges
  }

  const addNodes: Actions['addNodes'] = (nodes) => {
    const graphNodes = createGraphNodes(Array.isArray(nodes) ? nodes : [nodes], getNode, state.hooks.error.trigger)

    const changes: NodeAddChange<any>[] = []
    for (const node of graphNodes) {
      changes.push(createAdditionChange(node))
    }

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const addEdges: Actions['addEdges'] = (edges) => {
    const validEdges = createGraphEdges(
      Array.isArray(edges) ? edges : [edges],
      state.isValidConnection,
      getNode,
      getEdge,
      state.hooks.error.trigger,
      state.defaultEdgeOptions,
      state.nodes,
      state.edges,
    )

    const changes: EdgeAddChange[] = []
    for (const edge of validEdges) {
      changes.push(createAdditionChange(edge))
    }

    if (changes.length) {
      state.hooks.edgesChange.trigger(changes)
    }
  }

  const removeNodes: Actions['removeNodes'] = (
    nodes,
    { removeConnectedEdges, removeChildren } = { removeConnectedEdges: true, removeChildren: false },
  ) => {
    const nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes
    const nodesToRemove = Array.isArray(nextNodes) ? nextNodes : [nextNodes]

    const nodeChanges: NodeRemoveChange[] = []
    const edgeChanges: EdgeRemoveChange[] = []

    function createEdgeRemovalChanges(nodes: Node[]) {
      const connectedEdges = getConnectedEdges(nodes)
      for (const edge of connectedEdges) {
        if (isDef(edge.deletable) ? edge.deletable : true) {
          edgeChanges.push(createEdgeRemoveChange(edge.id, edge.source, edge.target, edge.sourceHandle, edge.targetHandle))
        }
      }
    }

    // recursively get all children and if the child is a parent, get those children as well until all nodes have been removed that are children of the current node
    function createChildrenRemovalChanges(id: string) {
      const children: GraphNode[] = []
      for (const node of state.nodes) {
        if (node.parentNode === id) {
          children.push(node)
        }
      }

      if (children.length) {
        for (const child of children) {
          nodeChanges.push(createNodeRemoveChange(child.id))
        }

        if (removeConnectedEdges) {
          createEdgeRemovalChanges(children)
        }

        for (const child of children) {
          createChildrenRemovalChanges(child.id)
        }
      }
    }

    for (const item of nodesToRemove) {
      const currNode = typeof item === 'string' ? getNode(item) : item

      if (!currNode) {
        continue
      }

      if (isDef(currNode.deletable) && !currNode.deletable) {
        continue
      }

      nodeChanges.push(createNodeRemoveChange(currNode.id))

      if (removeConnectedEdges) {
        createEdgeRemovalChanges([currNode])
      }

      if (removeChildren) {
        createChildrenRemovalChanges(currNode.id)
      }
    }

    if (edgeChanges.length) {
      state.hooks.edgesChange.trigger(edgeChanges)
    }

    if (nodeChanges.length) {
      state.hooks.nodesChange.trigger(nodeChanges)
    }
  }

  const removeEdges: Actions['removeEdges'] = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges
    const edgesToRemove = Array.isArray(nextEdges) ? nextEdges : [nextEdges]

    const changes: EdgeRemoveChange[] = []

    for (const item of edgesToRemove) {
      const currEdge = typeof item === 'string' ? getEdge(item) : item

      if (!currEdge) {
        continue
      }

      if (isDef(currEdge.deletable) && !currEdge.deletable) {
        continue
      }

      changes.push(
        createEdgeRemoveChange(
          typeof item === 'string' ? item : item.id,
          currEdge.source,
          currEdge.target,
          currEdge.sourceHandle,
          currEdge.targetHandle,
        ),
      )
    }

    state.hooks.edgesChange.trigger(changes)
  }

  const updateEdge: Actions['updateEdge'] = (id, edgeUpdate, options = { replace: false }) => {
    const edge = getEdge(id)

    if (!edge) {
      return
    }

    const nextEdge = typeof edgeUpdate === 'function' ? edgeUpdate(edge) : edgeUpdate

    if (options.replace) {
      state.edges.splice(state.edges.indexOf(edge), 1, nextEdge as GraphEdge)
    } else {
      Object.assign(edge, nextEdge)
    }
  }

  const updateEdgeData: Actions['updateEdgeData'] = (id, dataUpdate, options = { replace: false }) => {
    const edge = getEdge(id)

    if (!edge) {
      return
    }

    const nextData = typeof dataUpdate === 'function' ? dataUpdate(edge) : dataUpdate

    edge.data = options.replace ? nextData : { ...edge.data, ...nextData }
  }

  const applyNodeChanges: Actions['applyNodeChanges'] = (changes) => {
    return applyChanges(changes, state.nodes)
  }

  const applyEdgeChanges: Actions['applyEdgeChanges'] = (changes) => {
    const changedEdges = applyChanges(changes, state.edges)

    updateConnectionLookup(state.connectionLookup, changedEdges)

    return changedEdges
  }

  // todo: maybe we should use a more immutable approach, this is a bit too much mutation and hard to maintain
  const updateNode: Actions['updateNode'] = (id, nodeUpdate, options = { replace: false }) => {
    const node = getNode(id)

    if (!node) {
      return
    }

    const nextNode = typeof nodeUpdate === 'function' ? nodeUpdate(node) : nodeUpdate

    if (options.replace) {
      state.nodes.splice(state.nodes.indexOf(node), 1, nextNode as GraphNode)
    } else {
      Object.assign(node, nextNode)
    }
  }

  const updateNodeData: Actions['updateNodeData'] = (id, dataUpdate, options = { replace: false }) => {
    const node = getNode(id)

    if (!node) {
      return
    }

    const nextData = typeof dataUpdate === 'function' ? dataUpdate(node) : dataUpdate

    node.data = options.replace ? nextData : { ...node.data, ...nextData }
  }

  const startConnection: Actions['startConnection'] = (startHandle, position, isClick = false) => {
    if (isClick) {
      state.connectionClickStartHandle = startHandle
    } else {
      state.connectionStartHandle = startHandle
    }

    state.connectionEndHandle = null
    state.connectionStatus = null

    if (position) {
      state.connectionPosition = position
    }
  }

  const updateConnection: Actions['updateConnection'] = (position, result = null, status = null) => {
    if (state.connectionStartHandle) {
      state.connectionPosition = position
      state.connectionEndHandle = result
      state.connectionStatus = status
    }
  }

  const endConnection: Actions['endConnection'] = (event, isClick) => {
    state.connectionPosition = { x: Number.NaN, y: Number.NaN }
    state.connectionEndHandle = null
    state.connectionStatus = null

    if (isClick) {
      state.connectionClickStartHandle = null
    } else {
      state.connectionStartHandle = null
    }
  }

  const getNodeRect = (
    nodeOrRect: (Partial<Node> & { id: Node['id'] }) | Rect,
  ): [Rect | null, Node | null | undefined, boolean] => {
    const isRectObj = isRect(nodeOrRect)
    const node = isRectObj ? null : isGraphNode(nodeOrRect as GraphNode) ? (nodeOrRect as GraphNode) : getNode(nodeOrRect.id)

    if (!isRectObj && !node) {
      return [null, null, isRectObj]
    }

    const nodeRect = isRectObj ? nodeOrRect : nodeToRect(node!)

    return [nodeRect, node, isRectObj]
  }

  const getIntersectingNodes: Actions['getIntersectingNodes'] = (nodeOrRect, partially = true, nodes = state.nodes) => {
    const [nodeRect, node, isRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) {
      return []
    }

    const intersections: GraphNode[] = []
    for (const n of nodes || state.nodes) {
      if (!isRect && (n.id === node!.id || !n.computedPosition)) {
        continue
      }

      const currNodeRect = nodeToRect(n)
      const overlappingArea = getOverlappingArea(currNodeRect, nodeRect)
      const partiallyVisible = partially && overlappingArea > 0

      if (partiallyVisible || overlappingArea >= Number(nodeRect.width) * Number(nodeRect.height)) {
        intersections.push(n)
      }
    }

    return intersections
  }

  const isNodeIntersecting: Actions['isNodeIntersecting'] = (nodeOrRect, area, partially = true) => {
    const [nodeRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) {
      return false
    }

    const overlappingArea = getOverlappingArea(nodeRect, area)
    const partiallyVisible = partially && overlappingArea > 0

    return partiallyVisible || overlappingArea >= Number(nodeRect.width) * Number(nodeRect.height)
  }

  const panBy: Actions['panBy'] = (delta) => {
    const { viewport, dimensions, d3Zoom, d3Selection, translateExtent } = state

    if (!d3Zoom || !d3Selection || (!delta.x && !delta.y)) {
      return false
    }

    const nextTransform = zoomIdentity.translate(viewport.x + delta.x, viewport.y + delta.y).scale(viewport.zoom)

    const extent: CoordinateExtent = [
      [0, 0],
      [dimensions.width, dimensions.height],
    ]

    const constrainedTransform = d3Zoom.constrain()(nextTransform, extent, translateExtent)

    const transformChanged =
      state.viewport.x !== constrainedTransform.x ||
      state.viewport.y !== constrainedTransform.y ||
      state.viewport.zoom !== constrainedTransform.k

    d3Zoom.transform(d3Selection, constrainedTransform)

    return transformChanged
  }

  const setState: Actions['setState'] = (options) => {
    const opts = options instanceof Function ? options(state) : options

    // we need to set the default opts before setting any elements so the options are applied to the elements on first render
    if (isDef(opts.defaultEdgeOptions)) {
      state.defaultEdgeOptions = opts.defaultEdgeOptions
    }

    if (opts.nodes || opts.edges) {
      if (opts.nodes) {
        setNodes(opts.nodes)
      }

      if (opts.edges) {
        setEdges(opts.edges)
      }
    }

    const setSkippedOptions = () => {
      if (isDef(opts.maxZoom)) {
        setMaxZoom(opts.maxZoom)
      }
      if (isDef(opts.minZoom)) {
        setMinZoom(opts.minZoom)
      }
      if (isDef(opts.translateExtent)) {
        setTranslateExtent(opts.translateExtent)
      }
    }

    for (const o of Object.keys(opts)) {
      const key = o as keyof State
      const option = opts[key]

      if (!storeOptionsToSkip.includes(key) && isDef(option)) {
        ;(<any>state)[key] = option
      }
    }

    until(() => state.d3Zoom)
      .not.toBeNull()
      .then(setSkippedOptions)

    if (!state.initialized) {
      state.initialized = true
    }
  }

  const toObject: Actions['toObject'] = () => {
    const nodes: Node[] = []

    for (const node of state.nodes) {
      const {
        computedPosition: _,
        handleBounds: __,
        selected: ___,
        dimensions: ____,
        isParent: _____,
        resizing: ______,
        dragging: _______,
        ...rest
      } = node

      nodes.push(rest)
    }

    // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
    return JSON.parse(
      JSON.stringify({
        nodes,
        edges: state.edges,
        position: [state.viewport.x, state.viewport.y],
        zoom: state.viewport.zoom,
        viewport: state.viewport,
      } as FlowExportObject),
    )
  }

  const fromObject: Actions['fromObject'] = (obj) => {
    return new Promise((resolve) => {
      const { nodes, edges, viewport } = obj

      if (nodes) {
        setNodes(nodes)
      }

      if (edges) {
        setEdges(edges)
      }

      if (viewport?.x && viewport?.y) {
        const x = viewport?.x
        const y = viewport?.y
        const nextZoom = viewport?.zoom || state.viewport.zoom

        return until(() => viewportHelper.value.viewportInitialized)
          .toBe(true)
          .then(() => {
            viewportHelper.value
              .setViewport({
                x,
                y,
                zoom: nextZoom,
              })
              .then(() => {
                resolve(true)
              })
          })
      } else {
        resolve(true)
      }
    })
  }

  const $reset: Actions['$reset'] = () => {
    const resetState = useState()

    state.edges = []
    state.nodes = []

    // reset the zoom state
    if (state.d3Zoom && state.d3Selection) {
      const updatedTransform = zoomIdentity
        .translate(resetState.defaultViewport.x ?? 0, resetState.defaultViewport.y ?? 0)
        .scale(clamp(resetState.defaultViewport.zoom ?? 1, resetState.minZoom, resetState.maxZoom))

      const bbox = state.viewportRef!.getBoundingClientRect()

      const extent: CoordinateExtent = [
        [0, 0],
        [bbox.width, bbox.height],
      ]

      const constrainedTransform = state.d3Zoom.constrain()(updatedTransform, extent, resetState.translateExtent)
      state.d3Zoom.transform(state.d3Selection, constrainedTransform)
    }

    setState(resetState)
  }

  return {
    updateNodePositions,
    updateNodeDimensions,
    setNodes,
    setEdges,
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
    getNode,
    getEdge,
    updateEdge,
    updateEdgeData,
    updateNode,
    updateNodeData,
    applyEdgeChanges,
    applyNodeChanges,
    addSelectedNodes,
    addSelectedEdges,
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    setNodeExtent,
    setPaneClickDistance,
    removeSelectedNodes,
    removeSelectedEdges,
    startConnection,
    updateConnection,
    endConnection,
    setInteractive,
    setState,
    getIntersectingNodes,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    isNodeIntersecting,
    panBy,
    fitView: (params) => viewportHelper.value.fitView(params),
    zoomIn: (transitionOpts) => viewportHelper.value.zoomIn(transitionOpts),
    zoomOut: (transitionOpts) => viewportHelper.value.zoomOut(transitionOpts),
    zoomTo: (zoomLevel, transitionOpts) => viewportHelper.value.zoomTo(zoomLevel, transitionOpts),
    setViewport: (params, transitionOpts) => viewportHelper.value.setViewport(params, transitionOpts),
    getViewport: () => viewportHelper.value.getViewport(),
    setCenter: (x, y, opts) => viewportHelper.value.setCenter(x, y, opts),
    fitBounds: (params, opts) => viewportHelper.value.fitBounds(params, opts),
    project: (params) => viewportHelper.value.project(params),
    screenToFlowCoordinate: (params) => viewportHelper.value.screenToFlowCoordinate(params),
    flowToScreenCoordinate: (params) => viewportHelper.value.flowToScreenCoordinate(params),
    toObject,
    fromObject,
    updateNodeInternals,
    $reset,
    $destroy: () => {},
  }
}
