<template>
  <div class="revue-flow__nodes" :style="transformStyle">
    <template v-for="(node, i) of visibleNodes" :key="`node-${i}`">
      <Node
        :node="node"
        :snap-grid="snapGrid"
        :snap-to-grid="snapToGrid"
        :select-nodes-on-drag="selectNodesOnDrag"
        :type="nodeTypes[node.type]"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { getNodesInside } from '../../utils/graph';
import { NodeTypesType, RevueFlowStore } from '../../types';
import { computed, defineComponent, inject, PropType } from 'vue';
import Node from '../../components/Nodes/Node.vue';

interface NodeRendererProps {
  nodeTypes: NodeTypesType;
  selectNodesOnDrag: boolean;
  snapToGrid: boolean;
  snapGrid: [number, number];
  onlyRenderVisibleElements: boolean;
}

const NodeRenderer = defineComponent({
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

    return {
      transformStyle,
      visibleNodes
    };
  }
});

export default NodeRenderer;
</script>
