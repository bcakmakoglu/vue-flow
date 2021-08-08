import { FunctionalComponent } from 'vue';
import { EdgeProps, EdgeText, getBezierPath, getEdgeCenter, getMarkerEnd } from '../../src';

const CustomEdge: FunctionalComponent<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId
}) => {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [centerX, centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });

  return () => (
    <>
      <path id={id} class="react-flow__edge-path" d={edgePath} marker-end={markerEnd} />
      <EdgeText
        x={centerX}
        y={centerY}
        label={data.text}
        labelStyle={{ fill: 'white' }}
        labelShowBg
        labelBgStyle={{ fill: 'red' }}
        labelBgPadding={[2, 4]}
        labelBgBorderRadius={2}
        onClick={() => console.log(data)}
      />
      ;
    </>
  );
};

export default CustomEdge;
