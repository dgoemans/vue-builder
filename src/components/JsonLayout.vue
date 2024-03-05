<template>
  <JsonComponent :json="layout.components" />
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import JsonComponent from "./JsonComponent.vue";

const { layout } = defineProps<{
  layout: {
    components: Object | string;
  };
}>();
</script>
