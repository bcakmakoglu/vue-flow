import { Component, CSSProperties, FunctionalComponent, VNode } from 'vue'
import EdgeAnchor from './EdgeAnchor'
import { ConnectionMode, EdgeComponent, EdgeMarkerType, EdgeTextProps, GraphNode, Position } from '~/types'
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
    labelBgBorderRadius,
    labelBgPadding,
    labelBgStyle,
    labelStyle,
    labelShowBg,
    style,
    animated,
    label,
    updatable,
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

  const onEdgeUpdaterSourceMouseDown = () => emit('source-mousedown')

  const onEdgeUpdaterTargetMouseDown = () => emit('target-mousedown')

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

  return h('g', { class: [`vue-flow__node-${name}`, { updating }] }, [
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
              onMouseDown: onEdgeUpdaterSourceMouseDown,
              onMouseEnter: onEdgeUpdaterMouseEnter,
              onMouseOut: onEdgeUpdaterMouseOut,
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
              onMouseDown: onEdgeUpdaterTargetMouseDown,
              onMouseEnter: onEdgeUpdaterMouseEnter,
              onMouseOut: onEdgeUpdaterMouseOut,
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
  ])
}

Wrapper.props = [
  'name',
  'type',
  'id',
  'data',
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
