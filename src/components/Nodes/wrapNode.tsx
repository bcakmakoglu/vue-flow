import { Node, WrapNodeProps } from '../../types';
import { computed, CSSProperties, defineComponent, onMounted, provide, ref } from 'vue';
import store from '../../store';

export default (NodeComponent: any) => {
  return defineComponent({
    props: WrapNodeProps,
    setup(props) {
      const pinia = store();
      provide('NodeIdContext', props.id);

      const nodeElement = ref<HTMLDivElement | null>(null);

      const node = computed(() => ({
        id: props.id,
        type: props.type,
        position: { x: props.xPos, y: props.yPos },
        data: props.data
      }));
      // const grid = computed(() => (props.snapToGrid ? props.snapGrid : [1, 1])! as [number, number]);

      const nodeStyle = computed<CSSProperties>(() => ({
        zIndex: props.selected ? 10 : 3,
        transform: `translate(${props.xPos}px,${props.yPos}px)`,
        pointerEvents:
          props.isSelectable ||
          props.isDraggable ||
          props.onClick ||
          props.onMouseEnter ||
          props.onMouseMove ||
          props.onMouseLeave
            ? 'all'
            : 'none',
        // prevents jumping of nodes on start
        opacity: props.isInitialized ? 1 : 0,
        ...props.style
      }));
      const onMouseEnterHandler = () => {
        if (!props.onMouseEnter || props.isDragging) {
          return;
        }

        return (event: MouseEvent) => props.onMouseEnter && props.onMouseEnter(event, node.value as Node);
      };

      const onMouseMoveHandler = () => {
        if (!props.onMouseMove || props.isDragging) {
          return;
        }

        return (event: MouseEvent) => props.onMouseMove && props.onMouseMove(event, node.value as Node);
      };

      const onMouseLeaveHandler = () => {
        if (!props.onMouseLeave || props.isDragging) {
          return;
        }

        return (event: MouseEvent) => props.onMouseLeave && props.onMouseLeave(event, node.value as Node);
      };

      const onContextMenuHandler = () => {
        if (!props.onContextMenu) {
          return;
        }

        return (event: MouseEvent) => props.onContextMenu && props.onContextMenu(event, node.value as Node);
      };

      const onSelectNodeHandler = (event: MouseEvent) => {
        if (!props.isDraggable) {
          if (props.isSelectable) {
            pinia.unsetNodesSelection();

            if (!props.selected) {
              pinia.addSelectedElements([node.value as Node]);
            }
          }

          props.onClick?.(event, node.value as Node);
        }
      };

      /**
       const onDragStart = (event: DraggableEvent) => {
        onNodeDragStart?.(event as MouseEvent, node);

        if (selectNodesOnDrag && isSelectable) {
          unsetNodesSelection();

          if (!selected) {
            addSelectedElements(node);
          }
        } else if (!selectNodesOnDrag && !selected && isSelectable) {
          unsetNodesSelection();
          addSelectedElements([]);
        }
      };

       const onDrag = useCallback(
       (event: DraggableEvent, draggableData: DraggableData) => {
          if (onNodeDrag) {
            node.position.x += draggableData.deltaX;
            node.position.y += draggableData.deltaY;
            onNodeDrag(event as MouseEvent, node);
          }

          updateNodePosDiff({
            id,
            diff: {
              x: draggableData.deltaX,
              y: draggableData.deltaY
            },
            isDragging: true
          });
        },
       [id, node, onNodeDrag]
       );

       const onDragStop = useCallback(
       (event: DraggableEvent) => {
          // onDragStop also gets called when user just clicks on a node.
          // Because of that we set dragging to true inside the onDrag handler and handle the click here
          if (!isDragging) {
            if (isSelectable && !selectNodesOnDrag && !selected) {
              addSelectedElements(node);
            }

            onClick?.(event as MouseEvent, node);

            return;
          }

          updateNodePosDiff({
            id: node.id,
            isDragging: false
          });

          onNodeDragStop?.(event as MouseEvent, node);
        },
       [node, isSelectable, selectNodesOnDrag, onClick, onNodeDragStop, isDragging, selected]
       );
       */

      onMounted(() => {
        if (nodeElement.value && !props.isHidden) {
          pinia.updateNodeDimensions([{ id: props.id || '', nodeElement: nodeElement.value, forceUpdate: true }]);
        }
      });

      onMounted(() => {
        if (nodeElement.value && typeof props.resizeObserver?.observe === 'function') {
          const currNode = nodeElement.value;
          props.resizeObserver?.observe(currNode);

          return () => props.resizeObserver?.unobserve(currNode);
        }
      });

      if (props.isHidden) {
        return null;
      }

      const nodeClasses = [
        'revue-flow__node',
        `revue-flow__node-${props.type}`,
        {
          selected: props.selected,
          selectable: props.isSelectable
        }
      ];

      return () => (
        <div
          class={nodeClasses}
          ref={nodeElement}
          style={nodeStyle.value}
          onMouseenter={onMouseEnterHandler}
          onMousemove={onMouseMoveHandler}
          onMouseleave={onMouseLeaveHandler}
          onContextmenu={onContextMenuHandler}
          onClick={onSelectNodeHandler}
          data-id={props.id}
        >
          <NodeComponent
            id={props.id}
            data={props.data}
            type={props.type}
            xPos={props.xPos}
            yPos={props.yPos}
            selected={props.selected}
            isConnectable={props.isConnectable}
            sourcePosition={props.sourcePosition}
            targetPosition={props.targetPosition}
            isDragging={props.isDragging}
          />
        </div>
      );
    }
  });
};
