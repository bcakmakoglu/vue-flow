import { computed, defineComponent, inject } from 'vue';
import { getBezierPath, getEdgeCenter, getMarkerEnd, RevueFlowStore } from '../../src';
import { DefaultEdgeProps } from '../../src/components/Edges/utils';
import { RevueFlowHooks } from '../../src/hooks/RevueFlowHooks';

export default defineComponent({
  props: {
    ...DefaultEdgeProps
  },
  setup(props) {
    const store = inject<RevueFlowStore>('store')!;
    const hooks = inject<RevueFlowHooks>('hooks')!;
    const onEdgeClick = (evt: Event, id: string) => {
      const edge = store.edges.find((edge) => edge.id === id);
      if (edge) {
        hooks.elementsRemove.trigger([edge]);
      }
      evt.stopPropagation();
      alert(`remove ${id}`);
    };

    const foreignObjectSize = 40;

    const edgePath = computed(() =>
      getBezierPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        sourcePosition: props.sourcePosition,
        targetX: props.targetX,
        targetY: props.targetY,
        targetPosition: props.targetPosition
      })
    );
    const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId));
    const center = computed(() =>
      getEdgeCenter({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY
      })
    );

    return () => (
      <>
        <path id={props.id} style={props.style} class="revue-flow__edge-path" d={edgePath.value} marker-end={markerEnd.value} />
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={center.value[0] - foreignObjectSize / 2}
          y={center.value[1] - foreignObjectSize / 2}
          class="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <body>
            <button class="edgebutton" onClick={(event) => onEdgeClick(event, props.id)}>
              ×
            </button>
          </body>
        </foreignObject>
      </>
    );
  }
});
