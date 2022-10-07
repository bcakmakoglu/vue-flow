<script setup>
import { Handle, Position } from '@braks/vue-flow'
import { useTeleport } from './useTransition.js'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { animation, transition, teleport, onClick } = useTeleport(props.id)

const changeAnimation = () => {
  animation.value = animation.value === 'fade' ? 'shrink' : 'fade'
}
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <teleport :disabled="!teleport" :to="teleport">
    <transition :name="animation">
      <div v-if="!transition" class="teleportable">
        <Handle type="target" :position="Position.Top" />
        [Node {{ id }}]
        <div class="buttons">
          <div v-if="teleport !== '#port'" class="button" @click.prevent="onClick('#port')">Teleport To Sidebar</div>
          <div v-if="teleport !== null" class="button" @click.prevent="onClick(null)">Teleport To Main Graph</div>
          <div class="button" @click.prevent="changeAnimation">Animation: {{ animation }}</div>
        </div>
        <Handle type="source" :position="Position.Bottom" />
      </div>
    </transition>
  </teleport>
</template>
