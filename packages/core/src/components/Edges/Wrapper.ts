import EdgeAnchor from './EdgeAnchor'
import type { Connection, EdgeComponent, EdgeUpdatable, GraphEdge, GraphNode, HandleType } from '~/types'
import { ConnectionMode, Position } from '~/types'

interface Props {
  id: string
  type: EdgeComponent | Function | Object | false
  name: string
  selectable?: boolean
  updatable?: EdgeUpdatable
  edge: GraphEdge
  sourceNode: GraphNode
  targetNode: GraphNode
}

const Wrapper = defineComponent({
  props: ['name', 'type', 'id', 'updatable', 'selectable', 'edge', 'sourceNode', 'targetNode'],
  setup(props: Props) {
    const { addSelectedEdges, connectionMode, edgeUpdaterRadius, emits, nodesSelectionActive, getEdges, getEdgeTypes } =
      useVueFlow()

    const hooks = useEdgeHooks(props.edge, emits)

    const edge = $(useVModel(props, 'edge'))

    let mouseOver = $ref(false)
    let updating = $ref(false)

    const nodeId = ref('')
    const handleId = ref<string | null>(null)
    const type = ref<HandleType>('source')
    const elementEdgeUpdaterType = ref<HandleType>('source')
    const mouseEvent = ref<MouseEvent>()

    const edgeEl = ref()

    provide(EdgeId, props.id)
    provide(EdgeRef, edgeEl)

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

    const { onMouseDown } = useHandle({
      nodeId,
      handleId,
      type,
      isValidConnection: undefined,
      elementEdgeUpdaterType,
      onEdgeUpdate,
      onEdgeUpdateEnd,
    })

    const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
      nodeId.value = isSourceHandle ? edge.target : edge.source
      handleId.value = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''
      type.value = isSourceHandle ? 'target' : 'source'
      elementEdgeUpdaterType.value = type.value
      mouseEvent.value = event

      hooks.emit.updateStart({ event, edge })

      onMouseDown(event)
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

    return () => {
      if (!props.sourceNode || !props.targetNode) return null

      let sourceNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        sourceNodeHandles = props.sourceNode.handleBounds.source
      } else {
        sourceNodeHandles = [...(props.sourceNode.handleBounds.source || []), ...(props.sourceNode.handleBounds.target || [])]
      }

      const sourceHandle = getHandle(sourceNodeHandles, edge.sourceHandle)

      let targetNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        targetNodeHandles = props.targetNode.handleBounds.target
      } else {
        targetNodeHandles = [...(props.targetNode.handleBounds.target || []), ...(props.targetNode.handleBounds.source || [])]
      }

      const targetHandle = getHandle(targetNodeHandles, edge.targetHandle)

      const sourcePosition = sourceHandle ? sourceHandle.position : Position.Bottom

      const targetPosition = targetHandle ? targetHandle.position : Position.Top

      const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
        props.sourceNode,
        sourceHandle,
        sourcePosition,
        props.targetNode,
        targetHandle,
        targetPosition,
      )

      return h(
        'g',
        {
          'ref': edgeEl,
          'data-id': props.id,
          'class': [
            'vue-flow__edge',
            `vue-flow__edge-${props.type === false ? 'default' : props.name}`,
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
        },
        [
          updating
            ? null
            : h(props.type === false ? getEdgeTypes.value.default : props.type, {
                id: props.id,
                sourceNode: props.sourceNode,
                targetNode: props.targetNode,
                source: edge.source,
                target: edge.target,
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
                style: edge.style instanceof Function ? edge.style(edge) : edge.style,
                markerStart: `url(#${getMarkerId(edge.markerStart)})`,
                markerEnd: `url(#${getMarkerId(edge.markerEnd)})`,
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

export default Wrapper
