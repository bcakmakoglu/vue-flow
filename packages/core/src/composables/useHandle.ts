import type { MaybeRefOrGetter } from '@vueuse/core'
import { toValue } from '@vueuse/core'
import {
  type Transform,
  calcAutoPan,
  getEventPosition,
  getHostForElement,
  isMouseEvent,
  pointToRendererPoint,
  rendererPointToPoint,
} from '@xyflow/system'
import { useVueFlow } from './useVueFlow'
import type { Connection, ConnectionHandle, HandleType, MouseTouchEvent, ValidConnectionFunc } from '~/types'
import { getClosestHandle, getConnectionStatus, getHandleLookup, getHandleType, isValidHandle, resetRecentHandle } from '~/utils'

interface UseHandleProps {
  handleId: MaybeRefOrGetter<string | null>
  nodeId: MaybeRefOrGetter<string>
  type: MaybeRefOrGetter<HandleType>
  isValidConnection?: MaybeRefOrGetter<ValidConnectionFunc | null>
  edgeUpdaterType?: MaybeRefOrGetter<HandleType>
  onEdgeUpdate?: (event: MouseTouchEvent, connection: Connection) => void
  onEdgeUpdateEnd?: (event: MouseTouchEvent) => void
}

function alwaysValid() {
  return true
}

