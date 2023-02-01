import type { MaybeRef } from '@vueuse/core'
import type { Connection, ConnectionHandle, HandleType, ValidConnectionFunc } from '~/types'

interface UseHandleProps {
  handleId: MaybeRef<string | null>
  nodeId: MaybeRef<string>
  type: MaybeRef<HandleType>
  isValidConnection?: ValidConnectionFunc
  edgeUpdaterType?: MaybeRef<HandleType>
  onEdgeUpdate?: (connection: Connection) => void
  onEdgeUpdateEnd?: (event: MouseEvent | TouchEvent) => void
}

const alwaysValid = () => true

export default function useHandle({
  handleId: _handleId,
  nodeId: _nodeId,
  type,
  isValidConnection,
  edgeUpdaterType: _edgeUpdaterType,
  onEdgeUpdate,
  onEdgeUpdateEnd,
}: UseHandleProps) {
  const isTarget = $computed(() => unref(type) === 'target')
  const nodeId = $computed(() => unref(_nodeId))
  const handleId = $computed(() => unref(_handleId))
  const edgeUpdaterType = $computed(() => unref(_edgeUpdaterType))

  const {
    vueFlowRef,
    connectionMode,
    connectionRadius,
    connectOnClick,
    connectionClickStartHandle,
    nodesConnectable,
    defaultEdgeOptions,
    findNode,
    getNodes,
    startConnection,
    updateConnection,
    endConnection,
    emits,
    viewport,
  } = useVueFlow()

  function handlePointerDown(event: MouseEvent | TouchEvent) {
    const isMouseTriggered = isMouseEvent(event)

    if ((isMouseTriggered && event.button === 0) || !isMouseTriggered) {
      // when vue-flow is used inside a shadow root we can't use document
      const doc = getHostForElement(event.target as HTMLElement)

      const node = findNode(unref(nodeId))

      let validConnectFunc = isValidConnection || alwaysValid

      if (!isValidConnection) {
        if (node) validConnectFunc = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) || alwaysValid
      }

      let prevClosestHandle: ConnectionHandle | null

      const { x, y } = getEventPosition(event)
      const clickedHandle = doc?.elementFromPoint(x, y)
      const handleType = getHandleType(unref(edgeUpdaterType), clickedHandle)
      const containerBounds = vueFlowRef.value?.getBoundingClientRect()

      if (!containerBounds || !handleType) {
        return
      }

      let prevActiveHandle: Element
      let connectionPosition = getEventPosition(event, containerBounds)

      const handleLookup = getHandleLookup({
        nodes: getNodes.value,
        nodeId,
        handleId,
        handleType,
      })

      startConnection(
        {
          nodeId: unref(nodeId),
          handleId: unref(handleId),
          type: unref(handleType),
        },
        {
          x: x - containerBounds.left,
          y: y - containerBounds.top,
        },
        event,
      )

      emits.connectStart({ event, nodeId, handleId, handleType })

      function onPointerMove(event: MouseEvent | TouchEvent) {
        connectionPosition = getEventPosition(event, containerBounds)

        prevClosestHandle = getClosestHandle(
          pointToRendererPoint(connectionPosition, viewport.value, false, [1, 1]),
          connectionRadius.value,
          handleLookup,
        )

        const { connection, handleDomNode, isValid } = isValidHandle(
          event,
          prevClosestHandle,
          connectionMode.value,
          nodeId,
          handleId,
          isTarget ? 'target' : 'source',
          validConnectFunc,
          doc,
        )

        updateConnection(
          prevClosestHandle && isValid
            ? rendererPointToPoint(
                {
                  x: prevClosestHandle.x,
                  y: prevClosestHandle.y,
                },
                viewport.value,
              )
            : connectionPosition,
        )

        if (!prevClosestHandle) {
          return resetRecentHandle(prevActiveHandle)
        }

        if (connection.source !== connection.target && handleDomNode) {
          resetRecentHandle(prevActiveHandle)
          prevActiveHandle = handleDomNode
          handleDomNode.classList.add('vue-flow__handle-connecting')
          handleDomNode.classList.toggle('vue-flow__handle-valid', isValid)
        }
      }

      function onPointerUp(event: MouseEvent | TouchEvent) {
        if (prevClosestHandle) {
          const { connection, isValid } = isValidHandle(
            event,
            prevClosestHandle,
            connectionMode.value,
            nodeId,
            handleId,
            isTarget ? 'target' : 'source',
            validConnectFunc,
            doc,
          )

          if (isValid) {
            if (!onEdgeUpdate) emits.connect({ ...defaultEdgeOptions, ...connection })
            else onEdgeUpdate(connection)
          }
        }

        emits.connectEnd(event)

        if (edgeUpdaterType) onEdgeUpdateEnd?.(event)

        resetRecentHandle(prevActiveHandle)

        endConnection(event)

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

  const handleClick = (event: MouseEvent) => {
    if (!connectOnClick.value) return

    if (!connectionClickStartHandle.value) {
      startConnection({ nodeId: unref(nodeId), type: unref(type), handleId: unref(handleId) }, undefined, event, true)
    } else {
      let validConnectFunc = isValidConnection ?? alwaysValid

      const node = findNode(unref(nodeId))

      if (!isValidConnection) {
        if (node) validConnectFunc = (!isTarget ? node.isValidTargetPos : node.isValidSourcePos) || alwaysValid
      }

      if (node && (typeof node.connectable === 'undefined' ? nodesConnectable : node.connectable) === false) return

      const doc = getHostForElement(event.target as HTMLElement)

      const { connection, isValid } = isValidHandle(
        event,
        {
          nodeId,
          id: handleId,
          type: unref(type),
        },
        connectionMode.value,
        connectionClickStartHandle.value.nodeId,
        connectionClickStartHandle.value.handleId || null,
        connectionClickStartHandle.value.type,
        validConnectFunc,
        doc,
      )

      const isOwnHandle = connection.source === connection.target

      if (isValid && !isOwnHandle) emits.connect(connection)

      endConnection(event, true)
    }
  }

  return {
    handlePointerDown,
    handleClick,
  }
}
