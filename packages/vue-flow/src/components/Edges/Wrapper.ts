import type { CSSProperties, Component, VNode } from 'vue'
import EdgeAnchor from './EdgeAnchor'
import type { EdgeComponent, EdgeEventsOn, EdgeMarkerType, EdgeTextProps, EdgeUpdatable, GraphNode } from '~/types'
import { ConnectionMode, Position } from '~/types'
import { getEdgePositions, getHandle, getMarkerId } from '~/utils'
import { EdgeId, EdgeRef } from '~/context'

interface Props {
  id: string
  type: EdgeComponent | Function | Object | false
  name: string
  source: string
  target: string
  sourceNode?: GraphNode
  targetNode?: GraphNode
  targetHandleId?: string | null
  sourceHandleId?: string | null
  selectable?: boolean
  updatable?: EdgeUpdatable
  label?: string | VNode | Component<EdgeTextProps> | Object
  data?: any
  events: EdgeEventsOn
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  animated?: boolean
  selected?: boolean
  style: CSSProperties
  markerEnd?: EdgeMarkerType
  markerStart?: EdgeMarkerType
  connectionMode: ConnectionMode
  edgeUpdaterRadius: number
  updating?: boolean
}

const Wrapper = defineComponent({
  props: [
    'name',
    'type',
    'id',
    'data',
    'events',
    'labelBgBorderRadius',
    'labelBgPadding',
    'labelBgStyle',
    'labelStyle',
    'labelShowBg',
    'style',
    'animated',
    'label',
    'updatable',
    'selectable',
    'target',
    'source',
    'sourceNode',
    'targetNode',
    'sourceHandleId',
    'targetHandleId',
    'selected',
    'markerEnd',
    'markerStart',
    'connectionMode',
    'edgeUpdaterRadius',
    'updating',
  ],
  emits: ['source-mousedown', 'target-mousedown'],
  setup(props: Props, { emit }) {
    let updating = $ref(false)

    const edgeEl = ref()

    provide(EdgeId, props.id)
    provide(EdgeRef, edgeEl)

    const onEdgeUpdaterMouseEnter = () => (updating = true)

    const onEdgeUpdaterMouseOut = () => (updating = false)

    const onEdgeUpdaterSourceMouseDown = (e: MouseEvent) => {
      emit('source-mousedown', e)
    }

    const onEdgeUpdaterTargetMouseDown = (e: MouseEvent) => {
      emit('target-mousedown', e)
    }

    return () => {
      if (!props.sourceNode || !props.targetNode) return null

      let sourceNodeHandles
      if (props.connectionMode === ConnectionMode.Strict) {
        sourceNodeHandles = props.sourceNode.handleBounds.source
      } else {
        sourceNodeHandles = props.sourceNode.handleBounds.source ?? props.sourceNode.handleBounds.target
      }

      const sourceHandle = getHandle(sourceNodeHandles, props.sourceHandleId)

      let targetNodeHandles
      if (props.connectionMode === ConnectionMode.Strict) {
        targetNodeHandles = props.targetNode.handleBounds.target
      } else {
        targetNodeHandles = props.targetNode.handleBounds.target ?? props.targetNode.handleBounds.source
      }

      const targetHandle = getHandle(targetNodeHandles, props.targetHandleId)

      const sourcePosition = sourceHandle ? sourceHandle.position : Position.Bottom

      const targetPosition = targetHandle ? targetHandle.position : Position.Top

      const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
        props.sourceNode,
        sourceHandle,
        sourcePosition,
        props.targetNode,
        targetHandle,
        targetPosition,
      )

      return h(
        'g',
        {
          'ref': edgeEl,
          'data-id': props.id,
          'class': [
            'vue-flow__edge',
            `vue-flow__edge-${props.name}`,
            {
              updating,
              selected: props.selected,
              animated: props.animated,
              inactive: !props.selectable,
            },
          ],
        },
        [
          props.updating
            ? null
            : h(props.type as any, {
                id: props.id,
                sourceNode: props.sourceNode,
                targetNode: props.targetNode,
                source: props.source,
                target: props.target,
                updatable: props.updatable,
                selected: props.selected,
                animated: props.animated,
                label: props.label,
                labelStyle: props.labelStyle,
                labelShowBg: props.labelShowBg,
                labelBgStyle: props.labelBgStyle,
                labelBgPadding: props.labelBgPadding,
                labelBgBorderRadius: props.labelBgBorderRadius,
                data: props.data,
                events: props.events,
                style: props.style,
                markerStart: `url(#${getMarkerId(props.markerStart)})`,
                markerEnd: `url(#${getMarkerId(props.markerEnd)})`,
                sourcePosition,
                targetPosition,
                sourceX,
                sourceY,
                targetX,
                targetY,
                sourceHandleId: props.sourceHandleId,
                targetHandleId: props.targetHandleId,
              }),

          [
            props.updatable === 'source' || props.updatable === true
              ? [
                  h(
                    'g',
                    {
                      onMousedown: onEdgeUpdaterSourceMouseDown,
                      onMouseenter: onEdgeUpdaterMouseEnter,
                      onMouseout: onEdgeUpdaterMouseOut,
                    },
                    h(EdgeAnchor, {
                      'position': sourcePosition,
                      'centerX': sourceX,
                      'centerY': sourceY,
                      'radius': props.edgeUpdaterRadius,
                      'data-type': 'source',
                    }),
                  ),
                ]
              : null,
            props.updatable === 'target' || props.updatable === true
              ? [
                  h(
                    'g',
                    {
                      onMousedown: onEdgeUpdaterTargetMouseDown,
                      onMouseenter: onEdgeUpdaterMouseEnter,
                      onMouseout: onEdgeUpdaterMouseOut,
                    },
                    h(EdgeAnchor, {
                      'position': targetPosition,
                      'centerX': targetX,
                      'centerY': targetY,
                      'radius': props.edgeUpdaterRadius,
                      'data-type': 'target',
                    }),
                  ),
                ]
              : null,
          ],
        ],
      )
    }
  },
})

export default Wrapper
