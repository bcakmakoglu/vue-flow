import type { Component } from 'vue'
import type { FitViewParams, PanelPosition, PanelPositionType } from '@vue-flow/core'

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
  position?: PanelPositionType | PanelPosition
}

export type ControlType = 'zoom-in' | 'zoom-out' | 'fit-view' | 'interactive'

export interface ControlItemSlotProps {
  /** Type of the control button */
  control: ControlType
  /** Whether the button is disabled */
  disabled?: boolean
  /** Default click handler */
  onClick: () => any
  /** Default icon component reflecting the control type and state */
  icon: Component
}

export interface ControlsSlotProps {
  /** Whether the zoom in button is disabled */
  zoomInDisabled: boolean
  /** Zoom in button click handler */
  zoomIn: () => any
  /** Zoom in icon component */
  zoomInIcon: Component
  /** Whether the zoom out button is disabled */
  zoomOutDisabled: boolean
  /** Zoom out button click handler */
  zoomOut: () => any
  /** Zoom out icon component */
  zoomOutIcon: Component
  /** Fit view button click handler */
  fitView: () => any
  /** Fit view icon component */
  fitViewIcon: Component
  /** Whether the interaction is enabled */
  interactive: boolean
  /** Toggle interaction button */
  toggleInteractive: () => any
  /** Interactive icon component reflecting current state */
  interactiveIcon: Component
  /** Lock icon component */
  lockIcon: Component
  /** Unlock icon component */
  unlockIcon: Component
}
