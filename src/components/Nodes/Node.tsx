import { computed, defineComponent, h, inject, onMounted, PropType, provide } from 'vue';
import { templateRef, useResizeObserver } from '@vueuse/core';
import { DraggableCore, DraggableEventListener } from '@braks/revue-draggable';
import { Node, NodeDimensionUpdate, NodeType, RevueFlowStore } from '../../types';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';

interface NodeProps {
  nodeTypes: Record<string, NodeType>;
  snapToGrid: boolean;
  snapGrid: [number, number];
  selectNodesOnDrag: boolean;
}

export default defineComponent({
  components: { DraggableCore },
  props: {
    node: {
      type: Object as PropType<Node>,
      required: true
    },
    type: {
      type: Object,
      required: true
    },
    snapToGrid: {
      type: Boolean as PropType<NodeProps['snapToGrid']>,
      required: false,
      default: undefined
    },
    snapGrid: {
      type: Array as unknown as PropType<NodeProps['snapGrid']>,
      required: false,
      default: undefined
    },
    selectNodesOnDrag: {
      type: Boolean as PropType<NodeProps['selectNodesOnDrag']>,
      required: false,
      default: true
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;
    const hooks = inject<RevueFlowHooks>('hooks')!;
    provide('NodeIdContext', props.node.id);

    const nodeElement = templateRef<HTMLDivElement>('nodeElement', null);

    const selected = computed(() => store.selectedElements?.some(({ id }) => id === props.node.id) || false);
    const isDraggable = computed(
      () => props.node.draggable || (store.nodesDraggable && typeof props.node.draggable === 'undefined')
    );
    const isSelectable = computed(
      () => props.node.selectable || (store.elementsSelectable && typeof props.node.selectable === 'undefined')
    );
    const isConnectable = computed(
      () => props.node.connectable || (store.nodesConnectable && typeof props.node.connectable === 'undefined')
    );

    const node = () =>
      ({
        id: props.node.id,
        type: props.node.type,
        position: { x: props.node.__rf.position.x, y: props.node.__rf.position.y },
        data: props.node.data
      } as Node);

    const onMouseEnterHandler = () => {
      if (props.node.__rf.isDragging) {
        return;
      }

      return (event: MouseEvent) => hooks.nodeMouseEnter.trigger({ event, node: node() });
    };

    const onMouseMoveHandler = () => {
      if (props.node.__rf.isDragging) {
        return;
      }

      return (event: MouseEvent) => hooks.nodeMouseMove.trigger({ event, node: node() });
    };

    const onMouseLeaveHandler = () => {
      if (props.node.__rf.isDragging) {
        return;
      }

      return (event: MouseEvent) => hooks.nodeMouseLeave.trigger({ event, node: node() });
    };

    const onContextMenuHandler = () => {
      return (event: MouseEvent) => hooks.nodeContextMenu.trigger({ event, node: node() });
    };

    const onSelectNodeHandler = (event: MouseEvent) => {
      if (!isDraggable.value) {
        const n = node();
        if (isSelectable.value) {
          store.unsetNodesSelection();

          if (!selected.value) {
            store.addSelectedElements([n]);
          }
        }

        hooks.nodeClick.trigger({ event, node: n });
      }
    };

    const onDragStart: DraggableEventListener = ({ event }) => {
      const n = node();
      hooks.nodeDragStart.trigger({ event, node: n });

      if (props.selectNodesOnDrag && isSelectable.value) {
        store.unsetNodesSelection();

        if (!selected.value) {
          store.addSelectedElements([n]);
        }
      } else if (!props.selectNodesOnDrag && !selected.value && isSelectable.value) {
        store.unsetNodesSelection();
        store.addSelectedElements([]);
      }
    };

    const onDrag: DraggableEventListener = ({ event, data }) => {
      const n = node();
      n.position.x += data.deltaX;
      n.position.y += data.deltaY;
      hooks.nodeDrag.trigger({ event, node: n });

      store?.updateNodePosDiff({
        id: props.node.id as string,
        diff: {
          x: data.deltaX,
          y: data.deltaY
        },
        isDragging: true
      });
    };

    const onDragStop: DraggableEventListener = ({ event }) => {
      const n = node();
      // onDragStop also gets called when user just clicks on a node.
      // Because of that we set dragging to true inside the onDrag handler and handle the click here
      if (!props.node.__rf.isDragging) {
        if (isSelectable.value && !props.selectNodesOnDrag && !selected.value) {
          store.addSelectedElements([n]);
        }

        hooks.nodeClick.trigger({ event, node: n });

        return;
      }

      store.updateNodePosDiff({
        id: n.id || '',
        isDragging: false
      });

      hooks.nodeDragStop.trigger({ event, node: n });
    };

    useResizeObserver(nodeElement, (entries) => {
      const updates: NodeDimensionUpdate[] = entries.map((entry) => ({
        id: entry.target.getAttribute('data-id') || '',
        nodeElement: entry.target as HTMLDivElement
      }));

      store.updateNodeDimensions(updates);
    });

    onMounted(() => {
      store.updateNodeDimensions([
        {
          id: props.node.id || '',
          nodeElement: nodeElement.value,
          forceUpdate: true
        }
      ]);
    });

    return () =>
      props.node.isHidden ? (
        ''
      ) : (
        <DraggableCore
          cancel=".nodrag"
          scale={store.transform[2]}
          disabled={!isDraggable.value}
          grid={props.snapGrid}
          enableUserSelectHack={false}
          onStart={onDragStart}
          onMove={onDrag}
          onStop={onDragStop}
        >
          <div
            ref="nodeElement"
            class={[
              'revue-flow__node',
              `revue-flow__node-${props.node.type}`,
              {
                selected: selected.value,
                selectable: isSelectable.value
              }
            ]}
            style={{
              zIndex: selected.value ? 10 : 3,
              transform: `translate(${props.node.__rf.position.x}px,${props.node.__rf.position.y}px)`,
              pointerEvents: isSelectable.value || isDraggable.value ? 'all' : 'none',
              opacity: props.node.__rf.width !== null && props.node.__rf.height !== null ? 1 : 0,
              ...props.node.style
            }}
            data-id={props.node.id}
            onMouseenter={onMouseEnterHandler}
            onMousemove={onMouseMoveHandler}
            onMouseleave={onMouseLeaveHandler}
            onContextmenu={onContextMenuHandler}
            onClick={onSelectNodeHandler}
          >
            {h(props.type, {
              data: props.node.data,
              type: props.node.type,
              xPos: props.node.__rf.position.x,
              yPos: props.node.__rf.position.y,
              selected: selected.value,
              isConnectable: isConnectable.value,
              sourcePosition: props.node.sourcePosition,
              targetPosition: props.node.targetPosition,
              isDragging: props.node.__rf.isDragging
            })}
          </div>
        </DraggableCore>
      );
  }
});
