<script lang="ts">
import PopupComponent from 'components/PopupComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: { PopupComponent },
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <PopupComponent title="Popup component" active></PopupComponent>
  </q-page>
</template>
