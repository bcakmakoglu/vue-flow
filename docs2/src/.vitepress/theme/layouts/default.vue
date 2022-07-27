<script setup>
import DefaultTheme from 'vitepress/theme'
import ReactIcon from '~icons/logos/react'
import GithubIcon from '~icons/carbon/logo-github'
import DiscordIcon from '~icons/logos/discord-icon'

const { Layout: ParentLayout } = DefaultTheme
</script>

<template>
  <ParentLayout>
    <template #nav-bar-title-before>
      <XyzTransition appear-visible xyz="fade perspective-1 down ease-out-back duration-10">
        <div
          class="border-1 border-gray-300 bg-white dark:bg-gray-800 dark:(shadow-gray-700 shadow-md) shadow-lg select-none flex justify-center items-center mx-2 gap-6 px-4 py-2 rounded-lg"
        >
          <a
            href="https://github.com/bcakmakoglu/vue-flow"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="bg-white rounded-full relative group cursor-pointer flex justify-center items-center"
          >
            <GithubIcon class="text-black text-xl transform group-hover:scale-125 transition transition-all ease duration-300" />
            <span
              class="transition-opacity ease-in duration-200 opacity-0 group-hover:opacity-100 bg-black dark:bg-white text-white dark:text-black rounded-md p-2 absolute top-[25px] right-0 mt-2 mr-2 text-xs"
            >
              Contribute on GitHub!
            </span>
          </a>
          <a
            href="https://discord.gg/F4v6qE4Fuq"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            class="relative group cursor-pointer flex justify-center items-center"
          >
            <DiscordIcon class="text-xl transform group-hover:scale-125 transition transition-all ease duration-300" />
            <span
              class="transition-opacity ease-in duration-200 opacity-0 group-hover:opacity-100 bg-black dark:bg-white text-white dark:text-black rounded-md p-2 absolute top-[25px] right-0 mt-2 mr-2 text-xs"
            >
              Join the Discord server!
            </span>
          </a>
          <a
            href="https://reactflow.dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="React Flow"
            class="relative group cursor-pointer flex justify-center items-center"
          >
            <ReactIcon class="text-xl transform group-hover:scale-125 transition transition-all ease duration-300" />
            <span
              class="transition-opacity ease-in duration-200 opacity-0 group-hover:opacity-100 bg-black dark:bg-white text-white dark:text-black rounded-md p-2 absolute top-[25px] right-0 mt-2 mr-2 text-xs"
            >
              Check out the original React Flow by Wbkd!
            </span>
          </a>
        </div>
      </XyzTransition>
      <div class="hidden md:(block w-8) lg:w-12" />
    </template>
    <template #layout-bottom>
      <div class="page-footer">MIT Licensed | Copyright © 2021-present Burak Cakmakoglu</div>
    </template>
  </ParentLayout>
</template>

<style>
.page-footer {
  @apply py-4 text-center;
}
</style>
