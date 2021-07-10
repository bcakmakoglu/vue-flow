/**
 * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
 */
import { XYPosition } from '../../types';
import { defineComponent, PropType } from 'vue';
import store from '../../store';

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
    const pinia = store();

    if (!pinia.userSelectionRect.draw) {
      return null;
    }

    return () => (
      <div
        class="revue-flow__selection"
        style={{
          width: pinia.userSelectionRect.width,
          height: pinia.userSelectionRect.height,
          transform: `translate(${pinia.userSelectionRect.x}px, ${pinia.userSelectionRect.y}px)`
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
    const pinia = store();
    const renderUserSelectionPane = pinia.selectionActive || props.selectionKeyPressed;

    if (!pinia.elementsSelectable || !renderUserSelectionPane) {
      return null;
    }

    const onMouseDown = (event: MouseEvent): void => {
      const mousePos = getMousePosition(event);
      if (!mousePos) {
        return;
      }

      pinia.setUserSelection(mousePos);
    };

    const onMouseMove = (event: MouseEvent): void => {
      if (!props.selectionKeyPressed || !pinia.selectionActive) {
        return;
      }
      const mousePos = getMousePosition(event);

      if (!mousePos) {
        return;
      }

      pinia.updateUserSelection(mousePos);
    };

    const onMouseUp = () => pinia.unsetUserSelection();

    const onMouseLeave = () => {
      pinia.unsetUserSelection();
      pinia.unsetNodesSelection();
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
