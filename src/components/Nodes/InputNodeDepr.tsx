import Handle from '../../components/Handle'
import { NodeProps, NodeType, Position } from '../../types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'InputNode',
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
    )
  }
}) as NodeType
