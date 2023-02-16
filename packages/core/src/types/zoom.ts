import type { Selection, ZoomBehavior } from 'd3'
import type { Rect, XYPosition } from './flow'

export type D3Zoom = ZoomBehavior<HTMLDivElement, unknown>
export type D3Selection = Selection<HTMLDivElement, unknown, any, any>
export type D3ZoomHandler = (this: HTMLDivElement, event: any, d: unknown) => void

export enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface TransitionOptions {
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
} & TransitionOptions

export interface ViewportTransform {
  x: number
  y: number
  zoom: number
}

export type SetCenterOptions = TransitionOptions & {
  zoom?: number
}

export type FitBoundsOptions = TransitionOptions & {
  padding?: number
}

/** Fit the viewport around visible nodes */
export type FitView = (fitViewOptions?: FitViewParams) => void

/** project a position onto the viewport, i.e. a mouse event clientX/clientY onto graph coordinates */
export type Project = (position: XYPosition) => XYPosition

/** set center of viewport */
export type SetCenter = (x: number, y: number, options?: SetCenterOptions) => void

/** fit the viewport around bounds */
export type FitBounds = (bounds: Rect, options?: FitBoundsOptions) => void

/** zoom in/out */
export type ZoomInOut = (options?: TransitionOptions) => void

/** zoom to a specific level */
export type ZoomTo = (zoomLevel: number, options?: TransitionOptions) => void

/** get current viewport transform */
export type GetTransform = () => ViewportTransform

/** set current viewport transform */
export type SetTransform = (transform: ViewportTransform, options?: TransitionOptions) => void

export interface ViewportFunctions {
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
