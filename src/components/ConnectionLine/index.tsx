import { ref, defineComponent, CSSProperties, PropType } from 'vue';

import { getBezierPath } from '../Edges/BezierEdge';
import { getSmoothStepPath } from '../Edges/SmoothStepEdge';
import {
  ElementId,
  Node,
  Transform,
  HandleElement,
  Position,
  ConnectionLineType,
  ConnectionLineComponent,
  HandleType
} from '../../types';

interface ConnectionLineProps {
  connectionNodeId: ElementId;
  connectionHandleId: ElementId | null;
  connectionHandleType: HandleType;
  connectionPositionX: number;
  connectionPositionY: number;
  connectionLineType: ConnectionLineType;
  nodes: Node[];
  transform: Transform;
  isConnectable: boolean;
  connectionLineStyle?: CSSProperties;
  CustomConnectionLineComponent?: ConnectionLineComponent;
}

const ConnectionLine = defineComponent({
  props: {
    connectionNodeId: {
      type: String as PropType<ConnectionLineProps['connectionNodeId']>,
      required: true
    },
    connectionHandleId: {
      type: String as PropType<ConnectionLineProps['connectionHandleId']>,
      required: true
    },
    connectionHandleType: {
      type: String as PropType<ConnectionLineProps['connectionHandleType']>,
      required: true
    },
    connectionLineStyle: {
      type: Object as PropType<ConnectionLineProps['connectionLineStyle']>,
      required: false,
      default: () => ({})
    },
    connectionPositionX: {
      type: Number as PropType<ConnectionLineProps['connectionPositionX']>,
      required: false,
      default: 0
    },
    connectionPositionY: {
      type: Number as PropType<ConnectionLineProps['connectionPositionY']>,
      required: false,
      default: 0
    },
    connectionLineType: {
      type: String as PropType<ConnectionLineProps['connectionLineType']>,
      required: false,
      default: ConnectionLineType.Bezier
    },
    nodes: {
      type: Array as PropType<ConnectionLineProps['nodes']>,
      required: true,
      default: () => []
    },
    transform: {
      type: Object as PropType<ConnectionLineProps['transform']>,
      required: false,
      default: () => ({})
    },
    isConnectable: {
      type: Boolean as PropType<ConnectionLineProps['isConnectable']>,
      required: false,
      default: false
    },
    CustomConnectionLineComponent: {
      type: Object as PropType<ConnectionLineProps['CustomConnectionLineComponent']>,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    console.log('connectionline');
    const sourceNode = ref<Node | null>(props.nodes.find((n) => n.id === props.connectionNodeId) || null);

    if (!sourceNode.value || !props.isConnectable) {
      return null;
    }

    const sourceHandle = props.connectionHandleId
      ? sourceNode.value.__rf.handleBounds[props.connectionHandleType].find(
          (d: HandleElement) => d.id === props.connectionHandleId
        )
      : sourceNode.value.__rf.handleBounds[props.connectionHandleType][0];
    const sourceHandleX = sourceHandle ? sourceHandle.x + sourceHandle.width / 2 : sourceNode.value.__rf.width / 2;
    const sourceHandleY = sourceHandle ? sourceHandle.y + sourceHandle.height / 2 : sourceNode.value.__rf.height;
    const sourceX = sourceNode.value.__rf.position.x + sourceHandleX;
    const sourceY = sourceNode.value.__rf.position.y + sourceHandleY;

    const targetX = (props.connectionPositionX - props.transform[0]) / props.transform[2];
    const targetY = (props.connectionPositionY - props.transform[1]) / props.transform[2];

    const isRightOrLeft = sourceHandle?.position === Position.Left || sourceHandle?.position === Position.Right;
    const targetPosition = isRightOrLeft ? Position.Left : Position.Top;

    if (props.CustomConnectionLineComponent) {
      return () => (
        <g class="react-flow__connection">
          <component
            is={props.CustomConnectionLineComponent}
            sourceX={sourceX}
            sourceY={sourceY}
            sourcePosition={sourceHandle?.position}
            targetX={targetX}
            targetY={targetY}
            targetPosition={targetPosition}
            connectionLineType={props.connectionLineType}
            connectionLineStyle={props.connectionLineStyle}
          />
        </g>
      );
    }

    let dAttr = '';

    if (props.connectionLineType === ConnectionLineType.Bezier) {
      dAttr = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition
      });
    } else if (props.connectionLineType === ConnectionLineType.Step) {
      dAttr = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 0
      });
    } else if (props.connectionLineType === ConnectionLineType.SmoothStep) {
      dAttr = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition
      });
    } else {
      dAttr = `M${sourceX},${sourceY} ${targetX},${targetY}`;
    }

    return () => (
      <g class="react-flow__connection">
        <path d={dAttr} class="react-flow__connection-path" style={props.connectionLineStyle} />
      </g>
    );
  }
});

export default ConnectionLine;
