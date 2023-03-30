import EdgeAnchor from './EdgeAnchor'
import type { Connection, EdgeComponent, EdgeUpdatable, GraphEdge, HandleType, MouseTouchEvent } from '~/types'
import { ConnectionMode, Position } from '~/types'

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
    } = useVueFlow()

    const hooks = useEdgeHooks(props.edge, emits)

    const edge = useVModel(props, 'edge')

    const mouseOver = ref(false)

    const updating = ref(false)

    const nodeId = ref('')

    const handleId = ref<string | null>(null)

    const type = ref<HandleType>('source')

    const edgeUpdaterType = ref<HandleType>('source')

    const edgeEl = ref<SVGElement>()

    provide(EdgeId, props.id)
    provide(EdgeRef, edgeEl)

    const sourceNode = computed(() => findNode(edge.value.source))

    const targetNode = computed(() => findNode(edge.value.target))

    const edgeClass = computed(() => (edge.value.class instanceof Function ? edge.value.class(edge.value) : edge.value.class))
    const edgeStyle = computed(() => (edge.value.style instanceof Function ? edge.value.style(edge.value) : edge.value.style))

    const { handlePointerDown } = useHandle({
      nodeId,
      handleId,
      type,
      isValidConnection: isValidConnection.value,
      edgeUpdaterType,
      onEdgeUpdate,
      onEdgeUpdateEnd,
    })

    return () => {
      if (!sourceNode.value || !targetNode.value || !edge.value) return null

      let sourceNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        sourceNodeHandles = sourceNode.value.handleBounds.source
      } else {
        sourceNodeHandles = [...(sourceNode.value.handleBounds.source || []), ...(sourceNode.value.handleBounds.target || [])]
      }

      const sourceHandle = getHandle(sourceNodeHandles, edge.value.sourceHandle)

      let targetNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        targetNodeHandles = targetNode.value.handleBounds.target
      } else {
        targetNodeHandles = [...(targetNode.value.handleBounds.target || []), ...(targetNode.value.handleBounds.source || [])]
      }

      const targetHandle = getHandle(targetNodeHandles, edge.value.targetHandle)

      const sourcePosition = sourceHandle ? sourceHandle.position : Position.Bottom

      const targetPosition = targetHandle ? targetHandle.position : Position.Top

      const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
        sourceNode.value,
        sourceHandle,
        sourcePosition,
        targetNode.value,
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
          'role': props.focusable ? 'button' : undefined,
        },
        [
          updating
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
                markerStart: `url(#${getMarkerId(edge.value.markerStart, vueFlowId)})`,
                markerEnd: `url(#${getMarkerId(edge.value.markerEnd, vueFlowId)})`,
                sourcePosition,
                targetPosition,
                sourceX,
                sourceY,
                targetX,
                targetY,
                sourceHandleId: edge.value.sourceHandle,
                targetHandleId: edge.value.targetHandle,
                interactionWidth: edge.value.interactionWidth,
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
      if (event.button !== 0) return

      updating.value = true

      nodeId.value = isSourceHandle ? edge.value.target : edge.value.source
      handleId.value = (isSourceHandle ? edge.value.targetHandle : edge.value.sourceHandle) ?? ''
      type.value = isSourceHandle ? 'target' : 'source'

      edgeUpdaterType.value = type.value

      hooks.emit.updateStart({ event, edge: edge.value })

      handlePointerDown(event)
    }

    function onEdgeClick(event: MouseEvent) {
      if (props.selectable) {
        nodesSelectionActive.value = false

        addSelectedEdges([edge.value])
      }
      hooks.emit.click({ event, edge: edge.value })
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
