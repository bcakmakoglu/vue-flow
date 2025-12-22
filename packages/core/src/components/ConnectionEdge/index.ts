import { computed, defineComponent, getCurrentInstance, h, inject, resolveComponent, toValue } from 'vue'
import type { EdgeComponent, HandleElement } from '../../types'
import { ConnectionMode, Position } from '../../types'
import { getHandlePosition, getMarkerId, oppositePosition } from '../../utils'
import { useVueFlow } from '../../composables'
import { Slots } from '../../context'
import { getBezierPath } from '../Edges/utils'

const ConnectionEdge = defineComponent({
  name: 'ConnectionEdge',
  compatConfig: { MODE: 3 },
  setup() {
    const {
      id: vueFlowId,
      connectionMode,
      connectionStartHandle,
      connectionEndHandle,
      connectionPosition,
      connectionStatus,
      updateExistingEdge,
      viewport,
      findNode,
      getEdgeTypes,
    } = useVueFlow()

    const slots = inject(Slots)
    const instance = getCurrentInstance()

    const fromNode = computed(() => findNode(connectionStartHandle.value?.nodeId))

    const toNode = computed(() => findNode(connectionEndHandle.value?.nodeId) ?? null)

    const toXY = computed(() => {
      return {
        x: (connectionPosition.value.x - viewport.value.x) / viewport.value.zoom,
        y: (connectionPosition.value.y - viewport.value.y) / viewport.value.zoom,
      }
    })
    



    return () => {

      if(updateExistingEdge.value){
        return null;
      }

      if (!fromNode.value || !connectionStartHandle.value) {
        return null
      }

      const startHandleId = connectionStartHandle.value.id

      const handleType = connectionStartHandle.value.type

      const fromHandleBounds = fromNode.value.handleBounds
      let handleBounds = fromHandleBounds?.[handleType] ?? []

      if (connectionMode.value === ConnectionMode.Loose) {
        const oppositeBounds = fromHandleBounds?.[handleType === 'source' ? 'target' : 'source'] ?? []
        handleBounds = [...handleBounds, ...oppositeBounds]
      }

      if (!handleBounds || handleBounds.length === 0) {
        return null
      }

      const fromHandle = (startHandleId ? handleBounds.find((d) => d.id === startHandleId) : handleBounds[0]) ?? null
      const fromPosition = fromHandle?.position ?? Position.Top
      const { x: fromX, y: fromY } = getHandlePosition(fromNode.value, fromHandle, fromPosition)

      let toHandle: HandleElement | null = null

      // When snapped to a handle
      if (toNode.value && connectionEndHandle.value) {
        // if connection mode is strict, we only look for handles of the opposite type
        if (connectionMode.value === ConnectionMode.Strict) {
          toHandle =
            toNode.value.handleBounds[handleType === 'source' ? 'target' : 'source']?.find(
              (d) => d.id === connectionEndHandle.value?.id,
            ) || null
        } else {
          toHandle =
            [...(toNode.value.handleBounds.source ?? []), ...(toNode.value.handleBounds.target ?? [])]?.find(
              (d) => d.id === connectionEndHandle.value?.id,
            ) || null
        }
      }

      const toPosition = connectionEndHandle.value?.position ?? (fromPosition ? oppositePosition[fromPosition] : undefined)

      // Get the edge component for the specified type
      const edgeTypeName = 'default'
      const slot = slots?.[`edge-${edgeTypeName}`]
      
      let edgeComponent: EdgeComponent | false = false
      
      if (slot) {
        edgeComponent = slot
      } else {
        let edgeType = getEdgeTypes.value[edgeTypeName]

        if (typeof edgeType === 'string') {
          if (instance) {
            const components = Object.keys(instance.appContext.components)
            if (components && components.includes(edgeTypeName)) {
              edgeType = resolveComponent(edgeTypeName, false) as EdgeComponent
            }
          }
        }

        if (edgeType && typeof edgeType !== 'string') {
          edgeComponent = edgeType
        } else {
          // Fallback to default edge type
          edgeComponent = getEdgeTypes.value.default
        }
      }

      if (!edgeComponent) {
        return null
      }

      // Calculate default path for positioning
      const [dAttr] = getBezierPath({
        sourceX: fromX,
        sourceY: fromY,
        sourcePosition: fromPosition,
        targetX: toXY.value.x,
        targetY: toXY.value.y,
        targetPosition: toPosition,
      })



      return h(
        'svg',
        { class: 'vue-flow__edges vue-flow__connectionedge vue-flow__container' },
        h(
          'g',
          { class: ['vue-flow__edge', 'vue-flow__edge-preview', connectionStatus.value] },
          h(edgeComponent as any, {
            id: '__connection-edge-preview__',
            sourceNode: fromNode.value,
            targetNode: toNode.value ?? null,
            source: fromNode.value.id,
            target: toNode.value?.id ?? '',
            type: edgeTypeName,
            sourcePosition: fromPosition,
            targetPosition: toPosition,
            sourceX: fromX,
            sourceY: fromY,
            targetX: toXY.value.x,
            targetY: toXY.value.y,
            
            sourceHandle: fromHandle,
            targetHandle: toHandle,
          }),
        ),
      )
    }
  },
})

export default ConnectionEdge