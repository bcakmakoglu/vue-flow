<script lang="ts">
import { Suspense } from 'vue'

const DocsRepl = defineAsyncComponent(() => import('./DocsRepl.vue'))

export default defineComponent({
  props: ['example', 'mainFile'],
  setup(props) {
    return () => {
      if (typeof navigator === 'undefined') {
        return null
      }

      return h(Suspense, h(DocsRepl, props))
    }
  },
})
</script>
