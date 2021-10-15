/**
 * Example for checking the different edge types and source and target positions
 */
import RevueFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  OnLoadParams,
  Connection,
  Edge,
  Elements
} from '../../src'
import { getElements } from './utils'
import { defineComponent, ref } from 'vue'

const onLoad = (reactFlowInstance: OnLoadParams) => {
  reactFlowInstance.fitView()
  console.log(reactFlowInstance.getElements())
}

const initialElements = getElements()

const EdgeTypesFlow = defineComponent({
  setup() {
    const elements = ref<Elements>(initialElements)
    const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
    const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

    return () => (
      <RevueFlow
        v-model={elements.value}
        onLoad={onLoad}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        minZoom={0.2}
      ></RevueFlow>
    )
  }
})

export default EdgeTypesFlow
