<script lang="ts" setup>
import { Position, Handle, Connection } from '~/index'

const isValidConnection = (connection: Connection) => connection.target === 'B'
</script>
<template>
  <div>Only connectable with B</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="isValidConnection" />
</template>
