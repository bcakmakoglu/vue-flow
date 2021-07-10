import { getRectOfNodes, getBoundsofRects } from '../../utils/graph';
import { Node, Rect } from '../../types';
import MiniMapNode from './MiniMapNode';
import { computed, defineComponent, HTMLAttributes, PropType } from 'vue';
import store from '../../store';

type StringFunc = (node: Node) => string;

export interface MiniMapProps extends HTMLAttributes {
  nodeColor?: string | StringFunc;
  nodeStrokeColor?: string | StringFunc;
  nodeClassName?: string | StringFunc;
  nodeBorderRadius?: number;
  nodeStrokeWidth?: number;
  maskColor?: string;
}

declare const window: any;

const defaultWidth = 200;
const defaultHeight = 150;

const MiniMap = defineComponent({
  name: 'MiniMap',
  props: {
    nodeStrokeColor: {
      type: [String, Function] as PropType<MiniMapProps['nodeStrokeColor']>,
      required: false,
      default: '#555'
    },
    nodeColor: {
      type: [String, Function] as PropType<MiniMapProps['nodeColor']>,
      required: false,
      default: '#fff'
    },
    nodeClassName: {
      type: [String, Function] as PropType<MiniMapProps['nodeClassName']>,
      required: false,
      default: ''
    },
    nodeBorderRadius: {
      type: Number as PropType<MiniMapProps['nodeBorderRadius']>,
      required: false,
      default: 5
    },
    nodeStrokeWidth: {
      type: Number as PropType<MiniMapProps['nodeStrokeWidth']>,
      required: false,
      default: 2
    },
    maskColor: {
      type: String as PropType<MiniMapProps['maskColor']>,
      required: false,
      default: 'rgb(240, 242, 243, 0.7)'
    }
  },
  setup(props, { attrs }: { attrs: Record<string, any> }) {
    const pinia = store();
    const transform = computed(() => pinia.transform);
    const elementWidth = computed(() => (attrs.style?.width || defaultWidth)! as number);
    const elementHeight = computed(() => (attrs.style?.height || defaultHeight)! as number);
    const nodeColorFunc = computed(() => (props.nodeColor instanceof Function ? props.nodeColor : () => props.nodeColor) as StringFunc);
    const nodeStrokeColorFunc = computed(
      () => (props.nodeStrokeColor instanceof Function ? props.nodeStrokeColor : () => props.nodeStrokeColor) as StringFunc
    );
    const nodeClassNameFunc = computed(
      () => (props.nodeClassName instanceof Function ? props.nodeClassName : () => props.nodeClassName) as StringFunc
    );
    const hasNodes = computed(() => pinia.nodes && pinia.nodes.length);
    const bb = computed(() => getRectOfNodes(pinia.nodes));
    const viewBB = computed<Rect>(() => ({
      x: -transform.value[0] / transform.value[2],
      y: -transform.value[1] / transform.value[2],
      width: pinia.width / transform.value[2],
      height: pinia.height / transform.value[2]
    }));
    const boundingRect = computed(() => (hasNodes.value ? getBoundsofRects(bb.value, viewBB.value) : viewBB.value));
    const scaledWidth = computed(() => boundingRect.value.width / elementWidth.value);
    const scaledHeight = computed(() => boundingRect.value.height / elementHeight.value);
    const viewScale = computed(() => Math.max(scaledWidth.value, scaledHeight.value));
    const viewWidth = computed(() => viewScale.value * elementWidth.value);
    const viewHeight = computed(() => viewScale.value * elementHeight.value);
    const offset = computed(() => 5 * viewScale.value);
    const x = computed(() => boundingRect.value.x - (viewWidth.value - boundingRect.value.width) / 2 - offset.value);
    const y = computed(() => boundingRect.value.y - (viewHeight.value - boundingRect.value.height) / 2 - offset.value);
    const width = computed(() => viewWidth.value + offset.value * 2);
    const height = computed(() => viewHeight.value + offset.value * 2);
    const shapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision';

    return () => (
      <svg
        width={elementWidth.value}
        height={elementHeight.value}
        viewBox={`${x.value} ${y.value} ${width.value} ${height.value}`}
        class="revue-flow__minimap"
      >
        {pinia.nodes
          .filter((node) => !node.isHidden)
          .map((node) => (
            <MiniMapNode
              key={node.id}
              x={node.__rf.position.x}
              y={node.__rf.position.y}
              width={node.__rf.width}
              height={node.__rf.height}
              style={node.style}
              class={nodeClassNameFunc.value(node)}
              color={nodeColorFunc.value(node)}
              borderRadius={props.nodeBorderRadius}
              strokeColor={nodeStrokeColorFunc.value(node)}
              strokeWidth={props.nodeStrokeWidth}
              shapeRendering={shapeRendering}
            />
          ))}
        <path
          class="revue-flow__minimap-mask"
          d={`M${x.value - offset.value},${y.value - offset.value}h${width.value + offset.value * 2}v${
            height.value + offset.value * 2
          }h${-width.value - offset.value * 2}z
        M${viewBB.value.x},${viewBB.value.y}h${viewBB.value.width}v${viewBB.value.height}h${-viewBB.value.width}z`}
          fill={props.maskColor}
          fill-rule="evenodd"
        />
      </svg>
    );
  }
});

export default MiniMap;
