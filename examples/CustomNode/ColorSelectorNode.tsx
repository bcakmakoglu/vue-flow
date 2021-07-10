import { CSSProperties, defineComponent } from 'vue';
import { Handle, Position, Connection, Edge } from '../../src';

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10, top: 'auto' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const ColorSelectorNode = defineComponent({
  props: {
    data: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    return () => (
      <>
        <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
        <div>
          Custom Color Picker Node: <strong>{props.data.color}</strong>
        </div>
        <input class="nodrag" type="color" onInput={props.data.onChange} v-model={props.data.color} />
        <Handle type="source" position={Position.Right} id="a" style={sourceHandleStyleA} />
        <Handle type="source" position={Position.Right} id="b" style={sourceHandleStyleB} />
      </>
    );
  }
});

export default ColorSelectorNode;
