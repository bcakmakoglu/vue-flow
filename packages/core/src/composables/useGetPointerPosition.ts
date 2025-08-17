import { getEventPosition, isUseDragEvent, pointToRendererPoint, snapPosition } from '../utils'
import type { MouseTouchEvent } from '../types'
import { useVueFlow } from './useVueFlow'
import type { UseDragEvent } from './useDrag'

/**
 * Composable that returns a function to get the pointer position
 *
 * @internal
 */
export function useGetPointerPosition() {
  const { viewport, snapGrid, snapToGrid, vueFlowRef, ancestorZoom } = useVueFlow()

  // returns the pointer position projected to the VF coordinate system
  return (event: UseDragEvent | MouseTouchEvent) => {
    const containerBounds = vueFlowRef.value?.getBoundingClientRect() ?? { left: 0, top: 0 }
    const evt = isUseDragEvent(event) ? event.sourceEvent : event

    const { x, y } = getEventPosition(evt, containerBounds as DOMRect)
    const pointerPos = pointToRendererPoint({ x, y }, viewport.value, undefined, undefined, ancestorZoom.value)
    const { x: xSnapped, y: ySnapped } = snapToGrid.value ? snapPosition(pointerPos, snapGrid.value) : pointerPos

    // we need the snapped position to be able to skip unnecessary drag events
    return {
      xSnapped,
      ySnapped,
      ...pointerPos,
    }
  }
}
