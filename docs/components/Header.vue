<template>
  <header class="flex border-b-1 border-black border-solid items-center py-4 px-8 font-semibold text-white">
    <div class="flex flex-col">
      <a class="logo text-xl" href="https://github.com/bcakmakoglu/vue-flow"> Vue Flow </a>
      <span class="text-xs text-gray-800 mt-2"
        >An open source library by <a href="https://github.com/bcakmakoglu/bcakmakoglu">Braks</a> <br />
        Based on <a href="https://reactflow.dev">React Flow</a>
      </span>
    </div>
    <div class="flex-1"><span class="button text-gray-400">Docs</span></div>
    <div class="flex-1">
      <router-link class="link" to="/examples"> Examples</router-link>
    </div>
    <div class="flex-1"><a class="link" href="https://github.com/bcakmakoglu/vue-flow">Github</a></div>
  </header>
</template>
<style scoped>
a {
  @apply hover:text-gray-300;
}

.logo {
  text-decoration: none;
  display: block;
  line-height: 1;
}
.link {
  @apply bg-gray-200 rounded-lg px-4 py-2 !hover:text-yellow-500 text-black;
}
</style>
