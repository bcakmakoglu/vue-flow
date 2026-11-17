import { markRaw } from 'vue'
import type {
  Box,
  Connection,
  CoordinateExtent,
  DefaultEdgeOptions,
  Dimensions,
  Edge,
  EdgeMarkerType,
  Element,
  ElementData,
  Elements,
  FlowElements,
  GraphEdge,
  GraphNode,
  MaybeElement,
  Node,
  NodeLookup,
  Padding,
  PaddingWithUnit,
  Rect,
  ViewportTransform,
  XYPosition,
  XYZPosition,
} from '../types'
import { isDef, isMacOs, snapPosition, warn } from '.'

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

  if ('elementFromPoint' in doc) {
    return doc
  }

  return window.document
}

export function isEdge<Data = ElementData>(element: MaybeElement): element is Edge<Data> {
  return element && typeof element === 'object' && 'id' in element && 'source' in element && 'target' in element
}

export function isGraphEdge<Data = ElementData>(element: MaybeElement): element is GraphEdge<Data> {
  return isEdge(element) && 'sourceNode' in element && 'targetNode' in element
}

export function isNode<Data = ElementData>(element: MaybeElement): element is Node<Data> {
  return element && typeof element === 'object' && 'id' in element && 'position' in element && !isEdge(element)
}

export function isGraphNode<Data = ElementData>(element: MaybeElement): element is GraphNode<Data> {
  return isNode(element) && 'computedPosition' in element
}

function isNumeric(n: any): n is number {
  return !Number.isNaN(n) && Number.isFinite(n)
}

export function isRect(obj: any): obj is Rect {
  return isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y)
}

export function parseNode(node: Node, existingNode?: GraphNode, parentNode?: string): GraphNode {
  const initialState = {
    id: node.id.toString(),
    type: node.type ?? 'default',
    dimensions: markRaw({
      width: 0,
      height: 0,
    }),
    computedPosition: markRaw({
      z: 0,
      ...node.position,
    }),
    // todo: shouldn't be defined initially, as we want to use handleBounds to check if a node was actually initialized or not
    handleBounds: {
      source: [],
      target: [],
    },
    draggable: undefined,
    selectable: undefined,
    connectable: undefined,
    focusable: undefined,
    selected: false,
    dragging: false,
    resizing: false,
    initialized: false,
    isParent: false,
    position: {
      x: 0,
      y: 0,
    },
    data: isDef(node.data) ? node.data : {},
    events: markRaw(isDef(node.events) ? node.events : {}),
  } as GraphNode

  return Object.assign(existingNode ?? initialState, node, { id: node.id.toString(), parentNode }) as GraphNode
}

export function parseEdge(edge: Edge, existingEdge?: GraphEdge, defaultEdgeOptions?: DefaultEdgeOptions): GraphEdge {
  const initialState = {
    id: edge.id.toString(),
    type: edge.type ?? existingEdge?.type ?? 'default',
    source: edge.source.toString(),
    target: edge.target.toString(),
    sourceHandle: edge.sourceHandle?.toString(),
    targetHandle: edge.targetHandle?.toString(),
    updatable: edge.updatable ?? defaultEdgeOptions?.updatable,
    selectable: edge.selectable ?? defaultEdgeOptions?.selectable,
    focusable: edge.focusable ?? defaultEdgeOptions?.focusable,
    data: isDef(edge.data) ? edge.data : {},
    events: markRaw(isDef(edge.events) ? edge.events : {}),
    label: edge.label ?? '',
    interactionWidth: edge.interactionWidth ?? defaultEdgeOptions?.interactionWidth,
    ...(defaultEdgeOptions ?? {}),
  } as GraphEdge

  return Object.assign(existingEdge ?? initialState, edge, { id: edge.id.toString() }) as GraphEdge
}

function getConnectedElements<T extends Node = Node>(
  nodeOrId: Node | { id: string } | string,
  nodes: T[],
  edges: Edge[],
  dir: 'source' | 'target',
): T[] {
  const id = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId.id

  const connectedIds = new Set()

  const origin = dir === 'source' ? 'target' : 'source'

  for (const edge of edges) {
    if (edge[origin] === id) {
      connectedIds.add(edge[dir])
    }
  }

  return nodes.filter((n) => connectedIds.has(n.id))
}

