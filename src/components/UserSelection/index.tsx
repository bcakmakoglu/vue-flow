/**
 * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
 */
import { RevueFlowStore, XYPosition } from '../../types';
import { computed, defineComponent, inject, PropType } from 'vue';

type UserSelectionProps = {
  selectionKeyPressed: boolean;
};

function getMousePosition(event: MouseEvent): XYPosition | void {
  const revueFlowNode = (event.target as Element).closest('.revue-flow');
  if (!revueFlowNode) {
    return;
  }

  const containerBounds = revueFlowNode.getBoundingClientRect();

  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top
  };
}

const SelectionRect = defineComponent({
  setup() {
    const store = inject<RevueFlowStore>('store');

    if (!store?.userSelectionRect.draw) {
      return null;
    }

    return () => (
      <div
        class="revue-flow__selection"
        style={{
          width: `${store?.userSelectionRect.width}px`,
          height: `${store?.userSelectionRect.height}px`,
          transform: `translate(${store?.userSelectionRect.x}px, ${store?.userSelectionRect.y}px)`
        }}
      />
    );
  }
});

export default defineComponent({
  components: { SelectionRect },
  props: {
    selectionKeyPressed: {
      type: Boolean as PropType<UserSelectionProps['selectionKeyPressed']>,
      required: true
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;
    const renderUserSelectionPane = computed(() => {
      return props.selectionKeyPressed || store.selectionActive;
    });

    const shouldRender = computed(() => renderUserSelectionPane.value || store.elementsSelectable);

    if (!shouldRender.value) {
      return null;
    }

    const onMouseDown = (event: MouseEvent): void => {
      const mousePos = getMousePosition(event);
      if (!mousePos) {
        return;
      }

      store?.setUserSelection(mousePos);
    };

    const onMouseMove = (event: MouseEvent): void => {
      if (!props.selectionKeyPressed || !store?.selectionActive) {
        return;
      }
      const mousePos = getMousePosition(event);

      if (!mousePos) {
        return;
      }

      store?.updateUserSelection(mousePos);
    };

    const onMouseUp = () => store?.unsetUserSelection();

    const onMouseLeave = () => {
      store?.unsetUserSelection();
      store?.unsetNodesSelection();
    };

    return () => (
      <div
        class="revue-flow__selectionpane"
        onMousedown={onMouseDown}
        onMousemove={onMouseMove}
        onMouseup={onMouseUp}
        onMouseleave={onMouseLeave}
      >
        <SelectionRect />
      </div>
    );
  }
});
