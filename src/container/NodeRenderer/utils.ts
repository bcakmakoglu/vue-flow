import DefaultNode from '../../components/Nodes/DefaultNode';
import InputNode from '../../components/Nodes/InputNode';
import OutputNode from '../../components/Nodes/OutputNode';
import wrapNode from '../../components/Nodes/wrapNode';
import { NodeTypesType, WrapNodeProps } from '../../types';
import { DefineComponent } from 'vue';

export function createNodeTypes(nodeTypes: NodeTypesType): NodeTypesType {
  const standardTypes: NodeTypesType = {
    input: wrapNode(nodeTypes.input || InputNode) as DefineComponent<WrapNodeProps>,
    default: wrapNode(nodeTypes.default || DefaultNode) as DefineComponent<WrapNodeProps>,
    output: wrapNode(nodeTypes.output || OutputNode) as DefineComponent<WrapNodeProps>
  };

  const wrappedTypes = {} as NodeTypesType;
  const specialTypes: NodeTypesType = Object.keys(nodeTypes)
    .filter((k) => !['input', 'default', 'output'].includes(k))
    .reduce((res, key) => {
      res[key] = wrapNode(nodeTypes[key] || DefaultNode) as DefineComponent<WrapNodeProps>;

      return res;
    }, wrappedTypes);

  return {
    ...standardTypes,
    ...specialTypes
  };
}
