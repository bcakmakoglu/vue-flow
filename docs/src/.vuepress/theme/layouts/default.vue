<script>
import 'virtual:windi.css'
import '@animxyz/core'
import '@braks/vue-flow/dist/style.css'
import '@braks/vue-flow/dist/theme-default.css'
import '../../assets/index.css'
</script>
<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import ReactIcon from '~icons/logos/react'
import GithubIcon from '~icons/carbon/logo-github'
import DiscordIcon from '~icons/logos/discord-icon'

const el = ref()
const marginLeft = ref()

onMounted(() => {
  const bbox = el.value.getBoundingClientRect()
  marginLeft.value = `-${bbox.width / 2}px`
})
</script>
<template>
  <XyzTransition appear-visible xyz="fade perspective-1 down ease-out-back duration-10">
    <div class="z-99 fixed bottom-6 left-1/2" ref="el" :style="{ marginLeft }">
    <div class="bg-white flex justify-center items-center mx-2 gap-6 border-1 border-gray-500 px-4 py-2 rounded-lg shadow-lg">
      <a
        href="https://github.com/bcakmakoglu/vue-flow"
        target="_blank" rel="noopener noreferrer"
        aria-label="GitHub"
        class="relative group cursor-pointer flex justify-center items-center"
      >
        <GithubIcon class="text-black dark:text-white text-xl transform group-hover:scale-125 transition transition-all ease duration-300" />
        <span class="w-48 transition-opacity ease-in duration-200 opacity-0 group-hover:opacity-100 bg-black dark:bg-white text-white dark:text-black rounded-md p-2 absolute bottom-[25px] right-0 mt-2 mr-2 text-xs">
            Contribute on GitHub!
          </span>
      </a>
      <a
        href="https://discord.gg/F4v6qE4Fuq"
        target="_blank" rel="noopener noreferrer"
        aria-label="Discord"
        class="relative group cursor-pointer flex justify-center items-center"
      >
        <DiscordIcon class="text-xl transform group-hover:scale-125 transition transition-all ease duration-300" />
        <span class="w-48 transition-opacity ease-in duration-200 opacity-0 group-hover:opacity-100 bg-black dark:bg-white text-white dark:text-black rounded-md p-2 absolute bottom-[25px] right-0 mt-2 mr-2 text-xs">
            Join the Discord server!
          </span>
      </a>
      <a
        href="https://reactflow.dev/"
        target="_blank" rel="noopener noreferrer"
        aria-label="React Flow"
        class="relative group cursor-pointer flex justify-center items-center"
      >
        <ReactIcon class="text-xl transform group-hover:scale-125 transition transition-all ease duration-300" />
        <span class="w-48 transition-opacity ease-in duration-200 opacity-0 group-hover:opacity-100 bg-black dark:bg-white text-white dark:text-black rounded-md p-2 absolute bottom-[25px] right-0 mt-2 mr-2 text-xs">
            Check out the original React Flow by Wbkd!
          </span>
      </a>
    </div>
  </div>
  </XyzTransition>
  <ParentLayout>
    <template #page-bottom>
      <div class="page-footer">MIT Licensed | Copyright © 2021-present Burak Cakmakoglu</div>
    </template>
  </ParentLayout>
</template>
<style>
.page-footer {
  @apply dark:(text-white bg-black) pt-[2rem] text-center;
  border-top: 1px solid var(--c-border);
  transition: border-color var(--t-color);
}

.theme-default-content:not(.custom) h1:first-of-type {
  margin-top: var(--navbar-height);
}
</style>
