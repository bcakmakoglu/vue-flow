<template>
  <RevueFlow
    v-model="elements"
    :connectionLineComponent="ConnectionLine"
    :onElementsRemove="onElementsRemove"
    :onConnect="onConnect"
  >
    <Background :variant="bgVariant" />
  </RevueFlow>
</template>
<script lang="ts">
import RevueFlow, { removeElements, addEdge, Background, BackgroundVariant, Elements, Connection, Edge } from '../../src';

import ConnectionLine from './ConnectionLine.vue';
import { defineComponent, ref } from 'vue';

const ConnectionLineFlow = defineComponent({
  components: { RevueFlow, Background },
  setup() {
    const elements = ref<Elements>([{ id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } }]);
    const onElementsRemove = (elementsToRemove: Elements) =>
      (elements.value = removeElements(elementsToRemove, elements.value as Elements));
    const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value as Elements));

    return {
      ConnectionLine,
      elements,
      onElementsRemove,
      onConnect,
      bgVariant: BackgroundVariant.Lines
    };
  }
});

export default ConnectionLineFlow;
</script>
