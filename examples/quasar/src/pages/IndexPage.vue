<script lang="ts">
import { defineComponent } from 'vue'
import CustomizedComponent from 'components/CustomizedComponent.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { CustomizedComponent },
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <CustomizedComponent title="Example component" active></CustomizedComponent>
  </q-page>
</template>
