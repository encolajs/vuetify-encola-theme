import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      component: () => import('@/pages/dashboard.vue'),
      meta: { layout: 'default', title: 'Dashboard' },
    },
    {
      path: '/kitchen-sink',
      component: () => import('@/pages/kitchen-sink.vue'),
      meta: { layout: 'default', title: 'Kitchen sink' },
    },
    {
      path: '/forms',
      component: () => import('@/pages/forms.vue'),
      meta: { layout: 'default', title: 'Form layouts' },
    },
    {
      path: '/form-wizard',
      component: () => import('@/pages/form-wizard.vue'),
      meta: { layout: 'default', title: 'Form wizard' },
    },
    {
      path: '/auth/login',
      component: () => import('@/pages/auth/login.vue'),
      meta: { layout: 'blank', title: 'Sign in' },
    },
    {
      path: '/auth/register',
      component: () => import('@/pages/auth/register.vue'),
      meta: { layout: 'blank', title: 'Create an account' },
    },
    {
      path: '/auth/forgot-password',
      component: () => import('@/pages/auth/forgot-password.vue'),
      meta: { layout: 'blank', title: 'Reset password' },
    },
    {
      path: '/auth/two-factor',
      component: () => import('@/pages/auth/two-factor.vue'),
      meta: { layout: 'blank', title: 'Two-factor authentication' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} — Encola` : 'Encola'
})
