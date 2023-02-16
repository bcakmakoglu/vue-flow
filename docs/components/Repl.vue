<script lang="ts">
import { isClient } from '@vueuse/core'
import { Suspense } from 'vue'
import DocsRepl from './DocsRepl.vue'

export default defineComponent({
  props: ['example'],
  setup(props) {
    return () => {
      if (!isClient) return null

      return h(Suspense, h(DocsRepl, props))
    }
  },
})
</script>
