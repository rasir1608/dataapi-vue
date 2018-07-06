export default {
  path: 'interface',
  name: 'Interface',
  component: () => import('@/views/interface/layout/main'),
  children: [
    {
      path: 'edite/:id',
      name: 'InterfaceEdite',
      component: () => import('@/views/interface/layout/detail'),
    },
    {
      path: 'detail/:id',
      name: 'InterfaceDetail',
      component: () => import('@/views/interface/layout/detail'),
    },
  ],
};