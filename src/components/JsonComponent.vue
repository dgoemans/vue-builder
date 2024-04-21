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
      v-if="objectComponent.children && objectComponent.children.length"
      :json="objectComponent.children"
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

// TODO: Work out how to import external components here
const components: Record<string, any> = {
  ...VuetifyComponents,
  JsonLayout,
};

const objectComponent = ref<ObjectComponent | undefined>(undefined);
const arrayComponents = ref<ObjectComponent[]>([]);
const plainTextComponent = ref<string | undefined>(undefined);
const events = ref<Record<string, Function>>({});

const { json } = defineProps<{
  json?: Object | string;
}>();

switch (typeof json) {
  case "undefined":
    break;
  case "string":
    plainTextComponent.value = json;
    break;
  case "object":
    if (Array.isArray(json)) {
      arrayComponents.value = json;
    } else {
      objectComponent.value = json as ObjectComponent;
    }
    break;
  default:
    throw new Error("Invalid JSON");
}

function updateProps(newProps: Record<string, any>) {
  if (objectComponent.value) {
    objectComponent.value.props = newProps;
  }
  component.value?.$forceUpdate();
}

function updateClassNames(newClassNames: string) {
  if (objectComponent.value) {
    objectComponent.value.class = newClassNames;
  }
  component.value?.$forceUpdate();
}

if (objectComponent.value) {
  const promises = (objectComponent.value.events ?? []).map(async (event) => {
    const lastSlash = event.handler.lastIndexOf(".");
    const eventName = event.handler.slice(lastSlash + 1);
    const path = event.handler.slice(0, lastSlash);
    /* @vite-ignore */
    const moduleAtPath = await import(path);
    const handler = moduleAtPath[eventName];
    events.value[event.name] = handler;
  });

  await Promise.all(promises);
  layoutService?.setComponent(
    updateProps,
    updateClassNames,
    objectComponent.value,
    component.value
  );
}

watch(component, (newObjectComponent) => {
  if (objectComponent.value) {
    layoutService?.setComponent(
      updateProps,
      updateClassNames,
      objectComponent.value,
      component.value
    );
  }
});

defineExpose({
  updateProps,
  updateClassNames,
});
</script>
