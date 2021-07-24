<template>
  <g
    :class="edgeClasses"
    @click="onEdgeClick"
    @contextmenu="onEdgeContextMenu"
    @mouseenter="onEdgeMouseEnter"
    @mousemove="onEdgeMouseMove"
    @mouseleave="onEdgeMouseLeave"
  >
    <component
      :is="type"
      :id="edge.id"
      :source="edge.source"
      :target="edge.target"
      :selected="isSelected"
      :animated="edge.animated"
      :label="edge.label"
      :label-style="edge.labelStyle"
      :label-show-bg="edge.labelShowBg"
      :label-bg-style="edge.labelBgStyle"
      :label-bg-padding="edge.labelBgPadding"
      :label-bg-borderRadius="edge.labelBgBorderRadius"
      :data="edge.data"
      :style="edge.style"
      :arrow-head-type="edge.arrowHeadType"
      :source-x="edgePositions.sourceX"
      :source-y="edgePositions.sourceY"
      :target-x="edgePositions.targetX"
      :target-y="edgePositions.targetY"
      :source-position="sourcePosition"
      :target-position="targetPosition"
      :marker-end-id="markerEndId"
      :source-handle-id="edge.sourceHandle"
      :target-handle-id="edge.targetHandle"
    />
    <g @mousedown="onEdgeUpdaterSourceMouseDown" @mouseenter="onEdgeUpdaterMouseEnter" @mouseout="onEdgeUpdaterMouseOut">
      <EdgeAnchor
        :position="sourcePosition"
        :center-x="edgePositions.sourceX"
        :center-y="edgePositions.sourceY"
        :radius="edgeUpdaterRadius"
      />
    </g>
    <g @mousedown="onEdgeUpdaterTargetMouseDown" @mouseenter="onEdgeUpdaterMouseEnter" @mouseout="onEdgeUpdaterMouseOut">
      <EdgeAnchor
        :position="sourcePosition"
        :center-x="edgePositions.sourceX"
        :center-y="edgePositions.sourceY"
        :radius="edgeUpdaterRadius"
      />
    </g>
  </g>
</template>
<script lang="ts">
import { EdgeAnchor } from './EdgeAnchor';
import { ConnectionMode, Edge, Elements, Node, Position, RevueFlowStore, Transform } from '../../types';
import { computed, defineComponent, inject, PropType, ref } from 'vue';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';
import { getEdgePositions, getHandle, getSourceTargetNodes, isEdgeVisible } from '../../container/EdgeRenderer/utils';
import { isEdge } from '../../utils/graph';
import { onMouseDown } from '../Handle/handler';

interface EdgeProps {
  edge: Edge;
  nodes: Node[];
  selectedElements: Elements | null;
  elementsSelectable: boolean;
  transform: Transform;
  width: number;
  height: number;
  onlyRenderVisibleElements: boolean;
  connectionMode?: ConnectionMode;
  markerEndId?: string;
  edgeUpdaterRadius?: number;
}

