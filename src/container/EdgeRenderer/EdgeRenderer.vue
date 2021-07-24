<template>
  <svg :width="width" :height="height" class="revue-flow__edges">
    <MarkerDefinitions :color="arrowHeadColor" />
    <g :transform="transformStyle">
      <template v-for="edge of edges" :key="edge.id">
        <Edge
          :edge="edge"
          :marker-end-id="markerEndId"
          :onlyRenderVisibleElements="onlyRenderVisibleElements"
          :type="edgeTypes[edge.type]"
        />
        <ConnectionLine
          v-if="renderConnectionLine"
          :connectionLineStyle="connectionLineStyle"
          :connectionLineType="connectionLineType"
          :CustomConnectionLineComponent="connectionLineComponent"
        />
      </template>
    </g>
  </svg>
</template>
<script lang="ts">
import { computed, CSSProperties, defineComponent, inject, PropType } from 'vue';
import Edge from '../../components/Edges/Edge.vue';
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue';
import { ConnectionLineType, ConnectionLineComponent, ConnectionMode, RevueFlowStore } from '../../types';
import MarkerDefinitions from './MarkerDefinitions.vue';

interface EdgeRendererProps {
  edgeTypes: any;
  connectionLineType: ConnectionLineType;
  connectionLineStyle?: CSSProperties;
  connectionLineComponent?: ConnectionLineComponent;
  connectionMode?: ConnectionMode;
  arrowHeadColor: string;
  markerEndId?: string;
  onlyRenderVisibleElements: boolean;
  edgeUpdaterRadius?: number;
}

const EdgeRenderer = defineComponent({
  name: 'EdgeRenderer',
  components: {
    Edge,
    ConnectionLine,
    MarkerDefinitions
  },
  props: {
    edgeTypes: {
      type: Object,
      required: false,
      default: undefined
    },
    connectionLineType: {
      type: String as PropType<EdgeRendererProps['connectionLineType']>,
      required: false,
      default: undefined
    },
    connectionLineStyle: {
      type: Object as PropType<EdgeRendererProps['connectionLineStyle']>,
      required: false,
      default: undefined
    },
    connectionLineComponent: {
      type: Object as PropType<EdgeRendererProps['connectionLineComponent']>,
      required: false,
      default: undefined
    },
    connectionMode: {
      type: String as PropType<EdgeRendererProps['connectionMode']>,
      required: false,
      default: undefined
    },
    arrowHeadColor: {
      type: String as PropType<EdgeRendererProps['arrowHeadColor']>,
      required: false,
      default: undefined
    },
    markerEndId: {
      type: String as PropType<EdgeRendererProps['markerEndId']>,
      required: false,
      default: undefined
    },
    onlyRenderVisibleElements: {
      type: Boolean as PropType<EdgeRendererProps['onlyRenderVisibleElements']>,
      required: false,
      default: undefined
    },
    edgeUpdaterRadius: {
      type: Number as PropType<EdgeRendererProps['edgeUpdaterRadius']>,
      required: false,
      default: undefined
    }
  },
  setup() {
    const store = inject<RevueFlowStore>('store')!;
    const edges = computed(() => store.edges);
    const transform = computed(() => store.transform);
    const transformStyle = computed(() => {
      return `translate(${transform.value?.[0]},${transform.value?.[1]}) scale(${transform.value?.[2]})`;
    });
    const renderConnectionLine = computed(() => store.connectionNodeId && store.connectionHandleType);
    const width = computed(() => store.width);
    const height = computed(() => store.height);

    return {
      transform,
      transformStyle,
      renderConnectionLine,
      edges,
      width,
      height
    };
  }
});

export default EdgeRenderer;
</script>
