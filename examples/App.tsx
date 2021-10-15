import { computed, defineComponent } from 'vue'
import Header from './Header'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const route = useRoute()
    const key = computed(() => route.fullPath)
    return () => (
      <>
        <Header />
        <router-view ref="view" key={key.value} />
      </>
    )
  }
})
