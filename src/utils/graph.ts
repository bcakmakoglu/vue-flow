import {
  Box,
  Connection,
  CoordinateExtent,
  Dimensions,
  Edge,
  EdgeMarkerType,
  Elements,
  FlowElements,
  FlowExportObject,
  State,
  FlowStore,
  GraphEdge,
  GraphNode,
  Node,
  Rect,
  Transform,
  XYPosition,
  XYZPosition,
  Getters,
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

export const clampPosition = (position: XYPosition, extent: CoordinateExtent): XYPosition => ({
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
export const isGraphEdge = (element: any): element is GraphEdge =>
  isEdge(element) && 'sourceNode' in element && 'targetNode' in element

export const isNode = (element: Node | Edge | Connection): element is Node => 'id' in element && !isEdge(element)
export const isGraphNode = (element: Node | Edge | Connection): element is GraphNode =>
  isNode(element) && 'computedPosition' in element

export const parseNode = (node: Node, nodeExtent: CoordinateExtent, defaults?: Partial<GraphNode>): GraphNode => {
  defaults = !isGraphNode(node)
    ? {
        type: node.type ?? 'default',
        dimensions: {
          width: 0,
          height: 0,
        },
        handleBounds: {
          source: [],
          target: [],
        },
        computedPosition: {
          z: typeof node.style?.zIndex === 'string' ? parseInt(node.style?.zIndex as string) : node.style?.zIndex ?? 0,
          ...clampPosition(node.position, nodeExtent),
        },
        dragging: false,
        draggable: undefined,
        selectable: undefined,
        connectable: undefined,
        ...defaults,
      }
    : defaults

  return {
    ...(defaults as GraphNode),
    ...node,
    id: node.id.toString(),
  }
}

export const parseEdge = (edge: Edge, defaults?: Partial<GraphEdge>): GraphEdge => {
  defaults = !isGraphEdge(edge)
    ? {
        sourceHandle: edge.sourceHandle ? edge.sourceHandle.toString() : undefined,
        targetHandle: edge.targetHandle ? edge.targetHandle.toString() : undefined,
        type: edge.type ?? 'default',
        source: edge.source.toString(),
        target: edge.target.toString(),
        z: typeof edge.style?.zIndex === 'string' ? parseInt(edge.style?.zIndex as string) : edge.style?.zIndex ?? 0,
        sourceX: 0,
        sourceY: 0,
        targetX: 0,
        targetY: 0,
        updatable: undefined,
        selectable: undefined,
        ...defaults,
      }
    : defaults

  return {
    ...(defaults as GraphEdge),
    ...edge,
    id: edge.id.toString(),
  }
}

const getConnectedElements = (node: GraphNode, elements: Elements, dir: 'source' | 'target') => {
  if (!isNode(node)) return []
  const ids = elements.filter((e) => isEdge(e) && e.source === node.id).map((e) => isEdge(e) && e[dir])
  return elements.filter((e) => ids.includes(e.id))
}
export const getOutgoers = (node: GraphNode, elements: Elements) => getConnectedElements(node, elements, 'target')

export const getIncomers = (node: GraphNode, elements: Elements) => getConnectedElements(node, elements, 'source')

export const getEdgeId = ({ source, sourceHandle, target, targetHandle }: Connection) =>
  `vueflow__edge-${source}${sourceHandle}-${target}${targetHandle}`

export const connectionExists = (edge: Edge, elements: Elements) =>
  elements.some(
    (el) =>
      isEdge(el) &&
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  )

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
  edge = parseEdge(edge)
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
    (currBox, { computedPosition = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 } } = {} as any) =>
      getBoundsOfBoxes(
        currBox,
        rectToBox({
          ...computedPosition,
          ...dimensions,
        } as Rect),
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
    if (!node || node.selectable === false) return false
    const { computedPosition = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, dragging = false } = node
    const nBox = rectToBox({ ...computedPosition, ...dimensions })
    const xOverlap = Math.max(0, Math.min(rBox.x2, nBox.x2) - Math.max(rBox.x, nBox.x))
    const yOverlap = Math.max(0, Math.min(rBox.y2, nBox.y2) - Math.max(rBox.y, nBox.y))
    const overlappingArea = Math.ceil(xOverlap * yOverlap)
    const notInitialized =
      typeof dimensions.width === 'undefined' ||
      typeof dimensions.height === 'undefined' ||
      dimensions.width === 0 ||
      dimensions.height === 0 ||
      dragging

    const partiallyVisible = partially && overlappingArea > 0
    const area = dimensions.width * dimensions.height
    return notInitialized || partiallyVisible || overlappingArea >= area
  })
}

export const getConnectedEdges = (nodes: GraphNode[], edges: GraphEdge[]) => {
  const nodeIds = nodes.map((node) => node.id)
  return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target))
}

export const onLoadGetNodes = (store: FlowStore) => (): GraphNode[] => store.nodes
export const onLoadGetEdges = (store: FlowStore) => (): GraphEdge[] => store.edges
export const onLoadGetElements = (store: FlowStore) => (): FlowElements => [...store.nodes, ...store.edges]

export const onLoadToObject = (store: State) => (): FlowExportObject => {
  // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
  return JSON.parse(
    JSON.stringify({
      nodes: store.nodes,
      edges: store.edges,
      position: [store.transform[0], store.transform[1]],
      zoom: store.transform[2],
    } as FlowExportObject),
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

export const getXYZPos = (parentNode: GraphNode, computedPosition: XYZPosition): XYZPosition => {
  return {
    x: computedPosition.x + parentNode.computedPosition.x,
    y: computedPosition.y + parentNode.computedPosition.y,
    z: parentNode.computedPosition.z > computedPosition.z ? parentNode.computedPosition.z : computedPosition.z,
  }
}

export const isParentSelected = (node: GraphNode, getNode: Getters['getNode']): boolean => {
  if (!node.parentNode) return false
  const parent = getNode(node.parentNode)
  if (!parent) return false
  if (parent.selected) return true
  return isParentSelected(parent, getNode)
}

export const getMarkerId = (marker: EdgeMarkerType | undefined): string => {
  if (typeof marker === 'undefined') return ''
  if (typeof marker === 'string') return marker

  return Object.keys(marker)
    .sort()
    .map((key) => `${key}=${marker[<keyof EdgeMarkerType>key]}`)
    .join('&')
}
