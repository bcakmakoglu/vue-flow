import type { GraphNode } from '../types'

export const isMacOs = () => typeof navigator !== 'undefined' && navigator?.userAgent?.indexOf('Mac') >= 0

export function getNodeDimensions(node: GraphNode): { width: number; height: number } {
  return {
    width: node.dimensions?.width ?? node.width ?? 0,
    height: node.dimensions?.height ?? node.height ?? 0,
  }
}
