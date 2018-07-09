import axios from '@/http';
import { Message } from 'element-ui';
import router from '@/router';

const state = {
  myProjects: {
    list: [],
    total: 0,
  },
  currentProject: {},
  marketProjectList: {
    list: [],
    total: 0,
  },
  proSaveLoading: false,
};
const mutations = {
  SET_MY_PROJECTS(state, myProjects) {
    state.myProjects = myProjects;
  },
  SET_CURRENT_PROJECT(state, currentProject) {
    state.currentProject = currentProject;
  },
  SET_MARKET_PROJECT_LIST(state, marketProjectList) {
    state.marketProjectList = marketProjectList;
  },
  SET_PRO_SAVE_LOADING(state, proSaveLoading) {
    state.proSaveLoading = proSaveLoading;
  },
};
const actions = {
  // 保存项目（包括新建和更新）
  async saveProject(store, data) {
    const ret = await axios.post('/dataapi/dproject/save', data);
    if (ret.ok) {
      const projectId = ret.data.id;
      Message.success('项目新建成功');
      router.push(`/project/edite/${projectId}`);
    } else {
      Message.error(ret.msg || '项目新建失败');
    }
  },

  // 搜索我有权限的项目
  async searchMyProject({ commit }, data) {
    commit('SET_MY_PROJECTS', {
      list: [],
      total: 0,
    });
    const ret = await axios.post('/dataapi/dpower/myProjects', data);
    if (ret.ok) {
      commit('SET_MY_PROJECTS', ret.data);
    } else {
      Message.error(ret.msg || '查询项目列表失败');
    }
  },

  // 所有项目的page分页查询
  async searchAllProjects({ commit }, data) {
    commit('SET_MY_PROJECTS', {
      list: [],
      total: 0,
    });
    const ret = await axios.post('/dataapi/dproject/page', data);
    if (ret.ok) {
      commit('SET_MARKET_PROJECT_LIST', ret.data);
    } else {
      Message.error(ret.msg || '查询项目列表失败');
    }
  },

   // 删除我的项目
  async deleteProject(store, projectId) {
    const ret = await axios.delete(`/dataapi/dproject/${projectId}`);
    if (ret.ok) {
      Message.success('项目删除成功');
    } else {
      Message.error(ret.msg || '项目删除失败');
    }
  },
  
   // 根据ID获取项目信息
  async getProjectById({ commit }, projectId) {
    const ret = await axios.get(`/dataapi/dproject/${projectId}`);
    if (ret.ok) {
      commit('SET_CURRENT_PROJECT', ret.data);
    } else {
      Message.error(ret.msg || '项目信息获取失败');
    }
  },
  // 更新项目信息
  async updateProject({ commit }, project) {
    commit('SET_PRO_SAVE_LOADING', true);
    const ret = await axios.post('/dataapi/dproject/save', project, { isLoading: false });
    commit('SET_PRO_SAVE_LOADING', false);
    if (ret.ok) {
      commit('SET_CURRENT_PROJECT', ret.data);
      Message.success('项目保存成功');
    } else {
      Message.error(ret.msg || '项目保存失败');
    }
  },
   // 手动更新URL信息
   async updateUrl({ commit }, data) {
     const ret = await axios.post('/dataapi/dproject/updateUrl', data);
     if (ret.ok) {
      commit('SET_CURRENT_PROJECT', ret.data);
      Message.success('url修改成功');
    } else {
      Message.error(ret.msg || 'url修改失败');
    }
  },
   // 手动添加项目使用者 userId projectId
  async addUser2project(store, data) {
    const ret = await axios.post('/dataapi/dpower/addUser', data);
    if (ret.ok) {
     Message.success('用户添加成功');
   } else {
     Message.error(ret.msg || '用户添加失败');
   }
  },
   // 手动删除项目中用户
  async removerUser(store, powerId) {
    const ret = await axios.delete(`/dataapi/dpower/${powerId}`);
    if (ret.ok) {
      Message.success('用户删除成功');
    } else {
      Message.error(ret.msg || '用户删除失败');
    }
  },
};
const getters = {
  myProjects: state => state.myProjects,
  currentProject: state => state.currentProject,
  marketProjectList: state => state.marketProjectList,
  proSaveLoading: state => state.proSaveLoading,
};

export default{
  state, mutations, actions, getters,
};
