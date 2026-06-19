<script lang="ts">
import CustomizedComponent from 'components/CustomizedComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CustomizedComponent },
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <CustomizedComponent title="Example component" active />
  </q-page>
</template>
