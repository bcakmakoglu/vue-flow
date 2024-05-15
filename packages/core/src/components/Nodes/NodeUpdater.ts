import { defineComponent } from 'vue/dist/vue'
import type { Node } from '../../types'

export const StoreUpdater = defineComponent({
  props: ['opts'],
  setup: (updaterProps: { node: Node }) => {},
})
