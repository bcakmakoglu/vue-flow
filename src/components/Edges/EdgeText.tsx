import { EdgeTextProps, Rect } from '../../types';
import { defineComponent, PropType, ref, watchEffect } from 'vue';

export default defineComponent({
  props: {
    x: {
      type: Number as PropType<EdgeTextProps['x']>,
      required: true
    },
    y: {
      type: Number as PropType<EdgeTextProps['y']>,
      required: true
    },
    label: {
      type: [String, Object] as PropType<EdgeTextProps['label']>,
      required: true
    },
    labelStyle: {
      type: Object as PropType<EdgeTextProps['labelStyle']>,
      default: () => ({})
    },
    labelShowBg: {
      type: Boolean as PropType<EdgeTextProps['labelShowBg']>,
      default: true
    },
    labelBgStyle: {
      type: Object as PropType<EdgeTextProps['labelBgStyle']>,
      default: () => ({})
    },
    labelBgPadding: {
      type: Array as unknown as PropType<[number, number]>,
      default: () => [2, 4]
    },
    labelBgBorderRadius: {
      type: Number as PropType<EdgeTextProps['labelBgBorderRadius']>,
      default: 2
    }
  },
  setup(props, { slots }) {
    const edgeRef = ref<SVGTextElement | null>(null);
    const edgeTextBox = ref<Rect>({ x: 0, y: 0, width: 0, height: 0 });

    watchEffect(() => {
      const textBbox = edgeRef.value?.getBBox();

      if (textBbox) {
        edgeTextBox.value = {
          x: textBbox.x,
          y: textBbox.y,
          width: textBbox.width,
          height: textBbox.height
        };
      }
    });

    return () => (
      <g
        transform={`translate(${props.x - edgeTextBox.value.width / 2} ${props.y - edgeTextBox.value.height / 2})`}
        class="revue-flow__edge-textwrapper"
      >
        {props.labelShowBg && (
          <rect
            width={edgeTextBox.value.width + 2 * props.labelBgPadding[0]}
            x={-props.labelBgPadding[0]}
            y={-props.labelBgPadding[1]}
            height={edgeTextBox.value.height + 2 * props.labelBgPadding[1]}
            class="revue-flow__edge-textbg"
            style={props.labelBgStyle}
            rx={props.labelBgBorderRadius}
            ry={props.labelBgBorderRadius}
          />
        )}
        <text ref={edgeRef} class="revue-flow__edge-text" y={edgeTextBox.value.height / 2} dy="0.3em" style={props.labelStyle}>
          {props.label}
        </text>
        {slots.default ? slots.default() : ''}
      </g>
    );
  }
});
