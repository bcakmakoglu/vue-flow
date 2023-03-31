import { isString } from '@vueuse/core'
import type {
  Actions,
  Box,
  Connection,
  CoordinateExtent,
  DefaultEdgeOptions,
  Dimensions,
  Edge,
  EdgeMarkerType,
  ElementData,
  Elements,
  FlowElements,
  GraphEdge,
  GraphNode,
  MaybeElement,
  Node,
  Rect,
  ViewportTransform,
  XYPosition,
  XYZPosition,
} from '~/types'

export function nodeToRect(node: GraphNode): Rect {
  return {
    ...(node.computedPosition || { x: 0, y: 0 }),
    width: node.dimensions.width || 0,
    height: node.dimensions.height || 0,
  }
}

export function getOverlappingArea(rectA: Rect, rectB: Rect) {
  const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x))
  const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y))

  return Math.ceil(xOverlap * yOverlap)
}

export function getDimensions(node: HTMLElement): Dimensions {
  return {
    width: node.offsetWidth,
    height: node.offsetHeight,
  }
}

export function clamp(val: number, min = 0, max = 1) {
  return Math.min(Math.max(val, min), max)
}

export function clampPosition(position: XYPosition, extent: CoordinateExtent): XYPosition {
  return {
    x: clamp(position.x, extent[0][0], extent[1][0]),
    y: clamp(position.y, extent[0][1], extent[1][1]),
  }
}

export function getHostForElement(element: HTMLElement): Document {
  const doc = element.getRootNode() as Document
  const window = useWindow()

  if ('elementFromPoint' in doc) return doc
  else return window.document
}

export function isEdge<Data = ElementData>(element: MaybeElement): element is Edge<Data> {
  return element && 'id' in element && 'source' in element && 'target' in element
}

export function isGraphEdge<Data = ElementData>(element: MaybeElement): element is GraphEdge<Data> {
  return isEdge(element) && 'sourceNode' in element && 'targetNode' in element
}

export function isNode<Data = ElementData>(element: MaybeElement): element is Node<Data> {
  return element && 'id' in element && !isEdge(element)
}

export function isGraphNode<Data = ElementData>(element: MaybeElement): element is GraphNode<Data> {
  return isNode(element) && 'computedPosition' in element
}

export function isRect(obj: any): obj is Rect {
  return !!obj.width && !!obj.height && !!obj.x && !!obj.y
}

export function parseNode(node: Node, defaults: Partial<GraphNode> = {}): GraphNode {
  let initialState = defaults

  if (!isGraphNode(node)) {
    initialState = {
      type: node.type ?? defaults.type ?? 'default',
      dimensions: markRaw({
        width: 0,
        height: 0,
      }),
      handleBounds: {
        source: [],
        target: [],
      },
      computedPosition: markRaw({
        z: 0,
        ...node.position,
      }),
      draggable: undefined,
      selectable: undefined,
      connectable: undefined,
      focusable: undefined,
      selected: false,
      dragging: false,
      resizing: false,
      initialized: false,
      ...defaults,
      data: isDef(node.data) ? node.data : {},
      events: markRaw(isDef(node.events) ? node.events : {}),
    }
  }

  return Object.assign({}, initialState, node, { id: node.id.toString() }) as GraphNode
}

export function parseEdge(edge: Edge, defaults: Partial<GraphEdge> = {}): GraphEdge {
  const events = isDef(edge.events) ? edge.events : defaults.events && isDef(defaults.events) ? defaults.events : {}
  const data = isDef(edge.data) ? edge.data : defaults.data && isDef(defaults.data) ? defaults.data : {}

  defaults = !isGraphEdge(edge)
    ? ({
        ...defaults,
        sourceHandle: (edge.sourceHandle ? edge.sourceHandle.toString() : undefined) || defaults.sourceHandle,
        targetHandle: (edge.targetHandle ? edge.targetHandle.toString() : undefined) || defaults.targetHandle,
        type: edge.type ?? defaults.type ?? 'default',
        source: edge.source.toString() || defaults.source,
        target: edge.target.toString() || defaults.target,
        updatable: edge.updatable ?? defaults.updatable,
        selectable: edge.selectable ?? defaults.selectable,
        focusable: edge.focusable ?? defaults.focusable,
        data,
        events: markRaw(events),
        label: (edge.label && !isString(edge.label) ? markRaw(edge.label) : edge.label) || defaults.label,
        interactionWidth: edge.interactionWidth || defaults.interactionWidth,
      } as GraphEdge)
    : defaults

  return Object.assign({}, defaults, edge, { id: edge.id.toString() }) as GraphEdge
}

