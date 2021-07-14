/**
 * The nodes selection rectangle gets displayed when a user
 * made a selectio  with on or several nodes
 */
import { isNode } from '../../utils/graph';
import { Node, RevueFlowStore } from '../../types';
import { computed, inject, ref } from 'vue';
import Draggable, { DraggableEventHandler } from '@braks/revue-draggable';

export interface NodesSelectionProps {
  onSelectionDragStart?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionDrag?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionDragStop?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionContextMenu?: (event: MouseEvent, nodes: Node[]) => void;
}

const NodesSelection = ({
  onSelectionDragStart,
  onSelectionDrag,
  onSelectionDragStop,
  onSelectionContextMenu
}: NodesSelectionProps) => {
  const store = inject<RevueFlowStore>('store');

  const nodeRef = ref<HTMLElement | undefined>();

  const grid = computed(() => (store?.snapToGrid ? store?.snapGrid : [1, 1])! as [number, number]);

  const selectedNodes = computed(() =>
    store?.selectedElements
      ? store?.selectedElements.filter(isNode).map((selectedNode) => {
          const matchingNode = store?.nodes.find((node) => node.id === selectedNode.id);

          return {
            ...matchingNode,
            position: matchingNode?.__rf.position
          } as Node;
        })
      : []
  );

  const style = computed(() => ({
    transform: `translate(${store?.transform[0]}px,${store?.transform[1]}px) scale(${store?.transform[2]})`
  }));

  const innerStyle = computed(() => ({
    width: store?.selectedNodesBbox.width,
    height: store?.selectedNodesBbox.height,
    top: store?.selectedNodesBbox.y,
    left: store?.selectedNodesBbox.x
  }));

  const onStart: DraggableEventHandler = (event: MouseEvent) => {
    onSelectionDragStart?.(event, selectedNodes.value);
  };

  const onDrag: DraggableEventHandler = (event, data) => {
    if (onSelectionDrag) {
      onSelectionDrag(event, selectedNodes.value);
    }
    console.log('dragging', data);
  };

  const onStop: DraggableEventHandler = (event: MouseEvent) => {
    store?.updateNodePosDiff({
      isDragging: false
    });

    onSelectionDragStop?.(event, selectedNodes.value);
  };

  const onContextMenu = (event: MouseEvent) => {
    const selectedNodes = store?.selectedElements
      ? store?.selectedElements.filter(isNode).map((selectedNode) => store?.nodes.find((node) => node.id === selectedNode.id))
      : [];

    onSelectionContextMenu?.(event, selectedNodes as any);
  };

  if (!store?.selectedElements || store?.selectionActive) {
    return null;
  }

  return (
    <div class="revue-flow__nodesselection" style={style.value}>
      <Draggable
        scale={store?.transform[2]}
        grid={grid.value}
        onStart={onStart}
        onDrag={onDrag}
        onStop={onStop}
        enableUserSelectHack={false}
        nodeRef={nodeRef.value}
      >
        <div ref={nodeRef} class="revue-flow__nodesselection-rect" onContextmenu={onContextMenu} style={innerStyle.value} />
      </Draggable>
    </div>
  );
};

export default NodesSelection;
