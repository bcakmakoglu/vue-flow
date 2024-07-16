import type { Component, FunctionalComponent } from 'vue'
import { h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { Node, NodeProps } from '../../types'
import { Position } from '../../types'

const InputNode: FunctionalComponent<NodeProps<Node<{ label: any }, 'input'>>> = function ({
  sourcePosition = Position.Bottom,
  isConnectable = true,
  data,
}) {
  const label = data.label

  return [
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
    h(Handle as Component, { type: 'source', position: sourcePosition, isConnectable }),
  ]
}

InputNode.props = ['sourcePosition', 'isConnectable', 'data']
InputNode.inheritAttrs = false
InputNode.compatConfig = { MODE: 3 }

export default InputNode
