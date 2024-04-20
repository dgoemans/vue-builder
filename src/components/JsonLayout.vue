<template>
  <Suspense>
    <JsonComponent :json="layout?.components" ref="root" />
  </Suspense>
</template>
<script setup lang="ts">
import { ref } from "vue";
import JsonComponent from "./JsonComponent.vue";
import { ObjectComponent } from "./types";

const root = ref<InstanceType<typeof JsonComponent> | null>(null);

const { layout } = defineProps<{
  layout?: {
    name: string;
    components: ObjectComponent | string;
  };
}>();
</script>
