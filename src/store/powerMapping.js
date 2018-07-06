import axios from '@/http';
import { Message } from 'element-ui';

const state = {
  myApplingProjects: [],
  applyMineProjects: [],
};
const mutations = {
  MY_APPLING_PROJECTS(state, projectList) {
    state.myApplingProjects = projectList;
  },
  APPLY_MINE_PROJECT(state, projectList) {
    state.applyMineProjects = projectList;
  },
};
const actions = {
  async getMyApplyProjects({ commit }) {
    const ret = await axios.get('/dataapi/dpower/myApplying');
    if (ret.ok) {
      commit('MY_APPLING_PROJECTS', ret.data || []);
    } else {
      Message.error(ret.msg || '获取项目列表失败');
    }
  },
  async getMpplyMineProjects({ commit }) {
    const ret = await axios.get('/dataapi/dpower/applyMine');
    if (ret.ok) {
      commit('APPLY_MINE_PROJECT', ret.data || []);
    } else {
      Message.error(ret.msg || '获取项目列表失败');
    }
  },
  // 撤销申请
  async deletePower(store, powerId) {
    const ret = await axios.delete(`/dataapi/dpower/${powerId}`);
    if (ret.ok) {
      Message.success('成功撤回项目申请');
    } else {
      Message.error(ret.msg || '撤回项目申请失败');
    }
  },
  // 通过申请
  async passProcess(store, data) {
    const ret = await axios.post('/dataapi/dpower/addUser', data);
    if (ret.ok) {
      Message.success('用户申请批准');
    } else {
      Message.error(ret.msg || '用户申请批准失败');
    }
  },
  // 驳回用户申请
  async dismissProcess(store, powerId) {
    const ret = await axios.get(`/dataapi/dpower/dismiss/${powerId}`);
    if (ret.ok) {
      Message.success('用户申请驳回');
    } else {
      Message.error(ret.msg || '用户申请驳回失败');
    }
  },

};
const getters = {
  myApplingProjects: state => state.myApplingProjects,
  applyMineProjects: state => state.applyMineProjects,
};

export default{
  state, mutations, actions, getters,
};
