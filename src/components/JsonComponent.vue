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
    v-on="events"
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
<script setup lang="ts" async>
import * as VuetifyComponents from "vuetify/components";

const components: Record<string, any> = {
  ...VuetifyComponents,
};

const { json } = defineProps<{
  json: Object | string;
}>();

let objectComponent, arrayComponents, plainTextComponent, events;

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

if (objectComponent) {
  events = {};
  const promises = (objectComponent.events ?? []).map(async (event) => {
    const lastSlash = event.handler.lastIndexOf(".");
    const eventName = event.handler.slice(lastSlash + 1);
    const path = event.handler.slice(0, lastSlash);
    const moduleAtPath = await import(path);
    const handler = moduleAtPath[eventName];
    events[event.name] = handler;
  });
  await Promise.all(promises);
}
</script>
