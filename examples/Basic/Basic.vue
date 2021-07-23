<template>
  <RevueFlow
    v-model="elements"
    class="revue-flow-basic-example"
    :onElementsRemove="onElementsRemove"
    :onConnect="onConnect"
    :onNodeDragStop="onNodeDragStop"
    :defaultZoom="1.5"
    :minZoom="0.2"
    :maxZoom="4"
    @elementClick="onElementClick"
    @load="onLoad"
  >
    <MiniMap />
    <Controls />
    <Background color="#aaa" :gap="8" />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button :onClick="resetTransform" style="margin-right: 5px">reset transform</button>
      <button :onClick="updatePos" style="margin-right: 5px">change pos</button>
      <button :onClick="toggleClassnames" style="margin-right: 5px">toggle classnames</button>
      <button :onClick="logToObject">toObject</button>
    </div>
  </RevueFlow>
</template>
<script lang="ts">
import RevueFlow, {
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Elements,
  FlowElement,
  Node,
  OnLoadParams,
  addEdge,
  isNode,
  removeElements
} from '../../src';
import { defineComponent, ref } from 'vue';

const BasicFlow = defineComponent({
  components: { RevueFlow, MiniMap, Controls, Background },
  setup() {
    const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
    const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);
    const elements = ref<Elements>([
      { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
      { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
      { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
      { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e1-3', source: '1', target: '3' }
    ]);
    const rfInstance = ref<OnLoadParams | null>(null);
    const onElementsRemove = (elementsToRemove: Elements) =>
      (elements.value = removeElements(elementsToRemove, elements.value as Elements));
    const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value as Elements));
    const onLoad = (revueFlowInstance: OnLoadParams) => (rfInstance.value = revueFlowInstance);

    const updatePos = () => {
      elements.value = elements.value.map((el: FlowElement) => {
        if (isNode(el)) {
          el.position = {
            x: Math.random() * 400,
            y: Math.random() * 400
          };
        }

        return el;
      });
    };

    const logToObject = () => console.log(rfInstance.value?.toObject());
    const resetTransform = () => rfInstance.value?.setTransform({ x: 0, y: 0, zoom: 1 });

    const toggleClassnames = () => {
      elements.value = elements.value.map((el: FlowElement) => {
        if (isNode(el)) {
          el.className = el.className === 'light' ? 'dark' : 'light';
        }

        return el;
      });
    };
    return {
      onLoad,
      onConnect,
      onElementClick,
      onElementsRemove,
      onNodeDragStop,
      logToObject,
      resetTransform,
      toggleClassnames,
      updatePos,
      elements
    };
  }
});

export default BasicFlow;
</script>
