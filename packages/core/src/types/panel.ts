/**
 * @deprecated; todo: remove this and use `PanelPositionType` instead
 */
export enum PanelPosition {
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
}

type PanelPositionType = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface PanelProps {
  position: PanelPosition | PanelPositionType
}
