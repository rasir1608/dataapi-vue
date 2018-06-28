export default {
  path: '/interface',
  name: 'interface',
  component: () => import('@/views/interface/layout/main'),
  children: [
    {
      path: 'create',
      name: 'InterfaceCreate',
      component: () => import('@/views/interface/layout/create'),
    },
    {
      path: 'edite/:id',
      name: 'InterfaceEdite',
      component: () => import('@/views/interface/layout/edite'),
    },
    {
      path: 'detail/:id',
      name: 'InterfaceDetail',
      component: () => import('@/views/interface/layout/detail'),
    },
  ],
};