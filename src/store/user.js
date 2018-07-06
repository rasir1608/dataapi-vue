import axios from '@/http';
import { Message } from 'element-ui';
import router from '@/router';

const state = {
  // 用户信息
  userInfo: '',
};
const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
    console.log(userInfo);
  },
};
const actions = {
  // 获取用户信息
  getUserInfo: async ({ commit, state }) => {
    if (state.userInfo) return;
    const ret = await axios.get('/dataapi/duser/getUser');
    if (ret.ok) {
      commit('SET_USER_INFO', ret.data);
    } else {
      router.push('/login');
    }
  },
  // 用户注册
  userSignup: async (store, data) => {
    const ret = await axios.post('/dataapi/duser/create', data);
    if (ret.ok) {
      Message.success('帐号注册成功');
      router.push('/login/signin');
      return;
    }
    Message.error(ret.msg || '帐号注册失败');
  },
  // 用户登录
  userSignin: async ({ commit }, data) => {
    const ret = await axios.post('/dataapi/duser/login', data);
    if (ret.ok) {
      Message.success('用户登录成功');
      commit('SET_USER_INFO', ret.data);
      router.push('/mine');
      return;
    }
    Message.error(ret.msg || '用户登录失败');
  },
  // 用户登出
  async userLogout({ commit }) {
    const ret = await axios.get('/dataapi/duser/logout');
    if (ret.ok) {
      Message.success('用户退出成功');
      commit('SET_USER_INFO', '');
      router.push('/login');
      return;
    }
    Message.error(ret.msg || '用户退出失败');
  },

  // 修改用户密码
  async updatePasswrod({ commit }, data) {
    const ret = await axios.post('/dataapi/duser/updatePasswrod', data);
    if (ret.ok) {
      Message.success('密码修改成功，请重新登录！');
      await axios.get('/dataapi/duser/logout');
      commit('SET_USER_INFO', '');
      router.push('/login');
      return;
    }
    Message.error(ret.msg || '密码修改失败');
  },
  // 修改用户昵称
  async updateUserName({ state }, newUserName) {
    const ret = await axios.get(`/dataapi/duser/updateName/${newUserName}`);
    if (ret.ok) {
      Message.success('昵称修改成功！');
      state.userInfo.name = newUserName;
      return;
    }
    Message.error(ret.msg || '昵称修改失败！');
  },
};
const getters = {
  userInfo(state) {
    return state.userInfo;
  },
};

export default{
  state, mutations, actions, getters,
};
