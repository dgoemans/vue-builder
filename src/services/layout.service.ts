import { ObjectComponent } from "@/components/types";
import { ComponentPublicInstance } from "vue";

export class LayoutService {
  components: {
    [id: string]: {
      component: ObjectComponent;
      vue: ComponentPublicInstance | null;
    };
  } = {};

  setComponent(
    id: string,
    component: ObjectComponent,
    vue: ComponentPublicInstance | null
  ): void {
    this.components[id] = { component, vue };
  }

  getComponent(id: string) {
    return this.components[id];
  }
}
