<template>
  <JsonComponent
    v-if="arrayComponents"
    v-for="component in arrayComponents"
    :json="component"
  />
  <component
    v-if="objectComponent"
    :is="components[objectComponent.type]"
    :class="objectComponent.class"
    v-bind="objectComponent.props"
  >
    <JsonComponent
      :json="objectComponent.children"
      v-if="objectComponent.children"
    />
  </component>
  <template v-if="plainTextComponent">
    {{ plainTextComponent }}
  </template>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import * as VuetifyComponents from "vuetify/components";

const components: Record<string, any> = {
  ...VuetifyComponents,
};

const { json } = defineProps<{
  json: Object | string;
}>();

let objectComponent, arrayComponents, plainTextComponent;

switch (typeof json) {
  case "string":
    plainTextComponent = json;
    break;
  case "object":
    if (Array.isArray(json)) {
      arrayComponents = json;
    } else {
      objectComponent = json;
    }
    break;
  default:
    throw new Error("Invalid JSON");
}
</script>