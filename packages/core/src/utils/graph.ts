import { isString } from '@vueuse/core'
import { warn } from './log'
import type {
  Box,
  Connection,
  CoordinateExtent,
  DefaultEdgeOptions,
  Dimensions,
  Edge,
  EdgeMarkerType,
  ElementData,
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

export const nodeToRect = (node: GraphNode): Rect => ({
  ...(node.computedPosition || { x: 0, y: 0 }),
  width: node.dimensions.width || 0,
  height: node.dimensions.height || 0,
})

export const getOverlappingArea = (rectA: Rect, rectB: Rect) => {
  const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x))
  const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y))

  return Math.ceil(xOverlap * yOverlap)
}

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

export const isEdge = <Data = ElementData>(element: MaybeElement): element is Edge<Data> =>
  element && 'id' in element && 'source' in element && 'target' in element

export const isGraphEdge = <Data = ElementData>(element: MaybeElement): element is GraphEdge<Data> =>
  isEdge(element) && 'sourceNode' in element && 'targetNode' in element

export const isNode = <Data = ElementData>(element: MaybeElement): element is Node<Data> =>
  element && 'id' in element && !isEdge(element)

export const isGraphNode = <Data = ElementData>(element: MaybeElement): element is GraphNode<Data> =>
  isNode(element) && 'computedPosition' in element

export const isRect = (obj: any): obj is Rect => !!obj.width && !!obj.height && !!obj.x && !!obj.y

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
      data: shallowReactive(node.data || {}),
      events: shallowReactive(node.events || {}),
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
        ...defaults,
        sourceHandle: (edge.sourceHandle ? edge.sourceHandle.toString() : undefined) || defaults?.sourceHandle,
        targetHandle: (edge.targetHandle ? edge.targetHandle.toString() : undefined) || defaults?.targetHandle,
        type: edge.type ?? defaults?.type ?? 'default',
        source: edge.source.toString() || defaults?.source,
        target: edge.target.toString() || defaults?.target,
        z: 0 || defaults?.z,
        sourceX: 0 || defaults?.sourceX,
        sourceY: 0 || defaults?.sourceY,
        targetX: 0 || defaults?.targetX,
        targetY: 0 || defaults?.targetY,
        updatable: edge.updatable ?? defaults?.updatable,
        selectable: edge.selectable ?? defaults?.selectable,
        data: shallowReactive(edge.data || defaults?.data || {}),
        events: shallowReactive(edge.events || defaults?.events || {}),
        label: (edge.label && !isString(edge.label) ? markRaw(edge.label) : edge.label) || defaults?.label,
        pointerRadius: edge.pointerRadius || defaults?.pointerRadius || 2,
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
    warn("Can't create edge. An edge needs a source and a target.")
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
    warn("Can't create new edge. An edge needs a source and a target.")
    return elements
  }

  const foundEdge = elements.find((e) => isEdge(e) && e.id === oldEdge.id)

  if (!foundEdge) {
    warn(`The old edge with id=${oldEdge.id} does not exist.`)
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
  // set excludeNonSelectableNodes if you want to pay attention to the nodes "selectable" attribute
  excludeNonSelectableNodes = false,
) => {
  const paneRect = {
    x: (rect.x - tx) / tScale,
    y: (rect.y - ty) / tScale,
    width: rect.width / tScale,
    height: rect.height / tScale,
  }

  return nodes.filter((node) => {
    const { computedPosition = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, selectable } = node

    if (excludeNonSelectableNodes && !selectable) {
      return false
    }

    const nodeRect = { ...computedPosition, width: dimensions.width || 0, height: dimensions.height || 0 }
    const overlappingArea = getOverlappingArea(paneRect, nodeRect)
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
