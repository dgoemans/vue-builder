export interface ObjectComponent {
  id: string;
  type: string;
  class?: string;
  ref?: string;
  props?: Record<string, any>;
  children?: (ObjectComponent | string)[];
  events?: Array<{
    name: string;
    handler: string;
  }>;
}
