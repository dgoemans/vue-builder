<template>
  <v-app>
    <v-main>
      <JsonLayout :layout="layout" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import JsonLayout from "./components/JsonLayout.vue";
import layout from "./assets/layout.json";
</script>
