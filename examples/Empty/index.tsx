import RevueFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  OnLoadParams,
  Elements,
  ElementId,
  Node,
  FlowElement,
  BackgroundVariant,
  Connection,
  Edge
} from '../../src'
import { CSSProperties, defineComponent, ref } from 'vue'

const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance)
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element)
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node)

const buttonStyle: CSSProperties = { position: 'absolute', left: '10px', top: '10px', zIndex: 4 }

const EmptyFlow = defineComponent({
  setup() {
    {
      const elements = ref<Elements>([])
      const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
      const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

      const addRandomNode = () => {
        const nodeId: ElementId = (elements.value.length + 1).toString()
        const newNode: Node = {
          id: nodeId,
          data: { label: `Node: ${nodeId}` },
          position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
        } as Node
        elements.value = [...elements.value, newNode]
      }

      return () => (
        <RevueFlow
          v-model={elements.value}
          onLoad={onLoad}
          onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onConnect={(p) => onConnect(p)}
          onNodeDragStop={onNodeDragStop}
          onlyRenderVisibleElements={false}
        >
          <MiniMap />
          <Controls />
          <Background variant={BackgroundVariant.Lines} />

          <button type="button" onClick={addRandomNode} style={buttonStyle}>
            add node
          </button>
        </RevueFlow>
      )
    }
  }
})

export default EmptyFlow
