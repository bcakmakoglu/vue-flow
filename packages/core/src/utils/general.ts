import type { GraphNode } from '../types'

export function getNodeDimensions(node: GraphNode): { width: number; height: number } {
  return {
    width: node.measured?.width ?? node.width ?? 0,
    height: node.measured?.height ?? node.height ?? 0,
  }
}
