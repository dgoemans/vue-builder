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
    ref="component"
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
// TODO: Work out how to do this for dynamic components declared by the user?
import JsonLayout from "@/components/JsonLayout.vue";

import * as VuetifyComponents from "vuetify/components";
import { ObjectComponent } from "./types";
import { ref, inject, ComponentPublicInstance, watch } from "vue";
import { LayoutService } from "@/services";

const layoutService = inject<LayoutService>("layoutService");
const component = ref<ComponentPublicInstance | null>(null);

const components: Record<string, any> = {
  ...VuetifyComponents,
  JsonLayout,
};

const { json } = defineProps<{
  json?: Object | string;
}>();

let objectComponent: ObjectComponent | undefined,
  arrayComponents: ObjectComponent[] = [],
  plainTextComponent: string | undefined,
  events: Record<string, Function> = {};

switch (typeof json) {
  case "undefined":
    break;
  case "string":
    plainTextComponent = json;
    break;
  case "object":
    if (Array.isArray(json)) {
      arrayComponents = json;
    } else {
      objectComponent = json as ObjectComponent;
    }
    break;
  default:
    throw new Error("Invalid JSON");
}

if (objectComponent) {
  const promises = (objectComponent.events ?? []).map(async (event) => {
    const lastSlash = event.handler.lastIndexOf(".");
    const eventName = event.handler.slice(lastSlash + 1);
    const path = event.handler.slice(0, lastSlash);
    /* @vite-ignore */
    const moduleAtPath = await import(path);
    const handler = moduleAtPath[eventName];
    events[event.name] = handler;
  });

  await Promise.all(promises);
  layoutService?.setComponent(
    objectComponent.id,
    objectComponent,
    component.value
  );
}

watch(component, (newObjectComponent) => {
  if (objectComponent) {
    layoutService?.setComponent(
      objectComponent.id,
      objectComponent,
      newObjectComponent
    );
  }
});
</script>
