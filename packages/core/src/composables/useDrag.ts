import type { D3DragEvent, DragBehavior, SubjectPosition } from 'd3-drag'
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
  el: Ref<Element | undefined>
  disabled?: MaybeRef<boolean>
  id?: string
}

function useDrag(params: UseDragParams) {
  const scope = effectScope()

  tryOnScopeDispose(() => scope.stop())

  return scope.run(() => {
    const {
      vueFlowRef,
      snapToGrid,
      snapGrid,
      noDragClassName,
      nodes,
      nodeExtent,
      viewport,
      autoPanOnNodeDrag,
      panBy,
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

    let dragItems = $ref<NodeDragItem[]>([])

    let dragHandler = $ref<DragBehavior<Element, unknown, unknown>>()

    let containerBounds = $ref<DOMRect | null>(null)

    let lastPos = $ref<Partial<XYPosition>>({ x: undefined, y: undefined })
    let mousePosition = $ref<XYPosition>({ x: 0, y: 0 })
    let dragEvent = $ref<MouseEvent | null>(null)

    let autoPanId = $ref(0)
    let autoPanStarted = $ref(false)

    const node = $computed(() => (id ? findNode(id) : undefined))

    const getPointerPosition = useGetPointerPosition()

    watch([() => disabled, () => el], () => {
      if (el) {
        const selection = select(el)

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
              nodeExtent,
              n.parentNode ? findNode(n.parentNode) : undefined,
            )

            // we want to make sure that we only fire a change event when there is a changes
            hasChange = hasChange || n.position.x !== computedPosition.x || n.position.y !== computedPosition.y

            n.position = computedPosition

            return n
          })

          if (!hasChange) return

          updateNodePositions(dragItems, true, true)

          dragging.value = true

          if (dragEvent) {
            const [currentNode, nodes] = getEventHandlerParams({
              id,
              dragItems,
              findNode,
            })

            onDrag(dragEvent, currentNode, nodes)
          }
        }

        const autoPan = (): void => {
          if (!containerBounds) return

          const [xMovement, yMovement] = calcAutoPan(mousePosition, containerBounds)

          if (xMovement !== 0 || yMovement !== 0) {
            lastPos.x = (lastPos.x ?? 0) - xMovement / viewport.zoom
            lastPos.y = (lastPos.y ?? 0) - yMovement / viewport.zoom

            updateNodes(lastPos as XYPosition)

            panBy({ x: xMovement, y: yMovement })
          }

          autoPanId = requestAnimationFrame(autoPan)
        }

        if (disabled) {
          selection.on('.drag', null)
        } else {
          dragHandler = drag()
            .on('start', (event: UseDragEvent) => {
              if (!selectNodesOnDrag && !multiSelectionActive && id) {
                if (!node?.selected) {
                  // we need to reset selected nodes when selectNodesOnDrag=false
                  removeSelectedElements()
                }
              }

              if (node && selectNodesOnDrag) {
                handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedElements, $$(nodesSelectionActive))
              }

              const pointerPos = getPointerPosition(event)
              lastPos = pointerPos
              dragItems = getDragItems(nodes, pointerPos, findNode, id)

              if (dragItems.length) {
                const [currentNode, nodes] = getEventHandlerParams({
                  id,
                  dragItems,
                  findNode,
                })

                onStart(event.sourceEvent, currentNode, nodes)
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

                onStop(event.sourceEvent as MouseEvent, currentNode, nodes)
              }
            })
            .filter((event: D3DragEvent<HTMLDivElement, null, SubjectPosition>['sourceEvent']) => {
              const target = event.target as HTMLDivElement
              return (
                !event.button &&
                (!noDragClassName ||
                  (!hasSelector(target, `.${noDragClassName}`, el) &&
                    (!node?.dragHandle || hasSelector(target, node.dragHandle, el))))
              )
            })

          selection.call(dragHandler)
        }
      }
    })

    return dragging
  })
}

export default useDrag
