<template>
  <div class="dndflow">
    <div class="revueflow-wrapper" @drop="onDrop">
      <RevueFlow v-model="elements" @elementsRemove="onElementsRemove" @load="onLoad" @connect="onConnect" @dragover="onDragOver">
        <Controls />
      </RevueFlow>
    </div>
    <Sidebar />
  </div>
</template>
<script lang="ts">
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

const DnDFlow = defineComponent({
  components: { RevueFlow, Controls, Sidebar },
  setup() {
    const revueFlowInstance = ref<OnLoadParams>();
    const elements = ref<Elements>([
      {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 }
      }
    ] as Elements);

    let id = 0;
    const getId = (): ElementId => `dndnode_${id++}`;

    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    };

    const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value as Elements));
    const onElementsRemove = (elementsToRemove: Elements) =>
      (elements.value = removeElements(elementsToRemove, elements.value as Elements));
    const onLoad = (instance: OnLoadParams) => (revueFlowInstance.value = instance);

    const onDrop = (event: DragEvent) => {
      event.preventDefault();

      if (revueFlowInstance.value) {
        console.log(event.dataTransfer?.getData('application/revueflow'));
        const type = event.dataTransfer?.getData('application/revueflow');
        const position = revueFlowInstance.value.project({ x: event.clientX, y: event.clientY - 40 });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` }
        } as Node;

        elements.value.push(newNode);
      }
    };

    return {
      onConnect,
      onElementsRemove,
      onLoad,
      onDrop,
      onDragOver,
      elements
    };
  }
});

export default DnDFlow;
</script>
