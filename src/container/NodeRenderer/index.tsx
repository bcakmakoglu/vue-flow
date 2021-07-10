import { getNodesInside } from '../../utils/graph';
import { Node, NodeTypesType, Edge } from '../../types';
import { computed, defineComponent, PropType } from 'vue';
import store from '../../store';

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
      type: Function() as PropType<NodeRendererProps['onElementClick']>,
      required: false,
      default: undefined
    },
    onNodeDoubleClick: {
      type: Function() as PropType<NodeRendererProps['onNodeDoubleClick']>,
      required: false,
      default: undefined
    },
    onNodeMouseEnter: {
      type: Function() as PropType<NodeRendererProps['onNodeMouseEnter']>,
      required: false,
      default: undefined
    },
    onNodeMouseMove: {
      type: Function() as PropType<NodeRendererProps['onNodeMouseMove']>,
      required: false,
      default: undefined
    },
    onNodeMouseLeave: {
      type: Function() as PropType<NodeRendererProps['onNodeMouseLeave']>,
      required: false,
      default: undefined
    },
    onNodeContextMenu: {
      type: Function() as PropType<NodeRendererProps['onNodeContextMenu']>,
      required: false,
      default: undefined
    },
    onNodeDrag: {
      type: Function() as PropType<NodeRendererProps['onNodeDrag']>,
      required: false,
      default: undefined
    },
    onNodeDragStart: {
      type: Function() as PropType<NodeRendererProps['onNodeDragStart']>,
      required: false,
      default: undefined
    },
    onNodeDragStop: {
      type: Function() as PropType<NodeRendererProps['onNodeDragStop']>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const pinia = store();

    const visibleNodes = computed(() => {
      return props.onlyRenderVisibleElements
        ? getNodesInside(
            pinia.nodes,
            {
              x: 0,
              y: 0,
              width: pinia.width,
              height: pinia.height
            },
            pinia.transform,
            true
          )
        : pinia.nodes;
    });

    const transformStyle = computed(() => ({
      transform: `translate(${pinia.transform[0]}px,${pinia.transform[1]}px) scale(${pinia.transform[2]})`
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

        pinia.updateNodeDimensions(updates);
      });
    });

    return () => (
      <div class="react-flow__nodes" style={transformStyle.value}>
        {visibleNodes.value.map((node) => {
          const nodeType = node.type || 'default';
          if (props.nodeTypes) {
            const NodeComponent: any = props.nodeTypes[nodeType] || props.nodeTypes.default;
            if (!props.nodeTypes[nodeType]) {
              console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`);
            }

            const isDraggable = !!(node.draggable || (pinia.nodesDraggable && typeof node.draggable === 'undefined'));
            const isSelectable = !!(node.selectable || (pinia.elementsSelectable && typeof node.selectable === 'undefined'));
            const isConnectable = !!(node.connectable || (pinia.nodesConnectable && typeof node.connectable === 'undefined'));

            return (
              <NodeComponent
                key={node.id}
                id={node.id}
                className={node.className}
                style={node.style}
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
                scale={pinia.transform[2]}
                selected={pinia.selectedElements?.some(({ id }) => id === node.id) || false}
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
