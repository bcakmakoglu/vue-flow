import { defineComponent, PropType } from 'vue';
import Marker from './Marker';

interface MarkerDefinitionsProps {
  color: string;
}

export default defineComponent({
  components: { Marker },
  props: {
    color: {
      type: String as PropType<MarkerDefinitionsProps['color']>,
      required: false,
      default: ''
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
