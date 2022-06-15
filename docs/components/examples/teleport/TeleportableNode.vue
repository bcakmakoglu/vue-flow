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
const transition = ref(false)

/**
 * specify a selector to teleport to
 *
 * teleported elements still behave like they're at their position before,
 * i.e. if they emit events, they will still emit them up their regular tree
 */
const onClick = (destination) => {
  const node = getNode.value(props.id)

  transition.value = true

  // save current teleport destination to data of node
  node.data.destination = destination

  // hide connected edges when teleporting
  const connectedEdges = getConnectedEdges([node], edges.value)

  // if destination is not null, hide edges immediately
  // check if nodes connected to edge are teleported and hide edge if one of them is
  if (destination) {
    connectedEdges.forEach(
      (edge) => (edge.hidden = !!getNode.value(edge.source).data.destination || !!getNode.value(edge.target).data.destination),
    )
  }

  setTimeout(() => {
    // teleport to destination or disable teleport
    teleport.value = destination

    setTimeout(() => {
      transition.value = false

      // if destination is null, defer hiding edges until node is teleported back
      if (!destination) {
        connectedEdges.forEach(
          (edge) =>
            (edge.hidden = !!getNode.value(edge.source).data.destination || !!getNode.value(edge.target).data.destination),
        )
      }
    }, 500)
  }, 500)
}
</script>

<template>
  <teleport :disabled="!teleport" :to="teleport">
    <transition name="fade">
      <div v-if="!transition" class="teleportable">
        <Handle type="target" :position="Position.Top" />
        [Node {{ id }}]
        <div class="buttons">
          <div v-if="teleport !== '#port'" class="button" @click.prevent="onClick('#port')">Teleport To Sidebar</div>
          <div v-if="teleport !== null" class="button" @click.prevent="onClick(null)">Teleport To Main Graph</div>
        </div>
        <Handle type="source" :position="Position.Bottom" />
      </div>
    </transition>
  </teleport>
</template>
