import { computed, defineComponent, h, provide, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import type { Connection, HandleType } from '@xyflow/system'
import { ConnectionMode, Position, getMarkerId } from '@xyflow/system'
import EdgeAnchor from './EdgeAnchor'
import type { EdgeComponent, EdgeUpdatable, GraphEdge, MouseTouchEvent } from '~/types'
import { useEdgeHooks, useHandle, useVueFlow } from '~/composables'
import { EdgeId, EdgeRef } from '~/context'
import {
  ARIA_EDGE_DESC_KEY,
  ErrorCode,
  VueFlowError,
  elementSelectionKeys,
  getEdgePositions,
  getHandle,
} from '~/utils'

interface Props {
  id: string
  type: EdgeComponent | Function | Object | false
  name: string
  selectable?: boolean
  focusable?: boolean
  updatable?: EdgeUpdatable
  edge: GraphEdge
}

const EdgeWrapper = defineComponent({
  name: 'Edge',
  compatConfig: { MODE: 3 },
  props: ['name', 'type', 'id', 'updatable', 'selectable', 'focusable', 'edge'],
  setup(props: Props) {
    const {
      id: vueFlowId,
      addSelectedEdges,
      connectionMode,
      edgeUpdaterRadius,
      emits,
      nodesSelectionActive,
      noPanClassName,
      getEdgeTypes,
      removeSelectedEdges,
      findEdge,
      findNode,
      isValidConnection,
      multiSelectionActive,
      hooks: flowHooks,
    } = useVueFlow()

    const hooks = useEdgeHooks(props.edge, emits)

    const edge = $(useVModel(props, 'edge'))

    const mouseOver = ref(false)

    const updating = ref(false)

    const nodeId = ref('')

    const handleId = ref<string | null>(null)

    const edgeUpdaterType = ref<HandleType>('source')

    const edgeEl = ref<SVGElement | null>(null)

    provide(EdgeId, props.id)
    provide(EdgeRef, edgeEl)

    const edgeClass = computed(() => (edge.class instanceof Function ? edge.class(edge) : edge.class))
    const edgeStyle = computed(() => (edge.style instanceof Function ? edge.style(edge) : edge.style))

    const { handlePointerDown } = useHandle({
      nodeId,
      handleId,
      type: edgeUpdaterType,
      isValidConnection,
      edgeUpdaterType,
      onEdgeUpdate,
      onEdgeUpdateEnd,
    })

    return () => {
      const sourceNode = findNode(edge.source)
      const targetNode = findNode(edge.target)

      if (!sourceNode && !targetNode) {
        flowHooks.value.error.trigger(new VueFlowError(ErrorCode.EDGE_SOURCE_TARGET_MISSING, edge.id, edge.source, edge.target))

        return null
      }

      if (!sourceNode) {
        flowHooks.value.error.trigger(new VueFlowError(ErrorCode.EDGE_SOURCE_MISSING, edge.id, edge.source))

        return null
      }

      if (!targetNode) {
        flowHooks.value.error.trigger(new VueFlowError(ErrorCode.EDGE_TARGET_MISSING, edge.id, edge.target))

        return null
      }

      if (!edge || sourceNode.hidden || targetNode.hidden) {
        return null
      }

      let sourceNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        sourceNodeHandles = sourceNode.handleBounds.source
      } else {
        sourceNodeHandles = [...(sourceNode.handleBounds.source || []), ...(sourceNode.handleBounds.target || [])]
      }

      const sourceHandle = getHandle(sourceNodeHandles, edge.sourceHandle)

      let targetNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        targetNodeHandles = targetNode.handleBounds.target
      } else {
        targetNodeHandles = [...(targetNode.handleBounds.target || []), ...(targetNode.handleBounds.source || [])]
      }

      const targetHandle = getHandle(targetNodeHandles, edge.targetHandle)

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

      edge.sourceX = sourceX
      edge.sourceY = sourceY
      edge.targetX = targetX
      edge.targetY = targetY

      return h(
        'g',
        {
          'ref': edgeEl,
          'key': props.id,
          'data-id': props.id,
          'class': [
            'vue-flow__edge',
            `vue-flow__edge-${props.type === false ? 'default' : props.name}`,
            noPanClassName.value,
            edgeClass.value,
            {
              updating: mouseOver.value,
              selected: edge.selected,
              animated: edge.animated,
              inactive: !props.selectable,
            },
          ],
          'onClick': onEdgeClick,
          'onContextmenu': onEdgeContextMenu,
          'onDblclick': onDoubleClick,
          'onMouseenter': onEdgeMouseEnter,
          'onMousemove': onEdgeMouseMove,
          'onMouseleave': onEdgeMouseLeave,
          'onKeyDown': props.focusable ? onKeyDown : undefined,
          'tabIndex': props.focusable ? 0 : undefined,
          'aria-label': edge.ariaLabel === null ? undefined : edge.ariaLabel || `Edge from ${edge.source} to ${edge.target}`,
          'aria-describedby': props.focusable ? `${ARIA_EDGE_DESC_KEY}-${vueFlowId}` : undefined,
          'role': props.focusable ? 'button' : 'img',
        },
        [
          updating.value
            ? null
            : h(props.type === false ? getEdgeTypes.value.default : props.type, {
                id: props.id,
                sourceNode,
                targetNode,
                source: edge.source,
                target: edge.target,
                type: edge.type,
                updatable: props.updatable,
                selected: edge.selected,
                animated: edge.animated,
                label: edge.label,
                labelStyle: edge.labelStyle,
                labelShowBg: edge.labelShowBg,
                labelBgStyle: edge.labelBgStyle,
                labelBgPadding: edge.labelBgPadding,
                labelBgBorderRadius: edge.labelBgBorderRadius,
                data: edge.data,
                events: { ...edge.events, ...hooks.on },
                style: edgeStyle.value,
                markerStart: `url(#${getMarkerId(edge.markerStart, vueFlowId)})`,
                markerEnd: `url(#${getMarkerId(edge.markerEnd, vueFlowId)})`,
                sourcePosition,
                targetPosition,
                sourceX,
                sourceY,
                targetX,
                targetY,
                sourceHandleId: edge.sourceHandle,
                targetHandleId: edge.targetHandle,
                interactionWidth: edge.interactionWidth,
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
                      'radius': edgeUpdaterRadius.value,
                      'type': 'source',
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
                      'radius': edgeUpdaterRadius.value,
                      'type': 'target',
                      'data-type': 'target',
                    }),
                  ),
                ]
              : null,
          ],
        ],
      )
    }

    function onEdgeUpdaterMouseEnter() {
      mouseOver.value = true
    }

    function onEdgeUpdaterMouseOut() {
      mouseOver.value = false
    }

    function onEdgeUpdate(event: MouseTouchEvent, connection: Connection) {
      hooks.emit.update({ event, edge, connection })
    }

    function onEdgeUpdateEnd(event: MouseTouchEvent) {
      hooks.emit.updateEnd({ event, edge })
      updating.value = false
    }

    function handleEdgeUpdater(event: MouseEvent, isSourceHandle: boolean) {
      if (event.button !== 0) {
        return
      }

      updating.value = true

      nodeId.value = isSourceHandle ? edge.target : edge.source
      handleId.value = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''

      edgeUpdaterType.value = isSourceHandle ? 'target' : 'source'

      hooks.emit.updateStart({ event, edge })

      handlePointerDown(event)
    }

    function onEdgeClick(event: MouseEvent) {
      const data = { event, edge }

      if (props.selectable) {
        nodesSelectionActive.value = false

        if (edge.selected && multiSelectionActive.value) {
          removeSelectedEdges([edge])

          edgeEl.value?.blur()
        } else {
          addSelectedEdges([edge])
        }
      }

      hooks.emit.click(data)
    }

    function onEdgeContextMenu(event: MouseEvent) {
      hooks.emit.contextMenu({ event, edge })
    }

    function onDoubleClick(event: MouseEvent) {
      hooks.emit.doubleClick({ event, edge })
    }

    function onEdgeMouseEnter(event: MouseEvent) {
      hooks.emit.mouseEnter({ event, edge })
    }

    function onEdgeMouseMove(event: MouseEvent) {
      hooks.emit.mouseMove({ event, edge })
    }

    function onEdgeMouseLeave(event: MouseEvent) {
      hooks.emit.mouseLeave({ event, edge })
    }

    function onEdgeUpdaterSourceMouseDown(event: MouseEvent) {
      handleEdgeUpdater(event, true)
    }

    function onEdgeUpdaterTargetMouseDown(event: MouseEvent) {
      handleEdgeUpdater(event, false)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (elementSelectionKeys.includes(event.key) && props.selectable) {
        const unselect = event.key === 'Escape'

        if (unselect) {
          edgeEl.value?.blur()

          removeSelectedEdges([findEdge(props.id)!])
        } else {
          addSelectedEdges([findEdge(props.id)!])
        }
      }
    }
  },
})

export default EdgeWrapper
