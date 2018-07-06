import { Message } from 'element-ui';

const checkProjectName = (name, flag, info) => {
  if (!/^\s*$/.test(name)) {
    return true;
  } 
  if (flag) Message.error(info || '请输入合法的项目名称');
  return false;
};

export {
  checkProjectName,
};