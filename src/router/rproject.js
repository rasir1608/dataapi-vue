import interfaceRouter from './rinterface';

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
      path: 'edite/:id',
      name: 'ProjectEdite',
      component: () => import('@/views/project/layout/detail'),
    },
    {
      path: 'detail/:id',
      name: 'ProjectDetail',
      component: () => import('@/views/project/layout/detail'),
    },
    interfaceRouter,
  ],
};