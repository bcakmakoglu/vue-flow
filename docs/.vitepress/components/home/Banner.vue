<script lang="ts" setup>
import data from '../../../.data.json'
import Star from '~icons/carbon/star'
import Download from '~icons/carbon/download'

</script>
<template>
  <div class="w-full bg-gray-900 text-white">
    <div class="max-w-9/12 md:max-w-3/4 lg:max-w-4xl m-auto py-4 md:py-12">
      <div class="grid md:grid-cols-3 gap-3 md:gap-0 text-center">
        <div class="grid grid-rows-2 gap-2 pb-6 md:pb-0 border-b-1 border-gray-400 md:border-b-0">
          <div class="text-gray-400 font-semibold text-lg">Stargazers</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center">
            <Star /> {{ data.stargazers_count }}
          </div>
        </div>
        <div class="grid grid-rows-2 gap-2 pb-6 md:pb-0 border-b-1 border-gray-400 md:border-b-0">
          <div class="text-gray-400 font-semibold text-lg">Downloads (last month)</div>
          <div class="font-bold text-3xl flex gap-2 items-center justify-center">
            <Download /> {{ data.downloads }}
          </div>
        </div>
        <div class="grid grid-rows-2 gap-2">
          <div class="text-gray-400 font-semibold text-lg">License</div>
          <div class="font-bold text-3xl">
            {{ data.license.key.toUpperCase() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
