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
  },
  {
    path: '/drag-n-drop',
    component: () => import('./DragNDrop')
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
