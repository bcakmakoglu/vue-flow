<script lang="ts" setup></script>
<template>
  <aside>
    <div class="description">You can drag these nodes to the pane on the left.</div>
    <slot></slot>
  </aside>
</template>
<style>
aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  background: #fff;
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 280px; /* Set the width of the sidebar */
  overflow-x: hidden; /* Disable horizontal scroll */
}
</style>
