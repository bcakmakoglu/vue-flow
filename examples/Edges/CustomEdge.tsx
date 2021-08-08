import { EdgeProps, getBezierPath, getMarkerEnd } from '../../src';
import { FunctionalComponent } from 'vue';

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

  return () => (
    <>
      <path id={id} class="react-flow__edge-path" d={edgePath} marker-end={markerEnd} />
      <text>
        <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" text-anchor="middle">
          {data.text}
        </textPath>
      </text>
    </>
  );
};

export default CustomEdge;
