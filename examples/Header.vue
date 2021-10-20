<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { routes } from './router'

const router = useRouter()
const route = useRoute()
const onChange = (event: any) => {
  router.push(event.target.value)
}
</script>
<template>
  <header>
    <a class="logo" href="https://github.com/bcakmakoglu/vue-flow"> Vue Flow Dev </a>
    <select v-model="route.path" @change="onChange">
      <template v-for="r of routes" :key="r.path">
        <option v-if="r.path !== '/'" :value="r.path">
          {{ r.path.substr(1, r.path.length) }}
        </option>
      </template>
    </select>
  </header>
</template>
