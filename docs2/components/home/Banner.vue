<script lang="ts" setup>
import { $fetch } from 'ohmyfetch'
import Star from '~icons/carbon/star'
import Download from '~icons/carbon/download'

const githubData = await $fetch('https://api.github.com/repos/bcakmakoglu/vue-flow?page=$i&per_page=100')
const npmData = await $fetch('https://api.npmjs.org/downloads/point/last-month/@braks/vue-flow')
</script>

<template>
  <div class="w-full dark:(bg-black text-white border-white) border-black border-y-1">
    <div class="max-w-full md:max-w-11/12 m-auto py-4 md:py-12 <md:(dark:border-t-1 border-white)">
      <div class="grid md:grid-cols-3 gap-3 text-center <md:divide-y md:divide-x dark:divide-white divide-black">
        <div class="grid grid-rows-auto gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">Stargazers</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center"><Star /> {{ githubData.stargazers_count }}</div>
        </div>
        <div class="grid grid-rows-2 gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">Downloads (last month)</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center"><Download /> {{ npmData.downloads }}</div>
        </div>
        <div class="grid grid-rows-2 gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">License</div>
          <div class="font-bold text-3xl">
            {{ githubData.license.key.toUpperCase() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
