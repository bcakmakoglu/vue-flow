import { D3DragEvent, drag, SubjectPosition } from 'd3-drag'
import { select } from 'd3-selection'
import { Ref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import useVueFlow from './useVueFlow'
import { pointToRendererPoint } from '~/utils'
import { GraphNode, XYPosition } from '~/types'

export type UseDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>
export type UseDragData = { dx: number; dy: number }

type UseDragParams = {
  onStart: (event: UseDragEvent) => void
  onDrag: (event: UseDragEvent, data: UseDragData) => void
  onStop: (event: UseDragEvent) => void
  el: Ref<Element>
  disabled?: MaybeRef<boolean>
  noDragClassName?: MaybeRef<string>
  handleSelector?: string
  id?: string
}

function getOffset(event: UseDragEvent, el: Element): XYPosition {
  const bounds = el.getBoundingClientRect() || { x: 0, y: 0 }

  const parent = (el as HTMLDivElement).offsetParent

  const parentBounds = parent?.getBoundingClientRect() || { x: 0, y: 0 }

  return {
    x: event.x - (bounds.x - parentBounds.x - (parent?.scrollLeft || 0)),
    y: event.y - (bounds.y - parentBounds.y - (parent?.scrollTop || 0)),
  }
}

function getParentNodePosition(parent?: GraphNode): XYPosition {
  return {
    x: parent?.computedPosition?.x || 0,
    y: parent?.computedPosition?.y || 0,
  }
}

function hasSelector(target: Element, selector: string, node: Ref<Element>): boolean {
  let current = target

  do {
    if (current && current.matches(selector)) return true
    else if (current === node.value) return false

    current = current.parentElement as Element
  } while (current)

  return false
}

function useDrag(params: UseDragParams) {
  const { viewport, snapToGrid, snapGrid, getNode } = useVueFlow()
  const { onStart, onDrag, onStop, el, disabled = false, noDragClassName, id, handleSelector } = $(params)

  let startPos = $ref<XYPosition>({ x: 0, y: 0 })
  let lastPos = $ref<Partial<XYPosition>>({ x: undefined, y: undefined })
  let parentPos = $ref<XYPosition>({ x: 0, y: 0 })

  const handleDrag = (event: UseDragEvent) => {
    const pos = pointToRendererPoint(
      {
        x: event.x - startPos.x,
        y: event.y - startPos.y,
      },
      viewport.value,
      snapToGrid.value,
      snapGrid.value,
    )

    pos.x -= parentPos.x
    pos.y -= parentPos.y

    // skip events without movement
    if (lastPos.x !== pos.x || lastPos.y !== pos.y) {
      if (lastPos.x && lastPos.y) {
        onDrag(event, {
          dx: pos.x - lastPos.x,
          dy: pos.y - lastPos.y,
        })
      }
    }

    lastPos = pos
  }

  return watch(
    [() => disabled, () => noDragClassName, () => id, () => el],
    () => {
      if (el) {
        const selection = select(el)
        const node = id ? getNode.value(id) : undefined

        if (disabled) {
          selection.on('.drag', null)
        } else {
          const dragHandler = drag()
            .on('start', (event: UseDragEvent) => {
              const offset = getOffset(event, el)
              parentPos = getParentNodePosition(node && node.parentNode ? getNode.value(node!.parentNode!) : undefined)

              startPos = {
                x: offset.x - viewport.value.x,
                y: offset.y - viewport.value.y,
              }

              onStart(event)
            })
            .on('drag', handleDrag)
            .on('end', (event: UseDragEvent) => {
              if (node) lastPos = node.position
              onStop(event)
            })
            .filter((event: D3DragEvent<HTMLDivElement, null, SubjectPosition>['sourceEvent']) => {
              const filter = !event.ctrlKey && !event.button && !event.target.className.includes(noDragClassName)

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
}

export default useDrag
