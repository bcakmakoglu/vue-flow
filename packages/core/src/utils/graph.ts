import { markRaw } from 'vue'
import { getOverlappingArea } from '@xyflow/system'
import { isDef, warn } from '.'
import type {
  Actions,
  Box,
  Connection,
  DefaultEdgeOptions,
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
  Rect,
  ViewportTransform,
  XYZPosition,
} from '~/types'

// todo: refactor generic to use MaybeElement
export function isEdge<Data = ElementData>(element: MaybeElement): element is Edge<Data> {
  return element && typeof element === 'object' && 'id' in element && 'source' in element && 'target' in element
}

// todo: refactor generic to use MaybeElement
export function isGraphEdge<Data = ElementData>(element: MaybeElement): element is GraphEdge<Data> {
  return isEdge(element) && 'sourceNode' in element && 'targetNode' in element
}

// todo: refactor generic to use MaybeElement
export function isNode<Data = ElementData>(element: MaybeElement): element is Node<Data> {
  return element && typeof element === 'object' && 'id' in element && 'position' in element && !isEdge(element)
}

// todo: refactor generic to use MaybeElement
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
        label: (edge.label && typeof edge.label !== 'string' ? markRaw(edge.label) : edge.label) || defaults.label,
        interactionWidth: edge.interactionWidth || defaults.interactionWidth,
      } as GraphEdge)
    : defaults

  return Object.assign({}, defaults, edge, { id: edge.id.toString() }) as GraphEdge
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

  edges.forEach((edge) => {
    if (edge[origin] === id) {
      connectedIds.add(edge[dir])
    }
  })

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

  edge = parseEdge(edge, defaults)

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

export function getConnectedEdges<E extends Edge>(nodesOrId: Node[] | string, edges: E[]) {
  const nodeIds = new Set()

  if (typeof nodesOrId === 'string') {
    nodeIds.add(nodesOrId)
  } else if (nodesOrId.length >= 1) {
    nodesOrId.forEach((n) => nodeIds.add(n.id))
  }

  return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target))
}

export function getConnectedNodes<N extends Node | { id: string } | string>(nodes: N[], edges: Edge[]) {
  const nodeIds = new Set()

  nodes.forEach((node) => nodeIds.add(typeof node === 'string' ? node : node.id))

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

export function getXYZPos(parentPos: XYZPosition, computedPosition: XYZPosition): XYZPosition {
  return {
    x: computedPosition.x + parentPos.x,
    y: computedPosition.y + parentPos.y,
    z: (parentPos.z > computedPosition.z ? parentPos.z : computedPosition.z) + 1,
  }
}

export function isParentSelected(node: GraphNode, findNode: Actions['findNode']): boolean {
  if (!node.parentNode) {
    return false
  }

  const parent = findNode(node.parentNode)
  if (!parent) {
    return false
  }

  if (parent.selected) {
    return true
  }

  return isParentSelected(parent, findNode)
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
