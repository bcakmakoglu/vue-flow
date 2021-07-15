import RevueFlow, {
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  Node
} from '../../src';
import Sidebar from './Sidebar';

import './dnd.css';
import { defineComponent, ref } from 'vue';

const initialElements = [{ id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const DnDFlow = defineComponent({
  setup() {
    const revueFlowInstance = ref<OnLoadParams>();
    const elements = ref<Elements>(initialElements);

    const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value));
    const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value));
    const onLoad = (instance: OnLoadParams) => (revueFlowInstance.value = instance);

    const onDrop = (event: DragEvent) => {
      event.preventDefault();

      if (revueFlowInstance.value) {
        console.log(event.dataTransfer?.getData('application/revueflow'));
        const type = event.dataTransfer?.getData('application/revueflow');
        const position = revueFlowInstance.value.project({ x: event.clientX, y: event.clientY - 40 });
        const newNode: Node = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` }
        };

        elements.value.push(newNode);
        console.log(elements.value);
      }
    };

    return () => (
      <div class="dndflow">
        <div class="revueflow-wrapper">
          <RevueFlow
            elements={elements.value}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragover={onDragOver}
          >
            <Controls />
          </RevueFlow>
        </div>
        <Sidebar />
      </div>
    );
  }
});

export default DnDFlow;
