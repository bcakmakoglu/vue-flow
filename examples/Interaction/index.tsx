import RevueFlow, {
  addEdge,
  MiniMap,
  Controls,
  Elements,
  Node,
  FlowElement,
  Connection,
  Edge,
  PanOnScrollMode,
  FlowTransform
} from '../../src'
import { defineComponent, ref } from 'vue'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' }
] as Elements

const onNodeDragStart = (_: MouseEvent, node: Node) => console.log('drag start', node)
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node)
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element)
const onPaneClick = (event: MouseEvent) => console.log('onPaneClick', event)
const onPaneScroll = (event?: WheelEvent) => console.log('onPaneScroll', event)
const onPaneContextMenu = (event: MouseEvent) => console.log('onPaneContextMenu', event)
const onMoveEnd = (flowTranasform?: FlowTransform) => console.log('onMoveEnd', flowTranasform)

const InteractionFlow = defineComponent({
  setup() {
    const elements = ref<Elements>(initialElements)
    const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

    const isSelectable = ref(false)
    const isDraggable = ref(false)
    const isConnectable = ref(false)
    const zoomOnScroll = ref(false)
    const zoomOnPinch = ref(false)
    const panOnScroll = ref(false)
    const panOnScrollMode = ref<PanOnScrollMode>(PanOnScrollMode.Free)
    const zoomOnDoubleClick = ref(false)
    const paneMoveable = ref(true)
    const captureZoomClick = ref(false)
    const captureZoomScroll = ref(false)
    const captureElementClick = ref(false)

    return () => (
      <RevueFlow
        v-model={elements.value}
        elementsSelectable={isSelectable.value}
        nodesConnectable={isConnectable.value}
        nodesDraggable={isDraggable.value}
        zoomOnScroll={zoomOnScroll.value}
        zoomOnPinch={zoomOnPinch.value}
        panOnScroll={panOnScroll.value}
        panOnScrollMode={panOnScrollMode.value}
        zoomOnDoubleClick={zoomOnDoubleClick.value}
        onConnect={onConnect}
        onElementClick={captureElementClick.value ? onElementClick : undefined}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        paneMoveable={paneMoveable.value}
        onPaneClick={captureZoomClick.value ? onPaneClick : undefined}
        onPaneScroll={captureZoomScroll.value ? onPaneScroll : undefined}
        onPaneContextMenu={captureZoomClick.value ? onPaneContextMenu : undefined}
        onMoveEnd={onMoveEnd}
      >
        <MiniMap />
        <Controls />

        <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
          <div>
            <label htmlFor="draggable">
              nodesDraggable
              <input id="draggable" type="checkbox" v-model={isDraggable.value} class="revue-flow__draggable" />
            </label>
          </div>
          <div>
            <label htmlFor="connectable">
              nodesConnectable
              <input id="connectable" type="checkbox" v-model={isConnectable.value} class="revue-flow__connectable" />
            </label>
          </div>
          <div>
            <label htmlFor="selectable">
              elementsSelectable
              <input id="selectable" type="checkbox" v-model={isSelectable.value} class="revue-flow__selectable" />
            </label>
          </div>
          <div>
            <label htmlFor="zoomonscroll">
              zoomOnScroll
              <input id="zoomonscroll" type="checkbox" v-model={zoomOnScroll.value} class="revue-flow__zoomonscroll" />
            </label>
          </div>
          <div>
            <label htmlFor="zoomonpinch">
              zoomOnPinch
              <input id="zoomonpinch" type="checkbox" v-model={zoomOnPinch.value} class="revue-flow__zoomonpinch" />
            </label>
          </div>
          <div>
            <label htmlFor="panonscroll">
              panOnScroll
              <input id="panonscroll" type="checkbox" v-model={panOnScroll.value} class="revue-flow__panonscroll" />
            </label>
          </div>
          <div>
            <label htmlFor="panonscrollmode">
              panOnScrollMode
              <select id="panonscrollmode" v-model={panOnScrollMode.value} class="revue-flow__panonscrollmode">
                <option value="free">free</option>
                <option value="horizontal">horizontal</option>
                <option value="vertical">vertical</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="zoomondbl">
              zoomOnDoubleClick
              <input id="zoomondbl" type="checkbox" v-model={zoomOnDoubleClick.value} class="revue-flow__zoomondbl" />
            </label>
          </div>
          <div>
            <label htmlFor="panemoveable">
              paneMoveable
              <input id="panemoveable" type="checkbox" v-model={paneMoveable.value} class="revue-flow__panemoveable" />
            </label>
          </div>
          <div>
            <label htmlFor="capturezoompaneclick">
              capture onPaneClick
              <input
                id="capturezoompaneclick"
                type="checkbox"
                v-model={captureZoomClick.value}
                class="revue-flow__capturezoompaneclick"
              />
            </label>
          </div>
          <div>
            <label htmlFor="capturezoompanescroll">
              capture onPaneScroll
              <input
                id="capturezoompanescroll"
                type="checkbox"
                v-model={captureZoomScroll.value}
                class="revue-flow__capturezoompanescroll"
              />
            </label>
          </div>
          <div>
            <label htmlFor="captureelementclick">
              capture onElementClick
              <input
                id="captureelementclick"
                type="checkbox"
                v-model={captureElementClick.value}
                class="revue-flow__captureelementclick"
              />
            </label>
          </div>
        </div>
      </RevueFlow>
    )
  }
})

export default InteractionFlow
