import { BackgroundVariant } from '../../types';
import { createGridDotsPath, createGridLinesPath } from './utils';
import { computed, defineComponent, HTMLAttributes, PropType } from 'vue';
import store from '../../store';

export interface BackgroundProps extends HTMLAttributes {
  variant?: BackgroundVariant;
  gap?: number;
  color?: string;
  size?: number;
}

const defaultColors = {
  [BackgroundVariant.Dots]: '#81818a',
  [BackgroundVariant.Lines]: '#eee'
};

const Background = defineComponent({
  name: 'Background',
  props: {
    variant: {
      type: String as PropType<BackgroundProps['variant']>,
      required: false,
      default: BackgroundVariant.Dots
    },
    gap: {
      type: Number as PropType<BackgroundProps['gap']>,
      required: false,
      default: 15
    },
    color: {
      type: String as PropType<BackgroundProps['color']>,
      required: false,
      default: undefined
    },
    size: {
      type: Number as PropType<BackgroundProps['size']>,
      required: false,
      default: 0.4
    }
  },
  setup(props) {
    const pinia = store();
    const [x, y, scale] = pinia.transform;
    // when there are multiple flows on a page we need to make sure that every background gets its own pattern.
    const patternId = computed(() => `pattern-${Math.floor(Math.random() * 100000)}`);

    const bgClasses = ['react-flow__background'];
    const scaledGap = props.gap || 15 * scale;
    const xOffset = x % scaledGap;
    const yOffset = y % scaledGap;

    const isLines = props.variant === BackgroundVariant.Lines;
    const bgColor = props.color ? props.color : defaultColors[props.variant || BackgroundVariant.Dots];
    const path = isLines
      ? createGridLinesPath(scaledGap, props.size || 0.4, bgColor)
      : createGridDotsPath(props.size || 0.4 * scale, bgColor);

    return () => (
      <svg
        class={bgClasses}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <pattern id={patternId.value} x={xOffset} y={yOffset} width={scaledGap} height={scaledGap} patternUnits="userSpaceOnUse">
          {path}
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId.value})`} />
      </svg>
    );
  }
});

export default Background;
