/**
 * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
 */
import { RevueFlowStore, XYPosition } from '../../types';
import { computed, defineComponent, inject } from 'vue';
import { templateRef, useEventListener } from '@vueuse/core';

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

const SelectionRect = (props: { width: number; height: number; x: number; y: number }) => {
  return (
    <div
      class="revue-flow__selection"
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        transform: `translate(${props.x}px, ${props.y}px)`
      }}
    />
  );
};

export default defineComponent({
  components: { SelectionRect },
  setup() {
    const store = inject<RevueFlowStore>('store')!;
    const el = templateRef('user-selection', null);
    const shouldRender = computed(() => store.selectionActive || store.elementsSelectable);
    if (!shouldRender.value) {
      return null;
    }

    const onMouseDown = (event: MouseEvent) => {
      const mousePos = getMousePosition(event);
      if (!mousePos) {
        return;
      }

      store.setUserSelection(mousePos);
    };

    const onMouseMove = (event: MouseEvent) => {

      if (!store.selectionActive) {
        return;
      }
      const mousePos = getMousePosition(event);

      if (!mousePos) {
        return;
      }

      store.updateUserSelection(mousePos);
    };

    const onMouseUp = () => {
      store.unsetUserSelection();
    };

    const onMouseLeave = () => {
      store.unsetUserSelection();
      store.unsetNodesSelection();
    };

    useEventListener(el, 'mousedown', onMouseDown);
    useEventListener(el, 'mousemove', onMouseMove);
    useEventListener(el, 'click', onMouseUp);
    useEventListener(el, 'mouseup', onMouseUp);
    useEventListener(el, 'mouseleave', onMouseLeave);

    return () => (
      <div class="revue-flow__selectionpane" ref="user-selection">
        {store?.userSelectionRect.draw ? (
          <SelectionRect
            width={store.userSelectionRect.width}
            height={store.userSelectionRect.height}
            x={store.userSelectionRect.x}
            y={store.userSelectionRect.y}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
});
