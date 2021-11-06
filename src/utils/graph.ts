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
  FlowStore,
} from '../types'
import { useWindow } from '../composables'

export const isInputDOMNode = (e: KeyboardEvent | MouseEvent): boolean => {
  const target = e.target as HTMLElement
  return ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(target.nodeName) || target.hasAttribute('contentEditable')
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

export const isEdge = (element: Node | Connection | Edge): element is Edge =>
  'id' in element && 'source' in element && 'target' in element

export const isNode = (element: Node | Connection | Edge): element is Node =>
  'id' in element && !('source' in element) && !('target' in element)

export const getOutgoers = (node: Node, elements: Elements): Node[] => {
  if (!isNode(node)) {
    return []
  }

  const outgoerIds = elements.filter((e) => isEdge(e) && e.source === node.id).map((e) => (e as Edge).target)
  return elements.filter((e) => outgoerIds.includes(e.id)) as Node[]
}

export const getIncomers = (node: Node, elements: Elements): Node[] => {
  if (!isNode(node)) {
    return []
  }

  const incomersIds = elements.filter((e) => isEdge(e) && e.target === node.id).map((e) => (e as Edge).source)
  return elements.filter((e) => incomersIds.includes(e.id)) as Node[]
}

export const removeElements = (elementsToRemove: Elements, elements: Elements): Elements => {
  const nodeIdsToRemove = elementsToRemove.map((n) => n.id)

  return elements.filter((element) => {
    const edgeElement = element as Edge
    return !(
      nodeIdsToRemove.includes(element.id) ||
      nodeIdsToRemove.includes(edgeElement.target) ||
      nodeIdsToRemove.includes(edgeElement.source)
    )
  })
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

export const addEdge = (edgeParams: Edge | Connection, elements: Elements): Elements => {
  if (!edgeParams.source || !edgeParams.target) {
    console.log("Can't create edge. An edge needs a source and a target.")
    return elements
  }

  let edge: Edge
  if (isEdge(edgeParams)) {
    edge = { ...edgeParams }
  } else {
    edge = {
      ...edgeParams,
      id: getEdgeId(edgeParams),
    } as Edge
  }

  if (connectionExists(edge, elements)) {
    return elements
  }

  return elements.concat(edge)
}

export const updateEdge = (oldEdge: Edge, newConnection: Connection, elements: Elements): Elements => {
  if (!newConnection.source || !newConnection.target) {
    console.warn("Can't create new edge. An edge needs a source and a target.")
    return elements
  }

  const foundEdge = elements.find((e) => isEdge(e) && e.id === oldEdge.id) as Edge

  if (!foundEdge) {
    console.warn(`The old edge with id=${oldEdge.id} does not exist.`)
    return elements
  }

  // Remove old edge and create the new edge with parameters of old edge.
  const edge = {
    ...oldEdge,
    id: getEdgeId(newConnection),
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle,
  } as Edge

  return elements.filter((e) => e.id !== oldEdge.id).concat(edge)
}

export const pointToRendererPoint = (
  { x, y }: XYPosition,
  [tx, ty, tScale]: Transform,
  snapToGrid: boolean,
  [snapX, snapY]: [number, number],
): XYPosition => {
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

export const onLoadProject =
  (currentStore: FlowStore) =>
  (position: XYPosition): XYPosition =>
    pointToRendererPoint(position, currentStore.transform, currentStore.snapToGrid, currentStore.snapGrid)

export const parseNode = (node: Node, nodeExtent: NodeExtent): Node => ({
  ...node,
  id: node.id.toString(),
  type: node.type || 'default',
  __rf: {
    position: clampPosition(node.position, nodeExtent),
    width: undefined,
    height: undefined,
    handleBounds: {},
    isDragging: false,
  },
})

export const parseEdge = (edge: Edge): Edge => ({
  ...edge,
  source: edge.source.toString(),
  target: edge.target.toString(),
  sourceHandle: edge.sourceHandle ? edge.sourceHandle.toString() : null,
  targetHandle: edge.targetHandle ? edge.targetHandle.toString() : null,
  id: edge.id.toString(),
  type: edge.type || 'default',
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

export const getBoundsofRects = (rect1: Rect, rect2: Rect): Rect =>
  boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)))

export const getRectOfNodes = (nodes: Node[]): Rect => {
  const box = nodes.reduce(
    (currBox, { __rf: { position, width, height } = {} }) =>
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

export const getNodesInside = (nodes: Node[], rect: Rect, [tx, ty, tScale]: Transform = [0, 0, 1], partially = false): Node[] => {
  const rBox = rectToBox({
    x: (rect.x - tx) / tScale,
    y: (rect.y - ty) / tScale,
    width: rect.width / tScale,
    height: rect.height / tScale,
  })

  return nodes.filter((node) => {
    if (!node.__rf) return false
    const { position = { x: 0, y: 0 }, width = 0, height = 0, isDragging = false } = node.__rf
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

export const getConnectedEdges = (nodes: Node[], edges: Edge[]): Edge[] => {
  const nodeIds = nodes.map((node) => node.id)

  return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target))
}

const parseElements = (nodes: Node[], edges: Edge[]): Elements => [
  ...nodes.map((node) => {
    const n = { ...node }

    if (n.__rf?.position) n.position = n.__rf?.position

    return n
  }),
  ...edges.map((e) => ({ ...e })),
]

export const onLoadGetElements = (currentStore: FlowStore) => (): Elements =>
  parseElements(currentStore.nodes || [], currentStore.edges || [])

export const onLoadToObject = (currentStore: FlowStore) => (): FlowExportObject => {
  // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
  return JSON.parse(
    JSON.stringify({
      elements: parseElements(currentStore.nodes || [], currentStore.edges || []),
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
): Transform => {
  const xZoom = width / (bounds.width * (1 + padding))
  const yZoom = height / (bounds.height * (1 + padding))
  const zoom = Math.min(xZoom, yZoom)
  const clampedZoom = clamp(zoom, minZoom, maxZoom)
  const boundsCenterX = bounds.x + bounds.width / 2
  const boundsCenterY = bounds.y + bounds.height / 2
  const x = width / 2 - boundsCenterX * clampedZoom
  const y = height / 2 - boundsCenterY * clampedZoom

  return [x, y, clampedZoom]
}
