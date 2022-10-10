import type { FunctionalComponent } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '~/types'
import { Position } from '~/types'

const DefaultNode: FunctionalComponent<NodeProps> = function ({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  label,
  connectable = false,
  isValidTargetPos,
  isValidSourcePos,
}) {
  return [
    h(Handle, { type: 'target', position: targetPosition, isConnectable: connectable, isValidConnection: isValidTargetPos }),
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
    h(Handle, { type: 'source', position: sourcePosition, isConnectable: connectable, isValidConnection: isValidSourcePos }),
  ]
}

DefaultNode.props = ['sourcePosition', 'targetPosition', 'label', 'isValidTargetPos', 'isValidSourcePos', 'connectable']
DefaultNode.inheritAttrs = false

export default DefaultNode
