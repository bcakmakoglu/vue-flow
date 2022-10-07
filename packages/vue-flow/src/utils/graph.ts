import type {
  Box,
  Connection,
  CoordinateExtent,
  DefaultEdgeOptions,
  Dimensions,
  Edge,
  EdgeMarkerType,
  Elements,
  FlowElement,
  Getters,
  GraphEdge,
  GraphNode,
  Node,
  Rect,
  Viewport,
  XYPosition,
  XYZPosition,
} from '~/types'
import { useWindow } from '~/composables'

export const getDimensions = (node: HTMLElement): Dimensions => ({
  width: node.offsetWidth,
  height: node.offsetHeight,
})

export const clamp = (val: number, min = 0, max = 1) => Math.min(Math.max(val, min), max)

export const clampPosition = (position: XYPosition, extent: CoordinateExtent): XYPosition => ({
  x: clamp(position.x, extent[0][0], extent[1][0]),
  y: clamp(position.y, extent[0][1], extent[1][1]),
})

export const getHostForElement = (element: HTMLElement): Document => {
  const doc = element.getRootNode() as Document
  const window = useWindow()

  if ('elementFromPoint' in doc) return doc
  else return window.document
}

type MaybeElement = Node | Edge | Connection | FlowElement
export const isEdge = (element: MaybeElement): element is Edge =>
  element && 'id' in element && 'source' in element && 'target' in element
export const isGraphEdge = (element: MaybeElement): element is GraphEdge =>
  isEdge(element) && 'sourceNode' in element && 'targetNode' in element

export const isNode = (element: MaybeElement): element is Node => element && 'id' in element && !isEdge(element)
export const isGraphNode = (element: MaybeElement): element is GraphNode => isNode(element) && 'computedPosition' in element

export const parseNode = (node: Node, nodeExtent: CoordinateExtent, defaults?: Partial<GraphNode>): GraphNode => {
  let defaultValues = defaults
  if (!isGraphNode(node)) {
    defaultValues = {
      type: node.type ?? 'default',
      dimensions: markRaw({
        width: 0,
        height: 0,
      }),
      handleBounds: shallowReactive({
        source: [],
        target: [],
      }),
      computedPosition: markRaw({
        z: 0,
        ...node.position,
      }),
      draggable: undefined,
      selectable: undefined,
      connectable: undefined,
      ...defaults,
    }
  }

  return {
    ...defaultValues,
    ...(node as GraphNode),
    id: node.id.toString(),
  }
}

export const parseEdge = (edge: Edge, defaults?: Partial<GraphEdge>): GraphEdge => {
  defaults = !isGraphEdge(edge)
    ? ({
        sourceHandle: edge.sourceHandle ? edge.sourceHandle.toString() : undefined,
        targetHandle: edge.targetHandle ? edge.targetHandle.toString() : undefined,
        type: edge.type,
        source: edge.source.toString(),
        target: edge.target.toString(),
        z: 0,
        sourceX: 0,
        sourceY: 0,
        targetX: 0,
        targetY: 0,
        updatable: edge.updatable,
        selectable: edge.selectable,
        data: edge.data,
        ...defaults,
      } as GraphEdge)
    : defaults

  return Object.assign({ id: edge.id.toString() }, edge, defaults) as GraphEdge
}

const getConnectedElements = (node: GraphNode, elements: Elements, dir: 'source' | 'target') => {
  if (!isNode(node)) return []
  const origin = dir === 'source' ? 'target' : 'source'
  const ids = elements.filter((e) => isEdge(e) && e[origin] === node.id).map((e) => isEdge(e) && e[dir])
  return elements.filter((e) => ids.includes(e.id))
}
export const getOutgoers = (node: GraphNode, elements: Elements) => getConnectedElements(node, elements, 'target')

export const getIncomers = (node: GraphNode, elements: Elements) => getConnectedElements(node, elements, 'source')

export const getEdgeId = ({ source, sourceHandle, target, targetHandle }: Connection) =>
  `vueflow__edge-${source}${sourceHandle ?? ''}-${target}${targetHandle ?? ''}`

