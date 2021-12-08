import { getSourceTargetNodes } from './edge'
import {
  ElementId,
  Node,
  Edge,
  Elements,
  Transform,
  XYPosition,
  Rect,
  Box,
  Connection,
  FlowExportObject,
  NodeExtent,
  Dimensions,
  GraphNode,
  FlowElements,
  GraphEdge,
  NextElements,
  FlowStore,
  FlowState,
} from '~/types'
import { useWindow } from '~/composables'

const isHTMLElement = (el: EventTarget): el is HTMLElement => ('nodeName' || 'hasAttribute') in el

export const isInputDOMNode = (e: KeyboardEvent | MouseEvent): boolean => {
  const target = e.target
  if (target && isHTMLElement(target)) {
    return ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(target.nodeName) || target.hasAttribute('contentEditable')
  }
  return false
}

export const getDimensions = (node: HTMLElement): Dimensions => ({
  width: node.offsetWidth,
  height: node.offsetHeight,
})

export const clamp = (val: number, min = 0, max = 1): number => Math.min(Math.max(val, min), max)

export const clampPosition = (position: XYPosition, extent: NodeExtent): XYPosition => ({
  x: clamp(position.x, extent[0][0], extent[1][0]),
  y: clamp(position.y, extent[0][1], extent[1][1]),
})

export const getHostForElement = (element: HTMLElement): Document => {
  const doc = element.getRootNode() as Document
  const window = useWindow()

  if ('getElementFromPoint' in doc) return doc
  else return window.document
}

export const isEdge = (element: Node | Edge | Connection): element is Edge =>
  'id' in element && 'source' in element && 'target' in element

export const isNode = (element: Node | Edge | Connection): element is Node => 'id' in element && !isEdge(element)

export const isGraphNode = (element: any): element is GraphNode => isNode(element) && '__vf' in element
export const isGraphEdge = (element: any): element is GraphEdge =>
  isEdge(element) && 'sourceNode' in element && 'targetNode' in element

const getConnectedElements = (node: GraphNode, elements: Elements, dir: 'source' | 'target') => {
  if (!isNode(node)) return []
  const ids = elements.filter((e) => isEdge(e) && e.source === node.id).map((e) => isEdge(e) && e[dir])
  return elements.filter((e) => ids.includes(e.id))
}
export const getOutgoers = (node: GraphNode, elements: Elements) => getConnectedElements(node, elements, 'target')

export const getIncomers = (node: GraphNode, elements: Elements) => getConnectedElements(node, elements, 'source')

export const removeElements = (elementsToRemove: Elements, elements: Elements) => {
  const nodeIdsToRemove = elementsToRemove.map((n) => n.id)
  const shouldRemove = (element: Node | Edge) => {
    const { target, source } = isEdge(element) ? element : { target: '', source: '' }
    return nodeIdsToRemove.includes(element.id) || nodeIdsToRemove.includes(target) || nodeIdsToRemove.includes(source)
  }
  elements.forEach((element, i) => {
    if (shouldRemove(element)) elements.splice(i, 1)
  })
  return elements.filter((element) => !shouldRemove(element))
}

const getEdgeId = ({ source, sourceHandle, target, targetHandle }: Connection): ElementId =>
  `vueflow__edge-${source}${sourceHandle}-${target}${targetHandle}`

const connectionExists = (edge: Edge, elements: Elements) => {
  return elements.some(
    (el) =>
      isEdge(el) &&
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  )
}

export const addEdge = (edgeParams: Edge | Connection, elements: Elements) => {
  if (!edgeParams.source || !edgeParams.target) {
    console.warn("Can't create edge. An edge needs a source and a target.")
    return elements
  }

  let edge
  if (isEdge(edgeParams)) {
    edge = { ...edgeParams }
  } else {
    edge = {
      ...edgeParams,
      id: getEdgeId(edgeParams),
    } as Edge
  }
  if (connectionExists(edge, elements)) return elements
  elements.push(edge)
  return [...elements, edge]
}

