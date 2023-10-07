import type { Component, FunctionalComponent } from 'vue'
import { h } from 'vue'
import { Position } from '@xyflow/system'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '~/types'

const InputNode: FunctionalComponent<NodeProps> = function ({
  sourcePosition = Position.Bottom,
  label,
  connectable = true,
  isValidSourcePos,
}) {
  return [
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
    h(Handle as Component, { type: 'source', position: sourcePosition, connectable, isValidConnection: isValidSourcePos }),
  ]
}

InputNode.props = ['sourcePosition', 'label', 'isValidSourcePos', 'connectable']
InputNode.inheritAttrs = false
InputNode.compatConfig = { MODE: 3 }

export default InputNode
