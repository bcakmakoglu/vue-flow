import { defineComponent } from 'vue';

interface MarkerProps {
  id: string;
}

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props: MarkerProps, { slots }) {
    return () => (
      <marker
        id={props.id}
        class="revue-flow__arrowhead"
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
