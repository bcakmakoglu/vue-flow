import { Node, RevueFlowStore, WrapNodeProps } from '../../types';
import { computed, CSSProperties, defineComponent, inject, onMounted, provide, ref } from 'vue';
import { DraggableCore, DraggableEventHandler } from '@braks/revue-draggable';

export default (NodeComponent: any) => {
  return defineComponent({
    props: WrapNodeProps,
    setup(props) {
      const store = inject<RevueFlowStore>('store');
      provide('NodeIdContext', props.id);

      const nodeElement = ref<HTMLDivElement | undefined>();

      const node = computed(() => ({
        id: props.id,
        type: props.type,
        position: { x: props.xPos, y: props.yPos },
        data: props.data
      }));
      const grid = computed(() => (props.snapToGrid ? props.snapGrid : [1, 1])! as [number, number]);

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
            store?.unsetNodesSelection();

            if (!props.selected) {
              store?.addSelectedElements([node.value as Node]);
            }
          }

          props.onClick?.(event, node.value as Node);
        }
      };

      const onDragStart: DraggableEventHandler = (event) => {
        props.onNodeDragStart?.(event as MouseEvent, node.value as Node);

        if (props.selectNodesOnDrag && props.isSelectable) {
          store?.unsetNodesSelection();

          if (!props.selected) {
            store?.addSelectedElements([node.value as Node]);
          }
        } else if (!props.selectNodesOnDrag && !props.selected && props.isSelectable) {
          store?.unsetNodesSelection();
          store?.addSelectedElements([]);
        }
      };

      const onDrag: DraggableEventHandler = (event, draggableData) => {
        if (props.onNodeDrag) {
          node.value.position.x += draggableData.deltaX;
          node.value.position.y += draggableData.deltaY;
          props.onNodeDrag(event as MouseEvent, node.value as Node);
        }

        store?.updateNodePosDiff({
          id: props.id as string,
          diff: {
            x: draggableData.deltaX,
            y: draggableData.deltaY
          },
          isDragging: true
        });
      };

      const onDragStop: DraggableEventHandler = (event) => {
        // onDragStop also gets called when user just clicks on a node.
        // Because of that we set dragging to true inside the onDrag handler and handle the click here
        if (!props.isDragging) {
          if (props.isSelectable && !props.selectNodesOnDrag && !props.selected) {
            store?.addSelectedElements([node.value as Node]);
          }

          props.onClick?.(event, node.value as Node);

          return;
        }

        store?.updateNodePosDiff({
          id: node.value.id as string,
          isDragging: false
        });

        props.onNodeDragStop?.(event as MouseEvent, node.value as Node);
      };

      onMounted(() => {
        if (nodeElement.value && !props.isHidden) {
          store?.updateNodeDimensions([{ id: props.id || '', nodeElement: nodeElement.value, forceUpdate: true }]);
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

      const nodeClasses = computed(() => [
        'revue-flow__node',
        `revue-flow__node-${props.type}`,
        {
          selected: props.selected,
          selectable: props.isSelectable
        }
      ]);

      return () => (
        <DraggableCore
          onStart={onDragStart}
          onDrag={onDrag}
          onStop={onDragStop}
          scale={props.scale}
          disabled={!props.isDraggable}
          cancel=".nodrag"
          grid={grid.value}
          nodeRef={nodeElement.value}
          enableUserSelectHack={false}
        >
          <div
            class={nodeClasses.value}
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
        </DraggableCore>
      );
    }
  });
};
