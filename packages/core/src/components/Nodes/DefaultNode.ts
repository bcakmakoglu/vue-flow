import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '../../types'
import { Position } from '../../types'

const DefaultNode: FunctionalComponent<NodeProps<{ label: any }>> = function ({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  connectable = true,
  data,
}) {
  return [
    h(Handle, { type: 'target', position: targetPosition, connectable }),
    typeof data.label !== 'string' && data.label ? h(data.label) : h('div', { innerHTML: data.label }),
    h(Handle, { type: 'source', position: sourcePosition, connectable }),
  ]
}

DefaultNode.props = ['sourcePosition', 'targetPosition', 'connectable', 'data']
DefaultNode.inheritAttrs = false
DefaultNode.compatConfig = { MODE: 3 }

export default DefaultNode
