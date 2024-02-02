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

export {
  getBezierPath,
  getSimpleBezierPath,
  getSmoothStepPath,
  getStraightPath,
  getSimpleEdgeCenter,
  getBezierEdgeCenter,
} from './components/Edges/utils'

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
  getTransformForBounds,
  getRectOfNodes,
  pointToRendererPoint,
  rendererPointToPoint,
  /** @deprecated will be removed in the next major version, use `rendererPointToPoint` instead */
  rendererPointToPoint as graphPosToZoomedPos,
  getNodesInside,
  getMarkerId,
  getBoundsofRects,
  connectionExists,
  clamp,
} from './utils/graph'

/**
 * Intended for options API
 * In composition API you can access apply utilities from `useVueFlow`
 */
export { applyChanges, applyEdgeChanges, applyNodeChanges } from './utils/changes'

export { defaultEdgeTypes, defaultNodeTypes } from './store/state'

export { VueFlow as VueFlowInjection, NodeId as NodeIdInjection } from './context'

export { useZoomPanHelper } from './composables/useZoomPanHelper'
export { useVueFlow } from './composables/useVueFlow'
export { useHandle } from './composables/useHandle'
export { useNode } from './composables/useNode'
export { useEdge } from './composables/useEdge'
export { useGetPointerPosition } from './composables/useGetPointerPosition'
export { useNodeId } from './composables/useNodeId'
export { useConnection } from './composables/useConnection'
export { useHandleConnections } from './composables/useHandleConnections'
export { useNodesData } from './composables/useNodesData'

export { VueFlowError, ErrorCode, isErrorOfType } from './utils/errors'

export * from './types'
