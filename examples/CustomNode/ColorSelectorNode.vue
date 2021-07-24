<template>
  <Handle type="target" :position="Position.Left" :style="targetHandleStyle" :onConnect="onConnect" />
  <div>
    Custom Color Picker Node: <strong>{{ data.color }}</strong>
  </div>
  <input class="nodrag" type="color" :value="data.color" @input="onChange" />
  <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA" />
  <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB" />
</template>
<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue';
import { Handle, Position, Connection, Edge } from '../../src';

const ColorSelectorNode = defineComponent({
  components: { Handle },
  inheritAttrs: false,
  props: {
    data: {
      type: Object as PropType<{ color: string; onChange: (event: any) => any }>,
      required: false,
      default: () => {}
    }
  },
  setup(props) {
    const targetHandleStyle: CSSProperties = { background: '#555' };
    const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: '10px' };
    const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: '10px', top: 'auto' };

    const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

    return {
      Position,
      targetHandleStyle,
      sourceHandleStyleA,
      sourceHandleStyleB,
      onConnect,
      onChange: props.data.onChange
    };
  }
});

export default ColorSelectorNode;
</script>
