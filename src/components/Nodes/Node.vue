<template>
  <DraggableCore
    cancel=".nodrag"
    :scale="transform[2]"
    :disabled="!isDraggable"
    :grid="grid"
    :enableUserSelectHack="false"
    @start="onDragStart"
    @move="onDrag"
    @stop="onDragStop"
  >
    <div
      ref="nodeElement"
      :class="nodeClasses"
      :style="nodeStyle"
      :data-id="node.id"
      @mouseenter="onMouseEnterHandler"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseLeaveHandler"
      @contextmenu="onContextMenuHandler"
      @click="onSelectNodeHandler"
    >
      <component
        :is="type"
        :data="node.data"
        :type="node.type"
        :x-pos="node.__rf.position.x"
        :y-pos="node.__rf.position.y"
        :selected="selected"
        :is-connectable="isConnectable"
        :source-position="node.sourcePosition"
        :target-position="node.targetPosition"
        :is-dragging="node.__rf.isDragging"
      />
    </div>
  </DraggableCore>
</template>
<script lang="ts">
import { computed, CSSProperties, defineComponent, inject, PropType, provide } from 'vue';
import { templateRef, tryOnMounted, useResizeObserver } from '@vueuse/core';
import { DraggableCore, DraggableEventListener } from '@braks/revue-draggable';
import { Node, NodeDimensionUpdate, NodeTypesType, RevueFlowStore } from '../../types';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';

interface NodeProps {
  nodeTypes: NodeTypesType;
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
    const transform = computed(() => store.transform);
    const isDraggable = computed(
      () => props.node.draggable || (store.nodesDraggable && typeof props.node.draggable === 'undefined')
    );
    const isSelectable = computed(
      () => props.node.selectable || (store.elementsSelectable && typeof props.node.selectable === 'undefined')
    );
    const isConnectable = computed(
      () => props.node.connectable || (store.nodesConnectable && typeof props.node.connectable === 'undefined')
    );

    const node = computed(
      () =>
        ({
          id: props.node.id,
          type: props.node.type,
          position: { x: props.node.__rf.position.x, y: props.node.__rf.position.y },
          data: props.node.data
        } as Node)
    );
    const grid = computed(() => (props.snapToGrid ? props.snapGrid : [1, 1])! as [number, number]);
    const initialized = computed(() => props.node.__rf.width !== null && props.node.__rf.height !== null);

    const nodeStyle = computed<CSSProperties>(() => ({
      zIndex: selected.value ? 10 : 3,
      transform: `translate(${props.node.__rf.position.x}px,${props.node.__rf.position.y}px)`,
      pointerEvents: isSelectable.value || isDraggable.value ? 'all' : 'none',
      opacity: initialized.value ? 1 : 0,
      ...props.node.style
    }));
    const onMouseEnterHandler = () => {
      if (props.node.__rf.isDragging) {
        return;
      }

      return (event: MouseEvent) => hooks.nodeMouseEnter.trigger({ event, node: node.value });
    };

    const onMouseMoveHandler = () => {
      if (props.node.__rf.isDragging) {
        return;
      }

      return (event: MouseEvent) => hooks.nodeMouseMove.trigger({ event, node: node.value });
    };

    const onMouseLeaveHandler = () => {
      if (props.node.__rf.isDragging) {
        return;
      }

      return (event: MouseEvent) => hooks.nodeMouseLeave.trigger({ event, node: node.value });
    };

    const onContextMenuHandler = () => {
      return (event: MouseEvent) => hooks.nodeContextMenu.trigger({ event, node: node.value });
    };

    const onSelectNodeHandler = (event: MouseEvent) => {
      if (!isDraggable.value) {
        if (isSelectable.value) {
          store.unsetNodesSelection();

          if (!selected.value) {
            store.addSelectedElements([node.value]);
          }
        }

        hooks.nodeClick.trigger({ event, node: node.value });
      }
    };

    const onDragStart: DraggableEventListener = ({ event }) => {
      hooks.nodeDragStart.trigger({ event, node: node.value });

      if (props.selectNodesOnDrag && isSelectable.value) {
        store.unsetNodesSelection();

        if (!selected.value) {
          store.addSelectedElements([node.value]);
        }
      } else if (!props.selectNodesOnDrag && !selected.value && isSelectable.value) {
        store.unsetNodesSelection();
        store.addSelectedElements([]);
      }
    };

    const onDrag: DraggableEventListener = ({ event, data }) => {
      node.value.position.x += data.deltaX;
      node.value.position.y += data.deltaY;
      hooks.nodeDrag.trigger({ event, node: node.value });

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
      // onDragStop also gets called when user just clicks on a node.
      // Because of that we set dragging to true inside the onDrag handler and handle the click here
      if (!props.node.__rf.isDragging) {
        if (isSelectable.value && !props.selectNodesOnDrag && !selected.value) {
          store.addSelectedElements([node.value]);
        }

        hooks.nodeClick.trigger({ event, node: node.value });

        return;
      }

      store.updateNodePosDiff({
        id: node.value.id || '',
        isDragging: false
      });

      hooks.nodeDragStop.trigger({ event, node: node.value });
    };

    useResizeObserver(nodeElement, (entries) => {
      const updates: NodeDimensionUpdate[] = entries.map((entry) => ({
        id: entry.target.getAttribute('data-id') || '',
        nodeElement: entry.target as HTMLDivElement
      }));

      store.updateNodeDimensions(updates);
    });

    tryOnMounted(() => {
      store.updateNodeDimensions([
        {
          id: props.node.id || '',
          nodeElement: nodeElement.value,
          forceUpdate: true
        }
      ]);
    });

    const nodeClasses = computed(() => [
      'revue-flow__node',
      `revue-flow__node-${props.node.type}`,
      {
        selected: selected.value,
        selectable: isSelectable.value
      }
    ]);

    return {
      nodeClasses,
      grid,
      nodeStyle,
      nodeElement,
      onDragStart,
      onDrag,
      onDragStop,
      onContextMenuHandler,
      onMouseEnterHandler,
      onMouseLeaveHandler,
      onMouseMoveHandler,
      onSelectNodeHandler,
      transform,
      isConnectable,
      isDraggable,
      selected
    };
  }
});
</script>
