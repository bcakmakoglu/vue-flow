import DefaultNode from '../../components/Nodes/DefaultNode';
import InputNode from '../../components/Nodes/InputNode';
import OutputNode from '../../components/Nodes/OutputNode';
import { NodeTypesType } from '../../types';

export function createNodeTypes(nodeTypes: NodeTypesType): NodeTypesType {
  const standardTypes: NodeTypesType = {
    input: nodeTypes.input || InputNode,
    default: nodeTypes.default || DefaultNode,
    output: nodeTypes.output || OutputNode
  };

  const wrappedTypes = {} as NodeTypesType;
  const specialTypes: NodeTypesType = Object.keys(nodeTypes)
    .filter((k) => !['input', 'default', 'output'].includes(k))
    .reduce((res, key) => {
      // @ts-ignore
      res[key] = nodeTypes[key] || DefaultNode;

      return res;
    }, wrappedTypes);

  return {
    ...standardTypes,
    ...specialTypes
  };
}
