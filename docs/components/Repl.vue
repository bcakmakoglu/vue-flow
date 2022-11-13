<script>
import { isClient } from '@vueuse/core'
import DocsRepl from './DocsRepl.vue'

export default defineComponent({
  props: ['example'],
  setup(props) {
    return () => {
      if (!isClient) return null

      return h(DocsRepl, props)
    }
  },
})
</script>
