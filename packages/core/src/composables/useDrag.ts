import type { InternalNodeBase, NodeDragItem } from '@xyflow/system'
import { XYDrag } from '@xyflow/system'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { shallowRef, toValue, watchEffect } from 'vue'
import type { NodeDragEvent } from '../types'
import { useVueFlow } from '.'

interface UseDragParams {
  onStart: (event: NodeDragEvent) => void
  onDrag: (event: NodeDragEvent) => void
  onStop: (event: NodeDragEvent) => void
  onClick?: (event: PointerEvent) => void
  el: Ref<Element | null>
  disabled?: MaybeRefOrGetter<boolean>
  selectable?: MaybeRefOrGetter<boolean>
  dragHandle?: MaybeRefOrGetter<string | undefined>
  id?: string
}

/**
 * Composable that provides drag behavior for nodes
 *
 * @internal
 * @param params
 */
export function useDrag(params: UseDragParams) {
  const {
    vueFlowRef,
    snapToGrid,
    snapGrid,
    noDragClassName,
    nodeLookup,
    nodeExtent,
    nodeDragThreshold,
    viewport,
    autoPanOnNodeDrag,
    autoPanSpeed,
    nodesDraggable,
    panBy,
    findNode,
    multiSelectionActive,
    selectNodesOnDrag,
    removeSelectedNodes,
    removeSelectedEdges,
    updateNodePositions,
    getNodes,
    getEdges,
  } = useVueFlow()

  const { onStart, onDrag, onStop, onClick, el, disabled, id, selectable, dragHandle } = params

  const dragging = shallowRef(false)

  watchEffect((onCleanup) => {
    const nodeEl = el.value

    if (!nodeEl || toValue(disabled)) {
      return
    }

    let dragFired = false
    let pointerDownPos = { x: 0, y: 0 }

    const dragInstance = XYDrag({
      getStoreItems: () => ({
        nodes: getNodes.value,
        nodeLookup: nodeLookup.value,
        edges: getEdges.value,
        nodeExtent: nodeExtent.value,
        snapGrid: snapGrid.value,
        snapToGrid: snapToGrid.value,
        nodeOrigin: [0, 0],
        multiSelectionActive: multiSelectionActive.value,
        domNode: vueFlowRef.value,
        transform: [viewport.value.x, viewport.value.y, viewport.value.zoom] as [number, number, number],
        autoPanOnNodeDrag: autoPanOnNodeDrag.value,
        nodesDraggable: nodesDraggable.value,
        selectNodesOnDrag: selectNodesOnDrag.value,
        nodeDragThreshold: nodeDragThreshold.value,
        panBy,
        unselectNodesAndEdges: (args?: { nodes?: any[]; edges?: any[] }) => {
          removeSelectedNodes(args?.nodes)
          removeSelectedEdges(args?.edges)
        },
        updateNodePositions: (dragItems: Map<string, NodeDragItem | InternalNodeBase>, isDragging?: boolean) => {
          const items = Array.from(dragItems.values()) as NodeDragItem[]
          updateNodePositions(items, true, isDragging ?? false)
        },
        autoPanSpeed: autoPanSpeed.value,
      }),
      onDragStart: (event, _dragItems, node, nodes) => {
        dragFired = true
        dragging.value = true
        const graphNode = findNode(node.id)
        if (graphNode) {
          onStart({
            event,
            node: graphNode,
            nodes: nodes.map((n) => findNode(n.id)!).filter(Boolean),
          })
        }
      },
      onDrag: (event, _dragItems, node, nodes) => {
        const graphNode = findNode(node.id)
        if (graphNode) {
          onDrag({
            event,
            node: graphNode,
            nodes: nodes.map((n) => findNode(n.id)!).filter(Boolean),
          })
        }
      },
      onDragStop: (event, _dragItems, node, nodes) => {
        dragging.value = false
        const graphNode = findNode(node.id)
        if (graphNode) {
          onStop({
            event,
            node: graphNode,
            nodes: nodes.map((n) => findNode(n.id)!).filter(Boolean),
          })
        }
      },
    })

    dragInstance.update({
      noDragClassName: noDragClassName.value,
      handleSelector: toValue(dragHandle),
      isSelectable: toValue(selectable),
      nodeId: id,
      domNode: nodeEl,
      nodeClickDistance: nodeDragThreshold.value,
    })

    // Handle the "moved slightly but within threshold" click case.
    // XYDrag won't fire drag events for sub-threshold movement, and d3 would normally
    // suppress the native click. We detect this case with pointer listeners.
    const handlePointerDown = (e: PointerEvent) => {
      dragFired = false
      pointerDownPos = { x: e.clientX, y: e.clientY }
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (!dragFired && onClick) {
        const dx = e.clientX - pointerDownPos.x
        const dy = e.clientY - pointerDownPos.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0 && dist <= nodeDragThreshold.value) {
          onClick(e)
        }
      }
    }

    nodeEl.addEventListener('pointerdown', handlePointerDown)
    nodeEl.addEventListener('pointerup', handlePointerUp)

    onCleanup(() => {
      dragInstance.destroy()
      nodeEl.removeEventListener('pointerdown', handlePointerDown)
      nodeEl.removeEventListener('pointerup', handlePointerUp)
    })
  })

  return dragging
}
