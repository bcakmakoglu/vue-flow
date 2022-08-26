import type { Able, MoveableEvents, MoveableManagerInterface } from 'vue3-moveable'

export function useMoveable(id: string, emits: (event: 'updateNodeInternals') => void) {
  const frame = reactive({
    translate: [0, 0],
    rotate: 0,
  })

  const onResizeStart = (e: MoveableEvents['resizeStart']) => {
    e.setOrigin(['%', '%'])

    if (e.dragStart) {
      e.dragStart.set(frame.translate)
    }
  }

  const onResize = (e: MoveableEvents['resize']) => {
    frame.translate = e.drag.beforeTranslate
    e.target.style.width = `${e.width}px`
    e.target.style.height = `${e.height}px`
    e.target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)` + ` rotate(${frame.rotate}deg)`
  }

  const onRotateStart = (e: MoveableEvents['rotateStart']) => {
    e.set(frame.rotate)
  }

  const onRotate = (e: MoveableEvents['rotate']) => {
    frame.rotate = e.beforeRotate
    e.target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)` + ` rotate(${frame.rotate}deg)`

    emits('updateNodeInternals')
  }

  return {
    onResizeStart,
    onResize,
    onRotateStart,
    onRotate,
  }
}

export const DimensionViewable = {
  name: 'dimensionViewable',
  props: {},
  events: {},
  render(moveable: MoveableManagerInterface<any, any>, renderer) {
    const rect = moveable.getRect()

    // Add key (required)
    // Add class prefix moveable-(required)
    return renderer.createElement(
      'div',
      {
        key: 'dimension-viewer',
        class: 'moveable-dimension',
        style: {
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: 'translate(-50%, 0px)',
        },
      },
      `${Math.round(rect.offsetWidth)} x ${Math.round(rect.offsetHeight)}`,
    )
  },
} as Able<{}, {}>
