import type { Elements, GraphEdge, GraphNode } from '@vue-flow/core'
import { Position, isGraphEdge, isGraphNode } from '@vue-flow/core'
import type { GraphLabel } from 'dagre'
import dagre from 'dagre'
import type { LayoutOptions, UpdateParams } from './types'

export function layout(elements: Elements, options?: LayoutOptions, dagreOptions?: GraphLabel): void
export function layout(nodes: GraphNode[], edges: GraphEdge[], options?: LayoutOptions, dagreOptions?: GraphLabel): void
export function layout(...args: any[]) {
  let options: LayoutOptions
  let dagreOptions: GraphLabel
  let nodes: GraphNode[]
  let edges: GraphEdge[]
  let elements: Elements

  // if we got 4 args, we assume that we got nodes and edges separately
  if (Array.isArray(args[1])) {
    ;[nodes, edges, options, dagreOptions] = args
  } else {
    ;[elements, options, dagreOptions] = args
    nodes = elements.filter(isGraphNode)
    edges = elements.filter(isGraphEdge)
  }

  const { direction = 'LR', offset, onUpdated, onBeforeUpdate } = options

  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  const isHorizontal = direction === 'LR' || direction === 'RL'
  dagreGraph.setGraph({
    rankdir: direction,
    ...dagreOptions,
  })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.dimensions.width, height: node.dimensions.height })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  let updates: UpdateParams[] | false = []

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = isHorizontal ? Position.Left : Position.Top
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom
    ;(updates as UpdateParams[]).push({
      node,
      nextPos: {
        x: nodeWithPosition.x - node.dimensions.width / 2 - (offset?.x ?? 0),
        y: nodeWithPosition.y - node.dimensions.height / 2 - (offset?.y ?? 0),
      },
    })
  })

  updates = onBeforeUpdate ? onBeforeUpdate(updates) : updates

  if (updates && updates.length) {
    updates.forEach(({ node, nextPos }) => (node.position = nextPos))

    onUpdated?.()
  }
}
