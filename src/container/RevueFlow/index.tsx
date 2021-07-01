import '../../style.css';
import '../../theme-default.css';
import { HTMLAttributes, defineComponent } from 'vue';

const defaultNodeTypes = {
  input: 'InputNode',
  default: 'DefaultNode',
  output: 'OutputNode'
};

const defaultEdgeTypes = {
  default: 'BezierEdge',
  straight: 'StraightEdge',
  step: 'StepEdge',
  smoothstep: 'SmoothStepEdge'
};

export interface ReactFlowProps extends Omit<HTMLAttributes, 'onLoad'> {}

export type ReactFlowRefType = HTMLDivElement;

const RevueFlow = defineComponent({
  name: 'RevueFlow',
  setup() {
    return () => <div>Revue Flow!</div>;
  }
});

export default RevueFlow;
