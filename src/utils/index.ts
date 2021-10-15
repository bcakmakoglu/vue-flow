import { Dimensions, XYPosition, NodeExtent } from '../types'

export const isInputDOMNode = (e: KeyboardEvent | MouseEvent): boolean => {
  const target = e.target as HTMLElement
  return ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(target.nodeName) || target.hasAttribute('contentEditable')
}

export const getDimensions = (node: HTMLDivElement): Dimensions => ({
  width: node.offsetWidth,
  height: node.offsetHeight
})

export const clamp = (val: number, min = 0, max = 1): number => Math.min(Math.max(val, min), max)

export const clampPosition = (position: XYPosition, extent: NodeExtent): XYPosition => ({
  x: clamp(position.x, extent[0][0], extent[1][0]),
  y: clamp(position.y, extent[0][1], extent[1][1])
})

export const getHostForElement = (element: HTMLElement): Document | ShadowRoot =>
  (element.getRootNode() as Document | ShadowRoot) || window.document
