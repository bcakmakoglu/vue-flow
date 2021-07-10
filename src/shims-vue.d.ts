declare module '*.vue' {
  import { DefineComponent } from 'vue-demi';
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
