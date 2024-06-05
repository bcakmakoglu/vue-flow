import { computed, defineComponent, h, provide, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import type { Connection, EdgeComponent, EdgeUpdatable, GraphEdge, HandleType, MouseTouchEvent } from '../../types'
import { ConnectionMode, Position } from '../../types'
import { useEdgeHooks, useHandle, useVueFlow } from '../../composables'
import { EdgeId, EdgeRef } from '../../context'
import {
  ARIA_EDGE_DESC_KEY,
  ErrorCode,
  VueFlowError,
  elementSelectionKeys,
  getEdgePositions,
  getHandle,
  getMarkerId,
} from '../../utils'
import EdgeAnchor from './EdgeAnchor'

interface Props {
  id: string
  type: EdgeComponent | ((...args: any[]) => any) | object | false
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
      disableKeyboardA11y,
    } = useVueFlow()

    const hooks = useEdgeHooks(props.edge, emits)

    const edge = useVModel(props, 'edge')

    const mouseOver = ref(false)

    const updating = ref(false)

    const nodeId = ref('')

    const handleId = ref<string | null>(null)

    const edgeUpdaterType = ref<HandleType>('source')

    const edgeEl = ref<SVGElement | null>(null)

    provide(EdgeId, props.id)
    provide(EdgeRef, edgeEl)

    const edgeClass = computed(() => (edge.value.class instanceof Function ? edge.value.class(edge.value) : edge.value.class))
    const edgeStyle = computed(() => (edge.value.style instanceof Function ? edge.value.style(edge.value) : edge.value.style))

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
      const sourceNode = findNode(edge.value.source)
      const targetNode = findNode(edge.value.target)
      const pathOptions = 'pathOptions' in edge.value ? edge.value.pathOptions : {}

      if (!sourceNode && !targetNode) {
        emits.error(new VueFlowError(ErrorCode.EDGE_SOURCE_TARGET_MISSING, edge.value.id, edge.value.source, edge.value.target))

        return null
      }

      if (!sourceNode) {
        emits.error(new VueFlowError(ErrorCode.EDGE_SOURCE_MISSING, edge.value.id, edge.value.source))

        return null
      }

      if (!targetNode) {
        emits.error(new VueFlowError(ErrorCode.EDGE_TARGET_MISSING, edge.value.id, edge.value.target))

        return null
      }

      if (!edge.value || edge.value.hidden || sourceNode.hidden || targetNode.hidden) {
        return null
      }

      let sourceNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        sourceNodeHandles = sourceNode.handleBounds.source
      } else {
        sourceNodeHandles = [...(sourceNode.handleBounds.source || []), ...(sourceNode.handleBounds.target || [])]
      }

      const sourceHandle = getHandle(sourceNodeHandles, edge.value.sourceHandle)

      let targetNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        targetNodeHandles = targetNode.handleBounds.target
      } else {
        targetNodeHandles = [...(targetNode.handleBounds.target || []), ...(targetNode.handleBounds.source || [])]
      }

      const targetHandle = getHandle(targetNodeHandles, edge.value.targetHandle)

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

      edge.value.sourceX = sourceX
      edge.value.sourceY = sourceY
      edge.value.targetX = targetX
      edge.value.targetY = targetY

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
              selected: edge.value.selected,
              animated: edge.value.animated,
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
          'aria-label':
            edge.value.ariaLabel === null
              ? undefined
              : edge.value.ariaLabel || `Edge from ${edge.value.source} to ${edge.value.target}`,
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
                source: edge.value.source,
                target: edge.value.target,
                type: edge.value.type,
                updatable: props.updatable,
                selected: edge.value.selected,
                animated: edge.value.animated,
                label: edge.value.label,
                labelStyle: edge.value.labelStyle,
                labelShowBg: edge.value.labelShowBg,
                labelBgStyle: edge.value.labelBgStyle,
                labelBgPadding: edge.value.labelBgPadding,
                labelBgBorderRadius: edge.value.labelBgBorderRadius,
                data: edge.value.data,
                events: { ...edge.value.events, ...hooks.on },
                style: edgeStyle.value,
                markerStart: `url('#${getMarkerId(edge.value.markerStart, vueFlowId)}')`,
                markerEnd: `url('#${getMarkerId(edge.value.markerEnd, vueFlowId)}')`,
                sourcePosition,
                targetPosition,
                sourceX,
                sourceY,
                targetX,
                targetY,
                sourceHandleId: edge.value.sourceHandle,
                targetHandleId: edge.value.targetHandle,
                interactionWidth: edge.value.interactionWidth,
                ...pathOptions,
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
      hooks.emit.update({ event, edge: edge.value, connection })
    }

    function onEdgeUpdateEnd(event: MouseTouchEvent) {
      hooks.emit.updateEnd({ event, edge: edge.value })
      updating.value = false
    }

    function handleEdgeUpdater(event: MouseEvent, isSourceHandle: boolean) {
      if (event.button !== 0) {
        return
      }

      updating.value = true

      nodeId.value = isSourceHandle ? edge.value.target : edge.value.source
      handleId.value = (isSourceHandle ? edge.value.targetHandle : edge.value.sourceHandle) ?? ''

      edgeUpdaterType.value = isSourceHandle ? 'target' : 'source'

      hooks.emit.updateStart({ event, edge: edge.value })

      handlePointerDown(event)
    }

    function onEdgeClick(event: MouseEvent) {
      const data = { event, edge: edge.value }

      if (props.selectable) {
        nodesSelectionActive.value = false

        if (edge.value.selected && multiSelectionActive.value) {
          removeSelectedEdges([edge.value])

          edgeEl.value?.blur()
        } else {
          addSelectedEdges([edge.value])
        }
      }

      hooks.emit.click(data)
    }

    function onEdgeContextMenu(event: MouseEvent) {
      hooks.emit.contextMenu({ event, edge: edge.value })
    }

    function onDoubleClick(event: MouseEvent) {
      hooks.emit.doubleClick({ event, edge: edge.value })
    }

    function onEdgeMouseEnter(event: MouseEvent) {
      hooks.emit.mouseEnter({ event, edge: edge.value })
    }

    function onEdgeMouseMove(event: MouseEvent) {
      hooks.emit.mouseMove({ event, edge: edge.value })
    }

    function onEdgeMouseLeave(event: MouseEvent) {
      hooks.emit.mouseLeave({ event, edge: edge.value })
    }

    function onEdgeUpdaterSourceMouseDown(event: MouseEvent) {
      handleEdgeUpdater(event, true)
    }

    function onEdgeUpdaterTargetMouseDown(event: MouseEvent) {
      handleEdgeUpdater(event, false)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!disableKeyboardA11y.value && elementSelectionKeys.includes(event.key) && props.selectable) {
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
