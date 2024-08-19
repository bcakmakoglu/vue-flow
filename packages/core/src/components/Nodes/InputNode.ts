import type { FunctionalComponent } from 'vue'
import { h } from 'vue'
import Handle from '../Handle/Handle.vue'
import type { NodeProps } from '../../types'
import { Position } from '../../types'

const InputNode: FunctionalComponent<NodeProps<{ label: any }>> = function ({
  sourcePosition = Position.Bottom,
  connectable = true,
  data,
}) {
  return [
    typeof data.label !== 'string' && data.label ? h(data.label) : h('div', { innerHTML: data.label }),
    h(Handle, { type: 'source', position: sourcePosition, connectable }),
  ]
}

InputNode.props = ['sourcePosition', 'connectable', 'data']
InputNode.inheritAttrs = false
InputNode.compatConfig = { MODE: 3 }

export default InputNode
