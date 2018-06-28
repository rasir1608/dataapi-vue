export default {
  path: '/project',
  redirect: '/project/market',
  name: 'Project',
  component: () => import('@/views/project/layout/main'),
  children: [
    {
      path: 'market',
      name: 'ProjectMarket',
      component: () => import('@/views/project/layout/market'),
    },
    {
      path: 'create',
      name: 'ProjectCreate',
      component: () => import('@/views/project/layout/create'),
    },
    {
      path: 'edite/:id',
      name: 'ProjectEdite',
      component: () => import('@/views/project/layout/edite'),
    },
    {
      path: 'detail/:id',
      name: 'ProjectDetail',
      component: () => import('@/views/project/layout/detail'),
    },
  ],
};