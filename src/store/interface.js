import axios from '@/http';
import { Message } from 'element-ui';
import router from '@/router';

const state = {
  // 项目详情中接口列表
  interfaceData: {
    list: [],
    total: 0,
  },
};
const mutations = {
  SET_INTERFACE_DATA(state, interfaceData) {
    state.interfaceData = interfaceData;
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
};
const getters = {
  interfaceData: state => state.interfaceData,
};

export default{
  state, mutations, actions, getters,
};
