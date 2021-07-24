import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}

    // @ts-ignore
    interface ElementClass extends Vue {}

    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
