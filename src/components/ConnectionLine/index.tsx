import { ref, defineComponent, CSSProperties, PropType, computed, inject, h } from 'vue';

import { getBezierPath } from '../Edges/BezierEdge';
import { getSmoothStepPath } from '../Edges/SmoothStepEdge';
import { Node, HandleElement, Position, ConnectionLineType, ConnectionLineComponent, RevueFlowStore } from '../../types';

interface ConnectionLineProps {
  connectionLineType: ConnectionLineType;
  connectionLineStyle?: CSSProperties;
  customConnectionLine?: ConnectionLineComponent;
}

export default defineComponent({
  props: {
    connectionLineStyle: {
      type: Object as PropType<ConnectionLineProps['connectionLineStyle']>,
      required: false,
      default: () => {}
    },
    connectionLineType: {
      type: String as PropType<ConnectionLineProps['connectionLineType']>,
      required: false,
      default: ConnectionLineType.Bezier
    },
    customConnectionLine: {
      type: Object as PropType<ConnectionLineProps['customConnectionLine']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;
    const sourceNode = ref<Node | null>(store.nodes.find((n) => n.id === store.connectionNodeId) || null);
    const nodesConnectable = computed(() => store.nodesConnectable);

    const sourceHandle = computed(() =>
      store.connectionHandleId && store.connectionHandleType
        ? sourceNode.value?.__rf.handleBounds[store.connectionHandleType].find(
          (d: HandleElement) => d.id === store.connectionHandleId
        )
        : store.connectionHandleType && sourceNode.value?.__rf.handleBounds[store.connectionHandleType][0]
    );
    const sourceHandleX = computed(() =>
      sourceHandle.value ? sourceHandle.value.x + sourceHandle.value.width / 2 : (sourceNode.value?.__rf.width as number) / 2
    );
    const sourceHandleY = computed(() =>
      sourceHandle.value ? sourceHandle.value.y + sourceHandle.value.height / 2 : sourceNode.value?.__rf.height
    );
    const sourceX = computed(() => sourceNode.value?.__rf.position.x + sourceHandleX.value);
    const sourceY = computed(() => sourceNode.value?.__rf.position.y + sourceHandleY.value);

    const targetX = computed(() => (store.connectionPosition.x - store.transform[0]) / store.transform[2]);
    const targetY = computed(() => (store.connectionPosition.y - store.transform[1]) / store.transform[2]);

    const isRightOrLeft = computed(
      () => sourceHandle.value?.position === Position.Left || sourceHandle.value?.position === Position.Right
    );
    const targetPosition = computed(() => (isRightOrLeft.value ? Position.Left : Position.Top));

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

    if (props.customConnectionLine) {
      return () => (
        <g class="revue-flow__connection">
          {props.customConnectionLine &&
            h(props.customConnectionLine, {
              sourceX: sourceX.value,
              sourceY: sourceY.value,
              sourcePosition: sourceHandle.value?.position,
              targetX: targetX.value,
              targetY: targetY.value,
              targetPosition: targetPosition.value,
              connectionLineType: props.connectionLineType,
              connectionLineStyle: props.connectionLineStyle
            })}
        </g>
      );
    }

    return () =>
      nodesConnectable.value && sourceNode.value ? (
        <g class="revue-flow__connection">
          <path d={dAttr.value} class="revue-flow__connection-path" style={props.connectionLineStyle} />
        </g>
      ) : (
        ''
      );
  }
});
