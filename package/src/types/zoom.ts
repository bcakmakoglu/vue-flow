import type { Selection, ZoomBehavior } from 'd3'
import type { Rect, XYPosition } from './flow'

export type D3Zoom = ZoomBehavior<HTMLDivElement, unknown>
export type D3Selection = Selection<HTMLDivElement, unknown, any, any>
export type D3ZoomHandler = (this: HTMLDivElement, event: any, d: unknown) => void

/** Transform x, y, z */
export interface Viewport {
  x: number
  y: number
  zoom: number
}

export type KeyCode = number | string

export enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface ViewportFuncsOptions {
  duration?: number
}

export type FitViewParams = {
  padding?: number
  includeHiddenNodes?: boolean
  minZoom?: number
  maxZoom?: number
  offset?: {
    x?: number
    y?: number
  }
  nodes?: string[]
} & ViewportFuncsOptions

export interface FlowTransform {
  x: number
  y: number
  zoom: number
}

export type SetCenterOptions = ViewportFuncsOptions & {
  zoom?: number
}

export type FitBoundsOptions = ViewportFuncsOptions & {
  padding?: number
}

export type FitView = (fitViewOptions?: FitViewParams) => void
export type Project = (position: XYPosition) => XYPosition
export type SetCenter = (x: number, y: number, options?: SetCenterOptions) => void
export type FitBounds = (bounds: Rect, options?: FitBoundsOptions) => void
export type ZoomInOut = (options?: ViewportFuncsOptions) => void
export type ZoomTo = (zoomLevel: number, options?: ViewportFuncsOptions) => void
export type GetTransform = () => FlowTransform
export type SetTransform = (transform: FlowTransform, options?: ViewportFuncsOptions) => void

export interface ViewportFuncs {
  zoomIn: ZoomInOut
  zoomOut: ZoomInOut
  zoomTo: ZoomTo
  setTransform: SetTransform
  getTransform: GetTransform
  fitView: FitView
  setCenter: SetCenter
  fitBounds: FitBounds
  project: Project
}
