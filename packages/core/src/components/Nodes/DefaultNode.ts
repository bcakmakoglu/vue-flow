import type { Component, FunctionalComponent } from 'vue'
import { h } from 'vue'
import { Position } from '@xyflow/system'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '~/types'

const DefaultNode: FunctionalComponent<NodeProps> = function ({
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  label,
  connectable = true,
  isValidTargetPos,
  isValidSourcePos,
}) {
  return [
    h(Handle as Component, { type: 'target', position: targetPosition, connectable, isValidConnection: isValidTargetPos }),
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
    h(Handle as Component, { type: 'source', position: sourcePosition, connectable, isValidConnection: isValidSourcePos }),
  ]
}

DefaultNode.props = ['sourcePosition', 'targetPosition', 'label', 'isValidTargetPos', 'isValidSourcePos', 'connectable']
DefaultNode.inheritAttrs = false
DefaultNode.compatConfig = { MODE: 3 }

export default DefaultNode
