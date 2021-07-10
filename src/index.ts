import RevueFlow from './container/RevueFlow';
import { App } from 'vue-demi';

export default RevueFlow;

export { default as Handle } from './components/Handle';
export { default as EdgeText } from './components/Edges/EdgeText';
export { getBezierPath } from './components/Edges/BezierEdge';
export { getSmoothStepPath } from './components/Edges/SmoothStepEdge';
export { getMarkerEnd, getCenter as getEdgeCenter } from './components/Edges/utils';

export {
  isNode,
  isEdge,
  removeElements,
  addEdge,
  getOutgoers,
  getIncomers,
  getConnectedEdges,
  updateEdge,
  getTransformForBounds,
  getRectOfNodes
} from './utils/graph';
export { default as useZoomPanHelper } from './hooks/useZoomPanHelper';
export { default as useUpdateNodeInternals } from './hooks/useUpdateNodeInternals';

export * from './additional-components';
export * from './types';

export interface RevueFlowOptions {
  theme: string;
}

export interface RevueFlowPlugin {
  options?: RevueFlowOptions;

  install(app: App): void;
}

export function createRevueFlowPlugin(options?: RevueFlowOptions): RevueFlowPlugin {
  return {
    options,
    install(app: App) {
      app.component('revue-flow', RevueFlow);
    }
  };
}
