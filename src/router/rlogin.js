export default {
  path: '/login',
  redirect: '/login/signin',
  name: 'Login',
  component: () => import('@/views/login/layout/main'),
  children: [
    {
      path: 'signin',
      name: 'Signin',
      component: () => import('@/views/login/layout/signin'),
    },
    {
      path: 'signup',
      name: 'Signup',
      component: () => import('@/views/login/layout/signup'),
    },
  ],
};