import errors from './rerrors';
import loginRouter from './rlogin';
import projectRouter from './rproject';


export default [
  {
    path: '/',
    redirect: '/',
  },
  loginRouter,
  projectRouter,
  ...errors,
];
