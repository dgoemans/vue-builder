<template>
  <Suspense>
    <JsonComponent :json="layout.components" />
  </Suspense>
</template>
<script setup lang="ts">
import JsonComponent from "./JsonComponent.vue";

const { layout } = defineProps<{
  layout: {
    components: Object | string;
  };
}>();
</script>
