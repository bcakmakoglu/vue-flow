import { inject } from '@vercel/analytics';
import Theme from 'vitepress/theme';
import Layout from './layouts/default.vue';
import 'virtual:windi.css';

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import './style.css';

export default {
  extends: Theme,
  Layout,
  enhanceApp() {
    inject();
  },
} as typeof Theme;
