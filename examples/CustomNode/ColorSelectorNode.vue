<template>
  <div>
    <Handle type="target" :position="Position.Left" :style="targetHandleStyle" :onConnect="onConnect" />
    <div>
      Custom Color Picker Node: <strong>{{ data.color }}</strong>
    </div>
    <input class="nodrag" type="color" :value="data.color" @input="onChange" />
    <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA" />
    <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB" />
  </div>
</template>
<script lang="ts">
import { CSSProperties, defineComponent } from 'vue';
import { Handle, Position, Connection, Edge } from '../../src';

const ColorSelectorNode = defineComponent({
  components: { Handle },
  props: {
    data: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const targetHandleStyle: CSSProperties = { background: '#555' };
    const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
    const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10, top: 'auto' };

    const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

    return {
      Position,
      targetHandleStyle,
      sourceHandleStyleA,
      sourceHandleStyleB,
      onConnect,
      onChange: props.data.onChange as any
    };
  }
});

export default ColorSelectorNode;
</script>
