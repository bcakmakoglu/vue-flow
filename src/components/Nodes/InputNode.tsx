import Handle from '../../components/Handle';
import { NodeProps, Position } from '../../types';
import { defineComponent, PropType } from 'vue-demi';

const InputNode = defineComponent({
  name: 'InputNode',
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
      default: false
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
        {props.data?.label}
        <Handle type="source" position={props.sourcePosition} isConnectable={props.isConnectable} />
      </>
    );
  }
});

export default InputNode;
