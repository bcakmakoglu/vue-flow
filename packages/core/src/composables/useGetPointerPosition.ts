import type { UseDragEvent } from './useDrag'
import type { SnapGrid } from '~/types'

export function useGetPointerPosition() {
  const { viewport, snapGrid: globalSnapGrid, snapToGrid } = useVueFlow()

  const hasSnapGrid = (sg?: SnapGrid) => (sg ?? snapToGrid.value ? globalSnapGrid.value : undefined)

  // returns the pointer position projected to the RF coordinate system
  return ({ sourceEvent }: UseDragEvent, snapGrid?: SnapGrid) => {
    const currentSnapGrid = unref(hasSnapGrid(snapGrid))

    const x = sourceEvent.touches ? sourceEvent.touches[0].clientX : sourceEvent.clientX
    const y = sourceEvent.touches ? sourceEvent.touches[0].clientY : sourceEvent.clientY

    const pointerPos = {
      x: (x - viewport.value.x) / viewport.value.zoom,
      y: (y - viewport.value.y) / viewport.value.zoom,
    }

    // we need the snapped position in order to be able to skip unnecessary drag events
    return {
      xSnapped: currentSnapGrid ? currentSnapGrid[0] * Math.round(pointerPos.x / currentSnapGrid[0]) : pointerPos.x,
      ySnapped: currentSnapGrid ? currentSnapGrid[1] * Math.round(pointerPos.y / currentSnapGrid[1]) : pointerPos.y,
      ...pointerPos,
    }
  }
}
