import type { UseDragEvent } from './useDrag'

export function useGetPointerPosition() {
  const { viewport, snapGrid, snapToGrid } = useVueFlow()

  // returns the pointer position projected to the RF coordinate system
  return ({ sourceEvent }: UseDragEvent) => {
    const x = sourceEvent.touches ? sourceEvent.touches[0].clientX : sourceEvent.clientX
    const y = sourceEvent.touches ? sourceEvent.touches[0].clientY : sourceEvent.clientY

    const pointerPos = {
      x: (x - viewport.value.x) / viewport.value.zoom,
      y: (y - viewport.value.y) / viewport.value.zoom,
    }

    // we need the snapped position in order to be able to skip unnecessary drag events
    return {
      xSnapped: snapToGrid.value ? snapGrid.value[0] * Math.round(pointerPos.x / snapGrid.value[0]) : pointerPos.x,
      ySnapped: snapToGrid.value ? snapGrid.value[1] * Math.round(pointerPos.y / snapGrid.value[1]) : pointerPos.y,
      ...pointerPos,
    }
  }
}
