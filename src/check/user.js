import { Message } from 'element-ui';

const checkPw = password => !/^\s*$/.test(password);

// 修改密码验证
const checkOldPasswrod = (oldPw, flag) => {
  if (!checkPw(oldPw)) {
    if (flag) Message.error('请填写旧密码');
    return false;
  }
  return true;
};

const checkNewPasswrod = (newPw, flag) => {
  if (!checkPw(newPw)) {
    if (flag) Message.error('请填写新密码');
    return false;
  }
  return true;
};


const checkChangePw = (pwData, flag) => ({
    oldPw: () => checkOldPasswrod(pwData.oldPw, flag),
    newPw: () => {
      if (checkNewPasswrod(pwData.newPw, flag)) {
        if (pwData.oldPw === pwData.newPw) {
          if (flag) Message.error('新密码和旧密码不能相同');
          return false;
        }
        return true;
      }
      return false;
    },
    makePw: () => {
      if (checkMakesurePassword(pwData.makePw, flag)) {
        if (pwData.makePw !== pwData.newPw) {
          if (flag) Message.error('确认密码必须和新密码保持一致');
          return false;
        }
        return true;
      }
      return false;
    },
  });

// 验证昵称
const checkNickName = (nickName, flag) => {
  if (/^\w+$/.test(nickName)) {
    return true;
  } 
  if (flag) Message.error('请重新输入昵称');
  return false;
};

const checkAccount = (account, flag) => {
  const check = /^\s*$/.test(account);
  if (check) {
    if (flag) Message.error('帐号不能为空');
    return false;
  }
  return true;
};


const checkPassword = (password, flag) => {
  const check = !checkPw(password);
  if (check) {
    if (flag) Message.error('密码不能为空');
    return false;
  }
  return true;
};

const checkMakesurePassword = (makesurePassword, flag) => {
  const check = !checkPw(makesurePassword);
  if (check) {
    if (flag) Message.error('确认密码不能为空');
    return false;
  }
  return true;
};

const checkSignup = (data, flag) => {
  const singup = {
    account: () => checkAccount(data.account, flag),
    password: () => checkPassword(data.password, flag),
    makePassWord: () => {
      if (checkMakesurePassword(data.makePassWord, flag)) {
        if (data.password !== data.makePassWord) {
          if (flag) Message.error('两次输入的密码不一致');
          return false;
        }
        return true;
      }
      return false;
    },
  };
  return singup;
};
const checkSignin = (data, flag) => {
  const singup = {
    account: () => checkAccount(data.account, flag),
    password: () => checkPassword(data.password, flag),
  };
  return singup;
};
export {
  checkAccount,
  checkPassword,
  checkMakesurePassword,
  checkSignup,
  checkSignin,
  checkChangePw,
  checkNickName,
};