function getConnectedElements<T extends Elements = FlowElements>(
  node: Node,
  elements: T,
  dir: 'source' | 'target',
): T extends FlowElements ? GraphNode[] : Node[] {
  if (!isNode(node)) return []
  const origin = dir === 'source' ? 'target' : 'source'
  const ids = elements.filter((e) => isEdge(e) && e[origin] === node.id).map((e) => isEdge(e) && e[dir])
  return elements.filter((e) => ids.includes(e.id)) as T extends FlowElements ? GraphNode[] : Node[]
}
export function getOutgoers<T extends Elements = FlowElements>(node: Node, elements: T) {
  return getConnectedElements(node, elements, 'target')
}

export function getIncomers<T extends Elements = FlowElements>(node: Node, elements: T) {
  return getConnectedElements(node, elements, 'source')
}

export function getEdgeId({ source, sourceHandle, target, targetHandle }: Connection) {
  return `vueflow__edge-${source}${sourceHandle ?? ''}-${target}${targetHandle ?? ''}`
}

export function connectionExists(edge: Edge | Connection, elements: Elements) {
  return elements.some(
    (el) =>
      isEdge(el) &&
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  )
}

/**
 * @deprecated Use store instance and call `addEdges` with template-ref or the one received by `onPaneReady` instead
 *
 * Intended for options API
 * In composition API you can access utilities from `useVueFlow`
 */
export function addEdge(edgeParams: Edge | Connection, elements: Elements, defaults?: DefaultEdgeOptions) {
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
 * @deprecated Use store instance and call `updateEdge` with template-ref or the one received by `onPaneReady` instead
 *
 * Intended for options API
 * In composition API you can access utilities from `useVueFlow`
 */
export function updateEdge(oldEdge: Edge, newConnection: Connection, elements: Elements) {
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

export function rendererPointToPoint({ x, y }: XYPosition, { x: tx, y: ty, zoom: tScale }: ViewportTransform): XYPosition {
  return {
    x: x * tScale + tx,
    y: y * tScale + ty,
  }
}
export function pointToRendererPoint(
  { x, y }: XYPosition,
  { x: tx, y: ty, zoom: tScale }: ViewportTransform,
  snapToGrid: boolean,
  [snapX, snapY]: [number, number],
): XYPosition {
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

function getBoundsOfBoxes(box1: Box, box2: Box): Box {
  return {
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2),
  }
}

export function rectToBox({ x, y, width, height }: Rect): Box {
  return {
    x,
    y,
    x2: x + width,
    y2: y + height,
  }
}

export function boxToRect({ x, y, x2, y2 }: Box): Rect {
  return {
    x,
    y,
    width: x2 - x,
    height: y2 - y,
  }
}

export function getBoundsofRects(rect1: Rect, rect2: Rect) {
  return boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)))
}

export function getRectOfNodes(nodes: GraphNode[]) {
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

export function graphPosToZoomedPos({ x, y }: XYPosition, { x: tx, y: ty, zoom: tScale }: ViewportTransform): XYPosition {
  return {
    x: x * tScale + tx,
    y: y * tScale + ty,
  }
}

export function getNodesInside(
  nodes: GraphNode[],
  rect: Rect,
  { x: tx, y: ty, zoom: tScale }: ViewportTransform = { x: 0, y: 0, zoom: 1 },
  partially = false,
  // set excludeNonSelectableNodes if you want to pay attention to the nodes "selectable" attribute
  excludeNonSelectableNodes = false,
) {
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

export function getConnectedEdges(nodes: (Node | GraphNode | { id: string })[], edges: GraphEdge[]) {
  const nodeIds = nodes.map((node) => node.id)

  return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target))
}

export function getTransformForBounds(
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
): ViewportTransform {
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

export function getXYZPos(parentPos: XYZPosition, computedPosition: XYZPosition): XYZPosition {
  return {
    x: computedPosition.x + parentPos.x,
    y: computedPosition.y + parentPos.y,
    z: (parentPos.z > computedPosition.z ? parentPos.z : computedPosition.z) + 1,
  }
}

export function isParentSelected(node: GraphNode, findNode: Actions['findNode']): boolean {
  if (!node.parentNode) return false

  const parent = findNode(node.parentNode)
  if (!parent) return false

  if (parent.selected) return true

  return isParentSelected(parent, findNode)
}

export function getMarkerId(marker: EdgeMarkerType | undefined, vueFlowId?: string) {
  if (typeof marker === 'undefined') return ''

  if (typeof marker === 'string') return marker

  const idPrefix = vueFlowId ? `${vueFlowId}__` : ''

  return `${idPrefix}${Object.keys(marker)
    .sort()
    .map((key) => `${key}=${marker[<keyof EdgeMarkerType>key]}`)
    .join('&')}`
}
