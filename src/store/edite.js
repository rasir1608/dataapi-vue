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
  async lockEdite(store, editeId) {
    const ret = await axios.get(`/dataapi/dedite/lock/${editeId}`, {
      isLoading: false,
    });
    if (ret.ok) {
      Message.success('编辑信息已被您锁定成功');
    } else {
      Message.error(ret.msg || '编辑信息锁定失败');
    }
  },
  async unlockEdite(store, editeId) {
    const ret = await axios.get(`/dataapi/dedite/unlock/${editeId}`, {
      isLoading: false,
    });
    if (!ret.ok) {
      Message.error(ret.msg || '编辑信息解锁失败');
    }
  },
  async createEdite(store, data) {
    const ret = await axios.post('/dataapi/dedite/create', data, {
      isLoading: false,
    });
    if (ret.ok) {
      Message.success('编辑信息已被您锁定成功');
    } else {
      Message.error(ret.msg || '编辑信息锁定失败');
    }
  },
};
const getters = {
  editeDetail: state => state.editeDetail,
};

export default{
  state, mutations, actions, getters,
};
