import errors from './rerrors';
import login from './rlogin';


export default [
  {
    path: '/',
    redirect: '/',
  },
  login,
  ...errors,
];
