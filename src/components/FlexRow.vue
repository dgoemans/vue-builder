<template>
  <div class="row">
    <slot />
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