export default defineComponent({
  components: { EdgeAnchor },
  props: {
    edge: {
      type: Object as PropType<EdgeProps['edge']>,
      required: true
    },
    markerEndId: {
      type: Object as PropType<EdgeProps['markerEndId']>,
      required: false,
      default: undefined
    },
    edgeUpdaterRadius: {
      type: Number as PropType<EdgeProps['edgeUpdaterRadius']>,
      required: false,
      default: undefined
    },
    type: {
      type: Object,
      required: true
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<EdgeProps['onlyRenderVisibleElements']>,
      required: false,
      default: false
    },
    connectionMode: {
      type: String as PropType<EdgeProps['connectionMode']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;
    const hooks = inject<RevueFlowHooks>('hooks')!;
    const nodes = computed(() => getSourceTargetNodes(props.edge, store.nodes));

    hooks.connect.on((connection) => {
      hooks.edgeUpdate.trigger({ edge: props.edge, connection });
    });

    if (!nodes.value.sourceNode) {
      console.warn(`couldn't create edge for source id: ${props.edge.source}; edge id: ${props.edge.id}`);
    }

    if (!nodes.value.targetNode) {
      console.warn(`couldn't create edge for target id: ${props.edge.target}; edge id: ${props.edge.id}`);
    }

    const targetNodeBounds = computed(() => nodes.value.targetNode?.__rf.handleBounds);
    // when connection type is loose we can define all handles as sources
    const targetNodeHandles = computed(() =>
      props.connectionMode === ConnectionMode.Strict
        ? targetNodeBounds.value?.target
        : targetNodeBounds.value?.target || targetNodeBounds.value?.source
    );
    const sourceHandle = computed(
      () => nodes.value.sourceNode && getHandle(nodes.value.sourceNode.__rf.handleBounds.source, props.edge.sourceHandle || null)
    );
    const targetHandle = computed(() => getHandle(targetNodeHandles.value, props.edge.targetHandle || null));
    const sourcePosition = computed(() => (sourceHandle.value ? sourceHandle.value.position : Position.Bottom));
    const targetPosition = computed(() => (targetHandle.value ? targetHandle.value.position : Position.Top));

    const edgePositions = computed<{
      sourceX: number;
      sourceY: number;
      targetX: number;
      targetY: number;
    }>(() => {
      return (
        nodes.value.sourceNode &&
        nodes.value.targetNode &&
        getEdgePositions(
          nodes.value.sourceNode,
          sourceHandle.value,
          sourcePosition.value,
          nodes.value.targetNode,
          targetHandle.value,
          targetPosition.value
        ) || {}
      );
    });

    const isVisible = computed(() => {
      return props.onlyRenderVisibleElements
        ? edgePositions.value &&
            isEdgeVisible({
              sourcePos: { x: edgePositions.value?.sourceX, y: edgePositions.value?.sourceY },
              targetPos: { x: edgePositions.value?.targetX, y: edgePositions.value?.targetY },
              width: store.width || 0,
              height: store.height || 0,
              transform: store.transform
            })
        : true;
    });

    const isSelected = computed(() => store.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.edge.id) || false);

    const updating = ref<boolean>(false);
    const inactive = computed(() => !store.elementsSelectable);
    const edgeClasses = computed(() => [
      'revue-flow__edge',
      `revue-flow__edge-${props.type}`,
      { selected: isSelected.value, animated: props.edge.animated, inactive: inactive.value, updating: updating.value }
    ]);

    const edgeElement = computed<Edge>(() => {
      const el: Edge = {
        id: props.edge.id || '',
        source: props.edge.source,
        target: props.edge.target,
        type: props.edge.type
      };

      if (props.edge.sourceHandle) {
        el.sourceHandle = props.edge.sourceHandle;
      }

      if (props.edge.targetHandle) {
        el.targetHandle = props.edge.targetHandle;
      }

      if (typeof props.edge.data !== 'undefined') {
        el.data = props.edge.data;
      }

      return el;
    });

    const onEdgeClick = (event: MouseEvent) => {
      if (store.elementsSelectable) {
        store.unsetNodesSelection();
        store.addSelectedElements(edgeElement.value as any);
      }

      hooks.edgeClick.trigger({ event, edge: edgeElement.value });
    };

    const onEdgeContextMenu = (event: MouseEvent) =>
      hooks.edgeContextMenu.trigger({
        event,
        edge: edgeElement.value
      });

    const onEdgeMouseEnter = (event: MouseEvent) => hooks.edgeMouseEnter.trigger({ event, edge: edgeElement.value });

    const onEdgeMouseMove = (event: MouseEvent) => hooks.edgeMouseMove.trigger({ event, edge: edgeElement.value });

    const onEdgeMouseLeave = (event: MouseEvent) => hooks.edgeMouseLeave.trigger({ event, edge: edgeElement.value });

    const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
      const nodeId = isSourceHandle ? props.edge.target : props.edge.source;
      const handleId = isSourceHandle ? props.edge.targetHandle : props.edge.sourceHandle;
      const isValidConnection = () => true;
      const isTarget = isSourceHandle;

      hooks.edgeUpdateStart.trigger({ event, edge: edgeElement.value });
      onMouseDown(
        event,
        store,
        hooks,
        handleId as string,
        nodeId,
        isTarget,
        isValidConnection,
        isSourceHandle ? 'target' : 'source'
      );
    };

    const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => {
      handleEdgeUpdater(event, true);
    };

    const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => {
      handleEdgeUpdater(event, false);
    };

    const onEdgeUpdaterMouseEnter = () => (updating.value = true);
    const onEdgeUpdaterMouseOut = () => (updating.value = false);

    return {
      isSelected,
      isVisible,
      edgePositions,
      sourceHandle,
      targetHandle,
      sourcePosition,
      targetPosition,
      edgeClasses,
      onEdgeClick,
      onEdgeMouseEnter,
      onEdgeMouseMove,
      onEdgeMouseLeave,
      onEdgeUpdaterSourceMouseDown,
      onEdgeUpdaterTargetMouseDown,
      onEdgeUpdaterMouseEnter,
      onEdgeUpdaterMouseOut,
      onEdgeContextMenu
    };
  }
});
</script>
