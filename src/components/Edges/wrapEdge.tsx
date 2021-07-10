import { Component, computed, defineComponent, ref } from 'vue-demi';

import store from '../../store';
import { Edge, EdgeProps, Position, WrapEdgeProps } from '../../types';
import { onMouseDown } from '../Handle/handler';
import { EdgeAnchor } from './EdgeAnchor';

export default (EdgeComponent: any): Component<EdgeProps> => {
  return defineComponent({
    components: { EdgeComponent },
    props: WrapEdgeProps,
    setup(props) {
      const pinia = store();
      const updating = ref<boolean>(false);
      const inactive = !props.elementsSelectable && !props.onClick;
      const edgeClasses = computed(() => [
        'react-flow__edge',
        `react-flow__edge-${props.type}`,
        { selected: props.selected, animated: props.animated, inactive, updating: updating.value }
      ]);

      const edgeElement = computed<Edge>(() => {
        const el: Edge = {
          id: props.id || '',
          source: props.source || '',
          target: props.target || '',
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
          pinia.unsetNodesSelection();
          pinia.addSelectedElements(edgeElement.value as any);
        }

        if (props.onClick) props.onClick?.(event, edgeElement.value);
      };

      const onEdgeContextMenu = (event: MouseEvent) => {
        if (typeof props.onContextMenu === 'function') props.onContextMenu?.(event, edgeElement.value);
      };

      const onEdgeMouseEnter = (event: MouseEvent) => {
        if (typeof props.onMouseEnter === 'function') props.onMouseEnter?.(event, edgeElement.value);
      };

      const onEdgeMouseMove = (event: MouseEvent) => {
        if (typeof props.onMouseMove === 'function') props.onMouseMove?.(event, edgeElement.value);
      };

      const onEdgeMouseLeave = (event: MouseEvent) => {
        if (typeof props.onMouseLeave === 'function') props.onMouseLeave?.(event, edgeElement.value);
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
          nodeId || '',
          pinia.setConnectionNodeId,
          pinia.setConnectionPosition,
          props.onConnectEdge as any,
          isTarget,
          isValidConnection,
          pinia.connectionMode,
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