export function getOutgoers<N extends Node>(nodeOrId: Node | { id: string } | string, nodes: N[], edges: Edge[]): N[]
export function getOutgoers<T extends Elements>(
  nodeOrId: Node | { id: string } | string,
  elements: T,
): T extends FlowElements ? GraphNode[] : Node[]
export function getOutgoers(...args: any[]) {
  if (args.length === 3) {
    const [nodeOrId, nodes, edges] = args
    return getConnectedElements(nodeOrId, nodes, edges, 'target')
  }

  const [nodeOrId, elements] = args
  const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId.id

  const outgoers = elements.filter((el: Element) => isEdge(el) && el.source === nodeId)

  return outgoers.map((edge: Edge) => elements.find((el: Element) => isNode(el) && el.id === edge.target))
}

export function getIncomers<N extends Node>(nodeOrId: Node | { id: string } | string, nodes: N[], edges: Edge[]): N[]
export function getIncomers<T extends Elements>(
  nodeOrId: Node | { id: string } | string,
  elements: T,
): T extends FlowElements ? GraphNode[] : Node[]
export function getIncomers(...args: any[]) {
  if (args.length === 3) {
    const [nodeOrId, nodes, edges] = args
    return getConnectedElements(nodeOrId, nodes, edges, 'source')
  }

  const [nodeOrId, elements] = args
  const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId.id

  const incomers = elements.filter((el: Element) => isEdge(el) && el.target === nodeId)

  return incomers.map((edge: Edge) => elements.find((el: Element) => isNode(el) && el.id === edge.source))
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

  edge = parseEdge(edge, undefined, defaults)

  if (connectionExists(edge, elements)) {
    return elements
  }

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

export function rendererPointToPoint(
  { x, y }: XYPosition,
  { x: tx, y: ty, zoom: tScale }: ViewportTransform,
  ancestorZoom: number,
): XYPosition {
  return {
    x: x * tScale * ancestorZoom + tx,
    y: y * tScale * ancestorZoom + ty,
  }
}
export function pointToRendererPoint(
  { x, y }: XYPosition,
  { x: tx, y: ty, zoom: tScale }: ViewportTransform,
  snapToGrid: boolean = false,
  snapGrid: [snapX: number, snapY: number] = [1, 1],
  ancestorZoom = 1,
): XYPosition {
  const position: XYPosition = {
    x: (x - tx) / (tScale * ancestorZoom),
    y: (y - ty) / (tScale * ancestorZoom),
  }

  return snapToGrid ? snapPosition(position, snapGrid) : position
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

// todo: fix typo
export function getBoundsofRects(rect1: Rect, rect2: Rect) {
  return boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)))
}

export function getRectOfNodes(nodes: GraphNode[]) {
  let box: Box = {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    x2: Number.NEGATIVE_INFINITY,
    y2: Number.NEGATIVE_INFINITY,
  }

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    box = getBoundsOfBoxes(
      box,
      rectToBox({
        ...node.computedPosition,
        ...node.dimensions,
      } as Rect),
    )
  }

  return boxToRect(box)
}

export function getNodesInside(
  nodes: GraphNode[],
  rect: Rect,
  viewport: ViewportTransform = { x: 0, y: 0, zoom: 1 },
  partially = false,
  // set excludeNonSelectableNodes if you want to pay attention to the nodes "selectable" attribute
  excludeNonSelectableNodes = false,
) {
  const paneRect = {
    ...pointToRendererPoint(rect, viewport),
    width: rect.width / viewport.zoom,
    height: rect.height / viewport.zoom,
  }

  const visibleNodes: GraphNode[] = []

  for (const node of nodes) {
    const { dimensions, selectable = true, hidden = false } = node
    const width = dimensions.width ?? node.width ?? null
    const height = dimensions.height ?? node.height ?? null

    if ((excludeNonSelectableNodes && !selectable) || hidden) {
      continue
    }

    const overlappingArea = getOverlappingArea(paneRect, nodeToRect(node))
    const notInitialized = width === null || height === null

    const partiallyVisible = partially && overlappingArea > 0
    const area = (width ?? 0) * (height ?? 0)
    const isVisible = notInitialized || partiallyVisible || overlappingArea >= area

    if (isVisible || node.dragging) {
      visibleNodes.push(node)
    }
  }

  return visibleNodes
}

