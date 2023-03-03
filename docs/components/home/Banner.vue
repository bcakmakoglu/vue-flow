<script lang="ts" setup>
import { $fetch } from 'ohmyfetch'
import Star from '~icons/carbon/star'
import Download from '~icons/carbon/download'

const starGazersCount = ref(0)

const downloadCount = ref(0)

const starGazersCountTransitioned = useTransition(starGazersCount, {
  duration: 1000,
  transition: (n) => {
    return n === 0 ? 0 : n === 1 ? 1 : 2 ** (-10 * n) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
  },
})

const downloadCountTransitioned = useTransition(downloadCount, {
  duration: 1000,
  transition: (n) => {
    return n === 0 ? 0 : n === 1 ? 1 : 2 ** (-10 * n) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
  },
})

$fetch('https://api.github.com/repos/bcakmakoglu/vue-flow?page=$i&per_page=100').then((data) => {
  starGazersCount.value = data.stargazers_count
})

$fetch('https://api.npmjs.org/downloads/point/last-month/@vue-flow/core').then((data) => {
  downloadCount.value = data.downloads
})
</script>

<template>
  <div class="w-full dark:(border-white) border-black border-y-1 min-h-44">
    <div class="max-w-full md:max-w-11/12 m-auto py-4 md:py-12 <md:(dark:border-t-1 border-white)">
      <div class="grid md:grid-cols-3 gap-3 text-center <md:divide-y md:divide-x dark:divide-white divide-black">
        <div class="grid grid-rows-auto gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">Stargazers</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center">
            <Star /> {{ Math.floor(starGazersCountTransitioned) }}
          </div>
        </div>
        <div class="grid grid-rows-2 gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">Downloads (last month)</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center">
            <Download /> {{ Math.floor(downloadCountTransitioned) }}
          </div>
        </div>
        <div class="grid grid-rows-2 gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">License</div>
          <div class="font-bold text-3xl">MIT</div>
        </div>
      </div>
    </div>
  </div>
</template>
