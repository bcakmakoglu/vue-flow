import { CoordinateExtent, FlowActions, FlowGetters, FlowState, GraphNode, Node, XYPosition } from '~/types'
import { clampPosition, isEdge, isGraphEdge, isGraphNode, isNode, isParentSelected, parseEdge, parseNode } from '~/utils'

const getParent = (root: Node[], id: string): GraphNode | undefined => {
  let node
  root.some((n) => {
    if (n.id === id) return (node = n)
    if (n.children) return (node = getParent(n.children, id))
    return false
  })
  return node
}

const updatePosition = (node: GraphNode, { x, y }: XYPosition = { x: 0, y: 0 }, extent: CoordinateExtent, dragging?: boolean) => {
  let position = {
    x: node.position.x + x,
    y: node.position.y + y,
    z: node.computedPosition.z,
  }

  if (node.extent === 'parent' && node.parentNode && node.dimensions.width && node.dimensions.height) {
    const parent = node.parentNode
    extent =
      parent.dimensions.width && parent.dimensions.height
        ? [
            [0, 0],
            [parent.dimensions.width - node.dimensions.width, parent.dimensions.height - node.dimensions.height],
          ]
        : extent
  }
  node.dragging = dragging
  const clamped = clampPosition(position, extent)
  position = { ...position, ...clamped }
  node.position = position
}

export default (state: FlowState, getters: FlowGetters): FlowActions => {
  const updateNodePosition: FlowActions['updateNodePosition'] = ({ id, diff = { x: 0, y: 0 }, dragging }) => {
    state.nodes.forEach((node) => {
      if (node.selected) {
        if (!node.parentNode) {
          updatePosition(node, diff, state.nodeExtent, dragging)
        } else if (!isParentSelected(node)) {
          updatePosition(node, diff, state.nodeExtent, dragging)
        }
      } else if (node.id === id) {
        updatePosition(node, diff, state.nodeExtent, dragging)
      }
    })
  }
  const addSelectedNodes: FlowActions['addSelectedNodes'] = (nodes) => {
    const selectedElementsUpdated = nodes.filter((el) => !state.selectedNodes.some((e) => el.id === e.id)).length
    const selectedNodes = !nodes.length || selectedElementsUpdated ? nodes : state.selectedNodes
    const selectedNodesIds = selectedNodes.map((n) => n.id)
    state.nodes.forEach(
      (n) => (n.selected = selectedNodesIds.includes(n.id) || (n.parentNode && selectedNodesIds.includes(n.parentNode?.id))),
    )
    state.selectedNodes = selectedNodes
    if (selectedElementsUpdated) state.hooks.selectionChange.trigger({ nodes })
  }
  const addSelectedEdges: FlowActions['addSelectedEdges'] = (edges) => {
    const selectedElementsUpdated = edges.filter((el) => !state.selectedEdges.some((e) => el.id === e.id)).length
    const selectedEdges = !edges.length || selectedElementsUpdated ? edges : state.selectedEdges
    const selectedEdgesIds = selectedEdges.map((e) => e.id)
    state.edges.forEach((e) => (e.selected = selectedEdgesIds.includes(e.id)))
    state.selectedEdges = selectedEdges
    if (selectedElementsUpdated) state.hooks.selectionChange.trigger({ edges })
  }
  const addSelectedElements: FlowActions['addSelectedElements'] = (elements) => {
    addSelectedNodes(elements.filter(isGraphNode))
    addSelectedEdges(elements.filter(isGraphEdge))
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
    addSelectedNodes([])
    addSelectedEdges([])
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

  const parseChildren = (n: Node, p: GraphNode | undefined, arr: GraphNode[], extent: CoordinateExtent) => {
    const parent = typeof p === 'undefined' || typeof p !== 'object' ? getParent(arr, n.id) : p
    const parsed = parseNode(n, extent, {
      ...getters.getNode.value(n.id),
      parentNode: parent,
    })
    arr.push(parsed)
    if (n.children && n.children.length) {
      n.children.forEach((c) => parseChildren(c, parsed, arr, extent))
    }
  }

  const setNodes: FlowActions['setNodes'] = (nodes, extent: CoordinateExtent) => {
    nodes = nodes.flatMap((node) => {
      const children: GraphNode[] = []
      parseChildren(node, undefined, children, extent)
      return children
    })
    state.nodes = <GraphNode[]>nodes
  }
  const setEdges: FlowActions['setEdges'] = (edges) => {
    state.edges = edges.flatMap((edge) => {
      const sourceNode = getters.getNode.value(edge.source)!
      const targetNode = getters.getNode.value(edge.target)!
      if (!sourceNode || typeof sourceNode === 'undefined')
        console.warn(`couldn't create edge for source id: ${edge.source}; edge id: ${edge.id}`)
      if (!targetNode || typeof targetNode === 'undefined')
        console.warn(`couldn't create edge for target id: ${edge.target}; edge id: ${edge.id}`)

      return parseEdge(edge, {
        ...getters.getEdge.value(edge.id),
        sourceNode,
        targetNode,
      })
    })
  }

  const setElements: FlowActions['setElements'] = (elements, extent) => {
    setNodes(elements.filter(isNode), extent)
    setEdges(elements.filter(isEdge))
  }

  const setState: FlowActions['setState'] = (opts) => {
    if (typeof opts.modelValue !== 'undefined') setElements(opts.modelValue, opts.nodeExtent ?? state.nodeExtent)
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
    if (typeof opts.storageKey !== 'undefined') state.storageKey = opts.storageKey
    if (typeof opts.edgeUpdaterRadius !== 'undefined') state.edgeUpdaterRadius = opts.edgeUpdaterRadius
    if (typeof opts.elementsSelectable !== 'undefined') state.elementsSelectable = opts.elementsSelectable
    if (typeof opts.onlyRenderVisibleElements !== 'undefined') state.onlyRenderVisibleElements = opts.onlyRenderVisibleElements
    if (typeof opts.edgesUpdatable !== 'undefined') state.edgesUpdatable = opts.edgesUpdatable
    if (typeof opts.nodesConnectable !== 'undefined') state.nodesConnectable = opts.nodesConnectable
    if (typeof opts.nodesDraggable !== 'undefined') state.nodesDraggable = opts.nodesDraggable
    if (typeof opts.defaultMarkerColor !== 'undefined') state.defaultMarkerColor = opts.defaultMarkerColor
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
    updateNodePosition,
    setElements,
    setNodes,
    setEdges,
    addSelectedElements,
    addSelectedNodes,
    addSelectedEdges,
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    resetSelectedElements,
    setConnectionNodeId,
    setInteractive,
    setState,
  }
}
