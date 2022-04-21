import { FunctionalComponent } from 'vue'
import Handle from '../Handle/Handle.vue'
import { NodeProps, Position } from '~/types'

const OutputNode: FunctionalComponent<NodeProps> = function ({
  targetPosition = Position.Top,
  label,
  connectable = false,
  isValidTargetPos,
}) {
  return [
    h(Handle, { type: 'target', position: targetPosition, isConnectable: connectable, isValidConnection: isValidTargetPos }),
    typeof label !== 'string' && label ? h(label) : h('span', {}, label),
  ]
}

OutputNode.props = ['targetPosition', 'label', 'isValidTargetPos', 'connectable']
OutputNode.inheritAttrs = false

export default OutputNode
