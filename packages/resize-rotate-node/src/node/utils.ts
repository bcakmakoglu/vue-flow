import type { Able, MoveableEvents, MoveableManagerInterface } from 'vue3-moveable'
import type { GraphNode } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import type { ResizeRotateNodeData, ResizeRotateNodeEmits } from './types'

export function useMoveable(id: string, emits: ResizeRotateNodeEmits) {
  const { findNode } = useVueFlow()
  const node = findNode(id)! as GraphNode<ResizeRotateNodeData>

  if (!node.data) {
    node.data = {
      translate: [0, 0],
      rotate: 0,
      style: {},
      dimensions: { width: NaN, height: NaN },
    }
  }
  if (!node.data.style) node.data.style = {}
  if (!node.data.rotate) node.data.rotate = 0
  if (!node.data.translate) node.data.translate = [0, 0]
  if (!node.data.dimensions) node.data.dimensions = { width: NaN, height: NaN }

  const onResizeStart = (e: MoveableEvents['resizeStart']) => {
    e.setOrigin(['%', '%'])

    if (e.dragStart) {
      e.dragStart.set(node.data!.translate)
    }
  }

  const onResize = (e: MoveableEvents['resize']) => {
    node.data!.translate = e.drag.beforeTranslate
    node.data!.dimensions = { width: e.width, height: e.height }

    e.target.style.width = `${e.width}px`
    e.target.style.height = `${e.height}px`
    e.target.style.transform =
      `translate(${node.data!.translate[0]}px, ${node.data!.translate[1]}px)` + ` rotate(${node.data!.rotate}deg)`

    emits('resize', { width: e.width, height: e.height })
  }

  const onRotateStart = (e: MoveableEvents['rotateStart']) => {
    e.set(node.data!.rotate)
  }

  const onRotate = (e: MoveableEvents['rotate']) => {
    node.data!.rotate = e.beforeRotate

    e.target.style.transform =
      `translate(${node.data!.translate[0]}px, ${node.data!.translate[1]}px)` + ` rotate(${node.data!.rotate}deg)`

    emits('updateNodeInternals')
    emits('rotate', node.data!.rotate)
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
