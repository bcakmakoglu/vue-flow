/**
 * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
 */
import { RevueFlowStore, XYPosition } from '../../types';
import { computed, defineComponent, inject } from 'vue';

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

    return () => {
      return store?.userSelectionRect.draw ? (
        <div
          class="revue-flow__selection"
          style={{
            width: `${store?.userSelectionRect.width}px`,
            height: `${store?.userSelectionRect.height}px`,
            transform: `translate(${store?.userSelectionRect.x}px, ${store?.userSelectionRect.y}px)`
          }}
        />
      ) : (
        ''
      );
    };
  }
});

export default defineComponent({
  components: { SelectionRect },
  setup() {
    const store = inject<RevueFlowStore>('store')!;

    const shouldRender = computed(() => store.selectionActive || store.elementsSelectable);

    if (!shouldRender.value) {
      return null;
    }

    const onMouseDown = (event: MouseEvent): void => {
      const mousePos = getMousePosition(event);
      if (!mousePos) {
        return;
      }

      console.log('mouseDown');
      store?.setUserSelection(mousePos);
    };

    const onMouseMove = (event: MouseEvent): void => {
      if (!store?.selectionActive) {
        return;
      }
      const mousePos = getMousePosition(event);

      if (!mousePos) {
        return;
      }
      console.log('mousemove');

      store?.updateUserSelection(mousePos);
    };

    const onMouseUp = () => {
      console.log('mosueUp');
      store?.unsetUserSelection();
    };

    const onMouseLeave = () => {
      store?.unsetUserSelection();
      store?.unsetNodesSelection();
    };

    return () => (
      <div
        class="revue-flow__selectionpane"
        onMousedown={onMouseDown}
        onMousemove={onMouseMove}
        onClick={onMouseUp}
        onMouseup={onMouseUp}
        onMouseleave={onMouseLeave}
      >
        <SelectionRect />
      </div>
    );
  }
});
