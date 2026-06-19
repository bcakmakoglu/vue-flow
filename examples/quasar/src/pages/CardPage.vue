<script lang="ts">
import CardComponent from 'components/CardComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CardComponent },
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <CardComponent title="Card component" active />
  </q-page>
</template>
