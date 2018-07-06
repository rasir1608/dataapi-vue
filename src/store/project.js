import axios from '@/http';
import { Message } from 'element-ui';
import router from '@/router';

const state = {
  myProjects: {
    list: [],
    total: 0,
  },
  currentProject: {},
  
};
const mutations = {
  SET_MY_PROJECTS(state, myProjects) {
    state.myProjects = myProjects;
  },
  SET_CURRENT_PROJECT(state, currentProject) {
    state.currentProject = currentProject;
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
  // 根据ID获取项目信息
  async updateProject({ commit }, project) {
    const ret = await axios.post('/dataapi/dproject/save', project);
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
};
const getters = {
  myProjects: state => state.myProjects,
  currentProject: state => state.currentProject,
  
};

export default{
  state, mutations, actions, getters,
};
