export default [
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/errors/404'),
  },
  {
    path: '/401',
    name: 'Page401',
    component: () => import('@/views/errors/401'),
  },
];