import { ElementId, Position, RevueFlowStore } from '../../types';
import { onMouseDown, ValidConnectionFunc } from './handler';
import { computed, defineComponent, h, inject, PropType } from 'vue';
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
    const nodeId = inject<ElementId>('NodeIdContext') as ElementId;
    const isTarget = computed(() => props.type === 'target');

    const onMouseDownHandler = (event: MouseEvent) => {
      onMouseDown(event, store, hooks, props.id || '', nodeId, isTarget.value, props.isValidConnection);
    };

    const handleClasses = computed(() => [
      'revue-flow__handle',
      `revue-flow__handle-${props.position}`,
      'nodrag',
      {
        source: !isTarget.value,
        target: isTarget.value,
        connectable: props.isConnectable
      }
    ]);

    return () =>
      h(
        'div',
        {
          dataHandleid: props.id,
          dataNodeid: nodeId,
          dataHandlepos: props.position,
          class: handleClasses.value,
          onMouseDown: onMouseDownHandler
        },
        slots.default?.()
      );
  }
});
