<template>
  <div>hi there</div>
</template>

<script lang="ts" setup>
import { useDB } from '@/composables/useDB'
const { openDB } = useDB()

const init = async () => {
  const db = await openDB('leanix')
  console.log('GOT DB', db)
}
init()
</script>
