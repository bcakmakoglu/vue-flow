import { computed, defineComponent, h, inject, PropType, ref, watchPostEffect } from 'vue';
import EdgeAnchor from './EdgeAnchor';
import { ConnectionMode, Edge, Elements, Node, Position, RevueFlowStore, Transform } from '../../types';
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks';
import { getEdgePositions, getHandle, getSourceTargetNodes, isEdgeVisible } from '../../container/EdgeRenderer/utils';
import { isEdge } from '../../utils/graph';
import { onMouseDown } from '../Handle/handler';
import { controlledRef } from '@vueuse/core';

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
    const nodes = controlledRef(getSourceTargetNodes(props.edge, store.nodes), {
      onBeforeChange: (value, oldValue) => {
        if (JSON.stringify(value) === JSON.stringify(oldValue)) return false;
      }
    });

    watchPostEffect(() => {
      nodes.value = getSourceTargetNodes(props.edge, store.nodes);
    });

    hooks.connect.on((connection) => {
      hooks.edgeUpdate.trigger({ edge: props.edge, connection });
    });

    if (!nodes.value.sourceNode) {
      console.warn(`couldn't create edge for source id: ${props.edge.source}; edge id: ${props.edge.id}`);
    }

    if (!nodes.value.targetNode) {
      console.warn(`couldn't create edge for target id: ${props.edge.target}; edge id: ${props.edge.id}`);
    }

    // when connection type is loose we can define all handles as sources
    const targetNodeHandles =
      props.connectionMode === ConnectionMode.Strict
        ? nodes.value.targetNode?.__rf.handleBounds.target
        : nodes.value.targetNode?.__rf.handleBounds.target || nodes.value.targetNode?.__rf.handleBounds.source;

    const sourceHandle =
      nodes.value.sourceNode && getHandle(nodes.value.sourceNode.__rf.handleBounds.source, props.edge.sourceHandle || null);
    const targetHandle = getHandle(targetNodeHandles, props.edge.targetHandle || null);
    const sourcePosition = sourceHandle ? sourceHandle.position : Position.Bottom;
    const targetPosition = targetHandle ? targetHandle.position : Position.Top;

    const isVisible = ({ sourceX, sourceY, targetX, targetY }: Record<string, number>) => {
      return props.onlyRenderVisibleElements
        ? isEdgeVisible({
            sourcePos: { x: sourceX, y: sourceY },
            targetPos: { x: targetX, y: targetY },
            width: store.width || 0,
            height: store.height || 0,
            transform: store.transform
          })
        : true;
    };

    const isSelected = computed(() => store.selectedElements?.some((elm) => isEdge(elm) && elm.id === props.edge.id) || false);

    const edgeElement = () => {
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
    };

    const onEdgeClick = (event: MouseEvent) => {
      if (store.elementsSelectable) {
        store.unsetNodesSelection();
        store.addSelectedElements(edgeElement() as any);
      }

      hooks.edgeClick.trigger({ event, edge: edgeElement() });
    };

    const onEdgeContextMenu = (event: MouseEvent) =>
      hooks.edgeContextMenu.trigger({
        event,
        edge: edgeElement()
      });

    const onEdgeMouseEnter = (event: MouseEvent) => hooks.edgeMouseEnter.trigger({ event, edge: edgeElement() });

    const onEdgeMouseMove = (event: MouseEvent) => hooks.edgeMouseMove.trigger({ event, edge: edgeElement() });

    const onEdgeMouseLeave = (event: MouseEvent) => hooks.edgeMouseLeave.trigger({ event, edge: edgeElement() });

    const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
      const nodeId = isSourceHandle ? props.edge.target : props.edge.source;
      const handleId = isSourceHandle ? props.edge.targetHandle : props.edge.sourceHandle;
      const isValidConnection = () => true;
      const isTarget = isSourceHandle;

      hooks.edgeUpdateStart.trigger({ event, edge: edgeElement() });
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

    const updating = ref<boolean>(false);
    const onEdgeUpdaterMouseEnter = () => (updating.value = true);
    const onEdgeUpdaterMouseOut = () => (updating.value = false);

    return () => {
      const { targetX, targetY, sourceX, sourceY } = getEdgePositions(
        nodes.value.sourceNode as Node,
        sourceHandle,
        sourcePosition,
        nodes.value.targetNode as Node,
        targetHandle,
        targetPosition
      );
      return !props.edge.isHidden && isVisible({ targetX, targetY, sourceX, sourceY }) ? (
        <g
          class={[
            'revue-flow__edge',
            `revue-flow__edge-${props.type}`,
            {
              selected: isSelected.value,
              animated: props.edge.animated,
              inactive: !store.elementsSelectable,
              updating: updating.value
            }
          ]}
          onClick={onEdgeClick}
          onContextmenu={onEdgeContextMenu}
          onMouseenter={onEdgeMouseEnter}
          onMousemove={onEdgeMouseMove}
          onMouseleave={onEdgeMouseLeave}
        >
          {h(
            props.type,
            {
              id: props.edge.id,
              source: props.edge.source,
              target: props.edge.target,
              selected: isSelected.value,
              animated: props.edge.animated,
              label: props.edge.label,
              labelStyle: props.edge.labelStyle,
              labelShowBg: props.edge.labelShowBg,
              labelBgStyle: props.edge.labelBgStyle,
              labelBgPadding: props.edge.labelBgPadding,
              labelBgBorderRadius: props.edge.labelBgBorderRadius,
              data: props.edge.data,
              style: props.edge.style,
              arrowHeadType: props.edge.arrowHeadType,
              sourceX: sourceX,
              sourceY: sourceY,
              targetX: targetX,
              targetY: targetY,
              markerEndId: props.markerEndId,
              sourceHandleId: props.edge.sourceHandle,
              targetHandleId: props.edge.targetHandle
            },
            {}
          )}
          <g onMousedown={onEdgeUpdaterSourceMouseDown} onMouseenter={onEdgeUpdaterMouseEnter} onMouseout={onEdgeUpdaterMouseOut}>
            <EdgeAnchor position={sourcePosition} centerX={sourceX} centerY={sourceY} radius={props.edgeUpdaterRadius} />
          </g>
          <g onMousedown={onEdgeUpdaterTargetMouseDown} onMouseenter={onEdgeUpdaterMouseEnter} onMouseout={onEdgeUpdaterMouseOut}>
            <EdgeAnchor position={sourcePosition} centerX={sourceX} centerY={sourceY} radius={props.edgeUpdaterRadius} />
          </g>
        </g>
      ) : (
        ''
      );
    };
  }
});
