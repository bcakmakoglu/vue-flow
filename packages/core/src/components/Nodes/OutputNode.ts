import type { Component, FunctionalComponent } from 'vue'
import { Fragment, h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '../../types'
import { Position } from '../../types'

const OutputNode: FunctionalComponent<NodeProps<{ label: any }>> = function ({
  targetPosition = Position.Top,
  label: _label,
  connectable = true,
  isValidTargetPos,
  data,
}) {
  const label = data.label ?? _label

  return [
    h(Handle as Component, { type: 'target', position: targetPosition, connectable, isValidConnection: isValidTargetPos }),
    typeof label !== 'string' && label ? h(label) : h(Fragment, [label]),
  ]
}

OutputNode.props = ['targetPosition', 'label', 'isValidTargetPos', 'connectable', 'data']
OutputNode.inheritAttrs = false
OutputNode.compatConfig = { MODE: 3 }

export default OutputNode
