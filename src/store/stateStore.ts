import microDiff from 'microdiff'
import { setActivePinia, createPinia, defineStore, StoreDefinition, acceptHMRUpdate } from 'pinia'
import { FlowState, Node, FlowActions, Elements, FlowGetters, GraphNode, NextElements, GraphEdge } from '~/types'
import {
  clampPosition,
  getDimensions,
  getConnectedEdges,
  getNodesInside,
  getRectOfNodes,
  parseElements,
  defaultNodeTypes,
  defaultEdgeTypes,
  deepUnref,
  getHandleBounds,
  isGraphNode,
  getSourceTargetNodes,
} from '~/utils'
import parseElementsWorker from '~/workers/parseElements'

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
      getNodes(): Node[] {
        const n = this.onlyRenderVisibleElements
          ? this.nodes &&
            getNodesInside(
              this.nodes,
              {
                x: 0,
                y: 0,
                width: this.dimensions.width,
                height: this.dimensions.height,
              },
              this.transform,
              true,
            )
          : this.nodes

        return n.filter((node) => !node.isHidden)
      },
      getEdges(): GraphEdge[] {
        return this.edges
          .filter((edge) => !edge.isHidden)
          .map((edge) => {
            const { sourceNode, targetNode } = getSourceTargetNodes(edge, this.getNodes)
            if (!sourceNode) console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
            if (!targetNode) console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

            return {
              ...edge,
              sourceTargetNodes: {
                sourceNode,
                targetNode,
              },
            }
          })
          .filter(({ sourceTargetNodes: { sourceNode, targetNode } }) => !!(sourceNode && targetNode))
      },
    },
    actions: {
      async setElements(elements) {
        let next: NextElements = {
          nextEdges: [],
          nextNodes: [],
        }
        if (!this.worker || import.meta.env.SSR || typeof window === 'undefined') {
          next = await parseElements(elements, this.nodes, this.edges, this.nodeExtent)
        } else if (this.worker) {
          const { workerFn, workerTerminate } = parseElementsWorker()
          const res = await workerFn(
            deepUnref(elements),
            deepUnref(this.nodes),
            deepUnref(this.edges),
            deepUnref(this.nodeExtent),
          ).catch((err) => {
            console.error(err)
            workerTerminate('ERROR')
          })
          if (res) {
            workerTerminate('SUCCESS')
            next = res
          } else next = await parseElements(elements, this.nodes, this.edges, this.nodeExtent)
        } else {
          next = await parseElements(elements, this.nodes, this.edges, this.nodeExtent)
        }
        this.elements = [...next.nextNodes, ...next.nextEdges]
        this.nodes = next.nextNodes ?? []
        this.edges = next.nextEdges ?? []
      },
      updateNodeDimensions({ id, nodeElement, forceUpdate }) {
        const i = this.nodes.map((x) => x.id).indexOf(id)
        const node = this.nodes[i]
        const dimensions = getDimensions(nodeElement)

        const doUpdate =
          dimensions.width &&
          dimensions.height &&
          (node.__vf?.width !== dimensions.width || node.__vf?.height !== dimensions.height || forceUpdate)

        if (doUpdate) {
          const handleBounds = getHandleBounds(nodeElement, this.transform[2])

          this.nodes.splice(i, 1, {
            ...node,
            __vf: {
              ...node.__vf,
              ...dimensions,
              handleBounds,
            },
          })
        }
      },
      updateNodePos({ id, pos }) {
        const i = this.nodes.map((x) => x.id).indexOf(id)
        const node = this.nodes[i]

        if (this.snapToGrid) {
          const [gridSizeX, gridSizeY] = this.snapGrid
          pos = {
            x: gridSizeX * Math.round(pos.x / gridSizeX),
            y: gridSizeY * Math.round(pos.y / gridSizeY),
          }
        }

        this.nodes.splice(i, 1, {
          ...node,
          __vf: {
            ...node.__vf,
            position: pos,
          },
        })
      },
      updateNodePosDiff({ id, diff, isDragging }) {
        const update = (node: GraphNode, i: number) => {
          const updatedNode: GraphNode = {
            ...node,
            __vf: {
              ...node.__vf,
              isDragging,
            },
          }

          if (diff && node.__vf) {
            updatedNode.__vf!.position = {
              x: node.__vf.position.x + diff.x,
              y: node.__vf.position.y + diff.y,
            }
          }

          this.nodes.splice(i, 1, {
            ...node,
            ...updatedNode,
          })
        }

        if (!id) {
          const selectedNodes = this.nodes.filter((x) => this.selectedElements?.find((sNode) => sNode?.id === x.id))
          selectedNodes.forEach((node) => {
            const i = this.nodes.map((x) => x.id).indexOf(node.id)
            update(node, i)
          })
        } else {
          const i = this.nodes.map((x) => x.id).indexOf(id)
          const node = this.nodes[i]
          update(node, i)
        }
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

        const selectedNodes = getNodesInside(this.nodes, nextUserSelectRect, this.transform)
        const selectedEdges = getConnectedEdges(selectedNodes, this.edges)

        const nextSelectedElements = [...selectedNodes, ...selectedEdges]
        this.userSelectionRect = nextUserSelectRect
        this.selectedElements = nextSelectedElements
      },
      unsetUserSelection() {
        const selectedNodes = this.selectedElements?.filter((node) => node && isGraphNode(node) && node.__vf) as GraphNode[]

        this.selectionActive = false
        this.userSelectionRect.draw = false

        if (!selectedNodes || selectedNodes.length === 0) {
          this.selectedElements = undefined
          this.nodesSelectionActive = false
        } else {
          this.selectedNodesBbox = getRectOfNodes(selectedNodes)
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
        this.nodes = this.nodes.map((node) => {
          return {
            ...node,
            __vf: {
              ...node.__vf,
              position: node.__vf?.position ? clampPosition(node.__vf.position, nodeExtent) : { x: 0, y: 0 },
            },
          }
        })
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
      async addElements(elements: Elements) {
        const { nextNodes, nextEdges } = await parseElements(elements, this.nodes, this.edges, this.nodeExtent)
        this.elements = [...this.elements, ...nextNodes, ...nextEdges]
        this.nodes = [...this.nodes, ...nextNodes]
        this.edges = [...this.edges, ...nextEdges]
      },
    },
  })

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
  }

  return store
}
