/**
 * The nodes selection rectangle gets displayed when a user
 * made a selectio  with on or several nodes
 */

import VueDraggable, { MoveEvent } from 'vuedraggable';

import { isNode } from '../../utils/graph';
import { Node, RevueFlowStore } from '../../types';
import { computed, inject, ref } from 'vue';

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

  const nodeRef = ref(null);

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

  const onStart = (event: MouseEvent) => {
    onSelectionDragStart?.(event, selectedNodes.value);
  };

  const onDrag = (event: MouseEvent, data: MoveEvent<any>) => {
    if (onSelectionDrag) {
      onSelectionDrag(event, selectedNodes.value);
    }
    console.log('dragging', data);
  };

  const onStop = (event: MouseEvent) => {
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
      <VueDraggable
        scale={store?.transform[2]}
        grid={grid}
        onStart={(event: MouseEvent) => onStart(event)}
        onDrag={(event: MouseEvent, data: any) => onDrag(event, data)}
        onStop={(event: MouseEvent) => onStop(event)}
        nodeRef={nodeRef}
        enableUserSelectHack={false}
      >
        <div ref={nodeRef} class="revue-flow__nodesselection-rect" onContextmenu={onContextMenu} style={innerStyle.value} />
      </VueDraggable>
    </div>
  );
};

export default NodesSelection;
