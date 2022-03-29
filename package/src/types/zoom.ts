import { Selection, ZoomBehavior } from 'd3'
import { Rect, XYPosition } from './flow'

export type D3Zoom = ZoomBehavior<HTMLDivElement, unknown>
export type D3Selection = Selection<HTMLDivElement, unknown, any, any>
export type D3ZoomHandler = (this: HTMLDivElement, event: any, d: unknown) => void

export type KeyCode = number | string

export enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type UseZoomPanHelperOptions = {
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
} & UseZoomPanHelperOptions

export type FlowTransform = {
  x: number
  y: number
  zoom: number
}

export type SetCenterOptions = UseZoomPanHelperOptions & {
  zoom?: number
}

export type FitBoundsOptions = UseZoomPanHelperOptions & {
  padding?: number
}

export type FitView = (fitViewOptions?: FitViewParams) => void
export type Project = (position: XYPosition) => XYPosition
export type SetCenter = (x: number, y: number, options?: SetCenterOptions) => void
export type FitBounds = (bounds: Rect, options?: FitBoundsOptions) => void
export type ZoomInOut = (options?: UseZoomPanHelperOptions) => void
export type ZoomTo = (zoomLevel: number, options?: UseZoomPanHelperOptions) => void
export type GetTransform = () => FlowTransform
export type SetTransform = (transform: FlowTransform, options?: UseZoomPanHelperOptions) => void

export interface UseZoomPanHelper {
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
