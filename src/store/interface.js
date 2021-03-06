import axios from '@/http';
import { Message } from 'element-ui';
import router from '@/router';

const state = {
  // 项目详情中接口列表
  interfaceData: {
    list: [],
    total: 0,
  },
  currentInterface: {},
  interSaveLoading: false,
};
const mutations = {
  SET_INTERFACE_DATA(state, interfaceData) {
    state.interfaceData = interfaceData;
  },
  SET_CURRENT_INTERFACE(state, currentInterface) {
    state.currentInterface = currentInterface;
  },
  SET_INTER_SAVE_LOADING(state, interSaveLoading) {
    state.interSaveLoading = interSaveLoading;
  },
};
const actions = {
  // 项目中接口列表
  async getInterfaceList({ commit }, data) {
      const ret = await axios.post('/dataapi/dinterface/page', data);
      if (ret.ok) {
      commit('SET_INTERFACE_DATA', ret.data);
    } else {
      Message.error(ret.msg || '接口列表获取失败');
    }
  },

  // 新建接口
  async createInterface(state, data) {
    const ret = await axios.post('/dataapi/dinterface/save', data);
    if (ret.ok) {
      Message.success('接口新建成功');
      router.push(`/project/interface/edite/${ret.data.id}`);
    } else {
      Message.error(ret.msg || '接口新建失败');
    }
  },
  // 删除接口
  async deleteInterface(state, interfaceId) {
    const ret = await axios.delete(`/dataapi/dinterface/${interfaceId}`);
    if (ret.ok) {
      Message.success('接口删除成功');
    } else {
      Message.error(ret.msg || '接口删除失败');
    }
  },
   // 根据ID获取接口详情
   async getInterfaceById({ commit }, interfaceId) {
    const ret = await axios.get(`/dataapi/dinterface/${interfaceId}`);
    if (ret.ok) {
      const inter = {};
      const ci = ret.data;
      Object.keys(ci).forEach((key) => {
        const value = ci[key];
        if (value === null) inter[key] = '';
        else inter[key] = value;
      });
      commit('SET_CURRENT_INTERFACE', inter);
    } else {
      commit('SET_CURRENT_INTERFACE', {});
      Message.error(ret.msg || '接口信息获取失败');
    }
  },
  // 修改接口数据
  async updateInterface({ commit }, data) {
    commit('SET_INTER_SAVE_LOADING', true);
    const ret = await axios.post('/dataapi/dinterface/save', data, { isLoading: false });
    commit('SET_INTER_SAVE_LOADING', false);
    if (ret.ok) {
      Message.success('接口更新成功');
      const inter = {};
      const ci = ret.data;
      Object.keys(ci).forEach((key) => {
        const value = ci[key];
        if (value === null) inter[key] = '';
        else inter[key] = value;
      });
      commit('SET_CURRENT_INTERFACE', inter);
    } else {
      Message.error(ret.msg || '接口更新失败');
    }
  },
};
const getters = {
  interfaceData: state => state.interfaceData,
  currentInterface: state => state.currentInterface,
  interSaveLoading: state => state.interSaveLoading,
};

export default{
  state, mutations, actions, getters,
};
