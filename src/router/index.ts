import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/kitchen-sink' },
    {
      path: '/kitchen-sink',
      component: () => import('@/pages/kitchen-sink.vue'),
      meta: { layout: 'default', title: 'Kitchen sink' },
    },
  ],
})
