import { markRaw } from 'vue'
import type { Viewport } from '@xyflow/system'
import {
  boxToRect,
  getBoundsOfBoxes,
  getOverlappingArea,
  getViewportForBounds,
  pointToRendererPoint,
  rectToBox,
} from '@xyflow/system'
import type {
  Box,
  Connection,
  DefaultEdgeOptions,
  Edge,
  ElementData,
  GraphEdge,
  GraphNode,
  Node,
  NodeLookup,
  Rect,
  XYZPosition,
} from '../types'
import { isDef } from '.'

export { getEventPosition, pointToRendererPoint } from '@xyflow/system'

export function nodeToRect(node: GraphNode): Rect {
  return {
    ...(node.internals.positionAbsolute || { x: 0, y: 0 }),
    width: node.measured.width || 0,
    height: node.measured.height || 0,
  }
}

export function isEdge<Data = ElementData>(element: unknown): element is Edge<Data> {
  return !!element && typeof element === 'object' && 'id' in element && 'source' in element && 'target' in element
}

export function isGraphEdge<Data = ElementData>(element: unknown): element is GraphEdge<Data> {
  return isEdge(element) && 'sourceNode' in element && 'targetNode' in element
}

export function isNode<NodeType extends Node = Node>(element: unknown): element is NodeType {
  return !!element && typeof element === 'object' && 'id' in element && 'position' in element && !isEdge(element)
}

export function isGraphNode<NodeType extends Node = Node>(element: unknown): element is GraphNode<NodeType> {
  return isNode(element) && 'computedPosition' in element
}

export function parseNode<NodeType extends Node = Node>(
  node: Node,
  existingNode?: GraphNode<NodeType>,
  parentId?: string,
): GraphNode<NodeType> {
  const initialState = {
    id: node.id.toString(),
    type: node.type ?? 'default',
    measured: markRaw({
      width: 0,
      height: 0,
    }),
    internals: {
      positionAbsolute: {
        x: node.position?.x ?? 0,
        y: node.position?.y ?? 0,
      },
      z: node.zIndex ?? 0,
      userNode: node,
      handleBounds: {
        source: [] as any[],
        target: [] as any[],
      },
    },
    draggable: undefined,
    selectable: undefined,
    connectable: undefined,
    focusable: undefined,
    selected: false,
    dragging: false,
    resizing: false,
    initialized: false,
    position: {
      x: 0,
      y: 0,
    },
    data: isDef(node.data) ? node.data : {},
  } as unknown as GraphNode

  return Object.assign(existingNode ?? initialState, node, {
    id: node.id.toString(),
    parentId: node.parentId ?? parentId,
  }) as GraphNode<NodeType>
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
    label: edge.label ?? '',
    interactionWidth: edge.interactionWidth ?? defaultEdgeOptions?.interactionWidth,
    ...(defaultEdgeOptions ?? {}),
  } as GraphEdge

  return Object.assign(existingEdge ?? initialState, edge, { id: edge.id.toString() }) as GraphEdge
}

export function getEdgeId({ source, sourceHandle, target, targetHandle }: Connection) {
  return `vueflow__edge-${source}${sourceHandle ?? ''}-${target}${targetHandle ?? ''}`
}

export function connectionExists(edge: Edge | Connection, edges: Edge[]) {
  return edges.some(
    (el) =>
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)),
  )
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
        ...node.internals.positionAbsolute,
        ...node.measured,
      } as Rect),
    )
  }

  return boxToRect(box)
}

export function getNodesInside<NodeType extends Node = Node>(
  nodes: GraphNode<NodeType>[],
  rect: Rect,
  viewport: Viewport = { x: 0, y: 0, zoom: 1 },
  partially = false,
  // set excludeNonSelectableNodes if you want to pay attention to the nodes "selectable" attribute
  excludeNonSelectableNodes = false,
) {
  const transform: [number, number, number] = [viewport.x, viewport.y, viewport.zoom]
  const paneRect = {
    ...pointToRendererPoint(rect, transform),
    width: rect.width / viewport.zoom,
    height: rect.height / viewport.zoom,
  }

  const visibleNodes: GraphNode<NodeType>[] = []

  for (const node of nodes) {
    const { measured, selectable = true, hidden = false } = node
    const width = measured.width ?? node.width ?? null
    const height = measured.height ?? node.height ?? null

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
): Viewport {
  const viewport = getViewportForBounds(bounds, width, height, minZoom, maxZoom, padding)
  return {
    x: viewport.x + (offset.x ?? 0),
    y: viewport.y + (offset.y ?? 0),
    zoom: viewport.zoom,
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
  const parentId = node.parentId
  if (!parentId) {
    return false
  }

  const parent = nodeLookup.get(parentId)
  if (!parent) {
    return false
  }

  if (parent.selected) {
    return true
  }

  return isParentSelected(parent, nodeLookup)
}
