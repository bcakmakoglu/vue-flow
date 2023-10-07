<script lang="ts">
import { Suspense } from 'vue'

const DocsRepl = defineAsyncComponent(() => import('./DocsRepl.vue'))

export default defineComponent({
  props: ['example', 'examplesImports', 'dependencies'],
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
