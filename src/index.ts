import RevueFlow from './container/RevueFlow';
import { App, inject, InjectionKey } from 'vue-demi';

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

export const RevueFlowPluginSymbol: InjectionKey<RevueFlowPlugin> = Symbol();

export function RevueFlowPlugin(): RevueFlowPlugin {
  const RevueFlowPlugin = inject(RevueFlowPluginSymbol);
  if (!RevueFlowPlugin) throw new Error('No RevueFlowPlugin provided.');

  return RevueFlowPlugin;
}

export function createVueCounterPlugin(options?: RevueFlowOptions): RevueFlowPlugin {
  return {
    options,
    install(app: App) {
      app.component('revue-flow', RevueFlow);
      app.provide(RevueFlowPluginSymbol, this);
    }
  };
}
