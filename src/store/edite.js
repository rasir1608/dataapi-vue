import axios from '@/http';
import { Message } from 'element-ui';

const state = {
  editeDetail: {},
};
const mutations = {
  SET_EDITE_DETAIL(state, editeDetail) {
    state.editeDetail = editeDetail;
  },
};
const actions = {
  async getEditeDetail({ commit }, data) {
    const ret = await axios.post('/dataapi/dedite/detail', data, {
      isLoading: false,
    });
    if (ret.ok) {
      commit('SET_EDITE_DETAIL', ret.data);
    } else {
      commit('SET_EDITE_DETAIL', {});
      Message.error(ret.msg || '获取编辑信息失败');
    }
  },
  async lockEdite({ commit }, data) {
    const ret = await axios.post('/dataapi/dedite/lock', data, {
      isLoading: false,
    });
    if (ret.ok) {
      commit('SET_EDITE_DETAIL', ret.data);
      Message.success('编辑信息锁定成功');
    } else {
      commit('SET_EDITE_DETAIL', {});
      Message.error(ret.msg || '编辑信息锁定失败');
    }
  },
  async unlockEdite({ commit }, data) {
    const ret = await axios.post('/dataapi/dedite/unlock', data, {
      isLoading: false,
    });
    if (ret.ok) {
      commit('SET_EDITE_DETAIL', {});
    } else {
      Message.error(ret.msg || '编辑信息解锁失败');
    }
  },
};
const getters = {
  editeDetail: state => state.editeDetail,
};

export default{
  state, mutations, actions, getters,
};
