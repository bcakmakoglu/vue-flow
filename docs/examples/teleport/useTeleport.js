import { getConnectedEdges, useVueFlow } from '@vue-flow/core'
import { nextTick, ref } from 'vue'

/**
 * Utility composable for specifying animations
 *
 * Animations that resize a node need to call the `updateNodeDimensions` function from store to update node handle positions
 * Otherwise edges do not connect properly
 */
export function useTeleport(id) {
  const animation = ref('fade')
  const transition = ref(false)
  const teleport = ref(null)

  const { updateNodeInternals, findNode, edges } = useVueFlow()

  /**
   * specify a selector to teleport to
   *
   * teleported elements still behave like they're at their position before,
   * i.e. if they emit events, they will still emit them up their regular tree
   */
  const fade = (destination, onFinish) => {
    setTimeout(() => {
      // teleport to destination or disable teleport
      teleport.value = destination

      setTimeout(() => {
        transition.value = false

        // if destination is null, defer hiding edges until node is teleported back
        if (!destination) {
          onFinish()
        }
      }, 500)
    }, 500)
  }

  const shrink = (destination, onFinish) => {
    setTimeout(() => {
      // teleport to destination or disable teleport
      teleport.value = destination

      setTimeout(() => {
        transition.value = false

        setTimeout(() => {
          // if destination is null, defer hiding edges until node is teleported back
          if (!destination) {
            updateNodeInternals([id])

            nextTick(() => {
              onFinish()
            })
          }
        }, 500)
      }, 500)
    }, 500)
  }

  /**
   * specify a selector to teleport to
   *
   * teleported elements still behave like they're at their position before,
   * i.e. if they emit events, they will still emit them up their regular tree
   */
  const onClick = (destination) => {
    const node = findNode(id)

    transition.value = true

    // save current teleport destination to data of node
    node.data.destination = destination

    // hide connected edges when teleporting
    const connectedEdges = getConnectedEdges([node], edges.value)

    // if destination is not null, hide edges immediately
    // check if nodes connected to edge are teleported and hide edge if one of them is
    if (destination) {
      connectedEdges.forEach(
        (edge) => (edge.hidden = !!findNode(edge.source).data.destination || !!findNode(edge.target).data.destination),
      )
    }

    const onFinish = () => {
      connectedEdges.forEach(
        (edge) => (edge.hidden = !!findNode(edge.source).data.destination || !!findNode(edge.target).data.destination),
      )
    }

    switch (animation.value) {
      case 'fade':
        fade(destination, onFinish)
        break
      case 'shrink':
        shrink(destination, onFinish)
    }
  }

  return {
    animation,
    transition,
    teleport,
    onClick,
  }
}
