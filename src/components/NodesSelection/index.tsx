/**
 * The nodes selection rectangle gets displayed when a user
 * made a selectio  with on or several nodes
 */
import { isNode } from '../../utils/graph';
import { Node, RevueFlowStore } from '../../types';
import { computed, defineComponent, inject, PropType } from 'vue';
import { Draggable, DraggableEventHandler } from '@braks/revue-draggable';

export interface NodesSelectionProps {
  onSelectionDragStart?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionDrag?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionDragStop?: (event: MouseEvent, nodes: Node[]) => void;
  onSelectionContextMenu?: (event: MouseEvent, nodes: Node[]) => void;
}

const NodesSelection = defineComponent({
  props: {
    onSelectionDragStart: {
      type: Function as unknown as PropType<NodesSelectionProps['onSelectionDragStart']>,
      required: false,
      default: undefined
    },
    onSelectionDrag: {
      type: Function as unknown as PropType<NodesSelectionProps['onSelectionDrag']>,
      required: false,
      default: undefined
    },
    onSelectionDragStop: {
      type: Function as unknown as PropType<NodesSelectionProps['onSelectionDragStop']>,
      required: false,
      default: undefined
    },
    onSelectionContextMenu: {
      type: Function as unknown as PropType<NodesSelectionProps['onSelectionContextMenu']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;
    const grid = computed(() => (store.snapToGrid ? store.snapGrid : [1, 1])! as [number, number]);

    const selectedNodes = computed(() =>
      store.selectedElements
        ? store.selectedElements.filter(isNode).map((selectedNode) => {
            const matchingNode = store.nodes.find((node) => node.id === selectedNode.id);

            return {
              ...matchingNode,
              position: matchingNode?.__rf.position
            } as Node;
          })
        : []
    );

    const style = computed(() => ({
      transform: `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`
    }));

    const innerStyle = computed(() => ({
      width: `${store.selectedNodesBbox.width}px`,
      height: `${store.selectedNodesBbox.height}px`,
      top: `${store.selectedNodesBbox.y}px`,
      left: `${store.selectedNodesBbox.x}px`
    }));

    const onStart: DraggableEventHandler = (event: MouseEvent) => {
      console.log('ondragstart');
      props.onSelectionDragStart?.(event, selectedNodes.value);
    };

    const onDrag: DraggableEventHandler = (event, data) => {
      console.log('ondrag');
      props.onSelectionDrag?.(event, selectedNodes.value);

      store.updateNodePosDiff({
        diff: {
          x: data.deltaX,
          y: data.deltaY
        },
        isDragging: true
      });
    };

    const onStop: DraggableEventHandler = (event: MouseEvent) => {
      console.log('ondragend');
      store.updateNodePosDiff({
        isDragging: false
      });

      props.onSelectionDragStop?.(event, selectedNodes.value);
    };

    const onContextMenu = (event: MouseEvent) => {
      const selectedNodes = store.selectedElements
        ? store.selectedElements.filter(isNode).map((selectedNode) => store.nodes.find((node) => node.id === selectedNode.id))
        : [];

      props.onSelectionContextMenu?.(event, selectedNodes as any);
    };

    return () => {
      return !store.selectedElements || store.selectionActive ? (
        ''
      ) : (
        <div class="revue-flow__nodesselection" style={style.value}>
          <Draggable
            start={onStart}
            move={onDrag}
            stop={onStop}
            scale={store.transform[2]}
            grid={grid.value}
            enableUserSelectHack={false}
          >
            <div class="revue-flow__nodesselection-rect" onContextmenu={onContextMenu} style={innerStyle.value} />
          </Draggable>
        </div>
      );
    };
  }
});

export default NodesSelection;
