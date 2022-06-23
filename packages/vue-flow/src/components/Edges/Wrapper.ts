import type { CSSProperties, Component, FunctionalComponent, VNode } from 'vue'
import EdgeAnchor from './EdgeAnchor'
import type { EdgeComponent, EdgeEventsOn, EdgeMarkerType, EdgeTextProps, GraphNode } from '~/types'
import { ConnectionMode, Position } from '~/types'
import { getEdgePositions, getHandle, getMarkerId } from '~/utils'

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
  updatable?: boolean
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
}

const Wrapper: FunctionalComponent<Props> = function (
  {
    name,
    type,
    id,
    data,
    events,
    labelBgBorderRadius,
    labelBgPadding,
    labelBgStyle,
    labelStyle,
    labelShowBg,
    style,
    animated,
    label,
    updatable,
    selectable,
    target,
    source,
    sourceNode,
    targetNode,
    sourceHandleId,
    targetHandleId,
    selected,
    markerEnd,
    markerStart,
    connectionMode,
    edgeUpdaterRadius,
  },
  { emit },
) {
  if (!sourceNode || !targetNode) return null

  let updating = $ref(false)

  const onEdgeUpdaterMouseEnter = () => (updating = true)

  const onEdgeUpdaterMouseOut = () => (updating = false)

  const onEdgeUpdaterSourceMouseDown = (e: MouseEvent) => {
    emit('source-mousedown', e)
  }

  const onEdgeUpdaterTargetMouseDown = (e: MouseEvent) => {
    emit('target-mousedown', e)
  }

  let sourceNodeHandles
  if (connectionMode === ConnectionMode.Strict) {
    sourceNodeHandles = sourceNode.handleBounds.source
  } else {
    sourceNodeHandles = sourceNode.handleBounds.source ?? sourceNode.handleBounds.target
  }

  const sourceHandle = getHandle(sourceNodeHandles, sourceHandleId)

  let targetNodeHandles
  if (connectionMode === ConnectionMode.Strict) {
    targetNodeHandles = targetNode.handleBounds.target
  } else {
    targetNodeHandles = targetNode.handleBounds.target ?? targetNode.handleBounds.source
  }

  const targetHandle = getHandle(targetNodeHandles, targetHandleId)

  const sourcePosition = sourceHandle ? sourceHandle.position : Position.Bottom

  const targetPosition = targetHandle ? targetHandle.position : Position.Top

  const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
    sourceNode,
    sourceHandle,
    sourcePosition,
    targetNode,
    targetHandle,
    targetPosition,
  )

  return h(
    'g',
    {
      class: [
        'vue-flow__edge',
        `vue-flow__edge-${name}`,
        {
          updating,
          selected,
          animated,
          inactive: !selectable,
        },
      ],
    },
    [
      h(type as any, {
        id,
        sourceNode,
        targetNode,
        source,
        target,
        updatable,
        selected,
        animated,
        label,
        labelStyle,
        labelShowBg,
        labelBgStyle,
        labelBgPadding,
        labelBgBorderRadius,
        data,
        events,
        style,
        markerStart: `url(#${getMarkerId(markerStart)})`,
        markerEnd: `url(#${getMarkerId(markerEnd)})`,
        sourcePosition,
        targetPosition,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourceHandleId,
        targetHandleId,
      }),
      updatable
        ? [
            h(
              'g',
              {
                onMousedown: onEdgeUpdaterSourceMouseDown,
                onMouseenter: onEdgeUpdaterMouseEnter,
                onMouseout: onEdgeUpdaterMouseOut,
              },
              h(EdgeAnchor, {
                position: sourcePosition,
                centerX: sourceX,
                centerY: sourceY,
                radius: edgeUpdaterRadius,
              }),
            ),
            h(
              'g',
              {
                onMousedown: onEdgeUpdaterTargetMouseDown,
                onMouseenter: onEdgeUpdaterMouseEnter,
                onMouseout: onEdgeUpdaterMouseOut,
              },
              h(EdgeAnchor, {
                position: targetPosition,
                centerX: targetX,
                centerY: targetY,
                radius: edgeUpdaterRadius,
              }),
            ),
          ]
        : null,
    ],
  )
}

Wrapper.props = [
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
]

Wrapper.emits = ['source-mousedown', 'target-mousedown']

export default Wrapper
