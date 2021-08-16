import { ElementId, Position, RevueFlowStore } from '../../types';
import { onMouseDown, ValidConnectionFunc } from './handler';
import { defineComponent, inject, PropType } from 'vue';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';

const alwaysValid = () => true;

export default defineComponent({
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
    }
  },
  setup(props, { slots }) {
    const store = inject<RevueFlowStore>('store')!;
    const hooks = inject<RevueFlowHooks>('hooks')!;
    const nodeId = inject<ElementId>('NodeIdContext')!;

    const onMouseDownHandler = (event: MouseEvent) =>
      onMouseDown(event, store, hooks, props.id as string, nodeId, props.type === 'target', props.isValidConnection);

    return () => (
      <div
        data-handleid={props.id}
        data-nodeid={nodeId}
        data-handlepos={props.position}
        class={[
          'revue-flow__handle',
          `revue-flow__handle-${props.position}`,
          'nodrag',
          {
            source: props.type !== 'target',
            target: props.type === 'target',
            connectable: props.isConnectable
          }
        ]}
        onMousedown={onMouseDownHandler}
      >
        {slots.default ? slots.default() : ''}
      </div>
    );
  }
});
