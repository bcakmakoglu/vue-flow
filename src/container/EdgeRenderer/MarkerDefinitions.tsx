import { defineComponent, PropType } from 'vue';

interface MarkerProps {
  id: string;
}

const Marker = defineComponent({
  props: {
    id: {
      type: String as PropType<MarkerProps['id']>,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => (
      <marker
        class="revue-flow__arrowhead"
        id={props.id}
        markerWidth="12.5"
        markerHeight="12.5"
        viewBox="-10 -10 20 20"
        orient="auto"
        refX="0"
        refY="0"
      >
        {slots.default ? slots.default() : ''}
      </marker>
    );
  }
});

interface MarkerDefinitionsProps {
  color: string;
}

const MarkerDefinitions = defineComponent({
  name: 'MarkerDefinitions',
  props: {
    color: {
      type: String as PropType<MarkerDefinitionsProps['color']>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <defs>
        <Marker id="revue-flow__arrowclosed">
          <polyline
            stroke={props.color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            fill={props.color}
            points="-5,-4 0,0 -5,4 -5,-4"
          />
        </Marker>
        <Marker id="revue-flow__arrow">
          <polyline
            stroke={props.color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            fill="none"
            points="-5,-4 0,0 -5,4"
          />
        </Marker>
      </defs>
    );
  }
});

export default MarkerDefinitions;