export function getConnectedEdges<E extends Edge>(nodesOrId: Node[] | string, edges: E[]) {
  const nodeIds = new Set()

  if (typeof nodesOrId === 'string') {
    nodeIds.add(nodesOrId)
  } else if (nodesOrId.length >= 1) {
    for (const n of nodesOrId) {
      nodeIds.add(n.id)
    }
  }

  return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target))
}

export function getConnectedNodes<N extends Node | { id: string } | string>(nodes: N[], edges: Edge[]) {
  const nodeIds = new Set()

  for (const node of nodes) {
    nodeIds.add(typeof node === 'string' ? node : node.id)
  }

  const connectedNodeIds = edges.reduce((acc, edge) => {
    if (nodeIds.has(edge.source)) {
      acc.add(edge.target)
    }

    if (nodeIds.has(edge.target)) {
      acc.add(edge.source)
    }

    return acc
  }, new Set())

  return nodes.filter((node) => connectedNodeIds.has(typeof node === 'string' ? node : node.id))
}

/**
 * Parses a single padding value to a number
 * @internal
 * @param padding - Padding to parse
 * @param viewport - Width or height of the viewport
 * @returns The padding in pixels
 */
function parsePadding(padding: PaddingWithUnit, viewport: number): number {
  if (typeof padding === 'number') {
    return Math.floor((viewport - viewport / (1 + padding)) * 0.5)
  }

  if (typeof padding === 'string' && padding.endsWith('px')) {
    const paddingValue = Number.parseFloat(padding)
    if (!Number.isNaN(paddingValue)) {
      return Math.floor(paddingValue)
    }
  }

  if (typeof padding === 'string' && padding.endsWith('%')) {
    const paddingValue = Number.parseFloat(padding)
    if (!Number.isNaN(paddingValue)) {
      return Math.floor(viewport * paddingValue * 0.01)
    }
  }

  warn(`The padding value "${padding}" is invalid. Please provide a number or a string with a valid unit (px or %).`)

  return 0
}

/**
 * Parses the paddings to an object with top, right, bottom, left, x and y paddings
 * @internal
 * @param padding - Padding to parse
 * @param width - Width of the viewport
 * @param height - Height of the viewport
 * @returns An object with the paddings in pixels
 */
function parsePaddings(
  padding: Padding,
  width: number,
  height: number,
): { top: number; bottom: number; left: number; right: number; x: number; y: number } {
  if (typeof padding === 'string' || typeof padding === 'number') {
    const paddingY = parsePadding(padding, height)
    const paddingX = parsePadding(padding, width)
    return {
      top: paddingY,
      right: paddingX,
      bottom: paddingY,
      left: paddingX,
      x: paddingX * 2,
      y: paddingY * 2,
    }
  }

  if (typeof padding === 'object') {
    const top = parsePadding(padding.top ?? padding.y ?? 0, height)
    const bottom = parsePadding(padding.bottom ?? padding.y ?? 0, height)
    const left = parsePadding(padding.left ?? padding.x ?? 0, width)
    const right = parsePadding(padding.right ?? padding.x ?? 0, width)
    return { top, right, bottom, left, x: left + right, y: top + bottom }
  }

  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 }
}

/**
 * Calculates the resulting paddings if the new viewport is applied
 * @internal
 * @param bounds - Bounds to fit inside viewport
 * @param x - X position of the viewport
 * @param y - Y position of the viewport
 * @param zoom - Zoom level of the viewport
 * @param width - Width of the viewport
 * @param height - Height of the viewport
 * @returns An object with the minimum padding required to fit the bounds inside the viewport
 */
