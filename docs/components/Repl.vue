<script lang="ts">
import { inBrowser } from 'vitepress'
import { Suspense } from 'vue'

const DocsRepl = defineAsyncComponent(() => import('./DocsRepl.vue'))

export default defineComponent({
  props: ['example'],
  setup(props) {
    return () => {
      if (!inBrowser) {
        return null
      }

      return h(Suspense, h(DocsRepl, props))
    }
  },
})
</script>