export const updateEdge = (oldEdge: Edge, newConnection: Connection, elements: Elements) => {
  if (!newConnection.source || !newConnection.target) {
    console.warn("Can't create new edge. An edge needs a source and a target.")
    return elements
  }

  const foundEdge = elements.find((e) => isEdge(e) && e.id === oldEdge.id)

  if (!foundEdge) {
    console.warn(`The old edge with id=${oldEdge.id} does not exist.`)
    return elements
  }

  // Remove old edge and create the new edge with parameters of old edge.
  const edge: Edge = {
    ...oldEdge,
    id: getEdgeId(newConnection),
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle,
  }
  elements.splice(elements.indexOf(foundEdge), 1, edge)
  return elements.filter((e) => e.id !== oldEdge.id).concat(edge)
}

export const pointToRendererPoint = (
  { x, y }: XYPosition,
  [tx, ty, tScale]: Transform,
  snapToGrid: boolean,
  [snapX, snapY]: [number, number],
) => {
  const position: XYPosition = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale,
  }

  if (snapToGrid) {
    return {
      x: snapX * Math.round(position.x / snapX),
      y: snapY * Math.round(position.y / snapY),
    }
  }

  return position
}

export const onLoadProject = (currentStore: FlowStore) => (position: XYPosition) =>
  pointToRendererPoint(position, currentStore.transform, currentStore.snapToGrid, currentStore.snapGrid)

export const parseNode = (node: Node, nodeExtent: NodeExtent): GraphNode => ({
  ...node,
  id: node.id.toString(),
  type: node.type ?? 'default',
  __vf: {
    width: 0,
    height: 0,
    handleBounds: {
      source: [],
      target: [],
    },
    isDragging: false,
  },
  position: clampPosition(node.position, nodeExtent),
})

export const parseEdge = (edge: Edge): GraphEdge => ({
  ...edge,
  source: edge.source.toString(),
  target: edge.target.toString(),
  sourceHandle: edge.sourceHandle ? edge.sourceHandle.toString() : undefined,
  targetHandle: edge.targetHandle ? edge.targetHandle.toString() : undefined,
  id: edge.id.toString(),
  type: edge.type ?? 'default',
  sourceNode: {} as any,
  targetNode: {} as any,
})

const getBoundsOfBoxes = (box1: Box, box2: Box): Box => ({
  x: Math.min(box1.x, box2.x),
  y: Math.min(box1.y, box2.y),
  x2: Math.max(box1.x2, box2.x2),
  y2: Math.max(box1.y2, box2.y2),
})

export const rectToBox = ({ x, y, width, height }: Rect): Box => ({
  x,
  y,
  x2: x + width,
  y2: y + height,
})

export const boxToRect = ({ x, y, x2, y2 }: Box): Rect => ({
  x,
  y,
  width: x2 - x,
  height: y2 - y,
})

export const getBoundsofRects = (rect1: Rect, rect2: Rect) => boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)))

export const getRectOfNodes = (nodes: GraphNode[]) => {
  const box = nodes.reduce(
    (currBox, { position = { x: 0, y: 0 }, __vf: { width = 0, height = 0 } = {} }) =>
      getBoundsOfBoxes(
        currBox,
        rectToBox({
          ...position,
          width,
          height,
        }),
      ),
    { x: Infinity, y: Infinity, x2: -Infinity, y2: -Infinity },
  )

  return boxToRect(box)
}

export const graphPosToZoomedPos = ({ x, y }: XYPosition, [tx, ty, tScale]: Transform): XYPosition => ({
  x: x * tScale + tx,
  y: y * tScale + ty,
})

export const getNodesInside = (nodes: GraphNode[], rect: Rect, [tx, ty, tScale]: Transform = [0, 0, 1], partially = false) => {
  const rBox = rectToBox({
    x: (rect.x - tx) / tScale,
    y: (rect.y - ty) / tScale,
    width: rect.width / tScale,
    height: rect.height / tScale,
  })

  return nodes.filter((node) => {
    if (!node.__vf || node.selectable === false) return false
    const {
      position = { x: 0, y: 0 },
      __vf: { width = 0, height = 0, isDragging = false },
    } = node
    const nBox = rectToBox({ ...position, width, height } as any)
    const xOverlap = Math.max(0, Math.min(rBox.x2, nBox.x2) - Math.max(rBox.x, nBox.x))
    const yOverlap = Math.max(0, Math.min(rBox.y2, nBox.y2) - Math.max(rBox.y, nBox.y))
    const overlappingArea = Math.ceil(xOverlap * yOverlap)

    if (width === null || height === null || isDragging) {
      // nodes are initialized with width and height = null
      return true
    }

    if (partially) {
      return overlappingArea > 0
    }

    const area = width * height

    return overlappingArea >= area
  })
}

