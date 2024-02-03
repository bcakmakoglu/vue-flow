<script setup>
import { useHandleConnections, useNodesData } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const connections = useHandleConnections({
  nodeId: props.id,
  type: 'target',
})

const data = useNodesData()
</script>
