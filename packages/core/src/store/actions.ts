import { zoomIdentity } from 'd3-zoom'
import type { ComputedRef } from 'vue'
import { until } from '@vueuse/core'
import { useState } from './state'
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
import { useViewport } from '~/composables'
import {
  ErrorCode,
  VueFlowError,
  addEdgeToStore,
  applyChanges,
  clamp,
  createAdditionChange,
  createGraphNodes,
  createRemoveChange,
  createSelectionChange,
  getConnectedEdges,
  getDimensions,
  getHandleBounds,
  getOverlappingArea,
  getSelectionChanges,
  isDef,
  isEdge,
  isNode,
  isRect,
  nodeToRect,
  parseEdge,
  updateEdgeAction,
} from '~/utils'

export function useActions(
  state: State,
  getters: ComputedGetters,
  nodeIds: ComputedRef<string[]>,
  edgeIds: ComputedRef<string[]>,
): Actions {
  let fitViewOnInitDone = false

  const viewportHelper = $(useViewport(state, getters))

  const updateNodeInternals: Actions['updateNodeInternals'] = (ids) => {
    const updateIds = ids ?? nodeIds.value ?? []

    state.hooks.updateNodeInternals.trigger(updateIds)
  }

  const findNode: Actions['findNode'] = <T extends GraphNode = GraphNode>(id) => {
    if (!id) {
      return
    }

    let node
    if (state.nodes && !nodeIds.value.length) {
      node = state.nodes.find((node) => node.id === id)
    } else {
      node = state.nodes[nodeIds.value.indexOf(id)]
    }

    return node as T | undefined
  }

  const findEdge: Actions['findEdge'] = <T extends GraphEdge = GraphEdge>(id) => {
    if (!id) {
      return
    }

    let edge
    if (state.edges && !edgeIds.value.length) {
      edge = state.edges.find((edge) => edge.id === id)
    } else {
      edge = state.edges[edgeIds.value.indexOf(id)]
    }

    return edge as T | undefined
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
        change.position = node.position

        if (node.parentNode) {
          const parentNode = findNode(node.parentNode)

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
    if (!state.vueFlowRef) {
      return
    }

    const viewportNode = state.vueFlowRef.querySelector('.vue-flow__transformationpane') as HTMLElement

    if (!viewportNode) {
      return
    }

    const style = window.getComputedStyle(viewportNode)

    const { m22 } = new window.DOMMatrixReadOnly(style.transform)

    const zoom = m22

    const changes: NodeDimensionChange[] = updates.reduce<NodeDimensionChange[]>((res, update) => {
      const node = findNode(update.id)

      if (node) {
        const dimensions = getDimensions(update.nodeElement)

        const doUpdate = !!(
          dimensions.width &&
          dimensions.height &&
          (node.dimensions.width !== dimensions.width || node.dimensions.height !== dimensions.height || update.forceUpdate)
        )

        if (doUpdate) {
          node.handleBounds.source = getHandleBounds('.source', update.nodeElement, zoom)
          node.handleBounds.target = getHandleBounds('.target', update.nodeElement, zoom)
          node.dimensions = dimensions
          node.initialized = true

          res.push({
            id: node.id,
            type: 'dimensions',
            dimensions,
          })
        }
      }

      return res
    }, [])

    if (state.fitViewOnInit && !fitViewOnInitDone) {
      until(() => viewportHelper.initialized)
        .toBe(true)
        .then(() => {
          viewportHelper.fitView()
        })

      fitViewOnInitDone = true
    }

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const nodeSelectionHandler = (nodes: GraphNode[], selected: boolean) => {
    const nodeIds = nodes.map((n) => n.id)

    let changedNodes: NodeChange[]
    let changedEdges: EdgeChange[] = []

    if (state.multiSelectionActive) {
      changedNodes = nodeIds.map((nodeId) => createSelectionChange(nodeId, selected))
    } else {
      const selectionChanges = getSelectionChanges([...state.nodes, ...state.edges], nodeIds)
      changedNodes = selectionChanges.changedNodes
      changedEdges = selectionChanges.changedEdges
    }

    if (changedNodes.length) {
      state.hooks.nodesChange.trigger(changedNodes)
    }

    if (changedEdges.length) {
      state.hooks.edgesChange.trigger(changedEdges)
    }
  }

  const edgeSelectionHandler = (edges: GraphEdge[], selected: boolean) => {
    const edgeIds = edges.map((e) => e.id)

    let changedNodes: NodeChange[] = []
    let changedEdges: EdgeChange[]

    if (state.multiSelectionActive) {
      changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, selected))
    } else {
      const selectionChanges = getSelectionChanges([...state.nodes, ...state.edges], edgeIds)
      changedNodes = selectionChanges.changedNodes
      changedEdges = selectionChanges.changedEdges
    }

    if (changedNodes.length) {
      state.hooks.nodesChange.trigger(changedNodes)
    }

    if (changedEdges.length) {
      state.hooks.edgesChange.trigger(changedEdges)
    }
  }

  const elementSelectionHandler = (elements: Elements, selected: boolean) => {
    const nodeIds = elements.filter(isNode).map((n) => n.id)
    const edgeIds = elements.filter(isEdge).map((e) => e.id)

    let { changedNodes, changedEdges } = getSelectionChanges([...state.nodes, ...state.edges], [...nodeIds, ...edgeIds])

    if (state.multiSelectionActive) {
      changedNodes = nodeIds.map((nodeId) => createSelectionChange(nodeId, selected))
      changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, selected))
    }

    if (changedNodes.length) {
      state.hooks.nodesChange.trigger(changedNodes)
    }

    if (changedEdges.length) {
      state.hooks.edgesChange.trigger(changedEdges)
    }
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
    if (!nodes.length) {
      return nodeSelectionHandler(nodes, false)
    }

    const nodeIds = nodes.map((n) => n.id)

    const changedNodes = nodeIds.map((nodeId) => createSelectionChange(nodeId, false))

    if (changedNodes.length) {
      state.hooks.nodesChange.trigger(changedNodes)
    }
  }

  const removeSelectedEdges: Actions['removeSelectedEdges'] = (edges) => {
    if (!edges.length) {
      return edgeSelectionHandler(edges, false)
    }

    const edgeIds = edges.map((e) => e.id)

    const changedEdges = edgeIds.map((edgeId) => createSelectionChange(edgeId, false))

    if (changedEdges.length) {
      state.hooks.edgesChange.trigger(changedEdges)
    }
  }

  const removeSelectedElements: Actions['removeSelectedElements'] = (elements) => {
    if (!elements || !elements.length) {
      return elementSelectionHandler([], false)
    }

    const { changedNodes, changedEdges } = elements.reduce(
      (acc, curr) => {
        const selectionChange = createSelectionChange(curr.id, false)
        if (isNode(curr)) {
          acc.changedNodes.push(selectionChange)
        } else {
          acc.changedEdges.push(selectionChange)
        }

        return acc
      },
      { changedNodes: [] as NodeSelectionChange[], changedEdges: [] as EdgeSelectionChange[] },
    )

    if (changedNodes.length) {
      state.hooks.nodesChange.trigger(changedNodes)
    }
    if (changedEdges.length) {
      state.hooks.edgesChange.trigger(changedEdges)
    }
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

    updateNodeInternals(nodeIds.value)
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

    state.nodes = createGraphNodes(nextNodes, state.nodes, findNode, state.hooks.error.trigger)
  }

  const setEdges: Actions['setEdges'] = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges

    if (!state.initialized && !nextEdges.length) {
      return
    }

    const validEdges = state.isValidConnection
      ? nextEdges.filter((edge) =>
          state.isValidConnection!(edge, {
            edges: state.edges,
            sourceNode: findNode(edge.source)!,
            targetNode: findNode(edge.target)!,
          }),
        )
      : nextEdges

    state.edges = validEdges.reduce<GraphEdge[]>((res, edge) => {
      const sourceNode = findNode(edge.source)
      const targetNode = findNode(edge.target)

      const missingSource = !sourceNode || typeof sourceNode === 'undefined'
      const missingTarget = !targetNode || typeof targetNode === 'undefined'

      if (missingSource && missingTarget) {
        state.hooks.error.trigger(new VueFlowError(ErrorCode.EDGE_SOURCE_TARGET_MISSING, edge.id, edge.source, edge.target))
      } else {
        if (missingSource) {
          state.hooks.error.trigger(new VueFlowError(ErrorCode.EDGE_SOURCE_MISSING, edge.id, edge.source))
        }

        if (missingTarget) {
          state.hooks.error.trigger(new VueFlowError(ErrorCode.EDGE_TARGET_MISSING, edge.id, edge.target))
        }
      }

      if (missingSource || missingTarget) {
        return res
      }

      const storedEdge = findEdge(edge.id)

      res.push({
        ...parseEdge(edge, Object.assign({}, storedEdge, state.defaultEdgeOptions)),
        sourceNode,
        targetNode,
      })

      return res
    }, [])
  }

  const setElements: Actions['setElements'] = (elements) => {
    const nextElements = elements instanceof Function ? elements([...state.nodes, ...state.edges]) : elements

    if (!state.initialized && !nextElements.length) {
      return
    }

    setNodes(nextElements.filter(isNode))
    setEdges(nextElements.filter(isEdge))
  }

  const addNodes: Actions['addNodes'] = (nodes) => {
    let nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes
    nextNodes = Array.isArray(nextNodes) ? nextNodes : [nextNodes]

    const graphNodes = createGraphNodes(nextNodes, state.nodes, findNode, state.hooks.error.trigger)

    const changes = graphNodes.map(createAdditionChange)

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const addEdges: Actions['addEdges'] = (params) => {
    let nextEdges = params instanceof Function ? params(state.edges) : params
    nextEdges = Array.isArray(nextEdges) ? nextEdges : [nextEdges]

    const validEdges = state.isValidConnection
      ? nextEdges.filter((edge) =>
          state.isValidConnection!(edge, {
            edges: state.edges,
            sourceNode: findNode(edge.source)!,
            targetNode: findNode(edge.target)!,
          }),
        )
      : nextEdges

    const changes = validEdges.reduce((acc, param) => {
      const edge = addEdgeToStore(
        {
          ...param,
          ...state.defaultEdgeOptions,
        },
        state.edges,
        state.hooks.error.trigger,
      )

      if (edge) {
        const sourceNode = findNode(edge.source)!
        const targetNode = findNode(edge.target)!

        const missingSource = !sourceNode || typeof sourceNode === 'undefined'
        const missingTarget = !targetNode || typeof targetNode === 'undefined'

        if (missingSource && missingTarget) {
          state.hooks.error.trigger(new VueFlowError(ErrorCode.EDGE_SOURCE_TARGET_MISSING, edge.id, edge.source, edge.target))
        } else {
          if (missingSource) {
            state.hooks.error.trigger(new VueFlowError(ErrorCode.EDGE_SOURCE_MISSING, edge.id, edge.source))
          }

          if (missingTarget) {
            state.hooks.error.trigger(new VueFlowError(ErrorCode.EDGE_TARGET_MISSING, edge.id, edge.target))
          }
        }

        if (missingSource || missingTarget) {
          return acc
        }

        acc.push(
          createAdditionChange<GraphEdge>({
            ...edge,
            sourceNode,
            targetNode,
          }),
        )
      }

      return acc
    }, [] as EdgeChange[])

    if (changes.length) {
      state.hooks.edgesChange.trigger(changes)
    }
  }

  const removeNodes: Actions['removeNodes'] = (nodes, removeConnectedEdges = true) => {
    let nodesToRemove = nodes instanceof Function ? nodes(state.nodes) : nodes
    nodesToRemove = Array.isArray(nodesToRemove) ? nodesToRemove : [nodesToRemove]

    const nodeChanges: NodeRemoveChange[] = []
    const edgeChanges: EdgeRemoveChange[] = []

    nodesToRemove.forEach((item) => {
      const currNode = typeof item === 'string' ? findNode(item) : item

      if (!currNode) {
        return
      }

      if (isDef(currNode.deletable) && !currNode.deletable) {
        return
      }

      nodeChanges.push(createRemoveChange(currNode.id))

      if (removeConnectedEdges) {
        const connections = getConnectedEdges([currNode], state.edges).filter((edge) => {
          if (isDef(edge.deletable)) {
            return edge.deletable
          }
          return true
        })

        edgeChanges.push(...connections.map((connection) => createRemoveChange(connection.id)))
      }
    })

    if (edgeChanges.length) {
      state.hooks.edgesChange.trigger(edgeChanges)
    }

    if (nodeChanges.length) {
      state.hooks.nodesChange.trigger(nodeChanges)
    }
  }

  const removeEdges: Actions['removeEdges'] = (edges) => {
    let edgesToRemove = edges instanceof Function ? edges(state.edges) : edges
    edgesToRemove = Array.isArray(edgesToRemove) ? edgesToRemove : [edgesToRemove]

    const changes: EdgeRemoveChange[] = []

    edgesToRemove.forEach((item) => {
      const currEdge = typeof item === 'string' ? findEdge(item) : item

      if (!currEdge) {
        return
      }

      if (isDef(currEdge.deletable) && !currEdge.deletable) {
        return
      }

      changes.push(createRemoveChange(typeof item === 'string' ? item : item.id))
    })

    state.hooks.edgesChange.trigger(changes)
  }

  const updateEdge: Actions['updateEdge'] = (oldEdge, newConnection, shouldReplaceId = true) =>
    updateEdgeAction(oldEdge, newConnection, state.edges, findEdge, shouldReplaceId, state.hooks.error.trigger)

  const applyNodeChanges: Actions['applyNodeChanges'] = (changes) => applyChanges(changes, state.nodes)

  const applyEdgeChanges: Actions['applyEdgeChanges'] = (changes) => applyChanges(changes, state.edges)

  const startConnection: Actions['startConnection'] = (startHandle, position, event, isClick = false) => {
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
    state.connectionPosition = { x: NaN, y: NaN }
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
    const node = isRectObj ? null : findNode(nodeOrRect.id)

    if (!isRectObj && !node) {
      return [null, null, isRectObj]
    }

    const nodeRect = isRectObj ? nodeOrRect : nodeToRect(node!)

    return [nodeRect, node, isRectObj]
  }

  // todo: rename to `findIntersectingNodes`
  const getIntersectingNodes: Actions['getIntersectingNodes'] = (nodeOrRect, partially = true, nodes) => {
    const [nodeRect, node, isRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) {
      return []
    }

    return (nodes || state.nodes).filter((n) => {
      if (!isRect && (n.id === node!.id || !n.computedPosition)) {
        return false
      }

      const currNodeRect = nodeToRect(n)
      const overlappingArea = getOverlappingArea(currNodeRect, nodeRect)
      const partiallyVisible = partially && overlappingArea > 0

      return partiallyVisible || overlappingArea >= Number(nodeOrRect.width) * Number(nodeOrRect.height)
    })
  }

  const isNodeIntersecting: Actions['isNodeIntersecting'] = (nodeOrRect, area, partially = true) => {
    const [nodeRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) {
      return false
    }

    const overlappingArea = getOverlappingArea(nodeRect, area)
    const partiallyVisible = partially && overlappingArea > 0

    return partiallyVisible || overlappingArea >= Number(nodeOrRect.width) * Number(nodeOrRect.height)
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

    // these options will be set using the appropriate methods
    const skip: (keyof typeof opts)[] = [
      'modelValue',
      'nodes',
      'edges',
      'maxZoom',
      'minZoom',
      'translateExtent',
      'nodeExtent',
      'hooks',
      'defaultEdgeOptions',
    ]

    // these options cannot be set after initialization
    const exclude: (keyof typeof opts)[] = [
      'd3Zoom',
      'd3Selection',
      'd3ZoomHandler',
      'viewportRef',
      'vueFlowRef',
      'dimensions',
      'hooks',
    ]

    // we need to set the default opts before setting any elements so the options are applied to the elements on first render
    if (isDef(opts.defaultEdgeOptions)) {
      state.defaultEdgeOptions = opts.defaultEdgeOptions
    }

    const elements = opts.modelValue || opts.nodes || opts.edges ? ([] as Elements) : undefined

    if (elements) {
      if (opts.modelValue) {
        elements.push(...opts.modelValue)
      }

      if (opts.nodes) {
        elements.push(...opts.nodes)
      }

      if (opts.edges) {
        elements.push(...opts.edges)
      }

      setElements(elements)
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
      if (isDef(opts.nodeExtent)) {
        setNodeExtent(opts.nodeExtent)
      }
    }

    Object.keys(opts).forEach((o) => {
      const key = o as keyof State
      const option = opts[key]

      if (![...skip, ...exclude].includes(key) && isDef(option)) {
        ;(<any>state)[key] = option
      }
    })

    if (!state.d3Zoom) {
      until(() => state.d3Zoom)
        .not.toBeUndefined()
        .then(setSkippedOptions)
    } else {
      setSkippedOptions()
    }

    if (!state.initialized) {
      state.initialized = true
    }
  }

  const fitView: Actions['fitView'] = async (params = { padding: 0.1 }) => {
    await until(() => viewportHelper.initialized).toBe(true)
    viewportHelper.fitView(params)
  }

  const zoomIn: Actions['zoomIn'] = async (options) => {
    await until(() => viewportHelper.initialized).toBe(true)
    viewportHelper.zoomIn(options)
  }

  const zoomOut: Actions['zoomOut'] = async (options) => {
    await until(() => viewportHelper.initialized).toBe(true)
    viewportHelper.zoomOut(options)
  }

  const zoomTo: Actions['zoomTo'] = async (zoomLevel, options) => {
    await until(() => viewportHelper.initialized).toBe(true)
    viewportHelper.zoomTo(zoomLevel, options)
  }

  const setTransform: Actions['setTransform'] = async (transform, options) => {
    await until(() => viewportHelper.initialized).toBe(true)
    viewportHelper.setTransform(transform, options)
  }

  const getTransform: Actions['getTransform'] = () => viewportHelper.getTransform()

  const setCenter: Actions['setCenter'] = async (x, y, options) => {
    await until(() => viewportHelper.initialized).toBe(true)
    viewportHelper.setCenter(x, y, options)
  }

  const fitBounds: Actions['fitBounds'] = async (bounds, options) => {
    await until(() => viewportHelper.initialized).toBe(true)
    viewportHelper.fitBounds(bounds, options)
  }

  const project: Actions['project'] = (position) => viewportHelper.project(position)

  const toObject: Actions['toObject'] = () => {
    // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
    return JSON.parse(
      JSON.stringify({
        nodes: state.nodes.map((n) => {
          // omit internal properties when exporting
          const {
            computedPosition: _,
            handleBounds: __,
            selected: ___,
            dimensions: ____,
            isParent: _____,
            resizing: ______,
            dragging: _______,
            initialized: ________,
            ...rest
          } = n

          return rest
        }),
        edges: state.edges.map((e) => {
          // omit internal properties when exporting
          const { selected: _, sourceNode: __, targetNode: ___, ...rest } = e

          return rest
        }),
        position: [state.viewport.x, state.viewport.y],
        zoom: state.viewport.zoom,
      } as FlowExportObject),
    )
  }

  const fromObject: Actions['fromObject'] = (obj) => {
    const { nodes, edges, position, zoom } = obj

    if (nodes) {
      setNodes(nodes)
    }

    if (edges) {
      setEdges(edges)
    }

    if (position) {
      setTransform({ x: position[0], y: position[1], zoom: zoom || 1 })
    }
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
    panBy,
    fitView,
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform,
    getTransform,
    setCenter,
    fitBounds,
    project,
    toObject,
    fromObject,
    updateNodeInternals,
    $reset,
    $destroy: () => {},
  }
}
