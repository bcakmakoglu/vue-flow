import microDiff from 'microdiff'
import { setActivePinia, createPinia, defineStore, StoreDefinition, acceptHMRUpdate } from 'pinia'
import { FlowState, FlowActions, Elements, FlowGetters, GraphNode, GraphEdge } from '~/types'
import {
  getConnectedEdges,
  getNodesInside,
  getRectOfNodes,
  defaultNodeTypes,
  defaultEdgeTypes,
  isGraphNode,
  getSourceTargetNodes,
  isEdge,
  parseElements,
} from '~/utils'

const pinia = createPinia()

export default (id: string, preloadedState: FlowState) => {
  setActivePinia(pinia)

  const store: StoreDefinition<string, FlowState, FlowGetters, FlowActions> = defineStore({
    id: id ?? 'vue-flow',
    state: () => ({
      ...preloadedState,
    }),
    getters: {
      getEdgeTypes() {
        const edgeTypes: Record<string, any> = {
          ...defaultEdgeTypes,
        }
        this.edgeTypes?.forEach((n) => (edgeTypes[n] = n))
        return edgeTypes
      },
      getNodeTypes() {
        const nodeTypes: Record<string, any> = {
          ...defaultNodeTypes,
        }
        this.nodeTypes?.forEach((n) => (nodeTypes[n] = n))
        return nodeTypes
      },
      getNodes(): GraphNode[] {
        if (this.isReady) {
          const nodes = this.elements.filter((n) => isGraphNode(n) && !n.isHidden) as GraphNode[]
          return this.onlyRenderVisibleElements
            ? nodes &&
                getNodesInside(
                  nodes,
                  {
                    x: 0,
                    y: 0,
                    width: this.dimensions.width,
                    height: this.dimensions.height,
                  },
                  this.transform,
                  true,
                )
            : nodes ?? []
        }
        return []
      },
      getEdges(): GraphEdge[] {
        const edges = this.elements.filter((e) => isEdge(e) && !e.isHidden) as GraphEdge[]
        if (this.isReady) {
          return (
            edges
              .map((edge) => {
                const { sourceNode, targetNode } = getSourceTargetNodes(edge, this.getNodes)
                if (!sourceNode) console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
                if (!targetNode) console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

                return {
                  ...edge,
                  sourceNode,
                  targetNode,
                }
              })
              .filter(({ sourceNode, targetNode }) => !!(sourceNode && targetNode)) ?? []
          )
        }
        return []
      },
      getSelectedNodes(): GraphNode[] {
        return this.selectedElements?.filter(isGraphNode) ?? []
      },
    },
    actions: {
      setElements(elements) {
        const { nodes, edges } = parseElements(elements, this.elements, this.nodeExtent)
        this.elements = [...nodes, ...edges]
      },
      setUserSelection(mousePos) {
        this.selectionActive = true
        this.userSelectionRect = {
          width: 0,
          height: 0,
          startX: mousePos.x,
          startY: mousePos.y,
          x: mousePos.x,
          y: mousePos.y,
          draw: true,
        }
      },
      updateUserSelection(mousePos) {
        const startX = this.userSelectionRect.startX
        const startY = this.userSelectionRect.startY

        const nextUserSelectRect: FlowState['userSelectionRect'] = {
          ...this.userSelectionRect,
          x: mousePos.x < startX ? mousePos.x : this.userSelectionRect.x,
          y: mousePos.y < startY ? mousePos.y : this.userSelectionRect.y,
          width: Math.abs(mousePos.x - startX),
          height: Math.abs(mousePos.y - startY),
        }
        const selectedNodes = getNodesInside(this.getNodes, this.userSelectionRect, this.transform)
        const selectedEdges = getConnectedEdges(selectedNodes, this.getEdges)

        const nextSelectedElements = [...selectedNodes, ...selectedEdges]
        this.userSelectionRect = nextUserSelectRect
        this.selectedElements = nextSelectedElements
      },
      unsetUserSelection() {
        this.selectionActive = false
        this.userSelectionRect.draw = false

        if (!this.getSelectedNodes || this.getSelectedNodes.length === 0) {
          this.selectedElements = undefined
          this.nodesSelectionActive = false
        } else {
          this.selectedNodesBbox = getRectOfNodes(this.getSelectedNodes)
          this.nodesSelectionActive = true
        }
      },
      addSelectedElements(elements) {
        const selectedElementsArr = Array.isArray(elements) ? elements : [elements]
        const selectedElementsUpdated = microDiff(selectedElementsArr, this.selectedElements ?? []).length
        this.selectedElements = selectedElementsUpdated ? selectedElementsArr : this.selectedElements
      },
      initD3Zoom({ d3ZoomHandler, d3Zoom, d3Selection }) {
        this.d3Zoom = d3Zoom
        this.d3Selection = d3Selection
        this.d3ZoomHandler = d3ZoomHandler
      },
      setMinZoom(minZoom) {
        this.d3Zoom?.scaleExtent([minZoom, this.maxZoom])
        this.minZoom = minZoom
      },
      setMaxZoom(maxZoom) {
        this.d3Zoom?.scaleExtent([this.minZoom, maxZoom])
        this.maxZoom = maxZoom
      },
      setTranslateExtent(translateExtent) {
        this.d3Zoom?.translateExtent(translateExtent)
        this.translateExtent = translateExtent
      },
      setNodeExtent(nodeExtent) {
        this.nodeExtent = nodeExtent
      },
      resetSelectedElements() {
        this.selectedElements = undefined
      },
      unsetNodesSelection() {
        this.nodesSelectionActive = false
      },
      updateSize(size) {
        this.dimensions = size
      },
      setConnectionNodeId({ connectionHandleId, connectionHandleType, connectionNodeId }) {
        this.connectionNodeId = connectionNodeId
        this.connectionHandleId = connectionHandleId
        this.connectionHandleType = connectionHandleType
      },
      setInteractive(isInteractive) {
        this.nodesDraggable = isInteractive
        this.nodesConnectable = isInteractive
        this.elementsSelectable = isInteractive
      },
      addElements(elements: Elements) {
        const { nodes, edges } = parseElements(elements, this.elements, this.nodeExtent)
        this.elements = [...this.elements, ...nodes, ...edges]
      },
      setState(state) {
        if (typeof state.panOnScroll !== 'undefined') this.panOnScroll = state.panOnScroll
        if (typeof state.panOnScrollMode !== 'undefined') this.panOnScrollMode = state.panOnScrollMode
        if (typeof state.panOnScrollSpeed !== 'undefined') this.panOnScrollSpeed = state.panOnScrollSpeed
        if (typeof state.paneMoveable !== 'undefined') this.paneMoveable = state.paneMoveable
        if (typeof state.zoomOnScroll !== 'undefined') this.zoomOnScroll = state.zoomOnScroll
        if (typeof state.preventScrolling !== 'undefined') this.preventScrolling = state.preventScrolling
        if (typeof state.zoomOnDoubleClick !== 'undefined') this.zoomOnDoubleClick = state.zoomOnDoubleClick
        if (typeof state.zoomOnPinch !== 'undefined') this.zoomOnPinch = state.zoomOnPinch
        if (typeof state.defaultZoom !== 'undefined') this.defaultZoom = state.defaultZoom
        if (typeof state.defaultPosition !== 'undefined') this.defaultPosition = state.defaultPosition
        if (typeof state.edgeTypes !== 'undefined') this.edgeTypes = state.edgeTypes
        if (typeof state.nodeTypes !== 'undefined') this.nodeTypes = state.nodeTypes
        if (typeof state.storageKey !== 'undefined') this.storageKey = state.storageKey
        if (typeof state.edgeUpdaterRadius !== 'undefined') this.edgeUpdaterRadius = state.edgeUpdaterRadius
        if (typeof state.elementsSelectable !== 'undefined') this.elementsSelectable = state.elementsSelectable
        if (typeof state.onlyRenderVisibleElements !== 'undefined')
          this.onlyRenderVisibleElements = state.onlyRenderVisibleElements
        if (typeof state.nodesConnectable !== 'undefined') this.nodesConnectable = state.nodesConnectable
        if (typeof state.nodesDraggable !== 'undefined') this.nodesDraggable = state.nodesDraggable
        if (typeof state.arrowHeadColor !== 'undefined') this.arrowHeadColor = state.arrowHeadColor
        if (typeof state.markerEndId !== 'undefined') this.markerEndId = state.markerEndId
        if (typeof state.deleteKeyCode !== 'undefined') this.deleteKeyCode = state.deleteKeyCode
        if (typeof state.selectionKeyCode !== 'undefined') this.selectionKeyCode = state.selectionKeyCode
        if (typeof state.zoomActivationKeyCode !== 'undefined') this.zoomActivationKeyCode = state.zoomActivationKeyCode
        if (typeof state.multiSelectionKeyCode !== 'undefined') this.multiSelectionKeyCode = state.multiSelectionKeyCode
        if (typeof state.snapToGrid !== 'undefined') this.snapToGrid = state.snapToGrid
        if (typeof state.snapGrid !== 'undefined') this.snapGrid = state.snapGrid
        if (typeof !this.isReady)
          until(() => this.d3Zoom)
            .not.toBeUndefined()
            .then(() => {
              if (typeof state.maxZoom !== 'undefined') this.setMaxZoom(state.maxZoom)
              if (typeof state.minZoom !== 'undefined') this.setMinZoom(state.minZoom)
              if (typeof state.translateExtent !== 'undefined') this.setTranslateExtent(state.translateExtent)
              if (typeof state.nodeExtent !== 'undefined') this.setNodeExtent(state.nodeExtent)
            })
      },
    },
  })

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
  }

  return store
}