export function useHandle({
  handleId,
  nodeId,
  type,
  isValidConnection,
  edgeUpdaterType,
  onEdgeUpdate,
  onEdgeUpdateEnd,
}: UseHandleProps) {
  const {
    vueFlowRef,
    connectionMode,
    connectionRadius,
    connectOnClick,
    connectionClickStartHandle,
    nodesConnectable,
    autoPanOnConnect,
    findNode,
    panBy,
    getNodes,
    startConnection,
    updateConnection,
    endConnection,
    emits,
    viewport,
    edges,
    nodes,
    isValidConnection: isValidConnectionProp,
  } = useVueFlow()

  let connection: Connection | null = null
  let isValid = false
  let handleDomNode: Element | null = null

  function handlePointerDown(event: MouseTouchEvent) {
    const isTarget = toValue(type) === 'target'

    const isMouseTriggered = isMouseEvent(event)

    // when vue-flow is used inside a shadow root we can't use document
    const doc = getHostForElement(event.target as HTMLElement)

    if ((isMouseTriggered && event.button === 0) || !isMouseTriggered) {
      const node = findNode(toValue(nodeId))

      let isValidConnectionHandler = toValue(isValidConnection) || isValidConnectionProp.value || alwaysValid

      if (!isValidConnectionHandler && node) {
        isValidConnectionHandler = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) || alwaysValid
      }

      let closestHandle: ConnectionHandle | null

      let autoPanId = 0

      const { x, y } = getEventPosition(event)
      const clickedHandle = doc?.elementFromPoint(x, y)
      const handleType = getHandleType(toValue(edgeUpdaterType), clickedHandle)
      const containerBounds = vueFlowRef.value?.getBoundingClientRect()

      if (!containerBounds || !handleType) {
        return
      }

      let prevActiveHandle: Element
      let connectionPosition = getEventPosition(event, containerBounds)
      let autoPanStarted = false

      const handleLookup = getHandleLookup({
        nodes: getNodes.value,
        nodeId: toValue(nodeId),
        handleId: toValue(handleId),
        handleType,
      })

      // when the user is moving the mouse close to the edge of the canvas while connecting we move the canvas
      const autoPan = () => {
        if (!autoPanOnConnect) {
          return
        }

        const [xMovement, yMovement] = calcAutoPan(connectionPosition, containerBounds)

        panBy({ x: xMovement, y: yMovement })
        autoPanId = requestAnimationFrame(autoPan)
      }

      startConnection(
        {
          nodeId: toValue(nodeId),
          handleId: toValue(handleId),
          type: handleType,
        },
        {
          x: x - containerBounds.left,
          y: y - containerBounds.top,
        },
        event,
      )

      emits.connectStart({ event, nodeId: toValue(nodeId), handleId: toValue(handleId), handleType })

      function onPointerMove(event: MouseTouchEvent) {
        connectionPosition = getEventPosition(event, containerBounds)

        const { handle, validHandleResult } = getClosestHandle(
          event,
          doc,
          pointToRendererPoint(connectionPosition, Object.values(viewport.value).map((v) => v) as Transform, false, [1, 1]),
          connectionRadius.value,
          handleLookup,
          (handle) =>
            isValidHandle(
              event,
              handle,
              connectionMode.value,
              toValue(nodeId),
              toValue(handleId),
              isTarget ? 'target' : 'source',
              isValidConnectionHandler,
              doc,
              edges.value,
              nodes.value,
              findNode,
            ),
        )

        closestHandle = handle

        if (!autoPanStarted) {
          autoPan()
          autoPanStarted = true
        }

        connection = validHandleResult.connection
        isValid = validHandleResult.isValid
        handleDomNode = validHandleResult.handleDomNode

        updateConnection(
          closestHandle && isValid
            ? rendererPointToPoint(
                {
                  x: closestHandle.x,
                  y: closestHandle.y,
                },
                Object.values(viewport.value).map((v) => v) as Transform,
              )
            : connectionPosition,
          validHandleResult.endHandle,
          getConnectionStatus(!!closestHandle, isValid),
        )

        if (!closestHandle && !isValid && !handleDomNode) {
          return resetRecentHandle(prevActiveHandle)
        }

        if (connection && connection.source !== connection.target && handleDomNode) {
          resetRecentHandle(prevActiveHandle)

          prevActiveHandle = handleDomNode

          // todo: remove `vue-flow__handle-connecting` in next major version
          handleDomNode.classList.add('connecting', 'vue-flow__handle-connecting')
          handleDomNode.classList.toggle('valid', isValid)
          // todo: remove this in next major version
          handleDomNode.classList.toggle('vue-flow__handle-valid', isValid)
        }
      }

      function onPointerUp(event: MouseTouchEvent) {
        if ((closestHandle || handleDomNode) && connection && isValid) {
          if (!onEdgeUpdate) {
            emits.connect(connection)
          } else {
            onEdgeUpdate(event, connection)
          }
        }

        emits.connectEnd(event)

        if (edgeUpdaterType) {
          onEdgeUpdateEnd?.(event)
        }

        resetRecentHandle(prevActiveHandle)

        cancelAnimationFrame(autoPanId)
        endConnection(event)

        autoPanStarted = false
        isValid = false
        connection = null
        handleDomNode = null

        doc.removeEventListener('mousemove', onPointerMove as EventListener)
        doc.removeEventListener('mouseup', onPointerUp as EventListener)

        doc.removeEventListener('touchmove', onPointerMove as EventListener)
        doc.removeEventListener('touchend', onPointerUp as EventListener)
      }

      doc.addEventListener('mousemove', onPointerMove as EventListener)
      doc.addEventListener('mouseup', onPointerUp as EventListener)

      doc.addEventListener('touchmove', onPointerMove as EventListener)
      doc.addEventListener('touchend', onPointerUp as EventListener)
    }
  }

  function handleClick(event: MouseEvent) {
    if (!connectOnClick.value) {
      return
    }

    const isTarget = toValue(type) === 'target'

    if (!connectionClickStartHandle.value) {
      emits.clickConnectStart({ event, nodeId: toValue(nodeId), handleId: toValue(handleId) })

      startConnection({ nodeId: toValue(nodeId), type: toValue(type), handleId: toValue(handleId) }, undefined, event, true)
    } else {
      let isValidConnectionHandler = toValue(isValidConnection) || isValidConnectionProp.value || alwaysValid

      const node = findNode(toValue(nodeId))

      if (!isValidConnectionHandler && node) {
        isValidConnectionHandler = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) || alwaysValid
      }

      if (node && (typeof node.connectable === 'undefined' ? nodesConnectable.value : node.connectable) === false) {
        return
      }

      const doc = getHostForElement(event.target as HTMLElement)

      const { connection, isValid } = isValidHandle(
        event,
        {
          nodeId: toValue(nodeId),
          id: toValue(handleId),
          type: toValue(type),
        },
        connectionMode.value,
        connectionClickStartHandle.value.nodeId,
        connectionClickStartHandle.value.handleId || null,
        connectionClickStartHandle.value.type,
        isValidConnectionHandler,
        doc,
        edges.value,
        nodes.value,
        findNode,
      )

      const isOwnHandle = connection.source === connection.target

      if (isValid && !isOwnHandle) {
        emits.connect(connection)
      }

      emits.clickConnectEnd(event)

      endConnection(event, true)
    }
  }

  return {
    handlePointerDown,
    handleClick,
  }
}
