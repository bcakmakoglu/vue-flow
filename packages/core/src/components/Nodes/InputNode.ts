import type { Component, FunctionalComponent } from 'vue'
import { Fragment, h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '../../types'
import { Position } from '../../types'

const InputNode: FunctionalComponent<NodeProps<{ label: any }>> = function ({
  sourcePosition = Position.Bottom,
  label: _label,
  connectable = true,
  isValidSourcePos,
  data,
}) {
  const label = data.label ?? _label

  return [
    typeof label !== 'string' && label ? h(label) : h(Fragment, [label]),
    h(Handle as Component, { type: 'source', position: sourcePosition, connectable, isValidConnection: isValidSourcePos }),
  ]
}

InputNode.props = ['sourcePosition', 'label', 'isValidSourcePos', 'connectable', 'data']
InputNode.inheritAttrs = false
InputNode.compatConfig = { MODE: 3 }

export default InputNode
