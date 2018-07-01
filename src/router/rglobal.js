import errors from './rerrors';
import loginRouter from './rlogin';
import projectRouter from './rproject';
import MineRouter from './rmine';

console.log(projectRouter);

export default [
  {
    path: '/',
    redirect: '/mine',
  },
  loginRouter,
  projectRouter,
  MineRouter,
  ...errors,
];