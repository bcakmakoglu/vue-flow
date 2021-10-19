<script lang="ts" setup>
/**
 * Example for checking the different edge types and source and target positions
 */
import { getElements } from './utils'
import Flow, { removeElements, addEdge, MiniMap, Controls, Background, OnLoadParams, Connection, Edge, Elements } from '~/index'

const onLoad = (reactFlowInstance: OnLoadParams) => {
  reactFlowInstance.fitView()
  console.log(reactFlowInstance.getElements())
}

const elements = ref<Elements>(getElements())
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
</script>
<template>
  <Flow :elements="elements" :on-load="onLoad" :on-elements-remove="onElementsRemove" :on-connect="onConnect" :min-zoom="0.2" />
</template>
