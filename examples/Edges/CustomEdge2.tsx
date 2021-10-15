import { computed, defineComponent } from 'vue'
import { EdgeText, getBezierPath, getEdgeCenter, getMarkerEnd } from '../../src'
import { DefaultEdgeProps } from '../../src/components/Edges/utils'

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
    )
    const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
    const center = computed(() =>
      getEdgeCenter({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY
      })
    )

    return () => (
      <>
        <path id={props.id} class="revue-flow__edge-path" d={edgePath.value} marker-end={markerEnd.value} />
        <EdgeText
          x={center.value[0]}
          y={center.value[1]}
          label={props.data?.text}
          labelStyle={{ fill: 'white' }}
          labelShowBg
          labelBgStyle={{ fill: 'red' }}
          labelBgPadding={[2, 4]}
          labelBgBorderRadius={2}
          onClick={() => console.log(props.data)}
        />
      </>
    )
  }
})

export default CustomEdge
