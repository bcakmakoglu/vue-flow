import EdgeAnchor from './EdgeAnchor'
import type { Connection, EdgeComponent, EdgeUpdatable, GraphEdge, HandleType } from '~/types'
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
  props: ['name', 'type', 'id', 'updatable', 'selectable', 'focusable', 'edge'],
  setup(props: Props) {
    const {
      id: vueFlowId,
      addSelectedEdges,
      connectionMode,
      edgeUpdaterRadius,
      emits,
      nodesSelectionActive,
      getEdges,
      getEdgeTypes,
      removeSelectedEdges,
      findEdge,
      findNode,
    } = useVueFlow()

    const hooks = useEdgeHooks(props.edge, emits)

    const edge = $(useVModel(props, 'edge'))

    let mouseOver = $ref(false)

    let updating = $ref(false)

    const nodeId = ref('')

    const handleId = ref<string | null>(null)

    const type = ref<HandleType>('source')

    const edgeUpdaterType = ref<HandleType>('source')

    const mouseEvent = ref<MouseEvent>()

    const edgeEl = ref<SVGElement>()

    provide(EdgeId, props.id)
    provide(EdgeRef, edgeEl)

    const sourceNode = $computed(() => findNode(edge.source))

    const targetNode = $computed(() => findNode(edge.target))

    const onEdgeUpdaterMouseEnter = () => (mouseOver = true)

    const onEdgeUpdaterMouseOut = () => (mouseOver = false)

    const onEdgeUpdate = (connection: Connection) => {
      if (!connectionExists(connection, getEdges.value)) hooks.emit.update({ edge, connection })
    }

    const onEdgeUpdateEnd = () => {
      if (!mouseEvent.value) return
      hooks.emit.updateEnd({ event: mouseEvent.value, edge })
      updating = false
    }

    const { handlePointerDown } = useHandle({
      nodeId,
      handleId,
      type,
      isValidConnection: undefined,
      edgeUpdaterType,
      onEdgeUpdate,
      onEdgeUpdateEnd,
    })

    const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
      nodeId.value = isSourceHandle ? edge.target : edge.source
      handleId.value = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''
      type.value = isSourceHandle ? 'target' : 'source'
      edgeUpdaterType.value = type.value
      mouseEvent.value = event

      hooks.emit.updateStart({ event, edge })

      handlePointerDown(event)
    }

    const onEdgeClick = (event: MouseEvent) => {
      const data = { event, edge }
      if (props.selectable) {
        nodesSelectionActive.value = false

        addSelectedEdges([edge])
      }
      hooks.emit.click(data)
    }

    const onEdgeContextMenu = (event: MouseEvent) => hooks.emit.contextMenu({ event, edge })

    const onDoubleClick = (event: MouseEvent) => hooks.emit.doubleClick({ event, edge })

    const onEdgeMouseEnter = (event: MouseEvent) => hooks.emit.mouseEnter({ event, edge })

    const onEdgeMouseMove = (event: MouseEvent) => hooks.emit.mouseMove({ event, edge })

    const onEdgeMouseLeave = (event: MouseEvent) => hooks.emit.mouseLeave({ event, edge })

    const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => {
      updating = true
      handleEdgeUpdater(event, true)
    }

    const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => {
      updating = true
      handleEdgeUpdater(event, false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
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

    return () => {
      if (!sourceNode || !targetNode) return null

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

      const edgeClass = edge.class instanceof Function ? edge.class(edge) : edge.class
      const edgeStyle = edge.style instanceof Function ? edge.style(edge) : edge.style

      return h(
        'g',
        {
          'ref': edgeEl,
          'data-id': props.id,
          'class': [
            'vue-flow__edge',
            `vue-flow__edge-${props.type === false ? 'default' : props.name}`,
            edgeClass,
            {
              updating: mouseOver,
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
          'role': props.focusable ? 'button' : undefined,
        },
        [
          updating
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
                style: edgeStyle,
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
                      'data-type': 'target',
                    }),
                  ),
                ]
              : null,
          ],
        ],
      )
    }
  },
})

export default EdgeWrapper
