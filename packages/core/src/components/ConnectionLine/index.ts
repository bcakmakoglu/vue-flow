import type { DefineComponent } from 'vue'
import { defineComponent, h, inject } from 'vue'
import { getBezierPath, getSmoothStepPath } from '@xyflow/system'
import type { ConnectionLineProps } from '~/types'
import { ConnectionLineType, ConnectionMode, Position } from '~/types'
import { getHandlePosition, getMarkerId } from '~/utils'
import { useVueFlow } from '~/composables'
import { Slots } from '~/context'
import { getSimpleBezierPath } from '~/components/Edges/utils'

const oppositePosition = {
  [Position.Left]: Position.Right,
  [Position.Right]: Position.Left,
  [Position.Top]: Position.Bottom,
  [Position.Bottom]: Position.Top,
}

const ConnectionLine = defineComponent({
  name: 'ConnectionLine',
  compatConfig: { MODE: 3 },
  setup() {
    const {
      connectionMode,
      connectionStartHandle,
      connectionEndHandle,
      connectionPosition,
      connectionLineType,
      connectionLineStyle,
      connectionLineOptions,
      connectionStatus,
      viewport,
      findNode,
    } = useVueFlow()

    const connectionLineComponent = inject(Slots)?.['connection-line'] as DefineComponent<ConnectionLineProps> | undefined

    return () => {
      if (!connectionStartHandle.value) {
        return null
      }

      const fromNode = findNode(connectionStartHandle.value.nodeId)

      if (!fromNode) {
        return null
      }

      const handleId = connectionStartHandle.value.handleId

      const handleType = connectionStartHandle.value.type

      const targetNode = (connectionEndHandle.value?.handleId && findNode(connectionEndHandle.value.nodeId)) || null

      const toX = (connectionPosition.value.x - viewport.value.x) / viewport.value.zoom
      const toY = (connectionPosition.value.y - viewport.value.y) / viewport.value.zoom

      const fromHandleBounds = fromNode.handleBounds
      let handleBounds = fromHandleBounds?.[handleType]

      if (connectionMode.value === ConnectionMode.Loose) {
        handleBounds = handleBounds || fromHandleBounds?.[handleType === 'source' ? 'target' : 'source']
      }

      if (!handleBounds) {
        return null
      }

      const fromHandle = (handleId ? handleBounds.find((d) => d.id === handleId) : handleBounds[0]) ?? null
      const fromPosition = fromHandle?.position || Position.Top
      const { x: fromX, y: fromY } = getHandlePosition(
        fromPosition,
        { ...fromNode.dimensions, ...fromNode.computedPosition },
        fromHandle,
      )

      const toHandle =
        (targetNode &&
          connectionEndHandle.value?.handleId &&
          ((connectionMode.value === ConnectionMode.Strict
            ? targetNode.handleBounds[handleType === 'source' ? 'target' : 'source']?.find(
                (d) => d.id === connectionEndHandle.value?.handleId,
              )
            : [...(targetNode.handleBounds.source || []), ...(targetNode.handleBounds.target || [])]?.find(
                (d) => d.id === connectionEndHandle.value?.handleId,
              )) ||
            targetNode.handleBounds[handleType ?? 'target']?.[0])) ||
        null

      const toPosition = fromPosition ? oppositePosition[fromPosition] : null

      if (!fromPosition || !toPosition) {
        return null
      }

      const type = connectionLineType.value ?? connectionLineOptions.value.type

      let dAttr = ''

      const pathParams = {
        sourceX: fromX,
        sourceY: fromY,
        sourcePosition: fromPosition,
        targetX: toX,
        targetY: toY,
        targetPosition: toPosition,
      }

      if (type === ConnectionLineType.Bezier) {
        // we assume the destination position is opposite to the source position
        ;[dAttr] = getBezierPath(pathParams)
      } else if (type === ConnectionLineType.Step) {
        ;[dAttr] = getSmoothStepPath({
          ...pathParams,
          borderRadius: 0,
        })
      } else if (type === ConnectionLineType.SmoothStep) {
        ;[dAttr] = getSmoothStepPath(pathParams)
      } else if (type === ConnectionLineType.SimpleBezier) {
        ;[dAttr] = getSimpleBezierPath(pathParams)
      } else {
        dAttr = `M${fromX},${fromY} ${toX},${toY}`
      }

      return h(
        'svg',
        { class: 'vue-flow__edges vue-flow__connectionline vue-flow__container' },
        h(
          'g',
          { class: 'vue-flow__connection' },
          connectionLineComponent
            ? h(connectionLineComponent, {
                sourceX: fromX,
                sourceY: fromY,
                sourcePosition: fromPosition,
                targetX: toX,
                targetY: toY,
                targetPosition: toPosition,
                sourceNode: fromNode,
                sourceHandle: fromHandle,
                targetNode,
                targetHandle: toHandle,
                markerEnd: `url(#${getMarkerId(connectionLineOptions.value.markerEnd)})`,
                markerStart: `url(#${getMarkerId(connectionLineOptions.value.markerStart)})`,
                connectionStatus: connectionStatus.value,
              })
            : h('path', {
                'd': dAttr,
                'class': [connectionLineOptions.value.class, connectionStatus, 'vue-flow__connection-path'],
                'style': connectionLineStyle.value || connectionLineOptions.value.style,
                'marker-end': `url(#${getMarkerId(connectionLineOptions.value.markerEnd)})`,
                'marker-start': `url(#${getMarkerId(connectionLineOptions.value.markerStart)})`,
              }),
        ),
      )
    }
  },
})

export default ConnectionLine
