import type { D3DragEvent, SubjectPosition } from 'd3-drag'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import type { NodeDragEvent, NodeDragItem, XYPosition } from '~/types'

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
      snapToGrid,
      snapGrid,
      noDragClassName,
      nodes,
      nodeExtent,
      findNode,
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

    const node = $computed(() => (id ? findNode(id) : undefined))

    const getPointerPosition = useGetPointerPosition()

    watch([() => disabled, () => el], () => {
      if (el) {
        const selection = select(el)

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

              const mousePos = getPointerPosition(event, snapToGrid ? snapGrid : undefined)
              dragItems = getDragItems(nodes, mousePos, findNode, id)

              if (onStart && dragItems) {
                const [currentNode, nodes] = getEventHandlerParams({
                  id,
                  dragItems,
                  findNode,
                })
                onStart(event.sourceEvent, currentNode, nodes)
              }
            })
            .on('drag', (event: UseDragEvent) => {
              const mousePos = getPointerPosition(event, snapToGrid ? snapGrid : undefined)

              let hasChange = false

              // skip events without movement
              if ((lastPos.x !== mousePos.x || lastPos.y !== mousePos.y) && dragItems) {
                lastPos = mousePos

                dragItems = dragItems.map((n) => {
                  const nextPosition = { x: mousePos.x - n.distance.x, y: mousePos.y - n.distance.y }

                  if (snapToGrid && snapGrid) {
                    const [snapX, snapY] = snapGrid
                    nextPosition.x = snapX * Math.round(nextPosition.x / snapX)
                    nextPosition.y = snapY * Math.round(nextPosition.y / snapY)
                  }

                  const { computedPosition } = calcNextPosition(
                    n,
                    nextPosition,
                    nodeExtent,
                    n.parentNode ? findNode(n.parentNode) : undefined,
                  )

                  // we want to make sure that we only fire a change event when there is a changes
                  hasChange = hasChange || n.position.x !== nextPosition.x || n.position.y !== nextPosition.y

                  n.position = computedPosition

                  return n
                })

                if (!hasChange) return

                updateNodePositions(dragItems, true, true)

                if (onDrag) {
                  const [currentNode, nodes] = getEventHandlerParams({
                    id,
                    dragItems,
                    findNode,
                  })

                  dragging.value = true

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
                    findNode,
                  })

                  dragging.value = false

                  onStop(event.sourceEvent, currentNode, nodes)
                }
              })
            })
            .on('end', () => {
              dragging.value = false
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
