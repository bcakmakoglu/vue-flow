<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/78412429?v=4',
    name: 'Burak Cakmakoglu',
    title: 'Creator',
    links: [{ icon: 'github', link: 'https://github.com/bcakmakoglu' }],
  },
]
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <h1 class="md:mb-8 flex justify-center items-center">Meet the Team</h1>
    <VPTeamMembers size="small" :members="members" />
  </div>
</template>
