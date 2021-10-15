import { defineComponent, inject, PropType } from 'vue'
import Node from '../../components/Nodes/Node'
import { getNodesInside } from '../../utils/graph'
import { NodeType, RevueFlowStore } from '../../types'

interface NodeRendererProps {
  nodeTypes: Record<string, NodeType>
  selectNodesOnDrag: boolean
  snapToGrid: boolean
  snapGrid: [number, number]
  onlyRenderVisibleElements: boolean
}

export default defineComponent({
  name: 'NodeRenderer',
  components: { Node },
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
    }
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!

    const getNodes = () => {
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
        : store.nodes
    }

    return () => (
      <div
        class="revue-flow__nodes"
        style={{
          transform: `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`
        }}
      >
        {getNodes().map((node, i) => {
          const nodeType = node.type || 'default'
          if (props.nodeTypes) {
            const type = props.nodeTypes[nodeType] || props.nodeTypes.default
            if (!props.nodeTypes[nodeType]) {
              console.warn(`Node type "${nodeType}" not found. Using fallback type "default".`)
            }

            return (
              <Node
                node={node}
                snapGrid={props.snapGrid}
                snapToGrid={props.snapToGrid}
                selectNodesOnDrag={props.selectNodesOnDrag}
                type={type}
                key={node.id + i}
              />
            )
          }
        })}
      </div>
    )
  }
})
