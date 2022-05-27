import type { D3DragEvent, SubjectPosition } from 'd3-drag'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import useVueFlow from './useVueFlow'
import { handleNodeClick, pointToRendererPoint } from '~/utils'
import type { NodeDragEvent, NodeDragItem, XYPosition } from '~/types'
import { getDragItems, getEventHandlerParams, getParentNodePosition, hasSelector, updatePosition } from '~/utils/drag'

export type UseDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>

interface UseDragParams {
  onStart: (event: NodeDragEvent['event'], currentNode: NodeDragEvent['node'], nodes: NodeDragEvent['nodes']) => void
  onDrag: (event: NodeDragEvent['event'], currentNode: NodeDragEvent['node'], nodes: NodeDragEvent['nodes']) => void
  onStop: (event: NodeDragEvent['event'], currentNode: NodeDragEvent['node'], nodes: NodeDragEvent['nodes']) => void
  el: Ref<Element>
  disabled?: MaybeRef<boolean>
  noDragClassName?: MaybeRef<string>
  handleSelector?: string
  id?: string
}

function useDrag(params: UseDragParams) {
  const {
    viewport,
    snapToGrid,
    snapGrid,
    nodes,
    nodeExtent,
    getNode,
    multiSelectionActive,
    selectNodesOnDrag,
    removeSelectedElements,
    addSelectedNodes,
    setState,
    updateNodePositions,
  } = $(useVueFlow())
  const { onStart, onDrag, onStop, el, disabled = false, noDragClassName, id, handleSelector } = $(params)

  const dragging = ref(false)
  let dragItems = $ref<NodeDragItem[]>()
  let lastPos = $ref<Partial<XYPosition>>({ x: undefined, y: undefined })
  let parentPos = $ref<XYPosition>({ x: 0, y: 0 })
  let dragHandler = $ref<any>()

  const getMousePosition = (event: UseDragEvent) => {
    const mousePos = pointToRendererPoint(
      {
        x: event.sourceEvent.clientX,
        y: event.sourceEvent.clientY,
      },
      viewport,
      snapToGrid,
      snapGrid,
    )

    mousePos.x -= parentPos.x
    mousePos.y -= parentPos.y

    return mousePos
  }

  watch(
    [() => disabled, () => noDragClassName, () => id, () => el],
    () => {
      if (el) {
        const selection = select(el)
        const node = id ? getNode(id) : undefined

        if (disabled) {
          selection.on('.drag', null)
        } else {
          dragHandler = drag()
            .on('start', (event: UseDragEvent) => {
              parentPos = getParentNodePosition(node && node.parentNode ? getNode(node!.parentNode!) : undefined)

              if (!selectNodesOnDrag && !multiSelectionActive && id) {
                if (!node?.selected) {
                  removeSelectedElements()
                }
              }

              if (node && !disabled && selectNodesOnDrag) {
                handleNodeClick(node, multiSelectionActive, addSelectedNodes, removeSelectedElements, setState)
              }

              const mousePos = getMousePosition(event)
              dragItems = getDragItems(nodes, mousePos, getNode, id)

              if (onStart && dragItems) {
                const [currentNode, nodes] = getEventHandlerParams({
                  id,
                  dragItems,
                  node: node!,
                })
                onStart(event.sourceEvent, currentNode, nodes)
              }
            })
            .on('drag', (event: UseDragEvent) => {
              parentPos = getParentNodePosition(node && node.parentNode ? getNode(node!.parentNode!) : undefined)

              if (node && (lastPos.x !== node.position.x || lastPos.y !== node.position.y)) {
                lastPos.x = node.position.x
                lastPos.y = node.position.y
              }

              const mousePos = getMousePosition(event)

              // skip events without movement
              if ((lastPos.x !== mousePos.x || lastPos.y !== mousePos.y) && dragItems) {
                lastPos = mousePos
                dragItems = dragItems.map((n) =>
                  updatePosition(n, mousePos, n.parentNode ? getNode(n.parentNode) : undefined, nodeExtent),
                )

                updateNodePositions(dragItems)
                dragging.value = true

                if (onDrag) {
                  const [currentNode, nodes] = getEventHandlerParams({
                    id,
                    dragItems,
                    node: node!,
                  })
                  onDrag(event.sourceEvent, currentNode, nodes)
                }
              }

              event.on('end', (event) => {
                if (onStop && dragItems) {
                  const [currentNode, nodes] = getEventHandlerParams({
                    id,
                    dragItems,
                    node: node!,
                  })
                  onStop(event.sourceEvent, currentNode, nodes)
                }
              })
            })
            .on('end', (_: UseDragEvent) => {
              // if (node) lastPos = node.position
            })
            .filter((event: D3DragEvent<HTMLDivElement, null, SubjectPosition>['sourceEvent']) => {
              const filter =
                !event.ctrlKey && !event.button && (!noDragClassName || !event.target.className.includes(noDragClassName))

              if (handleSelector) {
                return !hasSelector(event.sourceEvent.target, handleSelector, $$(el)) && filter
              }

              return filter
            })

          selection.call(dragHandler)
        }
      }
    },
    { flush: 'post' },
  )

  return dragging
}

export default useDrag
