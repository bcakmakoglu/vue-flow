import RevueFlow, { removeElements, addEdge, Background, BackgroundVariant, Elements, Connection, Edge } from '../../src';

import ConnectionLine from './ConnectionLine';
import { defineComponent, ref } from 'vue';

const initialElements: Elements = [{ id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } }];

const ConnectionLineFlow = defineComponent({
  components: { Background },
  setup() {
    const elements = ref(initialElements);
    const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value));
    const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value));

    return () => (
      <RevueFlow
        elements={elements.value}
        connectionLineComponent={ConnectionLine as any}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
      >
        <Background variant={BackgroundVariant.Lines} />
      </RevueFlow>
    );
  }
});

export default ConnectionLineFlow;
