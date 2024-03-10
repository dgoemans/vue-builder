export interface ObjectComponent {
  type: string;
  class: string;
  props: Record<string, any>;
  children: Object | string;
  events: Array<{
    name: string;
    handler: string;
  }>;
}
