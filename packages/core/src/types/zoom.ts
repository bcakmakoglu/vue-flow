import type { Selection } from 'd3-selection'
import type { ZoomBehavior } from 'd3-zoom'
import type {
  FitBoundsOptions,
  FitViewOptionsBase,
  Rect,
  SetCenterOptions,
  Viewport,
  ViewportHelperFunctionOptions,
  XYPosition,
} from '@xyflow/system'

export type D3Zoom = ZoomBehavior<HTMLDivElement, unknown>
export type D3Selection = Selection<HTMLDivElement, any, any, any>
export type D3ZoomHandler = (this: HTMLDivElement, event: any, d: unknown) => void

export interface FitViewParams extends Omit<FitViewOptionsBase<any>, 'nodes' | 'nodeOrigin'> {
  nodes?: string[]
  offset?: {
    x?: number
    y?: number
  }
}

/** Fit the viewport around visible nodes */
export type FitView = (fitViewOptions?: FitViewParams) => Promise<boolean>

/** project a position onto the viewport, i.e. a mouse event clientX/clientY onto graph coordinates */
export type Project = (position: XYPosition) => XYPosition

/** set center of viewport */
export type SetCenter = (x: number, y: number, options?: SetCenterOptions) => Promise<boolean>

/** fit the viewport around bounds */
export type FitBounds = (bounds: Rect, options?: FitBoundsOptions) => Promise<boolean>

/** zoom in/out */
export type ZoomInOut = (options?: ViewportHelperFunctionOptions) => Promise<boolean>

/** zoom to a specific level */
export type ZoomTo = (zoomLevel: number, options?: ViewportHelperFunctionOptions) => Promise<boolean>

/** get current viewport transform */
export type GetViewport = () => Viewport

/** set current viewport transform */
export type SetViewport = (transform: Viewport, options?: ViewportHelperFunctionOptions) => Promise<boolean>

export interface ViewportFunctions {
  zoomIn: ZoomInOut
  zoomOut: ZoomInOut
  zoomTo: ZoomTo
  setViewport: SetViewport
  /** @deprecated use setViewport instead */
  setTransform: SetViewport
  getViewport: GetViewport
  /** @deprecated use getViewport instead */
  getTransform: GetViewport
  fitView: FitView
  setCenter: SetCenter
  fitBounds: FitBounds
  project: Project
}
