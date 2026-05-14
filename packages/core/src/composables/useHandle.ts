import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import type { ConnectionState, IsValidConnection as SystemIsValidConnection } from '@xyflow/system'
import { XYHandle, getEventPosition, getHostForElement } from '@xyflow/system'
import type { ConnectingHandle, Connection, HandleType, MouseTouchEvent, ValidConnectionFunc } from '../types'
import { isValidHandle } from '../utils'
import { Position } from '../types'
import { useVueFlow } from './useVueFlow'

export interface UseHandleProps {
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

/**
 * Connection-drag composable. Drag-to-connect is delegated to `@xyflow/system`'s `XYHandle` instance
 * (same pattern as `XYDrag` / `XYResizer`). Click-to-connect stays vue-flow specific because the click
 * path interacts with the richer `ValidConnectionFunc` signature (which receives full source/target
 * `GraphNode`s on top of the bare `Connection`).
 *
 * Generally it's recommended to use the `<Handle />` component instead of this composable.
 *
 * @public
 */
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
    id: flowId,
    vueFlowRef,
    viewport,
    connectionMode,
    connectionRadius,
    connectOnClick,
    connectionStartHandle,
    connectionClickStartHandle,
    nodesConnectable,
    autoPanOnConnect,
    autoPanSpeed,
    findNode,
    panBy,
    startConnection,
    updateConnection,
    endConnection,
    emits,
    edges,
    nodes,
    isValidConnection: isValidConnectionProp,
    nodeLookup,
  } = useVueFlow()

  /**
   * Adapt our richer `ValidConnectionFunc` (which receives `{ nodes, edges, sourceNode, targetNode }`)
   * into system's bare `IsValidConnection` (which only receives the `Connection`/`EdgeBase`). Resolves
   * source/target nodes from `nodeLookup` before delegating to the user's callback.
   */
  function buildSystemIsValidConnection(): SystemIsValidConnection | undefined {
    const userFn = toValue(isValidConnection) || isValidConnectionProp.value
    if (!userFn) {
      return undefined
    }
    return (edge) => {
      const sourceNode = findNode(edge.source)
      const targetNode = findNode(edge.target)
      if (!sourceNode || !targetNode) {
        return false
      }
      return userFn(
        {
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle ?? null,
          targetHandle: edge.targetHandle ?? null,
        },
        { nodes: nodes.value, edges: edges.value, sourceNode, targetNode },
      )
    }
  }

  function handlePointerDown(event: MouseTouchEvent) {
    const handleDomNode = event.currentTarget as Element | null
    if (!handleDomNode || !vueFlowRef.value) {
      return
    }

    XYHandle.onPointerDown(event, {
      autoPanOnConnect: autoPanOnConnect.value,
      connectionMode: connectionMode.value,
      connectionRadius: connectionRadius.value,
      domNode: vueFlowRef.value as HTMLDivElement,
      handleId: toValue(handleId),
      nodeId: toValue(nodeId),
      isTarget: toValue(type) === 'target',
      nodeLookup: nodeLookup.value,
      lib: 'vue',
      flowId,
      edgeUpdaterType: toValue(edgeUpdaterType),
      autoPanSpeed: autoPanSpeed.value,
      handleDomNode,
      panBy,
      isValidConnection: buildSystemIsValidConnection(),
      getTransform: () => [viewport.value.x, viewport.value.y, viewport.value.zoom],
      // system aborts the move loop if this returns null, so once `startConnection` has populated the
      // store's `connectionStartHandle`, surface it as a system-shaped `Handle`. Width/height aren't
      // tracked on `ConnectingHandle` — fall back to 0; system only reads them for rendering.
      getFromHandle: () => {
        const h = connectionStartHandle.value
        if (!h) {
          return null
        }
        return {
          id: h.id,
          nodeId: h.nodeId,
          type: h.type,
          position: h.position,
          x: h.x,
          y: h.y,
          width: 0,
          height: 0,
        }
      },
      updateConnection: (state: ConnectionState) => {
        if (state.inProgress) {
          // first move emits the in-progress state — mirror it to our split-field store so consumers
          // like `useConnection` and `Pane.vue`'s `connectionInProgress` keep working.
          if (!connectionStartHandle.value) {
            startConnection({
              nodeId: state.fromHandle.nodeId,
              id: state.fromHandle.id ?? null,
              type: state.fromHandle.type,
              position: state.fromHandle.position,
              x: state.to.x,
              y: state.to.y,
            })
          }
          updateConnection(
            state.to,
            state.toHandle
              ? ({
                  nodeId: state.toHandle.nodeId,
                  id: state.toHandle.id ?? null,
                  type: state.toHandle.type,
                  position: state.toHandle.position,
                  x: state.toHandle.x,
                  y: state.toHandle.y,
                } as ConnectingHandle)
              : null,
            state.isValid !== null ? (state.isValid ? 'valid' : 'invalid') : null,
          )
        }
      },
      cancelConnection: () => {
        endConnection(event, false)
      },
      onConnectStart: (evt, params) => {
        emits.connectStart({
          event: evt as MouseTouchEvent,
          nodeId: params.nodeId ?? undefined,
          handleId: params.handleId,
          handleType: params.handleType ?? undefined,
        })
      },
      onConnect: (connection) => {
        if (onEdgeUpdate) {
          onEdgeUpdate(event, connection)
        } else {
          emits.connect(connection)
        }
      },
      onConnectEnd: (evt) => {
        emits.connectEnd(evt as MouseTouchEvent)
        if (edgeUpdaterType) {
          onEdgeUpdateEnd?.(evt as MouseTouchEvent)
        }
      },
    })
  }

  function handleClick(event: MouseEvent) {
    if (!connectOnClick.value) {
      return
    }

    if (!connectionClickStartHandle.value) {
      emits.clickConnectStart({
        event,
        nodeId: toValue(nodeId),
        handleId: toValue(handleId),
      })

      startConnection(
        {
          nodeId: toValue(nodeId),
          type: toValue(type),
          id: toValue(handleId),
          position: Position.Top,
          ...getEventPosition(event),
        },
        undefined,
        true,
      )

      return
    }

    const isValidConnectionHandler = toValue(isValidConnection) || isValidConnectionProp.value || alwaysValid

    const node = findNode(toValue(nodeId))

    if (node && (typeof node.connectable === 'undefined' ? nodesConnectable.value : node.connectable) === false) {
      return
    }

    const doc = getHostForElement(event.target as HTMLElement)

    const result = isValidHandle(
      event,
      {
        handle: {
          nodeId: toValue(nodeId),
          id: toValue(handleId),
          type: toValue(type),
          position: Position.Top,
          ...getEventPosition(event),
        },
        connectionMode: connectionMode.value,
        fromNodeId: connectionClickStartHandle.value.nodeId,
        fromHandleId: connectionClickStartHandle.value.id ?? null,
        fromType: connectionClickStartHandle.value.type,
        isValidConnection: isValidConnectionHandler,
        doc,
        lib: 'vue',
        flowId,
        nodeLookup: nodeLookup.value,
      },
      edges.value,
      nodes.value,
      findNode,
      nodeLookup.value,
    )

    const isOwnHandle = result.connection?.source === result.connection?.target

    if (result.isValid && result.connection && !isOwnHandle) {
      emits.connect(result.connection)
    }

    emits.clickConnectEnd(event)

    endConnection(event, true)
  }

  return {
    handlePointerDown,
    handleClick,
  }
}
