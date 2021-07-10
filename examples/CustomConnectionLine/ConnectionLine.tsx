import { defineComponent, PropType } from 'vue';
import { ConnectionLineComponentProps } from '../../src';

const ConnectionLine = defineComponent({
  props: {
    sourceX: {
      type: Number as PropType<ConnectionLineComponentProps['sourceX']>,
      required: true
    },
    sourceY: {
      type: Number as PropType<ConnectionLineComponentProps['sourceY']>,
      required: true
    },
    targetX: {
      type: Number as PropType<ConnectionLineComponentProps['targetX']>,
      required: true
    },
    targetY: {
      type: Number as PropType<ConnectionLineComponentProps['targetY']>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <g>
        <path
          fill="none"
          stroke="#222"
          stroke-width={1.5}
          class="animated"
          d={`M${props.sourceX},${props.sourceY} C ${props.sourceX} ${props.targetY} ${props.sourceX} ${props.targetY} ${props.targetX},${props.targetY}`}
        />
        <circle cx={props.targetX} cy={props.targetY} fill="#fff" r={3} stroke="#222" stroke-width={1.5} />
      </g>
    );
  }
});

export default ConnectionLine;
