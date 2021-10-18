import { CSSProperties, defineComponent, inject, PropType } from 'vue'
import { ConnectionLineType, ConnectionLineComponent, ConnectionMode, RevueFlowStore } from '../../types'
import ConnectionLine from '../../components/ConnectionLine'
import Edge from '../../components/Edges/EdgeDepr'
import MarkerDefinitions from './MarkerDefinitions'

interface EdgeRendererProps {
  edgeTypes: any
  connectionLineType: ConnectionLineType
  connectionLineStyle?: CSSProperties
  connectionLineComponent?: ConnectionLineComponent
  connectionMode?: ConnectionMode
  arrowHeadColor: string
  markerEndId?: string
  onlyRenderVisibleElements: boolean
  edgeUpdaterRadius?: number
}

export default defineComponent({
  name: 'EdgeRenderer',
  components: {
    Edge,
    ConnectionLine,
    MarkerDefinitions,
  },
  props: {
    edgeTypes: {
      type: Object,
      required: true,
    },
    connectionLineType: {
      type: String as PropType<EdgeRendererProps['connectionLineType']>,
      required: false,
      default: undefined,
    },
    connectionLineStyle: {
      type: Object as PropType<EdgeRendererProps['connectionLineStyle']>,
      required: false,
      default: undefined,
    },
    connectionLineComponent: {
      type: Object as PropType<EdgeRendererProps['connectionLineComponent']>,
      required: false,
      default: undefined,
    },
    connectionMode: {
      type: String as PropType<EdgeRendererProps['connectionMode']>,
      required: false,
      default: undefined,
    },
    arrowHeadColor: {
      type: String as PropType<EdgeRendererProps['arrowHeadColor']>,
      required: false,
      default: undefined,
    },
    markerEndId: {
      type: String as PropType<EdgeRendererProps['markerEndId']>,
      required: false,
      default: undefined,
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<EdgeRendererProps['onlyRenderVisibleElements']>,
      required: false,
      default: undefined,
    },
    edgeUpdaterRadius: {
      type: Number as PropType<EdgeRendererProps['edgeUpdaterRadius']>,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!

    return () => (
      <svg width={store.width} height={store.height} className="revue-flow__edges">
        <MarkerDefinitions color={props.arrowHeadColor} />
        <g transform={`translate(${store.transform[0]},${store.transform[1]}) scale(${store.transform[2]})`}>
          {store.edges.map((edge, i) => (
            <Edge
              edge={edge}
              type={props.edgeTypes[edge.type || 'default']}
              onlyRenderVisibleElements={props.onlyRenderVisibleElements}
              markerEndId={props.markerEndId}
              key={edge.id + i}
            />
          ))}
          {store.connectionNodeId && store.connectionHandleType && (
            <ConnectionLine
              connectionLineStyle={props.connectionLineStyle}
              connectionLineType={props.connectionLineType}
              customConnectionLine={props.connectionLineComponent}
            />
          )}
        </g>
      </svg>
    )
  },
})
