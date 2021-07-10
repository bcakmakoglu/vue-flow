import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/basic',
    component: () => import('./Basic')
  },
  {
    path: '/custom-connectionline',
    component: () => import('./CustomConnectionLine')
  },
  {
    path: '/custom-node',
    component: () => import('./CustomNode')
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
