import type { Component, FunctionalComponent } from 'vue'
import { h } from 'vue'
import { Position } from '@xyflow/system'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '~/types'

const OutputNode: FunctionalComponent<NodeProps> = function ({
  targetPosition = Position.Top,
  label,
  connectable = true,
  isValidTargetPos,
}) {
  return [
    h(Handle as Component, { type: 'target', position: targetPosition, connectable, isValidConnection: isValidTargetPos }),
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
  ]
}

OutputNode.props = ['targetPosition', 'label', 'isValidTargetPos', 'connectable']
OutputNode.inheritAttrs = false
OutputNode.compatConfig = { MODE: 3 }

export default OutputNode
