import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '../../types'
import { Position } from '../../types'

const OutputNode: FunctionalComponent<NodeProps<{ label: any }>> = function ({
  targetPosition = Position.Top,
  connectable = true,
  data,
}) {
  return [
    h(Handle, { type: 'target', position: targetPosition, connectable }),
    typeof data.label !== 'string' && data.label ? h(data.label) : h('div', { innerHTML: data.label }),
  ]
}

OutputNode.props = ['targetPosition', 'connectable', 'data']
OutputNode.inheritAttrs = false
OutputNode.compatConfig = { MODE: 3 }

export default OutputNode
