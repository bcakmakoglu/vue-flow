import type { Component, FunctionalComponent } from 'vue'
import { h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { Node, NodeProps } from '../../types'
import { Position } from '../../types'

const OutputNode: FunctionalComponent<NodeProps<Node<{ label: any }, 'output'>>> = function ({
  targetPosition = Position.Top,
  isConnectable = true,
  data,
}) {
  const label = data.label

  return [
    h(Handle as Component, { type: 'target', position: targetPosition, isConnectable }),
    typeof label !== 'string' && label ? h(label) : h('div', { innerHTML: label }),
  ]
}

OutputNode.props = ['targetPosition', 'isConnectable', 'data']
OutputNode.inheritAttrs = false
OutputNode.compatConfig = { MODE: 3 }

export default OutputNode
