import { Dimensions, Elements, XYPosition } from './types'
import { NodeDiffUpdate, NodeDimensionUpdate, NodeExtent, NodePosUpdate, TranslateExtent } from './node'
import { InitD3ZoomPayload } from './panel'
import { SetConnectionId } from './connection'

export interface RevueFlowActions {
  setElements: (elements: Elements) => void
  updateNodeDimensions: (update: NodeDimensionUpdate) => void
  updateNodePos: (payload: NodePosUpdate) => void
  updateNodePosDiff: (payload: NodeDiffUpdate) => void
  setUserSelection: (mousePos: XYPosition) => void
  updateUserSelection: (mousePos: XYPosition) => void
  unsetUserSelection: () => void
  addSelectedElements: (elements: Elements) => void
  initD3Zoom: (payload: InitD3ZoomPayload) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: TranslateExtent) => void
  setNodeExtent: (nodeExtent: NodeExtent) => void
  resetSelectedElements: () => void
  unsetNodesSelection: () => void
  updateSize: (size: Dimensions) => void
  setConnectionNodeId: (payload: SetConnectionId) => void
  setInteractive: (isInteractive: boolean) => void
}
