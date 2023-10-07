import { computed, defineComponent, h, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { until, useVModel } from '@vueuse/core'
import { isInputDOMNode } from '@xyflow/system'
import type { GraphNode, HandleConnectable, NodeComponent } from '~/types'
import { NodeId, NodeRef } from '~/context'
import { useDrag, useNodeHooks, useUpdateNodePositions, useVueFlow } from '~/composables'
import {
  ARIA_NODE_DESC_KEY,
  arrowKeyDiffs,
  calcNextPosition,
  elementSelectionKeys,
  getConnectedEdges,
  getXYZPos,
  handleNodeClick,
} from '~/utils'

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
      nodeDragThreshold,
    } = useVueFlow()

    const updateNodePositions = useUpdateNodePositions()

    const node = useVModel(props, 'node')

    const parentNode = computed(() => findNode(node.value.parentNode))

    const connectedEdges = computed(() => getConnectedEdges([node.value], edges.value))

    const nodeElement = ref<HTMLDivElement | null>(null)

    provide(NodeRef, nodeElement)

    const { emit, on } = useNodeHooks(node.value, emits)

    const dragging = useDrag({
      id: props.id,
      el: nodeElement,
      disabled: () => !props.draggable,
      selectable: () => props.selectable,
      dragHandle: () => node.value.dragHandle,
      onStart(args) {
        emit.dragStart({ ...args, intersections: getIntersectingNodes(node.value) })
      },
      onDrag(args) {
        emit.drag({ ...args, intersections: getIntersectingNodes(node.value) })
      },
      onStop(args) {
        emit.dragStop({ ...args, intersections: getIntersectingNodes(node.value) })
      },
    })

    const getClass = computed(() => (node.value.class instanceof Function ? node.value.class(node.value) : node.value.class))

    const getStyle = computed(() => {
      const styles = (node.value.style instanceof Function ? node.value.style(node.value) : node.value.style) || {}

      const width = node.value.width instanceof Function ? node.value.width(node.value) : node.value.width
      const height = node.value.height instanceof Function ? node.value.height(node.value) : node.value.height

      if (width) {
        styles.width = typeof width === 'string' ? width : `${width}px`
      }

      if (height) {
        styles.height = typeof height === 'string' ? height : `${height}px`
      }

      return styles
    })

    const zIndex = () => Number(node.value.zIndex ?? getStyle.value.zIndex ?? 0)

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
      [() => node.value.type, () => node.value.sourcePosition, () => node.value.targetPosition],
      () => {
        updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value as HTMLDivElement, forceUpdate: true }])
      },
      { flush: 'pre' },
    )

    /** this watcher only updates XYZPosition (when dragging a parent etc) */
    watch(
      [
        () => node.value.position.x,
        () => node.value.position.y,
        () => parentNode.value?.computedPosition.x,
        () => parentNode.value?.computedPosition.y,
        () => parentNode.value?.computedPosition.z,
        () => zIndex(),
        () => node.value.selected,
        () => node.value.dimensions.height,
        () => node.value.dimensions.width,
        () => parentNode.value?.dimensions.height,
        () => parentNode.value?.dimensions.width,
      ],
      ([newX, newY, parentX, parentY, parentZ, nodeZIndex]) => {
        const xyzPos = {
          x: newX,
          y: newY,
          z: nodeZIndex + (elevateNodesOnSelect.value ? (node.value.selected ? 1000 : 0) : 0),
        }

        if (typeof parentX !== 'undefined' && typeof parentY !== 'undefined') {
          node.value.computedPosition = getXYZPos({ x: parentX, y: parentY, z: parentZ! }, xyzPos)
        } else {
          node.value.computedPosition = xyzPos
        }
      },
      { flush: 'post', immediate: true },
    )

    watch([() => node.value.extent, nodeExtent], ([nodeExtent, globalExtent], [oldNodeExtent, oldGlobalExtent]) => {
      // update position if extent has actually changed
      if (nodeExtent !== oldNodeExtent || globalExtent !== oldGlobalExtent) {
        clampPosition()
      }
    })

    // clamp initial position to nodes' extent
    // if extent is parent, we need dimensions to properly clamp the position
    if (
      node.value.extent === 'parent' ||
      (typeof node.value.extent === 'object' && 'range' in node.value.extent && node.value.extent.range === 'parent')
    ) {
      until(() => node.value.initialized)
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
          'data-id': node.value.id,
          'class': [
            'vue-flow__node',
            `vue-flow__node-${props.type === false ? 'default' : props.name}`,
            {
              [noPanClassName.value]: props.draggable,
              dragging: dragging?.value,
              selected: node.value.selected,
              selectable: props.selectable,
              parent: node.value.isParent,
            },
            getClass.value,
          ],
          'style': {
            zIndex: node.value.computedPosition.z ?? zIndex(),
            transform: `translate(${node.value.computedPosition.x}px,${node.value.computedPosition.y}px)`,
            pointerEvents: props.selectable || props.draggable ? 'all' : 'none',
            visibility: node.value.initialized ? 'visible' : 'hidden',
            ...getStyle.value,
          },
          'tabIndex': props.focusable ? 0 : undefined,
          'role': props.focusable ? 'button' : undefined,
          'aria-describedby': disableKeyboardA11y.value ? undefined : `${ARIA_NODE_DESC_KEY}-${vueFlowId}`,
          'aria-label': node.value.ariaLabel,
          'onMouseenter': onMouseEnter,
          'onMousemove': onMouseMove,
          'onMouseleave': onMouseLeave,
          'onContextmenu': onContextMenu,
          'onClick': onSelectNode,
          'onDblclick': onDoubleClick,
          'onKeydown': onKeyDown,
        },
        [
          h(props.type === false ? getNodeTypes.value.default : props.type, {
            id: node.value.id,
            type: node.value.type,
            data: node.value.data,
            events: { ...node.value.events, ...on },
            selected: !!node.value.selected,
            resizing: !!node.value.resizing,
            dragging: dragging.value,
            connectable: props.connectable,
            position: node.value.position,
            dimensions: node.value.dimensions,
            isValidTargetPos: node.value.isValidTargetPos,
            isValidSourcePos: node.value.isValidSourcePos,
            parent: node.value.parentNode,
            zIndex: node.value.computedPosition.z,
            targetPosition: node.value.targetPosition,
            sourcePosition: node.value.sourcePosition,
            label: node.value.label,
            dragHandle: node.value.dragHandle,
            onUpdateNodeInternals: updateInternals,
          }),
        ],
      )

    /** this re-calculates the current position, necessary for clamping by a node's extent */
    function clampPosition() {
      const nextPos = node.value.computedPosition

      if (snapToGrid.value) {
        nextPos.x = snapGrid.value[0] * Math.round(nextPos.x / snapGrid.value[0])
        nextPos.y = snapGrid.value[1] * Math.round(nextPos.y / snapGrid.value[1])
      }

      const { computedPosition, position } = calcNextPosition(
        node.value,
        nextPos,
        emits.error,
        nodeExtent.value,
        parentNode.value,
      )

      // only overwrite positions if there are changes when clamping
      if (node.value.computedPosition.x !== computedPosition.x || node.value.computedPosition.y !== computedPosition.y) {
        node.value.computedPosition = { ...node.value.computedPosition, ...computedPosition }
      }

      if (node.value.position.x !== position.x || node.value.position.y !== position.y) {
        node.value.position = position
      }
    }

    function updateInternals() {
      if (nodeElement.value) {
        updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value, forceUpdate: true }])
      }
    }

    function onMouseEnter(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseEnter({ event, node: node.value, connectedEdges: connectedEdges.value })
      }
    }

    function onMouseMove(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseMove({ event, node: node.value, connectedEdges: connectedEdges.value })
      }
    }

    function onMouseLeave(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseLeave({ event, node: node.value, connectedEdges: connectedEdges.value })
      }
    }

    function onContextMenu(event: MouseEvent) {
      return emit.contextMenu({ event, node: node.value, connectedEdges: connectedEdges.value })
    }

    function onDoubleClick(event: MouseEvent) {
      return emit.doubleClick({ event, node: node.value, connectedEdges: connectedEdges.value })
    }

    function onSelectNode(event: MouseEvent) {
      if (props.selectable && (!selectNodesOnDrag.value || !props.draggable || nodeDragThreshold.value > 0)) {
        handleNodeClick(
          node.value,
          multiSelectionActive.value,
          addSelectedNodes,
          removeSelectedNodes,
          nodesSelectionActive,
          false,
          nodeElement.value!,
        )
      }

      emit.click({ event, node: node.value, connectedEdges: connectedEdges.value })
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isInputDOMNode(event)) {
        return
      }

      if (elementSelectionKeys.includes(event.key) && props.selectable) {
        const unselect = event.key === 'Escape'

        handleNodeClick(
          node.value,
          multiSelectionActive.value,
          addSelectedNodes,
          removeSelectedNodes,
          nodesSelectionActive,
          unselect,
          nodeElement.value!,
        )
      } else if (!disableKeyboardA11y.value && props.draggable && node.value.selected && arrowKeyDiffs[event.key]) {
        ariaLiveMessage.value = `Moved selected node ${event.key.replace('Arrow', '').toLowerCase()}. New position, x: ${~~node
          .value.position.x}, y: ${~~node.value.position.y}`

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
