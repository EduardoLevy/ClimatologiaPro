const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.jsx'),
    children: [
      { path: '', component: () => import('pages/IndexPage.jsx') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]


export default routes
