import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

export const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/overview',
  },
  {
    path: '/basic',
    component: () => import('./Basic/Basic.vue'),
  },
  {
    path: '/custom-connectionline',
    component: () => import('./CustomConnectionLine/CustomConnectionLine.vue'),
  },
  {
    path: '/custom-node',
    component: () => import('./CustomNode/CustomNode.vue'),
  },
  {
    path: '/drag-n-drop',
    component: () => import('./DragNDrop/DnD.vue'),
  },
  {
    path: '/edges',
    component: () => import('./Edges/EdgesExample.vue'),
  },
  {
    path: '/button-edge',
    component: () => import('./EdgeWithButton/EdgeWithButton.vue'),
  },
  {
    path: '/edge-types',
    component: () => import('./EdgeTypes/EdgeTypesExample.vue'),
  },
  {
    path: '/empty',
    component: () => import('./Empty/EmptyExample.vue'),
  },
  {
    path: '/hidden',
    component: () => import('./Hidden/HiddenExample.vue'),
  },
  {
    path: '/interaction',
    component: () => import('./Interaction/InteractionExample.vue'),
  },
  {
    path: '/layouting',
    component: () => import('./Layouting/LayoutingExample.vue'),
  },
  {
    path: '/multi-flows',
    component: () => import('./MultiFlows/MultiFlowsExample.vue'),
  },
  {
    path: '/node-type-change',
    component: () => import('./NodeTypeChange/NodeTypeChangeExample.vue'),
  },
  {
    path: '/node-types-id-change',
    component: () => import('./NodeTypesIdChange/NodeTypesIdChangeExample.vue'),
  },
  {
    path: '/overview',
    component: () => import('./Overview/Overview.vue'),
  },
  {
    path: '/provider',
    component: () => import('./Provider/ProviderExample.vue'),
  },
  {
    path: '/save-restore',
    component: () => import('./SaveRestore/SaveRestoreExample.vue'),
  },
  {
    path: '/stress',
    component: () => import('./Stress/StressExample.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
