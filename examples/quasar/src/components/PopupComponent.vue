<script>
import { ref } from 'vue'
import BasicFlow from './BasicFlow.vue'

export default {
  components: { BasicFlow },
  setup() {
    const show = ref(false)
    return {
      show,
      isReady: ref(false),
    }
  },
}
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Open Flow" color="primary" @click="show = true" />

    <q-dialog v-model="show" transition-show="jump-up" @show="isReady = true" @before-hide="isReady = false">
      <q-card style="width: 500px; height: 500px">
        <BasicFlow />
      </q-card>
    </q-dialog>
  </div>
</template>
