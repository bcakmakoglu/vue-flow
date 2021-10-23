<script lang="ts" setup>
import {
  Flow,
  addEdge,
  Handle,
  Connection,
  Position,
  Elements,
  Edge,
  OnConnectStartParams,
  NodeProps,
  FlowInstance,
  NodeType,
} from '@braks/vue-flow'
import CustomInput from '../../components/ValidationCustomInput.vue'
import CustomNode from '../../components/ValidationCustomNode.vue'

const initialElements: Elements = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 } },
  { id: 'A', type: 'customnode', position: { x: 250, y: 0 } },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 } },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 } },
]

const onLoad = (reactFlowInstance: FlowInstance) => reactFlowInstance.fitView()
const onConnectStart = ({ nodeId, handleType }: OnConnectStartParams) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event: MouseEvent) => console.log('on connect stop', event)
const onConnectEnd = (event: MouseEvent) => console.log('on connect end', event)

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => {
  console.log('on connect', params)
  elements.value = addEdge(params, elements.value)
}
const nodeTypes: Record<string, NodeType> = {
  custominput: CustomInput as NodeType,
  customnode: CustomNode as NodeType,
}
</script>
<template>
  <Flow
    :elements="elements"
    :select-nodes-on-drag="false"
    class="validationflow"
    :node-types="nodeTypes"
    @connect="onConnect"
    @oad="onLoad"
    @connect-start="onConnectStart"
    @connect-stop="onConnectStop"
    @connect-end="onConnectEnd"
  />
</template>
<style>
.validationflow .vue-flow__node {
  width: 150px;
  border-radius: 5px;
  padding: 10px;
  color: #555;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 12px;
}

.validationflow .vue-flow__node-customnode {
  background: #e6e6e9;
  border: 1px solid #ddd;
}

.vue-flow__node-custominput .vue-flow__handle {
  background: #e6e6e9;
}

.validationflow .vue-flow__node-custominput {
  background: #fff;
}

.validationflow .vue-flow__handle-connecting {
  background: #ff6060;
}

.validationflow .vue-flow__handle-valid {
  background: #55dd99;
}
</style>
