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

// Re-export utils from system pkg
export {
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  getBezierEdgeCenter,
  clamp,
  getTransformForBounds,
  getRectOfNodes,
  pointToRendererPoint,
  rendererPointToPoint,
  getNodesInside,
  getBoundsOfRects,
  getMarkerId,
  Position,
  Dimensions,
  XYPosition,
  XYZPosition,
  Rect,
  Box,
  SelectionMode,
  SelectionRect,
  Connection,
  ConnectingHandle,
  ConnectionHandle,
  ConnectionMode,
  ConnectionLineType,
  ConnectionStatus,
  PanOnScrollMode,
  SnapGrid,
  MarkerType,
  EdgePosition,
  HandleElement,
  NodeHandleBounds,
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
