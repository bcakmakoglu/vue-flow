import type { PanelPosition } from '@xyflow/system'

type PanelPositionType = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface PanelProps {
  position: PanelPosition | PanelPositionType
}
