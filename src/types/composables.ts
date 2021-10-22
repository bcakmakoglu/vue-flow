import { Ref } from 'vue'
import { ElementId, FlowTransform } from './types'
import { D3Zoom, D3Selection, PanOnScrollMode, KeyCode } from './panel'
import { Connection } from './connection'

export type UpdateNodeInternals = (nodeId: ElementId) => void

export interface UseZoomOptions {
  selectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  paneMoveable?: boolean
  defaultZoom?: number
  defaultPosition?: [number, number]
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
}

export interface UseZoom {
  transform: Ref<FlowTransform>
  d3Zoom: Ref<D3Zoom>
  d3Selection: Ref<D3Selection>
}

export type ValidConnectionFunc = (connection: Connection) => boolean
