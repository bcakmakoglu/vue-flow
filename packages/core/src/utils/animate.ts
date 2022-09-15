import type { UseTransitionOptions } from '@vueuse/core'
import type { Node, XYPosition } from '~/types'

export const animate = (node: Node, position: XYPosition, options?: UseTransitionOptions) => {
  const scope = effectScope(true)

  scope.run(() => {
    const initialPos = ref([node.position.x, node.position.y])

    const output = useTransition(initialPos, {
      ...options,
      onFinished: () => {
        options?.onFinished?.()
        scope.stop()
      },
    })

    initialPos.value = [position.x, position.y]

    watch(output, (next) => {
      node.position.x = next[0]
      node.position.y = next[1]
    })
  })
}
