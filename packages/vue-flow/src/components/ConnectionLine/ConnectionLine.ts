import type { CSSProperties, FunctionalComponent } from 'vue'
import { getBezierPath, getSimpleBezierPath, getSmoothStepPath } from '../Edges/utils'
import type { EdgeMarkerType, GraphNode, HandleType, Viewport, XYPosition } from '~/types'
import { ConnectionLineType, Position } from '~/types'
import { Slots } from '~/context'
import { getMarkerId } from '~/utils'

const oppositePosition = {
  [Position.Left]: Position.Right,
  [Position.Right]: Position.Left,
  [Position.Top]: Position.Bottom,
  [Position.Bottom]: Position.Top,
}

interface ConnectionLineProps {
  fromNode: GraphNode
  connectionHandleId: string
  connectionHandleType: HandleType
  type?: ConnectionLineType
  style?: CSSProperties
  className?: string
  markerEnd?: EdgeMarkerType
  markerStart?: EdgeMarkerType
  connectionPosition: XYPosition
  isConnectable: boolean
  viewport: Viewport
}

const ConnectionLine: FunctionalComponent<ConnectionLineProps> = ({
  fromNode,
  connectionHandleId: handleId,
  connectionHandleType = 'source',
  connectionPosition,
  type = ConnectionLineType.Bezier,
  className,
  style,
  markerEnd,
  markerStart,
  isConnectable,
  viewport,
}) => {
  const toX = (connectionPosition.x - viewport.x) / viewport.zoom
  const toY = (connectionPosition.y - viewport.y) / viewport.zoom

  const fromHandleBounds = fromNode?.handleBounds

  if (!fromNode || !isConnectable || !fromHandleBounds?.[connectionHandleType as HandleType]) {
    return null
  }

  const slots = inject(Slots)?.['connection-line']

  const hasSlot = slots?.({})

  const handleBound = fromHandleBounds[connectionHandleType as HandleType]!
  const fromHandle = handleId ? handleBound.find((d) => d.id === handleId) : handleBound[0]
  const fromHandleX = fromHandle ? fromHandle.x + fromHandle.width / 2 : (fromNode.dimensions.width ?? 0) / 2
  const fromHandleY = fromHandle ? fromHandle.y + fromHandle.height / 2 : fromNode.dimensions.height ?? 0
  const fromX = (fromNode.computedPosition?.x || 0) + fromHandleX
  const fromY = (fromNode.computedPosition?.y || 0) + fromHandleY

  const fromPosition = fromHandle?.position

  if (!fromPosition) {
    return null
  }

  const toPosition: Position = oppositePosition[fromPosition]

  let sourceX: number,
    sourceY: number,
    sourcePosition: Position | undefined,
    targetX: number,
    targetY: number,
    targetPosition: Position | undefined

  switch (connectionHandleType as HandleType) {
    case 'source':
      sourceX = fromX
      sourceY = fromY
      sourcePosition = fromPosition
      targetX = toX
      targetY = toY
      targetPosition = toPosition
      break
    case 'target':
      sourceX = toX
      sourceY = toY
      sourcePosition = toPosition
      targetX = fromX
      targetY = fromY
      targetPosition = fromPosition
      break
  }

  let dAttr = ''

  const pathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  }

  if (type === ConnectionLineType.Bezier) {
    // we assume the destination position is opposite to the source position
    dAttr = getBezierPath(pathParams)
  } else if (type === ConnectionLineType.Step) {
    dAttr = getSmoothStepPath({
      ...pathParams,
      borderRadius: 0,
    })
  } else if (type === ConnectionLineType.SmoothStep) {
    dAttr = getSmoothStepPath(pathParams)
  } else if (type === ConnectionLineType.SimpleBezier) {
    dAttr = getSimpleBezierPath(pathParams)
  } else {
    dAttr = `M${sourceX},${sourceY} ${targetX},${targetY}`
  }

  return h('g', { class: 'vue-flow__connection' }, [
    hasSlot
      ? h(slots!, {
          type,
          style,
          fromNode,
          fromHandle,
          fromX,
          fromY,
          toX,
          toY,
          fromPosition,
          toPosition,
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
          sourceNode: fromNode,
          sourceHandle: fromHandle,
          markerEnd: `url(#${getMarkerId(markerEnd)})`,
          markerStart: `url(#${getMarkerId(markerStart)})`,
        })
      : h('path', {
          d: dAttr,
          class: ['vue-flow__connection-path', className].join(' '),
          style: style || {},
          markerEnd: `url(#${getMarkerId(markerEnd)})`,
          markerStart: `url(#${getMarkerId(markerStart)})`,
        }),
  ])
}

ConnectionLine.displayName = 'ConnectionLineWrapper'

ConnectionLine.props = [
  'fromNode',
  'connectionHandleId',
  'connectionHandleType',
  'connectionPosition',
  'type',
  'className',
  'style',
  'markerEnd',
  'markerStart',
  'isConnectable',
  'viewport',
]

export default ConnectionLine
