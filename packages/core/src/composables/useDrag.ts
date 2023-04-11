import type { D3DragEvent, DragBehavior, SubjectPosition } from 'd3-drag'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import type { Ref } from 'vue'
import type { MaybeComputedRef } from '@vueuse/core'
import type { NodeDragEvent, NodeDragItem, XYPosition } from '~/types'

export type UseDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>

interface UseDragParams {
  onStart: (args: Omit<NodeDragEvent, 'intersections'>) => void
  onDrag: (event: Omit<NodeDragEvent, 'intersections'>) => void
  onStop: (event: Omit<NodeDragEvent, 'intersections'>) => void
  el: Ref<Element | undefined>
  disabled?: MaybeComputedRef<boolean>
  selectable?: MaybeComputedRef<boolean>
  id?: string
}

function useDrag(params: UseDragParams) {
  const {
    vueFlowRef,
    snapToGrid,
    snapGrid,
    noDragClassName,
    nodes,
    nodeExtent,
    viewport,
    autoPanOnNodeDrag,
    nodesDraggable,
    panBy,
    findNode,
    multiSelectionActive,
    nodesSelectionActive,
    selectNodesOnDrag,
    removeSelectedElements,
    addSelectedNodes,
    updateNodePositions,
    emits,
  } = $(useVueFlow())

  const { onStart, onDrag, onStop, el, disabled, id, selectable } = params

  const dragging = ref(false)

  let dragItems = $ref<NodeDragItem[]>([])

  let dragHandler = $ref<DragBehavior<Element, unknown, unknown>>()

  let containerBounds = $ref<DOMRect | null>(null)

  let lastPos = $ref<Partial<XYPosition>>({ x: undefined, y: undefined })
  let mousePosition = $ref<XYPosition>({ x: 0, y: 0 })
  let dragEvent = $ref<MouseEvent | null>(null)

  let autoPanId = $ref(0)
  let autoPanStarted = $ref(false)
  let previousTransform = $ref<XYPosition>({ x: 0, y: 0 })

  const getPointerPosition = useGetPointerPosition()

  const updateNodes = ({ x, y }: XYPosition) => {
    lastPos = { x, y }

    let hasChange = false

    dragItems = dragItems.map((n) => {
      const nextPosition = { x: x - n.distance.x, y: y - n.distance.y }

      if (snapToGrid) {
        nextPosition.x = snapGrid[0] * Math.round(nextPosition.x / snapGrid[0])
        nextPosition.y = snapGrid[1] * Math.round(nextPosition.y / snapGrid[1])
      }

      const { computedPosition } = calcNextPosition(
        n,
        nextPosition,
        emits.error,
        nodeExtent,
        n.parentNode ? findNode(n.parentNode) : undefined,
      )

      // we want to make sure that we only fire a change event when there is a change
      hasChange = hasChange || n.position.x !== computedPosition.x || n.position.y !== computedPosition.y

      n.position = computedPosition

      return n
    })

    if (!hasChange) {
      return
    }

    updateNodePositions(dragItems, true, true)

    dragging.value = true

    if (dragEvent) {
      const [currentNode, nodes] = getEventHandlerParams({
        id,
        dragItems,
        findNode,
      })

      onDrag({ event: dragEvent, node: currentNode, nodes })
    }
  }

  const autoPan = (): void => {
    if (!containerBounds) {
      return
    }

    const [xMovement, yMovement] = calcAutoPan(mousePosition, containerBounds)

    if (xMovement !== 0 || yMovement !== 0) {
      const nextPos = {
        x: (lastPos.x ?? 0) - xMovement / viewport.zoom,
        y: (lastPos.y ?? 0) - yMovement / viewport.zoom,
      }

      panBy({ x: xMovement, y: yMovement }, (transform) => {
        if (
          Math.round(transform.x) !== Math.round(previousTransform.x) ||
          Math.round(transform.y) !== Math.round(previousTransform.y)
        ) {
          updateNodes(nextPos)
          previousTransform = transform
          lastPos = nextPos
        }
      })
    }

    autoPanId = requestAnimationFrame(autoPan)
  }

  watch([() => resolveUnref(disabled), el], ([isDisabled, nodeEl]) => {
    if (nodeEl) {
      const selection = select(nodeEl)

      if (isDisabled) {
        selection.on('.drag', null)
      } else {
        const node = findNode(id)

        dragHandler = drag()
          .on('start', (event: UseDragEvent) => {
            if (!selectNodesOnDrag && !multiSelectionActive && node) {
              if (!node.selected) {
                // we need to reset selected nodes when selectNodesOnDrag=false
                removeSelectedElements()
              }
            }

            if (node && resolveUnref(selectable) && selectNodesOnDrag) {
              handleNodeClick(
                node,
                multiSelectionActive,
                addSelectedNodes,
                removeSelectedElements,
                $$(nodesSelectionActive),
                false,
                nodeEl as HTMLDivElement,
              )
            }

            const pointerPos = getPointerPosition(event)
            lastPos = pointerPos
            dragItems = getDragItems(nodes, nodesDraggable, pointerPos, findNode, id)

            if (dragItems.length) {
              const [currentNode, nodes] = getEventHandlerParams({
                id,
                dragItems,
                findNode,
              })

              onStart({ event: event.sourceEvent, node: currentNode, nodes })
            }

            containerBounds = vueFlowRef?.getBoundingClientRect() || null
            mousePosition = getEventPosition(event.sourceEvent, containerBounds!)
          })
          .on('drag', (event: UseDragEvent) => {
            const pointerPos = getPointerPosition(event)

            if (!autoPanStarted && autoPanOnNodeDrag) {
              autoPanStarted = true
              autoPan()
            }

            // skip events without movement
            if ((lastPos.x !== pointerPos.xSnapped || lastPos.y !== pointerPos.ySnapped) && dragItems.length) {
              dragEvent = event.sourceEvent as MouseEvent
              mousePosition = getEventPosition(event.sourceEvent, containerBounds!)

              updateNodes(pointerPos)
            }
          })
          .on('end', (event: UseDragEvent) => {
            dragging.value = false
            autoPanStarted = false
            cancelAnimationFrame(autoPanId)

            if (dragItems.length) {
              updateNodePositions(dragItems, false, false)

              const [currentNode, nodes] = getEventHandlerParams({
                id,
                dragItems,
                findNode,
              })

              onStop({ event: event.sourceEvent, node: currentNode, nodes })
            }
          })
          .filter((event: D3DragEvent<HTMLDivElement, null, SubjectPosition>['sourceEvent']) => {
            const target = event.target as HTMLDivElement
            return (
              !event.button &&
              (!noDragClassName ||
                (!hasSelector(target, `.${noDragClassName}`, nodeEl) &&
                  (!node?.dragHandle || hasSelector(target, node.dragHandle, nodeEl))))
            )
          })

        selection.call(dragHandler)
      }
    }
  })

  return dragging
}

export default useDrag
