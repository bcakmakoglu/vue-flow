import { setActivePinia, createPinia, defineStore, StoreDefinition } from 'pinia'
import diff from 'microdiff'
import { Edge, FlowState, Node, FlowActions, Elements, NodeExtent } from '~/types'
import {
  clampPosition,
  getDimensions,
  getConnectedEdges,
  getNodesInside,
  getRectOfNodes,
  isEdge,
  isNode,
  parseEdge,
  parseNode,
} from '~/utils'
import { getHandleBounds } from '~/components/Nodes/utils'

type NextElements = {
  nextNodes: Node[]
  nextEdges: Edge[]
}
const pinia = createPinia()

const parseElements = (elements: Elements, nodes: Node[], edges: Edge[], nodeExtent: NodeExtent) => {
  const nextElements: NextElements = {
    nextNodes: [],
    nextEdges: [],
  }
  for (const element of elements) {
    if (isNode(element)) {
      const storeNode = nodes.find((node) => node.id === element.id)

      if (storeNode) {
        const updatedNode: Node = {
          ...storeNode,
          ...element,
        }
        if (!updatedNode.__rf) updatedNode.__rf = {}

        if (storeNode.position.x !== element.position.x || storeNode.position.y !== element.position.y) {
          updatedNode.__rf.position = element.position
        }

        if (typeof element.type !== 'undefined' && element.type !== storeNode.type) {
          // we reset the elements dimensions here in order to force a re-calculation of the bounds.
          // When the type of a node changes it is possible that the number or positions of handles changes too.
          updatedNode.__rf.width = undefined
        }

        nextElements.nextNodes.push(updatedNode)
      } else {
        nextElements.nextNodes.push(parseNode(element, nodeExtent))
      }
    } else if (isEdge(element)) {
      const storeEdge = edges.find((se) => se.id === element.id)

      if (storeEdge) {
        nextElements.nextEdges.push({
          ...storeEdge,
          ...element,
        })
      } else {
        nextElements.nextEdges.push(parseEdge(element))
      }
    }
  }

  return nextElements
}

export default function flowStore(id: string, preloadedState: FlowState): StoreDefinition<string, FlowState, any, FlowActions> {
  setActivePinia(pinia)
  const { nextEdges, nextNodes } = parseElements(preloadedState.elements, [], [], preloadedState.nodeExtent)
  preloadedState.nodes = nextNodes
  preloadedState.edges = nextEdges

  return defineStore({
    id: id ?? 'vue-flow',
    state: () => ({
      ...preloadedState,
    }),
    getters: {},
    actions: {
      setElements(elements) {
        const { nextNodes, nextEdges } = parseElements(elements, this.nodes, this.edges, this.nodeExtent)
        this.nodes = nextNodes
        this.edges = nextEdges
      },
      updateNodeDimensions({ id, nodeElement, forceUpdate }) {
        const i = this.nodes.map((x) => x.id).indexOf(id)
        const node = this.nodes[i]
        const dimensions = getDimensions(nodeElement)

        if (!node.__rf) node.__rf = {}
        const doUpdate =
          dimensions.width &&
          dimensions.height &&
          (node.__rf.width !== dimensions.width || node.__rf.height !== dimensions.height || forceUpdate)

        if (doUpdate) {
          const handleBounds = getHandleBounds(nodeElement, this.transform[2])

          this.nodes.splice(i, 1, {
            ...node,
            __rf: {
              ...node.__rf,
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
          __rf: {
            ...node.__rf,
            position: pos,
          },
        })
      },
      updateNodePosDiff({ id, diff, isDragging }) {
        const update = (node: Node, i: number) => {
          const updatedNode = {
            ...node,
            __rf: {
              ...node.__rf,
              isDragging,
            },
          }

          if (diff) {
            updatedNode.__rf.position = {
              x: (node.__rf?.position?.x as number) + diff.x,
              y: (node.__rf?.position?.y as number) + diff.y,
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
            const i = this.nodes.map((x) => x.id).indexOf((node as Node).id)
            update(node as Node, i)
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
        const startX = this.userSelectionRect.startX || 0
        const startY = this.userSelectionRect.startY || 0

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
        const selectedNodes = this.selectedElements?.filter((node) => node && isNode(node) && node.__rf) as Node[]

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
        const selectedElementsUpdated = diff(selectedElementsArr, this.selectedElements ?? []).length
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
            __rf: {
              ...node.__rf,
              position: node.__rf?.position && clampPosition(node.__rf.position, nodeExtent),
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
      addElements(elements: Elements) {
        const { nextNodes, nextEdges } = parseElements(elements, this.nodes, this.edges, this.nodeExtent)
        this.nodes = [...this.nodes, ...nextNodes]
        this.edges = [...this.edges, ...nextEdges]
      },
    },
  })
}
