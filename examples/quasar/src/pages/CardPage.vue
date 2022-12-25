<script lang="ts">
import { defineComponent } from 'vue'
import CardComponent from 'components/CardComponent.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { CardComponent },
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <CardComponent title="Card component" active></CardComponent>
  </q-page>
</template>