export const getConnectedEdges = (nodes: GraphNode[], edges: GraphEdge[]) => {
  const nodeIds = nodes.map((node) => node.id)
  return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target))
}

export const onLoadGetElements = (currentStore: FlowStore) => (): FlowElements => currentStore.elements

export const onLoadToObject = (currentStore: FlowState) => (): FlowExportObject => {
  // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
  return JSON.parse(
    JSON.stringify({
      elements: currentStore.elements,
      position: [currentStore.transform[0], currentStore.transform[1]],
      zoom: currentStore.transform[2],
    }),
  )
}

export const getTransformForBounds = (
  bounds: Rect,
  width: number,
  height: number,
  minZoom: number,
  maxZoom: number,
  padding = 0.1,
  offset: {
    x?: number
    y?: number
  } = { x: 0, y: 0 },
): Transform => {
  const xZoom = width / (bounds.width * (1 + padding))
  const yZoom = height / (bounds.height * (1 + padding))
  const zoom = Math.min(xZoom, yZoom)
  const clampedZoom = clamp(zoom, minZoom, maxZoom)
  const boundsCenterX = bounds.x + bounds.width / 2
  const boundsCenterY = bounds.y + bounds.height / 2
  const x = width / 2 - boundsCenterX * clampedZoom + (offset.x ?? 0)
  const y = height / 2 - boundsCenterY * clampedZoom + (offset.y ?? 0)

  return [x, y, clampedZoom]
}

export const processElements = (elements: FlowElements, fn: (elements: FlowElements) => void) => {
  return new Promise((resolve) => {
    const chunk = 50
    let index = 0
    function doChunk() {
      const chunkPos = chunk * index
      const lastChunk = elements.length - chunkPos < chunkPos
      const cnt = !lastChunk ? chunk : elements.length - chunkPos
      fn(elements.slice(chunkPos, chunkPos + cnt))
      index++
      if (!lastChunk) {
        setTimeout(doChunk, 1)
      } else {
        resolve(true)
      }
    }
    doChunk()
  })
}

export const parseElement = (element: Node | Edge, prevElements: FlowElements, nodeExtent: NodeExtent) => {
  let parsed: GraphEdge | GraphNode = {} as any
  const index = prevElements.map((x) => x.id).indexOf(element.id)
  if (isNode(element)) {
    const storeNode = prevElements[index]

    if (!isGraphNode(element)) parsed = parseNode(element, nodeExtent)
    else parsed = element
    if (storeNode) {
      const updatedNode = {
        ...storeNode,
        ...parsed,
      } as GraphNode

      if (typeof element.type !== 'undefined' && element.type !== storeNode.type) {
        // we reset the elements dimensions here in order to force a re-calculation of the bounds.
        // When the type of a node changes it is possible that the number or positions of handles changes too.
        updatedNode.__vf.width = 0
      }

      parsed = updatedNode
    }
  } else if (isEdge(element)) {
    const storeEdge = prevElements[index]

    if (!isGraphEdge(element)) parsed = parseEdge(element)
    else parsed = element
    if (storeEdge) {
      parsed = {
        ...storeEdge,
        ...parsed,
      } as GraphEdge
    }
  }
  return { parsed, index }
}

export const parseElements = (elements: Elements, prevElements: FlowElements, nodeExtent: NodeExtent) => {
  const { nodes, edges }: NextElements = {
    nodes: [],
    edges: [],
  }
  for (const element of elements) {
    const { parsed } = parseElement(element, prevElements, nodeExtent)
    if (parsed) {
      if (isEdge(parsed)) edges.push(parsed)
      else nodes.push(parsed)
    }
  }
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
  return { nodes, edges }
}
