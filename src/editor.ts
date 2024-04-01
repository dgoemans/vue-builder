/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import Editor from "./editor/Editor.vue";

// Composables
import { createApp } from "vue";

const app = createApp(Editor);

registerPlugins(app);

app.mount("#app");
