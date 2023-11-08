/**
 * Vue Flow
 * @module vue-flow
 */

export { default as VueFlow } from './container/VueFlow/VueFlow.vue'

export { default as Handle } from './components/Handle/Handle.vue'

export { default as Panel } from './components/Panel/Panel.vue'

export {
  StraightEdge,
  StepEdge,
  BezierEdge,
  SimpleBezierEdge,
  SmoothStepEdge,
  BaseEdge,
  EdgeText,
  EdgeLabelRenderer,
} from './components/Edges'

// system types
export {
  type SmoothStepPathOptions,
  type BezierPathOptions,
  ConnectionLineType,
  // todo: type EdgeMarker,
  // todo: type EdgeMarkerType,
  MarkerType,
  type OnMove,
  type OnMoveStart,
  type OnMoveEnd,
  type Connection,
  type ConnectionStatus,
  ConnectionMode,
  type OnConnectStartParams,
  type OnConnectStart,
  type OnConnect,
  type OnConnectEnd,
  type IsValidConnection,
  type Viewport,
  type SnapGrid,
  PanOnScrollMode,
  type ViewportHelperFunctionOptions,
  type SetCenterOptions,
  type FitBoundsOptions,
  type PanelPosition,
  type ProOptions,
  SelectionMode,
  type SelectionRect,
  type OnError,
  // todo: type NodeProps,
  // todo: type NodeOrigin,
  // todo: ? type OnNodeDrag,
  // todo: ? type OnSelectionDrag,
  Position,
  type XYPosition,
  type XYZPosition,
  type Dimensions,
  type Rect,
  type Box,
  type Transform,
  // todo: type CoordinateExtent,
} from '@xyflow/system'

// system utils
export {
  type GetBezierPathParams,
  getBezierEdgeCenter,
  getBezierPath,
  getEdgeCenter,
  type GetSmoothStepPathParams,
  getSmoothStepPath,
  type GetStraightPathParams,
  getStraightPath,
  getTransformForBounds,
  getRectOfNodes,
} from '@xyflow/system'

export { getSimpleBezierPath, getSimpleEdgeCenter } from './components/Edges/utils'

export {
  isNode,
  isEdge,
  isGraphNode,
  isGraphEdge,
  addEdge,
  updateEdge,
  getOutgoers,
  getIncomers,
  getConnectedEdges,
  connectionExists,
} from './utils/graph'

/**
 * Intended for options API
 * In composition API you can access apply utilities from `useVueFlow`
 */
export { applyChanges, applyEdgeChanges, applyNodeChanges } from './utils/changes'

export { defaultEdgeTypes, defaultNodeTypes } from './store/state'

export { VueFlow as VueFlowInjection, NodeId as NodeIdInjection } from './context'

export {
  useZoomPanHelper,
  useVueFlow,
  Storage as GlobalVueFlowStorage,
  useHandle,
  useNode,
  useEdge,
  useGetPointerPosition,
} from './composables'

export { VueFlowError, ErrorCode } from './utils/errors'

export * from './types'
