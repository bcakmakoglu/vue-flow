import { defineComponent, PropType } from 'vue';
import Handle from '../../components/Handle';
import { NodeProps, NodeType, Position } from '../../types';

export default defineComponent({
  name: 'DefaultNode',
  components: { Handle },
  inheritAttrs: false,
  props: {
    data: {
      type: Object as PropType<NodeProps['data']>,
      required: false,
      default: undefined as any
    },
    isConnectable: {
      type: Boolean as PropType<NodeProps['isConnectable']>,
      required: false,
      default: undefined
    },
    targetPosition: {
      type: String as PropType<NodeProps['targetPosition']>,
      required: false,
      default: Position.Top
    },
    sourcePosition: {
      type: String as PropType<NodeProps['sourcePosition']>,
      required: false,
      default: Position.Bottom
    }
  },
  setup(props) {
    return () => (
      <>
        <Handle type="target" position={props.targetPosition} isConnectable={props.isConnectable} />
        {props.data?.label}
        <Handle type="source" position={props.sourcePosition} isConnectable={props.isConnectable} />
      </>
    );
  }
}) as NodeType;
