import type { Component, FunctionalComponent } from 'vue'
import { h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '../../types'
import { Position } from '../../types'

const DefaultNode: FunctionalComponent<NodeProps<{ label: any }>> = function ({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  label: _label,
  connectable = true,
  isValidTargetPos,
  isValidSourcePos,
  data,
}) {
  const label = data.label || _label

  return [
    h(Handle as Component, { type: 'target', position: targetPosition, connectable, isValidConnection: isValidTargetPos }),
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
    h(Handle as Component, { type: 'source', position: sourcePosition, connectable, isValidConnection: isValidSourcePos }),
  ]
}

DefaultNode.props = ['sourcePosition', 'targetPosition', 'label', 'isValidTargetPos', 'isValidSourcePos', 'connectable', 'data']
DefaultNode.inheritAttrs = false
DefaultNode.compatConfig = { MODE: 3 }

export default DefaultNode
