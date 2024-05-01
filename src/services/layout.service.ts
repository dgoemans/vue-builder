import { ObjectComponent } from "@/components/types";
import { ComponentPublicInstance } from "vue";

export class LayoutService {
  components: {
    [id: string]: {
      updateProps: (props: any) => void;
      updateClassNames: (classNames: string) => void;
      objectComponent: ObjectComponent;
      instance: ComponentPublicInstance | null;
    };
  } = {};

  setComponent(
    updateProps: (props: any) => void,
    updateClassNames: (classNames: string) => void,
    objectComponent: ObjectComponent,
    instance: ComponentPublicInstance | null
  ): void {
    this.components[objectComponent.id] = {
      updateClassNames,
      updateProps,
      objectComponent,
      instance,
    };
  }

  getComponent(id: string) {
    return this.components[id];
  }
}
