import { computed, DefineComponent, defineComponent, inject, PropType, ref } from 'vue';
import { Edge, EdgeProps, Position, RevueFlowStore, WrapEdgeProps } from '../../types';
import { onMouseDown } from '../Handle/handler';
import { EdgeAnchor } from './EdgeAnchor';

export default (EdgeComponent: DefineComponent<EdgeProps>) => {
  return defineComponent({
    components: { EdgeComponent },
    props: {
      id: {
        type: String as PropType<WrapEdgeProps['id']>,
        required: false,
        default: undefined
      },
      type: {
        type: String as PropType<WrapEdgeProps['type']>,
        required: true
      },
      data: {
        type: String as PropType<WrapEdgeProps['data']>,
        required: false,
        default: undefined
      },
      onClick: {
        type: Function as unknown as PropType<WrapEdgeProps['onClick']>,
        required: false,
        default: undefined
      },
      onEdgeDoubleClick: {
        type: Function as unknown as PropType<WrapEdgeProps['onEdgeDoubleClick']>,
        required: false,
        default: undefined
      },
      selected: {
        type: Boolean as PropType<WrapEdgeProps['selected']>,
        required: true,
        default: false
      },
      animated: {
        type: Boolean as PropType<WrapEdgeProps['animated']>,
        required: false,
        default: false
      },
      label: {
        type: Object as PropType<WrapEdgeProps['label']>,
        required: false,
        default: undefined
      },
      labelStyle: {
        type: Object as PropType<WrapEdgeProps['labelStyle']>,
        required: false,
        default: undefined
      },
      labelShowBg: {
        type: Boolean as PropType<WrapEdgeProps['labelShowBg']>,
        required: false,
        default: false
      },
      labelBgStyle: {
        type: Object as PropType<WrapEdgeProps['labelBgStyle']>,
        required: false,
        default: undefined
      },
      labelBgPadding: {
        type: Array as unknown as PropType<WrapEdgeProps['labelBgPadding']>,
        required: false,
        default: undefined
      },
      labelBgBorderRadius: {
        type: Number as PropType<WrapEdgeProps['labelBgBorderRadius']>,
        required: false,
        default: undefined
      },
      style: {
        type: Object as PropType<WrapEdgeProps['style']>,
        required: false,
        default: undefined
      },
      arrowHeadType: {
        type: String as PropType<WrapEdgeProps['arrowHeadType']>,
        required: false,
        default: undefined
      },
      source: {
        type: String as PropType<WrapEdgeProps['source']>,
        required: true
      },
      target: {
        type: String as PropType<WrapEdgeProps['target']>,
        required: true
      },
      sourceHandleId: {
        type: String as PropType<WrapEdgeProps['sourceHandleId']>,
        required: true,
        default: null
      },
      targetHandleId: {
        type: String as PropType<WrapEdgeProps['targetHandleId']>,
        required: true,
        default: null
      },
      sourceX: {
        type: Number as PropType<WrapEdgeProps['sourceX']>,
        required: true
      },
      sourceY: {
        type: Number as PropType<WrapEdgeProps['sourceY']>,
        required: true
      },
      targetX: {
        type: Number as PropType<WrapEdgeProps['targetX']>,
        required: true
      },
      targetY: {
        type: Number as PropType<WrapEdgeProps['targetY']>,
        required: true
      },
      sourcePosition: {
        type: String as PropType<WrapEdgeProps['sourcePosition']>,
        required: true
      },
      targetPosition: {
        type: String as PropType<WrapEdgeProps['targetPosition']>,
        required: true
      },
      elementsSelectable: {
        type: Boolean as PropType<WrapEdgeProps['elementsSelectable']>,
        required: false,
        default: false
      },
      markerEndId: {
        type: String as PropType<WrapEdgeProps['markerEndId']>,
        required: false,
        default: undefined
      },
      isHidden: {
        type: Boolean as PropType<WrapEdgeProps['isHidden']>,
        required: false,
        default: false
      },
      handleEdgeUpdate: {
        type: Boolean as PropType<WrapEdgeProps['handleEdgeUpdate']>,
        required: false,
        default: false
      },
      onConnectEdge: {
        type: Function as PropType<WrapEdgeProps['onConnectEdge']>,
        required: false,
        default: undefined
      },
      onContextMenu: {
        type: Function as unknown as PropType<WrapEdgeProps['onContextMenu']>,
        required: false,
        default: undefined
      },
      onMouseEnter: {
        type: Function as unknown as PropType<WrapEdgeProps['onMouseEnter']>,
        required: false,
        default: undefined
      },
      onMouseMove: {
        type: Function as unknown as PropType<WrapEdgeProps['onMouseMove']>,
        required: false,
        default: undefined
      },
      onMouseLeave: {
        type: Function as unknown as PropType<WrapEdgeProps['onMouseLeave']>,
        required: false,
        default: undefined
      },
      edgeUpdaterRadius: {
        type: Number as PropType<WrapEdgeProps['edgeUpdaterRadius']>,
        required: false,
        default: undefined
      },
      onEdgeUpdateStart: {
        type: Function as unknown as PropType<WrapEdgeProps['onEdgeUpdateStart']>,
        required: false,
        default: undefined
      },
      onEdgeUpdateEnd: {
        type: Function as unknown as PropType<WrapEdgeProps['onEdgeUpdateEnd']>,
        required: false,
        default: undefined
      }
    },
    setup(props) {
      const store = inject<RevueFlowStore>('store')!;
      const updating = ref<boolean>(false);
      const inactive = computed(() => !props.elementsSelectable && !props.onClick);
      const edgeClasses = computed(() => [
        'revue-flow__edge',
        `revue-flow__edge-${props.type}`,
        { selected: props.selected, animated: props.animated, inactive, updating: updating.value }
      ]);

      const edgeElement = computed<Edge>(() => {
        const el: Edge = {
          id: props.id as string,
          source: props.source,
          target: props.target,
          type: props.type
        };

        if (props.sourceHandleId) {
          el.sourceHandle = props.sourceHandleId;
        }

        if (props.targetHandleId) {
          el.targetHandle = props.targetHandleId;
        }

        if (typeof props.data !== 'undefined') {
          el.data = props.data;
        }

        return el;
      });

      const onEdgeClick = (event: MouseEvent) => {
        if (props.elementsSelectable) {
          store.unsetNodesSelection();
          store.addSelectedElements(edgeElement.value as any);
        }

        if (typeof props.onClick === 'function') props.onClick(event, edgeElement.value);
      };

      const onEdgeContextMenu = (event: MouseEvent) => {
        if (typeof props.onContextMenu === 'function') props.onContextMenu(event, edgeElement.value);
      };

      const onEdgeMouseEnter = (event: MouseEvent) => {
        if (typeof props.onMouseEnter === 'function') props.onMouseEnter(event, edgeElement.value);
      };

      const onEdgeMouseMove = (event: MouseEvent) => {
        if (typeof props.onMouseMove === 'function') props.onMouseMove(event, edgeElement.value);
      };

      const onEdgeMouseLeave = (event: MouseEvent) => {
        if (typeof props.onMouseLeave === 'function') props.onMouseLeave(event, edgeElement.value);
      };

      const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
        const nodeId = isSourceHandle ? props.target : props.source;
        const handleId = isSourceHandle ? props.targetHandleId : props.sourceHandleId;
        const isValidConnection = () => true;
        const isTarget = isSourceHandle;

        props.onEdgeUpdateStart?.(event, edgeElement.value);

        const _onEdgeUpdate = props.onEdgeUpdateEnd
          ? (evt: MouseEvent) => {
              if (props.onEdgeUpdateEnd) props.onEdgeUpdateEnd(evt, edgeElement.value);
            }
          : undefined;

        onMouseDown(
          event,
          handleId,
          nodeId,
          store.setConnectionNodeId,
          store.setConnectionPosition,
          props.onConnectEdge as any,
          isTarget,
          isValidConnection,
          store.connectionMode,
          isSourceHandle ? 'target' : 'source',
          _onEdgeUpdate
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

      if (props.isHidden) {
        return null;
      }

      return () => (
        <g
          class={edgeClasses.value}
          onClick={onEdgeClick}
          onContextmenu={onEdgeContextMenu}
          onMouseenter={onEdgeMouseEnter}
          onMousemove={onEdgeMouseMove}
          onMouseleave={onEdgeMouseLeave}
        >
          <EdgeComponent
            id={props.id}
            source={props.source}
            target={props.target}
            selected={props.selected}
            animated={props.animated}
            label={props.label}
            labelStyle={props.labelStyle}
            labelShowBg={props.labelShowBg}
            labelBgStyle={props.labelBgStyle}
            labelBgPadding={props.labelBgPadding}
            labelBgBorderRadius={props.labelBgBorderRadius}
            data={props.data}
            style={props.style}
            arrowHeadType={props.arrowHeadType}
            sourceX={props.sourceX}
            sourceY={props.sourceY}
            targetX={props.targetX}
            targetY={props.targetY}
            sourcePosition={props.sourcePosition}
            targetPosition={props.targetPosition}
            markerEndId={props.markerEndId}
            sourceHandleId={props.sourceHandleId}
            targetHandleId={props.targetHandleId}
          />
          {props.handleEdgeUpdate && (
            <g
              onMousedown={onEdgeUpdaterSourceMouseDown}
              onMouseenter={onEdgeUpdaterMouseEnter}
              onMouseout={onEdgeUpdaterMouseOut}
            >
              <EdgeAnchor
                position={props.sourcePosition as Position}
                centerX={props.sourceX as number}
                centerY={props.sourceY as number}
                radius={props.edgeUpdaterRadius}
              />
            </g>
          )}
          {props.handleEdgeUpdate && (
            <g
              onMousedown={onEdgeUpdaterTargetMouseDown}
              onMouseenter={onEdgeUpdaterMouseEnter}
              onMouseout={onEdgeUpdaterMouseOut}
            >
              <EdgeAnchor
                position={props.sourcePosition as Position}
                centerX={props.sourceX as number}
                centerY={props.sourceY as number}
                radius={props.edgeUpdaterRadius}
              />
            </g>
          )}
        </g>
      );
    }
  });
};
