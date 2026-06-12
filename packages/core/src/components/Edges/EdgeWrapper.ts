import { computed, defineComponent, getCurrentInstance, h, inject, provide, resolveComponent, shallowRef, toRef } from 'vue'
import { getHandlePosition, getMarkerId } from '@xyflow/system'
import type { Connection, Edge, EdgeComponent, HandleType, MouseTouchEvent } from '../../types'
import { ConnectionMode, Position } from '../../types'
import { useEdgeHooks, useHandle, useVueFlow } from '../../composables'
import { EdgeId, EdgeRef, Slots } from '../../context'
import { ARIA_EDGE_DESC_KEY, ErrorCode, VueFlowError, elementSelectionKeys, getEdgeHandle, getEdgeZIndex } from '../../utils'
import EdgeAnchor from './EdgeAnchor'

interface Props {
  id: string
}

const EdgeWrapper = defineComponent({
  name: 'Edge',
  compatConfig: { MODE: 3 },
  props: ['id'],
  setup(props: Props) {
    const {
      id: vueFlowId,
      addSelectedEdges,
      connectionMode,
      reconnectRadius,
      emits,
      nodesSelectionActive,
      noPanClassName,
      getEdgeTypes,
      removeSelectedEdges,
      getEdge,
      getInternalNode,
      isValidConnection,
      multiSelectionActive,
      disableKeyboardA11y,
      elementsSelectable,
      edgesReconnectable,
      edgesFocusable,
      elevateEdgesOnSelect,
      defaultEdgeOptions,
      hooks,
    } = useVueFlow()

    const storedEdge = computed(() => getEdge(props.id) as Edge)

    const edge = computed<Edge>(() => {
      const defaults = defaultEdgeOptions.value
      return defaults ? ({ ...(defaults as Edge), ...storedEdge.value } as Edge) : storedEdge.value
    })

    // resolved per edge (value-gated computed) so the z-tracking of BOTH endpoint lookup keys lives in
    // this component's scope — resolving it in EdgeRenderer's v-for made the whole renderer re-render
    // (all edge vnodes) whenever ANY node entry was replaced, i.e. every drag frame
    const zIndex = computed(() => getEdgeZIndex(edge.value, getInternalNode, elevateEdgesOnSelect.value))

    const { emit } = useEdgeHooks(emits)

    const slots = inject(Slots)

    const instance = getCurrentInstance()

    const mouseOver = shallowRef(false)

    const updating = shallowRef(false)

    const nodeId = shallowRef('')

    const handleId = shallowRef<string | null>(null)

    const reconnectHandleType = shallowRef<HandleType>('source')

    const edgeEl = shallowRef<SVGElement | null>(null)

    const isSelectable = toRef(() =>
      typeof edge.value.selectable === 'undefined' ? elementsSelectable.value : edge.value.selectable,
    )

    const isReconnectable = toRef(() => (typeof edge.value.reconnectable === 'undefined' ? edgesReconnectable.value : edge.value.reconnectable))

    const isFocusable = toRef(() => (typeof edge.value.focusable === 'undefined' ? edgesFocusable.value : edge.value.focusable))

    provide(EdgeId, props.id)
    provide(EdgeRef, edgeEl)

    // the class/style callbacks receive the RAW stored edge (like every event payload + selection action),
    // not the internal `{ ...defaultEdgeOptions, ...edge }` render view — only the resolved fn is read off
    // the merged view so a defaults-provided callback still applies
    const edgeClass = computed(() =>
      edge.value.class instanceof Function ? edge.value.class(storedEdge.value) : edge.value.class,
    )
    const edgeStyle = computed(() =>
      edge.value.style instanceof Function ? edge.value.style(storedEdge.value) : edge.value.style,
    )

    const edgeCmp = computed(() => {
      const name = edge.value.type || 'default'

      const slot = slots?.[`edge-${name}`]
      if (slot) {
        return slot
      }

      let edgeType = edge.value.template ?? getEdgeTypes.value[name]

      if (typeof edgeType === 'string') {
        if (instance) {
          const components = Object.keys(instance.appContext.components)
          if (components && components.includes(name)) {
            edgeType = resolveComponent(name, false) as EdgeComponent
          }
        }
      }

      if (edgeType && typeof edgeType !== 'string') {
        return edgeType
      }

      emits.error(new VueFlowError(ErrorCode.EDGE_TYPE_MISSING, edgeType))

      return false
    })

    const { handlePointerDown } = useHandle({
      nodeId,
      handleId,
      type: reconnectHandleType,
      isValidConnection,
      reconnectHandleType,
      onReconnect,
      onReconnectEnd,
    })

    return () => {
      const sourceNode = getInternalNode(edge.value.source)
      const targetNode = getInternalNode(edge.value.target)
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
        sourceNodeHandles = sourceNode.internals.handleBounds?.source ?? null
      } else {
        sourceNodeHandles = [
          ...(sourceNode.internals.handleBounds?.source || []),
          ...(sourceNode.internals.handleBounds?.target || []),
        ]
      }

      const sourceHandle = getEdgeHandle(sourceNodeHandles, edge.value.sourceHandle)

      let targetNodeHandles
      if (connectionMode.value === ConnectionMode.Strict) {
        targetNodeHandles = targetNode.internals.handleBounds?.target ?? null
      } else {
        targetNodeHandles = [
          ...(targetNode.internals.handleBounds?.target || []),
          ...(targetNode.internals.handleBounds?.source || []),
        ]
      }

      const targetHandle = getEdgeHandle(targetNodeHandles, edge.value.targetHandle)

      const sourcePosition = sourceHandle?.position || Position.Bottom

      const targetPosition = targetHandle?.position || Position.Top

      // positions are render-local (xyflow parity: `EdgePosition` is a render-output type, never stored
      // on the edge) — they flow to the edge component as props only
      const { x: sourceX, y: sourceY } = getHandlePosition(sourceNode, sourceHandle, sourcePosition)
      const { x: targetX, y: targetY } = getHandlePosition(targetNode, targetHandle, targetPosition)

      // the full-container svg wrapper (one stacking context per edge zIndex) is rendered here rather
      // than in EdgeRenderer's v-for so its node-lookup tracking stays scoped to this edge
      return h(
        'svg',
        { class: 'vue-flow__edges vue-flow__container', style: { zIndex: zIndex.value } },
        h(
          'g',
          {
            'ref': edgeEl,
            'key': props.id,
            'data-id': props.id,
            'class': [
              'vue-flow__edge',
              `vue-flow__edge-${edgeCmp.value === false ? 'default' : edge.value.type || 'default'}`,
              noPanClassName.value,
              edgeClass.value,
              {
                updating: mouseOver.value,
                selected: edge.value.selected,
                animated: edge.value.animated,
                inactive: !isSelectable.value && !hooks.value.edgeClick.hasListeners(),
              },
            ],
            'tabIndex': isFocusable.value ? 0 : undefined,
            'aria-label':
              edge.value.ariaLabel === null
                ? undefined
                : edge.value.ariaLabel ?? `Edge from ${edge.value.source} to ${edge.value.target}`,
            'aria-describedby': isFocusable.value ? `${ARIA_EDGE_DESC_KEY}-${vueFlowId}` : undefined,
            'aria-roledescription': 'edge',
            'role': isFocusable.value ? 'group' : 'img',
            ...edge.value.domAttributes,
            'onClick': onEdgeClick,
            'onContextmenu': onEdgeContextMenu,
            'onDblclick': onDoubleClick,
            'onMouseenter': onEdgeMouseEnter,
            'onMousemove': onEdgeMouseMove,
            'onMouseleave': onEdgeMouseLeave,
            'onKeyDown': isFocusable.value ? onKeyDown : undefined,
          },
          [
            updating.value
              ? null
              : h(edgeCmp.value === false ? getEdgeTypes.value.default : (edgeCmp.value as any), {
                  // xyflow/react EdgeProps parity: no sourceNode/targetNode (resolve via `useInternalNode`
                  // in custom edges); handles exposed as sourceHandleId/targetHandleId
                  id: props.id,
                  source: edge.value.source,
                  target: edge.value.target,
                  type: edge.value.type,
                  reconnectable: isReconnectable.value,
                  selectable: isSelectable.value,
                  deletable: edge.value.deletable,
                  selected: edge.value.selected,
                  animated: edge.value.animated,
                  label: edge.value.label,
                  labelStyle: edge.value.labelStyle,
                  labelShowBg: edge.value.labelShowBg,
                  labelBgStyle: edge.value.labelBgStyle,
                  labelBgPadding: edge.value.labelBgPadding,
                  labelBgBorderRadius: edge.value.labelBgBorderRadius,
                  data: edge.value.data,
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
              isReconnectable.value === 'source' || isReconnectable.value === true
                ? [
                    h(
                      'g',
                      {
                        onMousedown: onReconnectSourceMouseDown,
                        onMouseenter: onReconnectMouseEnter,
                        onMouseout: onReconnectMouseOut,
                      },
                      h(EdgeAnchor, {
                        'position': sourcePosition,
                        'centerX': sourceX,
                        'centerY': sourceY,
                        'radius': reconnectRadius.value,
                        'type': 'source',
                        'data-type': 'source',
                      }),
                    ),
                  ]
                : null,
              isReconnectable.value === 'target' || isReconnectable.value === true
                ? [
                    h(
                      'g',
                      {
                        onMousedown: onReconnectTargetMouseDown,
                        onMouseenter: onReconnectMouseEnter,
                        onMouseout: onReconnectMouseOut,
                      },
                      h(EdgeAnchor, {
                        'position': targetPosition,
                        'centerX': targetX,
                        'centerY': targetY,
                        'radius': reconnectRadius.value,
                        'type': 'target',
                        'data-type': 'target',
                      }),
                    ),
                  ]
                : null,
            ],
          ],
        ),
      )
    }

    function onReconnectMouseEnter() {
      mouseOver.value = true
    }

    function onReconnectMouseOut() {
      mouseOver.value = false
    }

    function onReconnect(event: MouseTouchEvent, connection: Connection) {
      emit.reconnect({ event, edge: storedEdge.value, connection })
    }

    function onReconnectEnd(event: MouseTouchEvent) {
      emit.reconnectEnd({ event, edge: storedEdge.value })
      updating.value = false
    }

    function handleReconnect(event: MouseEvent, isSourceHandle: boolean) {
      if (event.button !== 0) {
        return
      }

      updating.value = true

      nodeId.value = isSourceHandle ? edge.value.target : edge.value.source
      handleId.value = (isSourceHandle ? edge.value.targetHandle : edge.value.sourceHandle) ?? null

      reconnectHandleType.value = isSourceHandle ? 'target' : 'source'

      emit.reconnectStart({ event, edge: storedEdge.value })

      handlePointerDown(event)
    }

    function onEdgeClick(event: MouseEvent) {
      const data = { event, edge: storedEdge.value }

      if (isSelectable.value) {
        nodesSelectionActive.value = false

        if (edge.value.selected && multiSelectionActive.value) {
          removeSelectedEdges([storedEdge.value])

          edgeEl.value?.blur()
        } else {
          addSelectedEdges([storedEdge.value])
        }
      }

      emit.click(data)
    }

    function onEdgeContextMenu(event: MouseEvent) {
      emit.contextMenu({ event, edge: storedEdge.value })
    }

    function onDoubleClick(event: MouseEvent) {
      emit.doubleClick({ event, edge: storedEdge.value })
    }

    function onEdgeMouseEnter(event: MouseEvent) {
      emit.mouseEnter({ event, edge: storedEdge.value })
    }

    function onEdgeMouseMove(event: MouseEvent) {
      emit.mouseMove({ event, edge: storedEdge.value })
    }

    function onEdgeMouseLeave(event: MouseEvent) {
      emit.mouseLeave({ event, edge: storedEdge.value })
    }

    function onReconnectSourceMouseDown(event: MouseEvent) {
      handleReconnect(event, true)
    }

    function onReconnectTargetMouseDown(event: MouseEvent) {
      handleReconnect(event, false)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!disableKeyboardA11y.value && elementSelectionKeys.includes(event.key) && isSelectable.value) {
        const unselect = event.key === 'Escape'

        if (unselect) {
          edgeEl.value?.blur()

          removeSelectedEdges([storedEdge.value])
        } else {
          addSelectedEdges([storedEdge.value])
        }
      }
    }
  },
})

export default EdgeWrapper
