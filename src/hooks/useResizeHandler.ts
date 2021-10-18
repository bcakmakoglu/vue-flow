import { Ref } from 'vue'
import { getDimensions } from '~/utils'
import { Dimensions } from '~/types'

export default function (el: Ref<HTMLDivElement>) {
  const dimensions = ref<Dimensions>({ width: 0, height: 0 })
  const updateDimensions = () => {
    const unrefEl = unrefElement(el)
    if (!unrefEl) return

    const size = getDimensions(unrefEl as HTMLDivElement)
    if (size.height === 0 || size.width === 0)
      console.log('The revue Flow parent container needs a width and a height to render the graph.')
    else dimensions.value = size
  }

  useEventListener(window, 'resize', updateDimensions)
  useResizeObserver(el, () => updateDimensions())

  until(el).toBeTruthy().then(updateDimensions)

  return dimensions
}
