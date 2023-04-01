<script lang="ts" setup>
const { data: githubData } = useLazyFetch<{ stargazer_count: number }>(
  'https://api.github.com/repos/bcakmakoglu/vue-flow?page=$i&per_page=100',
)

const { data: npmData } = useLazyFetch<{ downloads: number }>('https://api.npmjs.org/downloads/point/last-month/@vue-flow/core')
</script>

<template>
  <div class="w-full dark:(border-white) border-black border-y-1 min-h-44">
    <div class="max-w-full md:max-w-11/12 m-auto py-4 md:py-12 <md:(dark:border-t-1 border-white)">
      <div class="grid md:grid-cols-3 gap-3 text-center <md:divide-y md:divide-x dark:divide-white divide-black">
        <div class="grid grid-rows-auto gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">Stargazers</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center">
            <Icon name="carbon:star" /> {{ githubData?.stargazers_count || 0 }}
          </div>
        </div>
        <div class="grid grid-rows-2 gap-2 py-4 md:py-0">
          <div class="text-gray-400 font-semibold text-lg">Downloads (last month)</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center">
            <Icon name="carbon:download" /> {{ npmData?.downloads || 0 }}
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
