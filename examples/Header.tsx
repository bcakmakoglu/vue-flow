import { defineComponent } from 'vue'
import { routes } from './router'
import { useRoute, useRouter } from 'vue-router'

const Header = defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const onChange = async (event: any) => {
      await router.push(event.target.value)
    }

    return () => (
      <header>
        <a class="logo" href="https://github.com/bcakmakoglu/revue-flow">
          Revue Flow Dev
        </a>
        <select v-model={route.path} onChange={onChange}>
          {routes.map((route) =>
            route.path !== '/' ? (
              <option value={route.path} key={route.path}>
                {route.path.substr(1, route.path.length)}
              </option>
            ) : null
          )}
        </select>
      </header>
    )
  }
})

export default Header
