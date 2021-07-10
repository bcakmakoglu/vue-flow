import { ref, defineComponent, CSSProperties, PropType, computed } from 'vue';

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
      default: undefined
    }
  },
  setup(props) {
    const sourceNode = ref<Node | null>(props.nodes.find((n) => n.id === props.connectionNodeId) || null);

    if (!sourceNode.value || !props.isConnectable) {
      return null;
    }

    const sourceHandle = computed(() =>
      props.connectionHandleId
        ? sourceNode.value?.__rf.handleBounds[props.connectionHandleType].find(
            (d: HandleElement) => d.id === props.connectionHandleId
          )
        : sourceNode.value?.__rf.handleBounds[props.connectionHandleType][0]
    );
    const sourceHandleX = computed(() =>
      sourceHandle.value ? sourceHandle.value.x + sourceHandle.value.width / 2 : sourceNode.value?.__rf.width / 2
    );
    const sourceHandleY = computed(() =>
      sourceHandle.value ? sourceHandle.value.y + sourceHandle.value.height / 2 : sourceNode.value?.__rf.height
    );
    const sourceX = computed(() => sourceNode.value?.__rf.position.x + sourceHandleX.value);
    const sourceY = computed(() => sourceNode.value?.__rf.position.y + sourceHandleY.value);

    const targetX = computed(() => (props.connectionPositionX - props.transform[0]) / props.transform[2]);
    const targetY = computed(() => (props.connectionPositionY - props.transform[1]) / props.transform[2]);

    const isRightOrLeft = computed(
      () => sourceHandle.value?.position === Position.Left || sourceHandle.value?.position === Position.Right
    );
    const targetPosition = computed(() => (isRightOrLeft.value ? Position.Left : Position.Top));

    if (props.CustomConnectionLineComponent) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      const ConnectionLineComponent: any = props.CustomConnectionLineComponent;
      return () => (
        <g class="revue-flow__connection">
          <ConnectionLineComponent
            sourceX={sourceX.value}
            sourceY={sourceY.value}
            sourcePosition={sourceHandle.value?.position}
            targetX={targetX.value}
            targetY={targetY.value}
            targetPosition={targetPosition.value}
            connectionLineType={props.connectionLineType}
            connectionLineStyle={props.connectionLineStyle}
          />
        </g>
      );
    }

    let dAttr = computed(() => `M${sourceX.value},${sourceY.value} ${targetX.value},${targetY.value}`);

    if (props.connectionLineType === ConnectionLineType.Bezier) {
      dAttr = computed(() =>
        getBezierPath({
          sourceX: sourceX.value,
          sourceY: sourceY.value,
          sourcePosition: sourceHandle.value?.position,
          targetX: targetX.value,
          targetY: targetY.value,
          targetPosition: targetPosition.value
        })
      );
    } else if (props.connectionLineType === ConnectionLineType.Step) {
      dAttr = computed(() =>
        getSmoothStepPath({
          sourceX: sourceX.value,
          sourceY: sourceY.value,
          sourcePosition: sourceHandle.value?.position,
          targetX: targetX.value,
          targetY: targetY.value,
          targetPosition: targetPosition.value,
          borderRadius: 0
        })
      );
    } else if (props.connectionLineType === ConnectionLineType.SmoothStep) {
      dAttr = computed(() =>
        getSmoothStepPath({
          sourceX: sourceX.value,
          sourceY: sourceY.value,
          sourcePosition: sourceHandle.value?.position,
          targetX: targetX.value,
          targetY: targetY.value,
          targetPosition: targetPosition.value
        })
      );
    }

    return () => (
      <g class="revue-flow__connection">
        <path d={dAttr.value} class="revue-flow__connection-path" style={props.connectionLineStyle} />
      </g>
    );
  }
});

export default ConnectionLine;
