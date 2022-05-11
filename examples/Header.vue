<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { routes } from './router'

const router = useRouter()
const route = useRoute()
const onChange = (event: Event) => {
  router.push((event.target as HTMLSelectElement).value)
}

const computedRoutes = computed(() => {
  return routes
    .filter((r) => r.path !== '/')
    .map((r) => ({
      path: r.path,
      label: r.path.substring(1),
    }))
})
</script>

<template>
  <header>
    <a class="logo" href="https://github.com/bcakmakoglu/vue-flow"> Vue Flow Dev </a>
    <select v-model="route.path" @change="onChange">
      <template v-for="r of computedRoutes" :key="r.path">
        <option :value="r.path">
          {{ r.label }}
        </option>
      </template>
    </select>
  </header>
</template>
