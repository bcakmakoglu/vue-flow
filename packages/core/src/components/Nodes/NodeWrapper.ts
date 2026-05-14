import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onMounted,
  provide,
  ref,
  resolveComponent,
  toRef,
  watch,
} from 'vue'
import { until } from '@vueuse/core'
import { snapPosition } from '@xyflow/system'
import {
  ARIA_NODE_DESC_KEY,
  ErrorCode,
  VueFlowError,
  arrowKeyDiffs,
  calcNextPosition,
  elementSelectionKeys,
  getXYZPos,
  handleNodeClick,
} from '../../utils'
import { NodeId, NodeRef, Slots } from '../../context'
import { isInputDOMNode, useDrag, useNode, useNodeHooks, useUpdateNodePositions, useVueFlow } from '../../composables'
import type { BuiltInNode, MouseTouchEvent, NodeComponent, XYZPosition } from '../../types'

interface Props {
  id: string
  resizeObserver: ResizeObserver
}

const NodeWrapper = defineComponent({
  name: 'Node',
  compatConfig: { MODE: 3 },
  props: ['id', 'resizeObserver'],
  setup(props: Props) {
    const {
      id: vueFlowId,
      noPanClassName,
      selectNodesOnDrag,
      nodesSelectionActive,
      multiSelectionActive,
      emits,
      removeSelectedNodes,
      addSelectedNodes,
      updateNodeDimensions,
      onUpdateNodeInternals,
      getNodeTypes,
      nodeExtent,
      elevateNodesOnSelect,
      disableKeyboardA11y,
      ariaLiveMessage,
      snapToGrid,
      snapGrid,
      nodeDragThreshold,
      nodesDraggable,
      elementsSelectable,
      nodesConnectable,
      nodesFocusable,
      hooks,
      parentLookup,
    } = useVueFlow()

    const nodeElement = ref<HTMLDivElement | null>(null)
    provide(NodeRef, nodeElement)
    provide(NodeId, props.id)

    const slots = inject(Slots)

    const instance = getCurrentInstance()

    const updateNodePositions = useUpdateNodePositions()

    const { node, parentNode } = useNode(props.id)

    const { emit } = useNodeHooks(emits)

    const isDraggable = toRef(() => (typeof node.draggable === 'undefined' ? nodesDraggable.value : node.draggable))

    const isSelectable = toRef(() => (typeof node.selectable === 'undefined' ? elementsSelectable.value : node.selectable))

    const isConnectable = toRef(() => (typeof node.connectable === 'undefined' ? nodesConnectable.value : node.connectable))

    const isFocusable = toRef(() => (typeof node.focusable === 'undefined' ? nodesFocusable.value : node.focusable))

    const hasPointerEvents = computed(
      () =>
        isSelectable.value ||
        isDraggable.value ||
        hooks.value.nodeClick.hasListeners() ||
        hooks.value.nodeDoubleClick.hasListeners() ||
        hooks.value.nodeMouseEnter.hasListeners() ||
        hooks.value.nodeMouseMove.hasListeners() ||
        hooks.value.nodeMouseLeave.hasListeners(),
    )

    const isInit = toRef(() => !!node.measured.width && !!node.measured.height)

    const isParent = toRef(() => (parentLookup.value.get(node.id)?.size ?? 0) > 0)

    const nodeCmp = computed(() => {
      const name = node.type || 'default'

      const slot = slots?.[`node-${name}`]
      if (slot) {
        return slot
      }

      let nodeType = getNodeTypes.value[name]

      if (typeof nodeType === 'string') {
        if (instance) {
          const components = Object.keys(instance.appContext.components)
          if (components && components.includes(name)) {
            nodeType = resolveComponent(name, false) as NodeComponent
          }
        }
      }

      if (nodeType && typeof nodeType !== 'string') {
        return nodeType
      }

      emits.error(new VueFlowError(ErrorCode.NODE_TYPE_MISSING, nodeType))

      return false
    })

    const dragging = useDrag({
      id: props.id,
      el: nodeElement,
      disabled: () => !isDraggable.value,
      selectable: isSelectable,
      dragHandle: () => node.dragHandle,
      onStart(event) {
        emit.dragStart(event)
      },
      onDrag(event) {
        emit.drag(event)
      },
      onStop(event) {
        emit.dragStop(event)
      },
      onClick(event) {
        onSelectNode(event)
      },
    })

    const getClass = computed(() => (node.class instanceof Function ? node.class(node) : node.class))

    const getStyle = computed(() => {
      const styles = (node.style instanceof Function ? node.style(node) : node.style) || {}

      const width = node.width
      const height = node.height

      if (!styles.width && width) {
        styles.width = `${width}px`
      }

      if (!styles.height && height) {
        styles.height = `${height}px`
      }

      return styles
    })

    const zIndex = toRef(() => Number(node.zIndex ?? getStyle.value.zIndex ?? 0))

    onUpdateNodeInternals((updateIds) => {
      // when no ids are passed, update all nodes
      if (updateIds.includes(props.id) || !updateIds.length) {
        updateInternals()
      }
    })

    onMounted(() => {
      watch(
        () => node.hidden,
        (isHidden = false, _, onCleanup) => {
          if (!isHidden && nodeElement.value) {
            props.resizeObserver.observe(nodeElement.value)

            onCleanup(() => {
              if (nodeElement.value) {
                props.resizeObserver.unobserve(nodeElement.value)
              }
            })
          }
        },
        { immediate: true, flush: 'post' },
      )
    })

    watch([() => node.type, () => node.sourcePosition, () => node.targetPosition], () => {
      nextTick(() => {
        updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value as HTMLDivElement, forceUpdate: true }])
      })
    })

    /** this watcher only updates XYZPosition (when dragging a parent etc) */
    watch(
      [
        () => node.position.x,
        () => node.position.y,
        () => parentNode.value?.internals.positionAbsolute.x,
        () => parentNode.value?.internals.positionAbsolute.y,
        () => parentNode.value?.internals.z,
        zIndex,
        () => node.selected,
        () => node.measured.height,
        () => node.measured.width,
        () => parentNode.value?.measured.height,
        () => parentNode.value?.measured.width,
      ],
      ([newX, newY, parentX, parentY, parentZ, nodeZIndex]) => {
        const xyzPos = {
          x: newX,
          y: newY,
          z: nodeZIndex + (elevateNodesOnSelect.value ? (node.selected ? 1000 : 0) : 0),
        }

        const nextComputed: XYZPosition =
          typeof parentX !== 'undefined' && typeof parentY !== 'undefined'
            ? getXYZPos({ x: parentX, y: parentY, z: parentZ! }, xyzPos)
            : xyzPos
        node.internals.positionAbsolute = { x: nextComputed.x, y: nextComputed.y }
        node.internals.z = nextComputed.z
      },
      { flush: 'post', immediate: true },
    )

    watch([() => node.extent, nodeExtent], ([nodeExtent, globalExtent], [oldNodeExtent, oldGlobalExtent]) => {
      // update position if extent has actually changed
      if (nodeExtent !== oldNodeExtent || globalExtent !== oldGlobalExtent) {
        clampPosition()
      }
    })

    // clamp initial position to nodes' extent
    // if extent is parent, we need dimensions to properly clamp the position
    if (
      node.extent === 'parent' ||
      (!!node.extent && typeof node.extent === 'object' && 'range' in node.extent && node.extent.range === 'parent')
    ) {
      until(() => isInit)
        .toBe(true)
        .then(clampPosition)
    }
    // if extent is not parent, we can clamp it immediately
    else {
      clampPosition()
    }

    return () => {
      if (node.hidden) {
        return null
      }

      return h(
        'div',
        {
          'ref': nodeElement,
          'data-id': node.id,
          'class': [
            'vue-flow__node',
            `vue-flow__node-${nodeCmp.value === false ? 'default' : node.type || 'default'}`,
            {
              [noPanClassName.value]: isDraggable.value,
              dragging: dragging?.value,
              draggable: isDraggable.value,
              selected: node.selected,
              selectable: isSelectable.value,
              parent: isParent.value,
            },
            getClass.value,
          ],
          'style': {
            visibility: isInit.value ? 'visible' : 'hidden',
            zIndex: node.internals.z ?? zIndex.value,
            transform: `translate(${node.internals.positionAbsolute.x}px,${node.internals.positionAbsolute.y}px)`,
            pointerEvents: hasPointerEvents.value ? 'all' : 'none',
            ...getStyle.value,
          },
          'tabIndex': isFocusable.value ? 0 : undefined,
          'role': isFocusable.value ? 'group' : undefined,
          'aria-describedby': disableKeyboardA11y.value ? undefined : `${ARIA_NODE_DESC_KEY}-${vueFlowId}`,
          'aria-label': node.ariaLabel,
          'aria-roledescription': 'node',
          ...node.domAttributes,
          'onMouseenter': onMouseEnter,
          'onMousemove': onMouseMove,
          'onMouseleave': onMouseLeave,
          'onContextmenu': onContextMenu,
          'onClick': onSelectNode,
          'onDblclick': onDoubleClick,
          'onKeydown': onKeyDown,
        },
        [
          h(nodeCmp.value === false ? (getNodeTypes.value.default as NodeComponent<BuiltInNode>) : (nodeCmp.value as any), {
            id: node.id,
            type: node.type,
            data: node.data,
            selected: !!node.selected,
            resizing: !!node.resizing,
            dragging: dragging.value,
            isConnectable: isConnectable.value,
            connectable: isConnectable.value,
            position: { ...node.internals.positionAbsolute, z: node.internals.z },
            positionAbsoluteX: node.internals.positionAbsolute.x,
            positionAbsoluteY: node.internals.positionAbsolute.y,
            width: node.measured.width,
            height: node.measured.height,
            dimensions: node.measured,
            parent: node.parentId,
            parentNodeId: node.parentId,
            parentId: node.parentId,
            zIndex: node.internals.z ?? zIndex.value,
            selectable: node.selectable ?? true,
            deletable: node.deletable ?? true,
            draggable: node.draggable ?? true,
            targetPosition: node.targetPosition,
            sourcePosition: node.sourcePosition,
            dragHandle: node.dragHandle,
            onUpdateNodeInternals: updateInternals,
          }),
        ],
      )
    }
    /** this re-calculates the current position, necessary for clamping by a node's extent */
    function clampPosition() {
      const nextPosition = { ...node.internals.positionAbsolute, z: node.internals.z }

      const { computedPosition, position } = calcNextPosition(
        node,
        snapToGrid.value ? snapPosition(nextPosition, snapGrid.value) : nextPosition,
        emits.error,
        nodeExtent.value,
        parentNode.value,
      )

      // only overwrite positions if there are changes when clamping
      if (node.internals.positionAbsolute.x !== computedPosition.x || node.internals.positionAbsolute.y !== computedPosition.y) {
        node.internals.positionAbsolute = { x: computedPosition.x, y: computedPosition.y }
      }

      if (node.position.x !== position.x || node.position.y !== position.y) {
        node.position = position
      }
    }

    function updateInternals() {
      if (nodeElement.value) {
        updateNodeDimensions([{ id: props.id, nodeElement: nodeElement.value, forceUpdate: true }])
      }
    }

    function onMouseEnter(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseEnter({ event, node })
      }
    }

    function onMouseMove(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseMove({ event, node })
      }
    }

    function onMouseLeave(event: MouseEvent) {
      if (!dragging?.value) {
        emit.mouseLeave({ event, node })
      }
    }

    function onContextMenu(event: MouseEvent) {
      return emit.contextMenu({ event, node })
    }

    function onDoubleClick(event: MouseEvent) {
      return emit.doubleClick({ event, node })
    }

    function onSelectNode(event: MouseTouchEvent) {
      if (isSelectable.value && (!selectNodesOnDrag.value || !isDraggable.value || nodeDragThreshold.value > 0)) {
        handleNodeClick(
          node,
          multiSelectionActive.value,
          addSelectedNodes,
          removeSelectedNodes,
          nodesSelectionActive,
          false,
          nodeElement.value!,
        )
      }

      emit.click({ event, node })
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isInputDOMNode(event) || disableKeyboardA11y.value) {
        return
      }

      if (elementSelectionKeys.includes(event.key) && isSelectable.value) {
        const unselect = event.key === 'Escape'

        handleNodeClick(
          node,
          multiSelectionActive.value,
          addSelectedNodes,
          removeSelectedNodes,
          nodesSelectionActive,
          unselect,
          nodeElement.value!,
        )
      } else if (isDraggable.value && node.selected && arrowKeyDiffs[event.key]) {
        // prevent page scrolling
        event.preventDefault()

        ariaLiveMessage.value = `Moved selected node ${event.key.replace('Arrow', '').toLowerCase()}. New position, x: ${~~node
          .position.x}, y: ${~~node.position.y}`

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
