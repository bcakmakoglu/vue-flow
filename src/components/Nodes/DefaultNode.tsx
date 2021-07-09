import Handle from '../../components/Handle';
import { NodeProps, Position } from '../../types';
import { defineComponent, PropType } from 'vue-demi';

const DefaultNode = defineComponent({
  name: 'DefaultNode',
  components: { Handle },
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
});

export default DefaultNode;
