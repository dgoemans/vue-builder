<template>
  <v-app>
    <v-main> <JsonLayout :layout="editor" ref="editorComponent" /> </v-main>
  </v-app>
</template>

<script setup lang="ts">
import JsonLayout from "@/components/JsonLayout.vue";
import editor from "./assets/editor.json";
import { ref } from "vue";
import { EditorLayoutService } from "./editorlayout.service";
import { LayoutService } from "@/services";
import { provide } from "vue";

const layoutService = new LayoutService();
provide("layoutService", layoutService);

const editorComponent = ref<InstanceType<typeof JsonLayout> | null>(null);

const editorService = new EditorLayoutService();
provide("editorService", editorService);

editorService.addLayoutChangeListener((newLayout: Object) => {
  const internalLayout = layoutService?.getComponent("layout");
  if (!internalLayout || !internalLayout.component || !internalLayout.vue) {
    return;
  }
  internalLayout.component.props = {
    ...internalLayout.component.props,
    layout: newLayout,
  };
  internalLayout.vue.$forceUpdate();
});
</script>
<style>
.header {
  font-size: 16px;
  font-weight: bold;
  color: white;
  padding: 10px;
  text-align: center;
  height: 30px;
}

.footer {
  font-size: 10px;
  font-weight: normal;
  color: white;
  padding: 4px;
  text-align: left;
  height: 20px;
}

.sidebar {
  max-width: 50px;
}

.menubar {
  font-size: 10px;
  font-weight: normal;
  color: white;
  padding: 4px;
  text-align: left;
  height: 20px;
}
</style>
./editorlayout.service
