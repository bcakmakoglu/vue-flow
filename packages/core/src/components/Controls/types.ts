import type { FitViewParams, PanelPosition, PanelPositionType } from '@vue-flow/core'

export interface ControlProps {
  /**
   * Show the zoom control buttons (zoom-in & zoom-out)
   *
   * @default true
   */
  showZoom?: boolean
  /**
   * Show the fit view control button
   *
   * @default true
   */
  showFitView?: boolean
  /**
   * Show the interactivity toggle control button
   *
   * @default true
   */
  showInteractive?: boolean
  /**
   * {@link FitViewParams Parameters} to use when the fit view control button is pressed
   *
   * @default undefined
   */
  fitViewParams?: FitViewParams
  /**
   * The {@link PanelPositionType position} of the `<Controls>` panel
   *
   * @default 'bottom-left'
   */
  position?: PanelPositionType | PanelPosition
}

export interface ControlEmits {
  (event: 'zoomIn'): void
  (event: 'zoomOut'): void
  (event: 'fitView'): void
  (event: 'interactionChange', isInteractive: boolean): void
}
