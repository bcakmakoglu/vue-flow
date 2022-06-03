import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/popup',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PopupPage.vue') }],
  },
  {
    path: '/card',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CardPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
