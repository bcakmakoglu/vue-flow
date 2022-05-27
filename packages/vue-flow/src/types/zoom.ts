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

export interface ViewpaneTransform {
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

/** Fit the viewpane around visible nodes */
export type FitView = (fitViewOptions?: FitViewParams) => void

/** project a position onto the viewpane, i.e. a mouse event clientX/clientY onto graph coordinates */
export type Project = (position: XYPosition) => XYPosition

/** set center of viewpane */
export type SetCenter = (x: number, y: number, options?: SetCenterOptions) => void

/** fit the viewpane around bounds */
export type FitBounds = (bounds: Rect, options?: FitBoundsOptions) => void

/** zoom in/out */
export type ZoomInOut = (options?: TransitionOptions) => void

/** zoom to a specific level */
export type ZoomTo = (zoomLevel: number, options?: TransitionOptions) => void

/** get current viewpane transform */
export type GetTransform = () => ViewpaneTransform

/** set current viewpane transform */
export type SetTransform = (transform: ViewpaneTransform, options?: TransitionOptions) => void

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