export const connectionExists = (edge: Edge | Connection, elements: Elements) =>
  elements.some(
    (el) =>
      isEdge(el) &&
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  )

/**
 * Intended for options API
 * In composition API you can access utilities from `useVueFlow`
 */
export const addEdge = (edgeParams: Edge | Connection, elements: Elements, defaults?: DefaultEdgeOptions) => {
  if (!edgeParams.source || !edgeParams.target) {
    console.warn("[vueflow]: Can't create edge. An edge needs a source and a target.")
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
  edge = parseEdge(edge, defaults)
  if (connectionExists(edge, elements)) return elements
  elements.push(edge)
  return elements
}

/**
 * Intended for options API
 * In composition API you can access utilities from `useVueFlow`
 */
export const updateEdge = (oldEdge: Edge, newConnection: Connection, elements: Elements) => {
  if (!newConnection.source || !newConnection.target) {
    console.warn("[vueflow]: Can't create new edge. An edge needs a source and a target.")
    return elements
  }

  const foundEdge = elements.find((e) => isEdge(e) && e.id === oldEdge.id)

  if (!foundEdge) {
    console.warn(`[vueflow]: The old edge with id=${oldEdge.id} does not exist.`)
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

  return elements.filter((e) => e.id !== oldEdge.id)
}

export const pointToRendererPoint = (
  { x, y }: XYPosition,
  { x: tx, y: ty, zoom: tScale }: Viewport,
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

export const graphPosToZoomedPos = ({ x, y }: XYPosition, { x: tx, y: ty, zoom: tScale }: Viewport): XYPosition => ({
  x: x * tScale + tx,
  y: y * tScale + ty,
})

export const getNodesInside = (
  nodes: GraphNode[],
  rect: Rect,
  { x: tx, y: ty, zoom: tScale }: Viewport = { x: 0, y: 0, zoom: 1 },
  partially = false,
) => {
  const rBox = rectToBox({
    x: (rect.x - tx) / tScale,
    y: (rect.y - ty) / tScale,
    width: rect.width / tScale,
    height: rect.height / tScale,
  })

  return nodes.filter((node) => {
    if (!node || node.selectable === false) return false
    const { computedPosition = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 } } = node
    const nBox = rectToBox({ ...computedPosition, ...dimensions })
    const xOverlap = Math.max(0, Math.min(rBox.x2, nBox.x2) - Math.max(rBox.x, nBox.x))
    const yOverlap = Math.max(0, Math.min(rBox.y2, nBox.y2) - Math.max(rBox.y, nBox.y))
    const overlappingArea = Math.ceil(xOverlap * yOverlap)
    const notInitialized =
      typeof dimensions.width === 'undefined' ||
      typeof dimensions.height === 'undefined' ||
      dimensions.width === 0 ||
      dimensions.height === 0

    const partiallyVisible = partially && overlappingArea > 0
    const area = dimensions.width * dimensions.height
    return notInitialized || partiallyVisible || overlappingArea >= area
  })
}

export const getConnectedEdges = (nodes: GraphNode[], edges: GraphEdge[]) => {
  const nodeIds = nodes.map((node) => node.id)
  return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target))
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
): Viewport => {
  const xZoom = width / (bounds.width * (1 + padding))
  const yZoom = height / (bounds.height * (1 + padding))
  const zoom = Math.min(xZoom, yZoom)
  const clampedZoom = clamp(zoom, minZoom, maxZoom)
  const boundsCenterX = bounds.x + bounds.width / 2
  const boundsCenterY = bounds.y + bounds.height / 2
  const x = width / 2 - boundsCenterX * clampedZoom + (offset.x ?? 0)
  const y = height / 2 - boundsCenterY * clampedZoom + (offset.y ?? 0)

  return { x, y, zoom: clampedZoom }
}

export const getXYZPos = (parentPos: XYZPosition, computedPosition: XYZPosition): XYZPosition => {
  return {
    x: computedPosition.x + parentPos.x,
    y: computedPosition.y + parentPos.y,
    z: parentPos.z > computedPosition.z ? parentPos.z : computedPosition.z,
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
