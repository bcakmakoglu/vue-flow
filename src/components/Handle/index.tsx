import { Connection, ElementId, Position } from '../../types';
import { onMouseDown, ValidConnectionFunc } from './handler';
import { defineComponent, inject, PropType } from 'vue';
import store from '../../store';

const alwaysValid = () => true;

const Handle = defineComponent({
  props: {
    type: {
      type: String,
      required: false,
      default: 'source'
    },
    position: {
      type: String as PropType<Position>,
      required: false,
      default: Position.Top
    },
    isValidConnection: {
      type: Function as PropType<ValidConnectionFunc>,
      required: false,
      default: alwaysValid
    },
    isConnectable: {
      type: Boolean,
      required: false,
      default: true
    },
    id: {
      type: String,
      required: false,
      default: undefined
    },
    onConnect: {
      type: Function,
      required: false,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const pinia = store();
    const nodeId = inject<ElementId>('NodeIdContext') as ElementId;
    const isTarget = props.type === 'target';

    const onConnectExtended = (params: Connection) => {
      pinia.onConnect?.(params);
      props.onConnect?.(params);
    };

    const onMouseDownHandler = (event: MouseEvent) => {
      onMouseDown(
        event,
        props.id || '',
        nodeId,
        pinia.setConnectionNodeId,
        pinia.setConnectionPosition,
        onConnectExtended,
        isTarget,
        props.isValidConnection,
        pinia.connectionMode,
        undefined,
        undefined,
        pinia.onConnectStart,
        pinia.onConnectStop,
        pinia.onConnectEnd
      );
    };

    const handleClasses = [
      'react-flow__handle',
      `react-flow__handle-${props.position}`,
      'nodrag',
      {
        source: !isTarget,
        target: isTarget,
        connectable: props.isConnectable
      }
    ];

    return () => (
      <div
        data-handleid={props.id}
        data-nodeid={nodeId}
        data-handlepos={props.position}
        class={handleClasses}
        onMousedown={onMouseDownHandler}
      >
        {slots.default ? slots.default() : ''}
      </div>
    );
  }
});

export default Handle;