function calculateAppliedPaddings(bounds: Rect, x: number, y: number, zoom: number, width: number, height: number) {
  const { x: left, y: top } = rendererPointToPoint(bounds, { x, y, zoom })

  const { x: boundRight, y: boundBottom } = rendererPointToPoint(
    { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
    {
      x,
      y,
      zoom,
    },
  )

  const right = width - boundRight
  const bottom = height - boundBottom

  return {
    left: Math.floor(left),
    top: Math.floor(top),
    right: Math.floor(right),
    bottom: Math.floor(bottom),
  }
}

/**
 * Returns a viewport that encloses the given bounds with padding.
 * @public
 * @remarks You can determine bounds of nodes with {@link getNodesBounds} and {@link getBoundsOfRects}
 * @param bounds - Bounds to fit inside viewport.
 * @param width - Width of the viewport.
 * @param height  - Height of the viewport.
 * @param minZoom - Minimum zoom level of the resulting viewport.
 * @param maxZoom - Maximum zoom level of the resulting viewport.
 * @param padding - Padding around the bounds.
 * @returns A transformed {@link Viewport} that encloses the given bounds which you can pass to e.g. {@link setViewport}.
 * @example
 * const { x, y, zoom } = getViewportForBounds(
 * { x: 0, y: 0, width: 100, height: 100},
 * 1200, 800, 0.5, 2);
 */
export function getTransformForBounds(
  bounds: Rect,
  width: number,
  height: number,
  minZoom: number,
  maxZoom: number,
  padding: Padding = 0.1,
): ViewportTransform {
  // First we resolve all the paddings to actual pixel values
  const p = parsePaddings(padding, width, height)

  const xZoom = (width - p.x) / bounds.width
  const yZoom = (height - p.y) / bounds.height

  // We calculate the new x, y, zoom for a centered view
  const zoom = Math.min(xZoom, yZoom)
  const clampedZoom = clamp(zoom, minZoom, maxZoom)

  const boundsCenterX = bounds.x + bounds.width / 2
  const boundsCenterY = bounds.y + bounds.height / 2
  const x = width / 2 - boundsCenterX * clampedZoom
  const y = height / 2 - boundsCenterY * clampedZoom

  // Then we calculate the minimum padding, to respect asymmetric paddings
  const newPadding = calculateAppliedPaddings(bounds, x, y, clampedZoom, width, height)

  // We only want to have an offset if the newPadding is smaller than the required padding
  const offset = {
    left: Math.min(newPadding.left - p.left, 0),
    top: Math.min(newPadding.top - p.top, 0),
    right: Math.min(newPadding.right - p.right, 0),
    bottom: Math.min(newPadding.bottom - p.bottom, 0),
  }

  return {
    x: x - offset.left + offset.right,
    y: y - offset.top + offset.bottom,
    zoom: clampedZoom,
  }
}

export function getXYZPos(parentPos: XYZPosition, computedPosition: XYZPosition): XYZPosition {
  return {
    x: computedPosition.x + parentPos.x,
    y: computedPosition.y + parentPos.y,
    z: (parentPos.z > computedPosition.z ? parentPos.z : computedPosition.z) + 1,
  }
}

export function isParentSelected(node: GraphNode, nodeLookup: NodeLookup): boolean {
  if (!node.parentNode) {
    return false
  }

  const parent = nodeLookup.get(node.parentNode)
  if (!parent) {
    return false
  }

  if (parent.selected) {
    return true
  }

  return isParentSelected(parent, nodeLookup)
}

export function getMarkerId(marker: EdgeMarkerType | undefined, vueFlowId?: string) {
  if (typeof marker === 'undefined') {
    return ''
  }

  if (typeof marker === 'string') {
    return marker
  }

  const idPrefix = vueFlowId ? `${vueFlowId}__` : ''

  return `${idPrefix}${Object.keys(marker)
    .sort()
    .map((key) => `${key}=${marker[<keyof EdgeMarkerType>key]}`)
    .join('&')}`
}

export function wheelDelta(event: any) {
  const factor = event.ctrlKey && isMacOs() ? 10 : 1

  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * factor
}
