import type { D3DragEvent, SubjectPosition } from 'd3-drag'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import useVueFlow from './useVueFlow'
import { handleNodeClick, pointToRendererPoint } from '~/utils'
import type { NodeDragEvent, NodeDragItem, SnapGrid, XYPosition } from '~/types'
import { getDragItems, getEventHandlerParams, hasSelector, updatePosition } from '~/utils/drag'

export type UseDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>

interface UseDragParams {
  onStart: (event: NodeDragEvent['event'], currentNode: NodeDragEvent['node'], nodes: NodeDragEvent['nodes']) => void
  onDrag: (event: NodeDragEvent['event'], currentNode: NodeDragEvent['node'], nodes: NodeDragEvent['nodes']) => void
  onStop: (event: NodeDragEvent['event'], currentNode: NodeDragEvent['node'], nodes: NodeDragEvent['nodes']) => void
  el: Ref<Element>
  disabled?: MaybeRef<boolean>
  id?: string
}

function useDrag(params: UseDragParams) {
  const scope = effectScope()

  const dragging = scope.run(() => {
    const {
      viewport,
      snapToGrid,
      snapGrid: globalSnapGrid,
      noDragClassName,
      nodes,
      nodeExtent,
      getNode,
      multiSelectionActive,
      nodesSelectionActive,
      selectNodesOnDrag,
      removeSelectedElements,
      addSelectedNodes,
      updateNodePositions,
    } = $(useVueFlow())

    const { onStart, onDrag, onStop, el, disabled = false, id } = $(params)

    const dragging = ref(false)
    let dragItems = $ref<NodeDragItem[]>()
    let lastPos = $ref<Partial<XYPosition>>({ x: undefined, y: undefined })
    let dragHandler = $ref<any>()

    const hasSnapGrid = (sg?: SnapGrid) => (sg ?? snapToGrid ? globalSnapGrid : undefined)

    const getMousePosition = (event: UseDragEvent, snapGrid: SnapGrid) => {
      const x = event.sourceEvent.touches ? event.sourceEvent.touches[0].clientX : event.sourceEvent.clientX
      const y = event.sourceEvent.touches ? event.sourceEvent.touches[0].clientY : event.sourceEvent.clientY

      return pointToRendererPoint(
        {
          x,
          y,
        },
        viewport,
        !!snapGrid ?? snapToGrid,
        snapGrid ?? globalSnapGrid,
      )
    }

    watch([() => disabled, () => el], () => {
      if (el) {
        const selection = select(el)
        const node = id ? getNode(id) : undefined

        if (disabled) {
          selection.on('.drag', null)
        } else {
          dragHandler = drag()
            .on('start', (event: UseDragEvent) => {
              if (!selectNodesOnDrag && !multiSelectionActive && id) {
                if (!node?.selected) {
                  removeSelectedElements()
                }
              }

              if (node && !disabled && selectNodesOnDrag) {
                handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedElements, $$(nodesSelectionActive))
              }

              const mousePos = getMousePosition(event, hasSnapGrid(node?.snapGrid) as SnapGrid)
              dragItems = getDragItems(nodes, mousePos, getNode, id)

              if (onStart && dragItems) {
                const [currentNode, nodes] = getEventHandlerParams({
                  id,
                  dragItems,
                  getNode: $$(getNode),
                })
                onStart(event.sourceEvent, currentNode, nodes)
              }
            })
            .on('drag', (event: UseDragEvent) => {
              const snapGrid = hasSnapGrid(node?.snapGrid) as SnapGrid

              const mousePos = getMousePosition(event, snapGrid)

              // skip events without movement
              if ((lastPos.x !== mousePos.x || lastPos.y !== mousePos.y) && dragItems) {
                lastPos = mousePos
                dragItems = dragItems.map((n) =>
                  updatePosition(
                    n,
                    mousePos,
                    !!snapGrid ?? snapToGrid,
                    snapGrid ?? globalSnapGrid,
                    n.parentNode ? getNode(n.parentNode) : undefined,
                    nodeExtent,
                  ),
                )

                updateNodePositions(dragItems, true, true)
                dragging.value = true

                if (onDrag) {
                  const [currentNode, nodes] = getEventHandlerParams({
                    id,
                    dragItems,
                    getNode: $$(getNode),
                  })
                  onDrag(event.sourceEvent, currentNode, nodes)
                }
              }

              event.on('end', (event) => {
                dragging.value = false
                if (onStop && dragItems) {
                  updateNodePositions(dragItems, false, false)

                  const [currentNode, nodes] = getEventHandlerParams({
                    id,
                    dragItems,
                    getNode: $$(getNode),
                  })
                  onStop(event.sourceEvent, currentNode, nodes)
                }
              })
            })
            .filter((event: D3DragEvent<HTMLDivElement, null, SubjectPosition>['sourceEvent']) => {
              const target = event.target as HTMLDivElement
              return (
                !event.button &&
                (!noDragClassName ||
                  (!hasSelector(target, `.${noDragClassName}`, $$(el)) &&
                    (!node?.dragHandle || hasSelector(target, node.dragHandle, $$(el)))))
              )
            })

          selection.call(dragHandler)
        }
      }
    })

    return dragging
  })

  tryOnScopeDispose(() => scope.stop())

  return dragging
}

export default useDrag
