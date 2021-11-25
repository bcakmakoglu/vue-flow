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
        edges.forEach((edge, i, arr) => {
          const { sourceNode, targetNode } = getSourceTargetNodes(edge, nodes)
          if (!sourceNode) console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
          if (!targetNode) console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

          arr[i] = {
            ...edge,
            sourceNode,
            targetNode,
          }
        })
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
        edges.forEach((edge, i, arr) => {
          const { sourceNode, targetNode } = getSourceTargetNodes(edge, nodes)
          if (!sourceNode) console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
          if (!targetNode) console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

          arr[i] = {
            ...edge,
            sourceNode,
            targetNode,
          }
        })
        this.elements = [...this.elements, ...nodes, ...edges]
      },
      async setState(state) {
        if (state.panOnScroll) this.panOnScroll = state.panOnScroll
        if (state.panOnScrollMode) this.panOnScrollMode = state.panOnScrollMode
        if (state.panOnScrollSpeed) this.panOnScrollSpeed = state.panOnScrollSpeed
        if (state.paneMoveable) this.paneMoveable = state.paneMoveable
        if (state.zoomOnScroll) this.zoomOnScroll = state.zoomOnScroll
        if (state.preventScrolling) this.preventScrolling = state.preventScrolling
        if (state.zoomOnDoubleClick) this.zoomOnDoubleClick = state.zoomOnDoubleClick
        if (state.zoomOnPinch) this.zoomOnPinch = state.zoomOnPinch
        if (state.defaultZoom) this.defaultZoom = state.defaultZoom
        if (state.defaultPosition) this.defaultPosition = state.defaultPosition
        if (state.edgeTypes) this.edgeTypes = state.edgeTypes
        if (state.nodeTypes) this.nodeTypes = state.nodeTypes
        if (state.storageKey) this.storageKey = state.storageKey
        if (state.edgeUpdaterRadius) this.edgeUpdaterRadius = state.edgeUpdaterRadius
        if (state.elementsSelectable) this.elementsSelectable = state.elementsSelectable
        if (state.onlyRenderVisibleElements) this.onlyRenderVisibleElements = state.onlyRenderVisibleElements
        if (state.nodesConnectable) this.nodesConnectable = state.nodesConnectable
        if (state.nodesDraggable) this.nodesDraggable = state.nodesDraggable
        if (state.arrowHeadColor) this.arrowHeadColor = state.arrowHeadColor
        if (state.markerEndId) this.markerEndId = state.markerEndId
        if (state.deleteKeyCode) this.deleteKeyCode = state.deleteKeyCode
        if (state.selectionKeyCode) this.selectionKeyCode = state.selectionKeyCode
        if (state.zoomActivationKeyCode) this.zoomActivationKeyCode = state.zoomActivationKeyCode
        if (state.multiSelectionKeyCode) this.multiSelectionKeyCode = state.multiSelectionKeyCode
        if (state.snapToGrid) this.snapToGrid = state.snapToGrid
        if (state.snapGrid) this.snapGrid = state.snapGrid
        if (!this.isReady) await until(() => this.d3Zoom).not.toBeUndefined()
        if (state.maxZoom) this.setMaxZoom(state.maxZoom)
        if (state.minZoom) this.setMinZoom(state.minZoom)
        if (state.translateExtent) this.setTranslateExtent(state.translateExtent)
        if (state.nodeExtent) this.setNodeExtent(state.nodeExtent)
      },
    },
  })

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
  }

  return store
}
