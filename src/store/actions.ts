import microDiff from 'microdiff'
import { Elements, FlowActions, FlowGetters, FlowState } from '~/types'
import { getConnectedEdges, getNodesInside, getRectOfNodes, parseElements, processElements } from '~/utils'

export default (state: FlowState, getters: FlowGetters): FlowActions => {
  const setElements: FlowActions['setElements'] = async (elements, force = true) => {
    const { nodes, edges } = parseElements(elements, state.elements, state.nodeExtent)
    if (force) state.elements = []
    await processElements([...nodes, ...edges], (processed) => {
      state.elements = [...state.elements, ...processed]
    })
    state.hooks.elementsProcessed.trigger(state.elements)
  }
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
    const selectedElementsUpdated = microDiff(selectedElementsArr, state.selectedElements ?? []).length
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
  const addElements: FlowActions['addElements'] = (elements: Elements) => {
    setElements(elements, false)
  }
  const setState: FlowActions['setState'] = (newState) => {
    if (typeof newState.loading !== 'undefined') state.loading = newState.loading
    if (typeof newState.panOnScroll !== 'undefined') state.panOnScroll = newState.panOnScroll
    if (typeof newState.panOnScrollMode !== 'undefined') state.panOnScrollMode = newState.panOnScrollMode
    if (typeof newState.panOnScrollSpeed !== 'undefined') state.panOnScrollSpeed = newState.panOnScrollSpeed
    if (typeof newState.paneMoveable !== 'undefined') state.paneMoveable = newState.paneMoveable
    if (typeof newState.zoomOnScroll !== 'undefined') state.zoomOnScroll = newState.zoomOnScroll
    if (typeof newState.preventScrolling !== 'undefined') state.preventScrolling = newState.preventScrolling
    if (typeof newState.zoomOnDoubleClick !== 'undefined') state.zoomOnDoubleClick = newState.zoomOnDoubleClick
    if (typeof newState.zoomOnPinch !== 'undefined') state.zoomOnPinch = newState.zoomOnPinch
    if (typeof newState.defaultZoom !== 'undefined') state.defaultZoom = newState.defaultZoom
    if (typeof newState.defaultPosition !== 'undefined') state.defaultPosition = newState.defaultPosition
    if (typeof newState.edgeTypes !== 'undefined') state.edgeTypes = newState.edgeTypes
    if (typeof newState.nodeTypes !== 'undefined') state.nodeTypes = newState.nodeTypes
    if (typeof newState.storageKey !== 'undefined') state.storageKey = newState.storageKey
    if (typeof newState.edgeUpdaterRadius !== 'undefined') state.edgeUpdaterRadius = newState.edgeUpdaterRadius
    if (typeof newState.elementsSelectable !== 'undefined') state.elementsSelectable = newState.elementsSelectable
    if (typeof newState.onlyRenderVisibleElements !== 'undefined')
      state.onlyRenderVisibleElements = newState.onlyRenderVisibleElements
    if (typeof newState.edgesUpdatable !== 'undefined') state.edgesUpdatable = newState.edgesUpdatable
    if (typeof newState.nodesConnectable !== 'undefined') state.nodesConnectable = newState.nodesConnectable
    if (typeof newState.nodesDraggable !== 'undefined') state.nodesDraggable = newState.nodesDraggable
    if (typeof newState.arrowHeadColor !== 'undefined') state.arrowHeadColor = newState.arrowHeadColor
    if (typeof newState.markerEndId !== 'undefined') state.markerEndId = newState.markerEndId
    if (typeof newState.deleteKeyCode !== 'undefined') state.deleteKeyCode = newState.deleteKeyCode
    if (typeof newState.selectionKeyCode !== 'undefined') state.selectionKeyCode = newState.selectionKeyCode
    if (typeof newState.zoomActivationKeyCode !== 'undefined') state.zoomActivationKeyCode = newState.zoomActivationKeyCode
    if (typeof newState.multiSelectionKeyCode !== 'undefined') state.multiSelectionKeyCode = newState.multiSelectionKeyCode
    if (typeof newState.snapToGrid !== 'undefined') state.snapToGrid = newState.snapToGrid
    if (typeof newState.snapGrid !== 'undefined') state.snapGrid = newState.snapGrid
    if (typeof newState.nodeExtent !== 'undefined') state.nodeExtent = newState.nodeExtent
    if (!state.isReady)
      until(() => state.d3Zoom)
        .not.toBeUndefined()
        .then(() => {
          if (typeof newState.maxZoom !== 'undefined') setMaxZoom(newState.maxZoom)
          if (typeof newState.minZoom !== 'undefined') setMinZoom(newState.minZoom)
          if (typeof newState.translateExtent !== 'undefined') setTranslateExtent(newState.translateExtent)
        })
    else {
      if (typeof newState.maxZoom !== 'undefined') setMaxZoom(newState.maxZoom)
      if (typeof newState.minZoom !== 'undefined') setMinZoom(newState.minZoom)
      if (typeof newState.translateExtent !== 'undefined') setTranslateExtent(newState.translateExtent)
    }
  }
  return {
    setElements,
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
    addElements,
    setState,
  }
}
