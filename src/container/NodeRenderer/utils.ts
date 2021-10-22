import { DefaultNode, InputNode, OutputNode } from '../../components/Nodes'
import { NodeType } from '../../types'

export function createNodeTypes(nodeTypes: Record<string, NodeType>): Record<string, NodeType> {
  const standardTypes: Record<string, NodeType> = {
    input: nodeTypes.input || InputNode,
    default: nodeTypes.default || DefaultNode,
    output: nodeTypes.output || OutputNode,
  }

  const wrappedTypes = {} as NodeType
  const specialTypes: NodeType = Object.keys(nodeTypes)
    .filter((k) => !['input', 'default', 'output'].includes(k))
    .reduce((res, key) => {
      res[key] = nodeTypes[key] || DefaultNode

      return res
    }, wrappedTypes)

  return {
    ...standardTypes,
    ...specialTypes,
  }
}
