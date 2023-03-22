import { isNumber } from '@vueuse/core'
import type { GraphNode, HandleConnectable, NodeComponent } from '~/types'

interface Props {
  id: string
  draggable: boolean
  selectable: boolean
  connectable: HandleConnectable
  focusable: boolean
  type: NodeComponent | Function | Object | false
  name: string
  node: GraphNode
  resizeObserver: ResizeObserver
}

const NodeWrapper = defineComponent({
  name: 'Node',
  compatConfig: { MODE: 3 },
  props: ['name', 'type', 'id', 'draggable', 'selectable', 'focusable', 'connectable', 'node', 'resizeObserver'],
  setup(props: Props) {
    provide(NodeId, props.id)

    const {
      id: vueFlowId,
      edges,
      noPanClassName,
      selectNodesOnDrag,
      nodesSelectionActive,
      multiSelectionActive,
      emits,
      findNode,
      removeSelectedNodes,
      addSelectedNodes,
      updateNodeDimensions,
      onUpdateNodeInternals,
      getIntersectingNodes,
      getNodeTypes,
      nodeExtent,
      elevateNodesOnSelect,
      disableKeyboardA11y,
      ariaLiveMessage,
      snapToGrid,
      snapGrid,
    } = $(useVueFlow())

    const updateNodePositions = useUpdateNodePositions()

    const node = $(useVModel(props, 'node'))

    const parentNode = $computed(() => (node.parentNode ? findNode(node.parentNode) : undefined))

    const connectedEdges = $computed(() => getConnectedEdges([node], edges))

    const nodeElement = ref<HTMLDivElement>()

    provide(NodeRef, nodeElement)

    const { emit, on } = useNodeHooks(node, emits)

    const dragging = useDrag({
      id: props.id,
      el: nodeElement,
      disabled: computed(() => !props.draggable),
      selectable: computed(() => props.selectable),
      onStart(event, node, nodes) {
        emit.dragStart({ event, node, nodes, intersections: getIntersectingNodes(node) })
      },
      onDrag(event, node, nodes) {
        emit.drag({ event, node, nodes, intersections: getIntersectingNodes(node) })
      },
      onStop(event, node, nodes) {
        emit.dragStop({ event, node, nodes, intersections: getIntersectingNodes(node) })
      },
    })

    const getClass = $computed(() => (node.class instanceof Function ? node.class(node) : node.class))

    const getStyle = $computed(() => {
      const styles = (node.style instanceof Function ? node.style(node) : node.style) || {}

      const width = node.width instanceof Function ? node.width(node) : node.width
      const height = node.height instanceof Function ? node.height(node) : node.height

      if (width) styles.width = typeof width === 'string' ? width : `${width}px`

      if (height) styles.height = typeof height === 'string' ? height : `${height}px`

      return styles
    })

    const zIndex = computed(() => Number(node.zIndex ?? getStyle.zIndex ?? 0))

    onUpdateNodeInternals((updateIds) => {
      if (updateIds.includes(props.id)) {
        updateInternals()
      }
    })

    onMounted(() => {
      props.resizeObserver.observe(nodeElement.value as HTMLDivElement)
    })

    onBeforeUnmount(() => {
      props.resizeObserver.unobserve(nodeElement.value as HTMLDivElement)
    })

    watch(
      [() => node.type, () => node.sourcePosition, () => node.targetPosition],
      () => {
        updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value as HTMLDivElement, forceUpdate: true }])
      },
      { flush: 'pre' },
    )

    /** this watcher only updates XYZPosition (when dragging a parent etc) */
    watch(
      [
        () => node.position.x,
        () => node.position.y,
        () => parentNode?.computedPosition.x,
        () => parentNode?.computedPosition.y,
        () => parentNode?.computedPosition.z,
        () => node.selected,
        () => node.dimensions.height,
        () => node.dimensions.width,
        () => parentNode?.dimensions.height,
        () => parentNode?.dimensions.width,
        zIndex,
      ],
      ([newX, newY, parentX, parentY, parentZ]) => {
        const xyzPos = {
          x: newX,
          y: newY,
          z: zIndex.value + (elevateNodesOnSelect ? (node.selected ? 1000 : 0) : 0),
        }

        if (isNumber(parentX) && isNumber(parentY)) {
          node.computedPosition = getXYZPos({ x: parentX, y: parentY, z: parentZ! }, xyzPos)
        } else {
          node.computedPosition = xyzPos
        }
      },
      { flush: 'pre', immediate: true },
    )

    watch([() => node.extent, () => nodeExtent], ([nodeExtent, globalExtent], [oldNodeExtent, oldGlobalExtent]) => {
      // update position if extent has actually changed
      if (nodeExtent !== oldNodeExtent || globalExtent !== oldGlobalExtent) {
        clampPosition()
      }
    })

    // clamp initial position to nodes' extent
    // if extent is parent, we need dimensions to properly clamp the position
    if (
      node.extent === 'parent' ||
      (typeof node.extent === 'object' && 'range' in node.extent && node.extent.range === 'parent')
    ) {
      until(() => node.initialized)
        .toBe(true)
        .then(clampPosition)
    }
    // if extent is not parent, we can clamp it immediately
    else {
      clampPosition()
    }

    return () =>
      h(
        'div',
        {
          'ref': nodeElement,
          'data-id': node.id,
          'class': [
            'vue-flow__node',
            `vue-flow__node-${props.type === false ? 'default' : props.name}`,
            {
              [noPanClassName]: props.draggable,
              dragging: dragging?.value,
              selected: node.selected,
              selectable: props.selectable,
            },
            getClass,
          ],
          'style': {
            zIndex: node.computedPosition.z ?? zIndex.value,
            transform: `translate(${node.computedPosition.x}px,${node.computedPosition.y}px)`,
            pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
            visibility: node.initialized ? 'visible' : 'hidden',
            ...getStyle,
          },
          'tabIndex': props.focusable ? 0 : undefined,
          'role': props.focusable ? 'button' : undefined,
          'aria-describedby': disableKeyboardA11y ? undefined : `${ARIA_NODE_DESC_KEY}-${vueFlowId}`,
          'aria-label': node.ariaLabel,
          'onMouseenter': onMouseEnter,
          'onMousemove': onMouseMove,
          'onMouseleave': onMouseLeave,
          'onContextmenu': onContextMenu,
          'onClick': onSelectNode,
          'onDblclick': onDoubleClick,
          'onKeydown': onKeyDown,
        },
        [
          h(props.type === false ? getNodeTypes.default : props.type, {
            id: node.id,
            type: node.type,
            data: node.data,
            events: { ...node.events, ...on },
            selected: !!node.selected,
            resizing: !!node.resizing,
            dragging: dragging?.value,
            connectable: props.connectable,
            position: node.position,
            dimensions: node.dimensions,
            isValidTargetPos: node.isValidTargetPos,
            isValidSourcePos: node.isValidSourcePos,
            parent: node.parentNode,
            zIndex: node.computedPosition.z,
            targetPosition: node.targetPosition,
            sourcePosition: node.sourcePosition,
            label: node.label,
            dragHandle: node.dragHandle,
            onUpdateNodeInternals: updateInternals,
          }),
        ],
      )

    /** this re-calculates the current position, necessary for clamping by a node's extent */
    function clampPosition() {
      const nextPos = node.computedPosition

      if (snapToGrid) {
        nextPos.x = snapGrid[0] * Math.round(nextPos.x / snapGrid[0])
        nextPos.y = snapGrid[1] * Math.round(nextPos.y / snapGrid[1])
      }

      const { computedPosition, position } = calcNextPosition(node, nextPos, emits.error, nodeExtent, parentNode)

      // only overwrite positions if there are changes when clamping
      if (node.computedPosition.x !== computedPosition.x || node.computedPosition.y !== computedPosition.y) {
        node.computedPosition = { ...node.computedPosition, ...computedPosition }
      }

      if (node.position.x !== position.x || node.position.y !== position.y) {
        node.position = position
      }
    }

    function updateInternals() {
      if (nodeElement.value) updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value, forceUpdate: true }])
    }

    function onMouseEnter(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseEnter({ event, node, connectedEdges })
      }
    }

    function onMouseMove(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseMove({ event, node, connectedEdges })
      }
    }

    function onMouseLeave(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseLeave({ event, node, connectedEdges })
      }
    }

    function onContextMenu(event: MouseEvent) {
      return emit.contextMenu({ event, node, connectedEdges })
    }

    function onDoubleClick(event: MouseEvent) {
      return emit.doubleClick({ event, node, connectedEdges })
    }

    function onSelectNode(event: MouseEvent) {
      if (props.selectable && (!selectNodesOnDrag || !props.draggable)) {
        handleNodeClick(
          node,
          multiSelectionActive,
          addSelectedNodes,
          removeSelectedNodes,
          $$(nodesSelectionActive),
          false,
          nodeElement.value!,
        )
      }

      emit.click({ event, node, connectedEdges })
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isInputDOMNode(event)) return

      if (elementSelectionKeys.includes(event.key) && props.selectable) {
        const unselect = event.key === 'Escape'

        if (unselect) {
          nodeElement.value?.blur()
        }

        handleNodeClick(
          node,
          multiSelectionActive,
          addSelectedNodes,
          removeSelectedNodes,
          $$(nodesSelectionActive),
          unselect,
          nodeElement.value!,
        )
      } else if (!disableKeyboardA11y && props.draggable && node.selected && arrowKeyDiffs[event.key]) {
        $$(ariaLiveMessage).value = `Moved selected node ${event.key
          .replace('Arrow', '')
          .toLowerCase()}. New position, x: ${~~node.position.x}, y: ${~~node.position.y}`

        updateNodePositions(
          {
            x: arrowKeyDiffs[event.key].x,
            y: arrowKeyDiffs[event.key].y,
          },
          event.shiftKey,
        )
      }
    }
  },
})

export default NodeWrapper
