import { defineComponent, onMounted, ref } from 'vue';
import RevueFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  Position,
  SnapGrid,
  Connection,
  Edge
} from '../../src';
import ColorSelectorNode from './ColorSelectorNode';

const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance);
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  selectorNode: ColorSelectorNode
};

const CustomNodeFlow = defineComponent({
  components: { RevueFlow, MiniMap, Controls },
  setup() {
    const elements = ref<Elements>([]);
    const bgColor = ref(initBgColor);

    onMounted(() => {
      const onChange = (event: Event) => {
        elements.value = elements.value.map((e) => {
          if (isEdge(e) || e.id !== '2') {
            return e;
          }

          const color = (event.target as HTMLInputElement).value;

          bgColor.value = color;

          return {
            ...e,
            data: {
              ...e.data,
              color
            }
          };
        });
      };

      elements.value = [
        {
          id: '1',
          type: 'input',
          data: { label: 'An input node' },
          position: { x: 0, y: 50 },
          sourcePosition: Position.Right
        },
        {
          id: '2',
          type: 'selectorNode',
          data: { onChange: onChange, color: initBgColor },
          style: { border: '1px solid #777', padding: 10 },
          position: { x: 250, y: 50 }
        },
        {
          id: '3',
          type: 'output',
          data: { label: 'Output A' },
          position: { x: 550, y: 25 },
          targetPosition: Position.Left
        },
        {
          id: '4',
          type: 'output',
          data: { label: 'Output B' },
          position: { x: 550, y: 100 },
          targetPosition: Position.Left
        },

        { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fff' } },
        { id: 'e2a-3', source: '2', sourceHandle: 'a', target: '3', animated: true, style: { stroke: '#fff' } },
        { id: 'e2b-4', source: '2', sourceHandle: 'b', target: '4', animated: true, style: { stroke: '#fff' } }
      ];
    });

    const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value));
    const onConnect = (params: Connection | Edge) =>
      (elements.value = addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, elements.value));

    return () => (
      <RevueFlow
        elements={elements.value}
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        style={{ background: bgColor.value }}
        onLoad={onLoad}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1.5}
      >
        <MiniMap
          nodeStrokeColor={(n: Node): string => {
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'selectorNode') return bgColor.value;
            if (n.type === 'output') return '#ff0072';

            return '#eee';
          }}
          nodeColor={(n: Node): string => {
            if (n.type === 'selectorNode') return bgColor.value;

            return '#fff';
          }}
        />
        <Controls />
      </RevueFlow>
    );
  }
});

export default CustomNodeFlow;
