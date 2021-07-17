import { getNodesInside } from '../../utils/graph';
import { Node, NodeTypesType, Edge, RevueFlowStore } from '../../types';
import { computed, defineComponent, inject, PropType } from 'vue';

interface NodeRendererProps {
  nodeTypes: NodeTypesType;
  selectNodesOnDrag: boolean;
  onElementClick?: (event: MouseEvent, element: Node | Edge) => void;
  onNodeDoubleClick?: (event: MouseEvent, element: Node) => void;
  onNodeMouseEnter?: (event: MouseEvent, node: Node) => void;
  onNodeMouseMove?: (event: MouseEvent, node: Node) => void;
  onNodeMouseLeave?: (event: MouseEvent, node: Node) => void;
  onNodeContextMenu?: (event: MouseEvent, node: Node) => void;
  onNodeDragStart?: (event: MouseEvent, node: Node) => void;
  onNodeDrag?: (event: MouseEvent, node: Node) => void;
  onNodeDragStop?: (event: MouseEvent, node: Node) => void;
  snapToGrid: boolean;
  snapGrid: [number, number];
  onlyRenderVisibleElements: boolean;
}

const NodeRenderer = defineComponent({
  name: 'NodeRenderer',
  props: {
    nodeTypes: {
      type: Object as PropType<NodeRendererProps['nodeTypes']>,
      required: false,
      default: undefined
    },
    selectNodesOnDrag: {
      type: Boolean as PropType<NodeRendererProps['selectNodesOnDrag']>,
      required: false,
      default: undefined
    },
    snapToGrid: {
      type: Boolean as PropType<NodeRendererProps['snapToGrid']>,
      required: false,
      default: undefined
    },
    snapGrid: {
      type: Array as unknown as PropType<NodeRendererProps['snapGrid']>,
      required: false,
      default: undefined
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<NodeRendererProps['onlyRenderVisibleElements']>,
      required: false,
      default: undefined
    },
    onElementClick: {
      type: Function as unknown as PropType<NodeRendererProps['onElementClick']>,
      required: false,
      default: () => {}
    },
    onNodeDoubleClick: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeDoubleClick']>,
      required: false,
      default: () => {}
    },
    onNodeMouseEnter: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeMouseEnter']>,
      required: false,
      default: () => {}
    },
    onNodeMouseMove: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeMouseMove']>,
      required: false,
      default: () => {}
    },
    onNodeMouseLeave: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeMouseLeave']>,
      required: false,
      default: () => {}
    },
    onNodeContextMenu: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeContextMenu']>,
      required: false,
      default: () => {}
    },
    onNodeDrag: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeDrag']>,
      required: false,
      default: () => {}
    },
    onNodeDragStart: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeDragStart']>,
      required: false,
      default: () => {}
    },
    onNodeDragStop: {
      type: Function as unknown as PropType<NodeRendererProps['onNodeDragStop']>,
      required: false,
      default: () => {}
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;

    const visibleNodes = computed(() => {
      return props.onlyRenderVisibleElements
        ? store.nodes &&
            getNodesInside(
              store.nodes,
              {
                x: 0,
                y: 0,
                width: store?.width,
                height: store?.height
              },
              store.transform,
              true
            )
        : store.nodes;
    });

    const transformStyle = computed(() => ({
      transform: `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`
    }));

    const resizeObserver = computed(() => {
      if (typeof ResizeObserver === 'undefined') {
        return null;
      }

      return new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const updates = entries.map((entry: ResizeObserverEntry) => ({
          id: entry.target.getAttribute('data-id') as string,
          nodeElement: entry.target as HTMLDivElement
        }));

        store.updateNodeDimensions(updates);
      });
    });

    return () => (
      <div class="revue-flow__nodes" style={transformStyle.value}>
        {visibleNodes.value?.map((node) => {
          const nodeType = node.type || 'default';
          if (props.nodeTypes) {
            const NodeComponent = (props.nodeTypes[nodeType] || props.nodeTypes.default);
            if (!props.nodeTypes[nodeType]) {
              console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`);
            }

            const isDraggable = !!(node.draggable || (store?.nodesDraggable && typeof node.draggable === 'undefined'));
            const isSelectable = !!(node.selectable || (store?.elementsSelectable && typeof node.selectable === 'undefined'));
            const isConnectable = !!(node.connectable || (store?.nodesConnectable && typeof node.connectable === 'undefined'));

            return (
              <NodeComponent
                key={node.id}
                id={node.id}
                type={nodeType}
                data={node.data}
                sourcePosition={node.sourcePosition}
                targetPosition={node.targetPosition}
                isHidden={node.isHidden}
                xPos={node.__rf.position.x}
                yPos={node.__rf.position.y}
                isDragging={node.__rf.isDragging}
                isInitialized={node.__rf.width !== null && node.__rf.height !== null}
                snapGrid={props.snapGrid}
                snapToGrid={props.snapToGrid}
                selectNodesOnDrag={props.selectNodesOnDrag}
                onClick={props.onElementClick}
                onMouseEnter={props.onNodeMouseEnter}
                onMouseMove={props.onNodeMouseMove}
                onMouseLeave={props.onNodeMouseLeave}
                onContextMenu={props.onNodeContextMenu}
                onNodeDoubleClick={props.onNodeDoubleClick}
                onNodeDragStart={props.onNodeDragStart}
                onNodeDrag={props.onNodeDrag}
                onNodeDragStop={props.onNodeDragStop}
                scale={store?.transform[2]}
                selected={store?.selectedElements?.some(({ id }) => id === node.id) || false}
                isDraggable={isDraggable}
                isSelectable={isSelectable}
                isConnectable={isConnectable}
                resizeObserver={resizeObserver.value}
              />
            );
          }
        })}
      </div>
    );
  }
});

export default NodeRenderer;
