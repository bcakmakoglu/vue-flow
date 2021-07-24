import { Position } from '../../types';
import { computed, defineComponent, HTMLAttributes, PropType } from 'vue';

const shiftX = (x: number, shift: number, position: Position): number => {
  if (position === Position.Left) return x - shift;
  if (position === Position.Right) return x + shift;
  return x;
};

const shiftY = (y: number, shift: number, position: Position): number => {
  if (position === Position.Top) return y - shift;
  if (position === Position.Bottom) return y + shift;
  return y;
};

export interface EdgeAnchorProps extends HTMLAttributes {
  position: Position;
  centerX: number;
  centerY: number;
  radius?: number;
}

export default defineComponent({
  props: {
    position: {
      type: String as PropType<EdgeAnchorProps['position']>,
      required: true
    },
    centerX: {
      type: Number as PropType<EdgeAnchorProps['centerX']>,
      required: true
    },
    centerY: {
      type: Number as PropType<EdgeAnchorProps['centerY']>,
      required: true
    },
    radius: {
      type: Number as PropType<EdgeAnchorProps['radius']>,
      required: false,
      default: 10
    }
  },
  setup(props) {
    const radius = computed(() => props.radius || 10);
    return () => (
      <circle
        class="revue-flow__edgeupdater"
        cx={shiftX(props.centerX, radius.value, props.position)}
        cy={shiftY(props.centerY, radius.value, props.position)}
        r={radius.value}
        stroke="transparent"
        fill="transparent"
      />
    );
  }
});
