const state = {
  // 用户信息
  userInfo: '',
  // 全局loading界面
  loading: false,
};
const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};
const actions = {

};
const getters = {
};

export default{
  state, mutations, actions, getters,
};
