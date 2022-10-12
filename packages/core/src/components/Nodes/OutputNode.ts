import type { FunctionalComponent } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '~/types'
import { Position } from '~/types'

const OutputNode: FunctionalComponent<NodeProps> = function ({
  targetPosition = Position.Top,
  label,
  connectable = true,
  isValidTargetPos,
}) {
  return [
    h(Handle, { type: 'target', position: targetPosition, connectable, isValidConnection: isValidTargetPos }),
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
  ]
}

OutputNode.props = ['targetPosition', 'label', 'isValidTargetPos', 'connectable']
OutputNode.inheritAttrs = false

export default OutputNode
