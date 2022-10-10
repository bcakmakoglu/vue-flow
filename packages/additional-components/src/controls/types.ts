import type { FitViewParams } from '@vue-flow/core'
import type { PanelPosition } from '../panel'

export interface ControlProps {
  /** Show the zoom icon */
  showZoom?: boolean
  /** Show the fit-view icon */
  showFitView?: boolean
  /** Show the interactive icon */
  showInteractive?: boolean
  /** Params to use on fitView */
  fitViewParams?: FitViewParams
  /** Position of the controls {@link PanelPosition} */
  position: PanelPosition
}
