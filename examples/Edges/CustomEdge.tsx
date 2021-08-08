import { getBezierPath, getMarkerEnd } from '../../src';
import { computed, defineComponent } from 'vue';
import { DefaultEdgeProps } from '../../src/components/Edges/utils';

const CustomEdge = defineComponent({
  props: {
    ...DefaultEdgeProps
  },
  setup(props) {
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

    return () => (
      <>
        <path id={props.id} class="revue-flow__edge-path" d={edgePath.value} marker-end={markerEnd.value} />
        <text>
          <textPath href={`#${props.id}`} style={{ fontSize: '12px' }} startOffset="50%" text-anchor="middle">
            {props.data.text}
          </textPath>
        </text>
      </>
    );
  }
});

export default CustomEdge;
