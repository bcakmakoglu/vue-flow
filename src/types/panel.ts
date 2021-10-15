import { Selection as D3Selection, ZoomBehavior } from 'd3'
import { FitViewFunc, FlowTransform, Rect, Transform, XYPosition } from './types'

export type KeyCode = number | string

export enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface ZoomPanHelperFunctions {
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (zoomLevel: number) => void
  transform: (transform: FlowTransform) => void
  fitView: FitViewFunc
  setCenter: (x: number, y: number, zoom?: number) => void
  fitBounds: (bounds: Rect, padding?: number) => void
  project: (position: XYPosition) => XYPosition
}

export type InitD3ZoomPayload = {
  d3Zoom: ZoomBehavior<Element, unknown>
  d3Selection: D3Selection<Element, unknown, null, undefined>
  d3ZoomHandler: ((this: Element, event: any, d: unknown) => void) | undefined
  transform: Transform
}
