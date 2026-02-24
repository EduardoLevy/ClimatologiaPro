import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.jsx'),
    children: [
      { path: '', component: () => import('../pages/IndexPage.jsx') }
    ]
  },
  // Catch-all 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.jsx') // Create this later or map to Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
