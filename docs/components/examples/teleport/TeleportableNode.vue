<script setup>
import { Handle, Position, getConnectedEdges, useVueFlow } from '@braks/vue-flow'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { edges, getNode } = useVueFlow()

const teleport = ref(null)

const onClick = () => {
  /**
   * specify a selector to teleport to
   *
   * teleported elements still behave like they're at their position before,
   * i.e. if they emit events, they will still emit them up their regular tree
   */
  const target = teleport.value ? null : '#port'

  // teleport to target or disable teleport
  teleport.value = target

  // hide connected edges when teleporting
  const connectedEdges = getConnectedEdges([getNode.value(props.id)], edges.value)

  console.log(connectedEdges)

  connectedEdges.forEach((edge) => (edge.hidden = !!target))
}
</script>

<template>
  <teleport :disabled="!teleport" :to="teleport">
    <div class="teleportable" @click.prevent="onClick">
      <Handle type="target" :position="Position.Top" />
      Click to teleport
      <Handle type="source" :position="Position.Bottom" />
    </div>
  </teleport>
</template>
