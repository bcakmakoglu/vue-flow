import { CoordinateExtent, FlowActions, FlowGetters, FlowState, GraphNode, Node } from '~/types'
import { getConnectedEdges, getNodesInside, getRectOfNodes, isEdge, isNode, parseEdge, parseNode } from '~/utils'

export default (state: FlowState, getters: FlowGetters): FlowActions => {
  const setUserSelection: FlowActions['setUserSelection'] = (mousePos) => {
    state.selectionActive = true
    state.userSelectionRect = {
      width: 0,
      height: 0,
      startX: mousePos.x,
      startY: mousePos.y,
      x: mousePos.x,
      y: mousePos.y,
      draw: true,
    }
  }
  const updateUserSelection: FlowActions['updateUserSelection'] = (mousePos) => {
    const startX = state.userSelectionRect.startX
    const startY = state.userSelectionRect.startY

    state.selectedElements?.forEach((el) => isNode(el) && (el.selected = undefined))
    const nextUserSelectRect: FlowState['userSelectionRect'] = {
      ...state.userSelectionRect,
      x: mousePos.x < startX ? mousePos.x : state.userSelectionRect.x,
      y: mousePos.y < startY ? mousePos.y : state.userSelectionRect.y,
      width: Math.abs(mousePos.x - startX),
      height: Math.abs(mousePos.y - startY),
    }
    const selectedNodes = getNodesInside(getters.getNodes.value, state.userSelectionRect, state.transform)
    const selectedEdges = getConnectedEdges(selectedNodes, getters.getEdges.value)

    const nextSelectedElements = [...selectedNodes, ...selectedEdges]
    nextSelectedElements.forEach((el) => isNode(el) && (el.selected = true))
    state.userSelectionRect = nextUserSelectRect
    state.selectedElements = nextSelectedElements
  }
  const unsetUserSelection: FlowActions['unsetUserSelection'] = () => {
    state.selectionActive = false
    state.userSelectionRect.draw = false

    if (!getters.getSelectedNodes || getters.getSelectedNodes.value.length === 0) {
      state.selectedElements = undefined
      state.hooks.selectionChange.trigger(undefined)
      state.nodesSelectionActive = false
    } else {
      state.selectedNodesBbox = getRectOfNodes(getters.getSelectedNodes.value)
      state.nodesSelectionActive = true
    }
  }
  const addSelectedElements: FlowActions['addSelectedElements'] = (elements: any) => {
    const selectedElementsArr = Array.isArray(elements) ? elements : [elements]
    const selectedElementsUpdated = selectedElementsArr.filter(
      (el) => !state.selectedElements?.some((e) => el.id === e.id),
    ).length
    state.selectedElements = selectedElementsUpdated ? selectedElementsArr : state.selectedElements
    if (selectedElementsUpdated) state.hooks.selectionChange.trigger(selectedElementsArr)
  }
  const initD3Zoom: FlowActions['initD3Zoom'] = ({ d3ZoomHandler, d3Zoom, d3Selection }) => {
    state.d3Zoom = d3Zoom
    state.d3Selection = d3Selection
    state.d3ZoomHandler = d3ZoomHandler
  }
  const setMinZoom: FlowActions['setMinZoom'] = (minZoom: any) => {
    state.d3Zoom?.scaleExtent([minZoom, state.maxZoom])
    state.minZoom = minZoom
  }
  const setMaxZoom: FlowActions['setMaxZoom'] = (maxZoom: any) => {
    state.d3Zoom?.scaleExtent([state.minZoom, maxZoom])
    state.maxZoom = maxZoom
  }
  const setTranslateExtent: FlowActions['setTranslateExtent'] = (translateExtent: any) => {
    state.d3Zoom?.translateExtent(translateExtent)
    state.translateExtent = translateExtent
  }
  const resetSelectedElements: FlowActions['resetSelectedElements'] = () => {
    state.selectedElements = undefined
  }
  const unsetNodesSelection: FlowActions['unsetNodesSelection'] = () => {
    state.nodesSelectionActive = false
  }
  const updateSize: FlowActions['updateSize'] = (size) => {
    state.dimensions = size
  }
  const setConnectionNodeId: FlowActions['setConnectionNodeId'] = ({
    connectionHandleId,
    connectionHandleType,
    connectionNodeId,
  }) => {
    state.connectionNodeId = connectionNodeId
    state.connectionHandleId = connectionHandleId
    state.connectionHandleType = connectionHandleType
  }
  const setInteractive: FlowActions['setInteractive'] = (isInteractive) => {
    state.nodesDraggable = isInteractive
    state.nodesConnectable = isInteractive
    state.elementsSelectable = isInteractive
  }
  const setNodes: FlowActions['setNodes'] = (nodes, extent: CoordinateExtent) => {
    const parseChildren = (n: Node, arr: GraphNode[] = []) => {
      arr.concat(parseNode(n, extent))
      if (n.children && n.children.length) {
        n.children.forEach((c) => parseChildren(c))
      } else {
        return arr
      }
    }
    nodes = nodes.flatMap((node) => {
      const parsed = parseNode(node, extent)
      const children: GraphNode[] = []
      if (node.children && node.children.length) {
        node.children.forEach((c) => parseChildren(c, children))
      }
      return [parsed, ...children]
    })
    state.nodes = <GraphNode[]>nodes
  }
  const setEdges: FlowActions['setEdges'] = (edges) => {
    state.edges = edges.flatMap((edge) => {
      const parsed = parseEdge(edge)

      const sourceNode = getters.getNode.value(edge.source)!
      const targetNode = getters.getNode.value(edge.target)!
      if (!sourceNode || typeof sourceNode === 'undefined')
        console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
      if (!targetNode || typeof targetNode === 'undefined')
        console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

      return {
        ...parsed,
        sourceNode,
        targetNode,
      }
    })
  }

  const setElements: FlowActions['setElements'] = (elements, extent) => {
    setNodes(elements.filter(isNode), extent)
    setEdges(elements.filter(isEdge))
  }

  const setState: FlowActions['setState'] = (opts) => {
    if (typeof opts.elements !== 'undefined') setElements(opts.elements, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.nodes !== 'undefined') setNodes(opts.nodes, opts.nodeExtent ?? state.nodeExtent)
    if (typeof opts.edges !== 'undefined') setEdges(opts.edges)
    if (typeof opts.loading !== 'undefined') state.loading = opts.loading
    if (typeof opts.panOnScroll !== 'undefined') state.panOnScroll = opts.panOnScroll
    if (typeof opts.panOnScrollMode !== 'undefined') state.panOnScrollMode = opts.panOnScrollMode
    if (typeof opts.panOnScrollSpeed !== 'undefined') state.panOnScrollSpeed = opts.panOnScrollSpeed
    if (typeof opts.paneMoveable !== 'undefined') state.paneMoveable = opts.paneMoveable
    if (typeof opts.zoomOnScroll !== 'undefined') state.zoomOnScroll = opts.zoomOnScroll
    if (typeof opts.preventScrolling !== 'undefined') state.preventScrolling = opts.preventScrolling
    if (typeof opts.zoomOnDoubleClick !== 'undefined') state.zoomOnDoubleClick = opts.zoomOnDoubleClick
    if (typeof opts.zoomOnPinch !== 'undefined') state.zoomOnPinch = opts.zoomOnPinch
    if (typeof opts.defaultZoom !== 'undefined') state.defaultZoom = opts.defaultZoom
    if (typeof opts.defaultPosition !== 'undefined') state.defaultPosition = opts.defaultPosition
    if (typeof opts.edgeTypes !== 'undefined') state.edgeTypes = opts.edgeTypes
    if (typeof opts.nodeTypes !== 'undefined') state.nodeTypes = opts.nodeTypes
    if (typeof opts.storageKey !== 'undefined') state.storageKey = opts.storageKey
    if (typeof opts.edgeUpdaterRadius !== 'undefined') state.edgeUpdaterRadius = opts.edgeUpdaterRadius
    if (typeof opts.elementsSelectable !== 'undefined') state.elementsSelectable = opts.elementsSelectable
    if (typeof opts.onlyRenderVisibleElements !== 'undefined') state.onlyRenderVisibleElements = opts.onlyRenderVisibleElements
    if (typeof opts.edgesUpdatable !== 'undefined') state.edgesUpdatable = opts.edgesUpdatable
    if (typeof opts.nodesConnectable !== 'undefined') state.nodesConnectable = opts.nodesConnectable
    if (typeof opts.nodesDraggable !== 'undefined') state.nodesDraggable = opts.nodesDraggable
    if (typeof opts.arrowHeadColor !== 'undefined') state.arrowHeadColor = opts.arrowHeadColor
    if (typeof opts.markerEndId !== 'undefined') state.markerEndId = opts.markerEndId
    if (typeof opts.deleteKeyCode !== 'undefined') state.deleteKeyCode = opts.deleteKeyCode
    if (typeof opts.selectionKeyCode !== 'undefined') state.selectionKeyCode = opts.selectionKeyCode
    if (typeof opts.zoomActivationKeyCode !== 'undefined') state.zoomActivationKeyCode = opts.zoomActivationKeyCode
    if (typeof opts.multiSelectionKeyCode !== 'undefined') state.multiSelectionKeyCode = opts.multiSelectionKeyCode
    if (typeof opts.snapToGrid !== 'undefined') state.snapToGrid = opts.snapToGrid
    if (typeof opts.snapGrid !== 'undefined') state.snapGrid = opts.snapGrid
    if (typeof opts.nodeExtent !== 'undefined') state.nodeExtent = opts.nodeExtent
    if (!state.isReady)
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
  }
  return {
    setElements,
    setNodes,
    setEdges,
    setUserSelection,
    updateUserSelection,
    unsetUserSelection,
    addSelectedElements,
    initD3Zoom,
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    resetSelectedElements,
    unsetNodesSelection,
    updateSize,
    setConnectionNodeId,
    setInteractive,
    setState,
  }
}
