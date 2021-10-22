<script lang="ts" setup>
import Flow, {
  addEdge,
  removeElements,
  Controls,
  FlowInstance,
  FlowElement,
  Connection,
  Edge,
  Elements,
  ConnectionMode,
  useStore,
} from '@braks/vue-flow'
import Sidebar from '../../components/ProviderSidebar.vue'

const onElementClick = (element: FlowElement) => console.log('click', element)
const onLoad = (flowInstance: FlowInstance) => console.log('flow loaded:', flowInstance)

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

useStore()
const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <div class="providerflow">
    <Sidebar />
    <div class="vue-flow-wrapper">
      <Flow
        :elements="elements"
        :connection-mode="ConnectionMode.Loose"
        @element-click="onElementClick"
        @connect="onConnect"
        @elements-remove="onElementsRemove"
        @load="onLoad"
      >
        <Controls />
      </Flow>
    </div>
  </div>
</template>
<style>
.providerflow {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.providerflow aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.providerflow aside .description {
  margin-bottom: 10px;
}

.providerflow aside .title {
  font-weight: 700;
  margin-bottom: 5px;
}

.providerflow aside .transform {
  margin-bottom: 20px;
}

.providerflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}

.providerflow .selectall {
  margin-top: 10px;
}

@media screen and (min-width: 768px) {
  .providerflow {
    flex-direction: row;
  }

  .providerflow aside {
    max-width: 250px;
  }
}
</style>
