<template lang="pug">
  .project-detail
    project-header(:is-edite='isEdite',:search='searchInterface',@search='resetCurrentPage')
    project-main(:is-edite='isEdite',:search='searchInterface',@delete='deleteInterface')
</template>
<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { Message } from 'element-ui';
import ProjectHeader from '../components/project-header';
import ProjectMain from '../components/project-main';

export default {
  components: {
    ProjectHeader,
    ProjectMain,
  },
  data() {
    return {
      isEdite: false,  
      searchInterface: {
        id: '',
        name: '',
        size: 10,
        currentPage: 1,
      },
    };
  },
  watch: {
    'searchInterface.size': {
      handler() {
       this.resetCurrentPage();
      },
      deep: true,
    },
    'searchInterface.currentPage': {
      handler() {
        this.getInterfaceList();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'interfaceData',
    ]),
  },
  async beforeRouteEnter(to, from, next) {
    const isEdite = /edite/.test(to.path);
    const projectId = to.params.id;
    await store.dispatch('getProjectById', projectId);
    const project = store.state.project.currentProject;
    if (isEdite && project.power < 2) {
      Message.error('您没有编辑该项目的权限');
      next(false);
      return;
    }
    next((vm) => {
      vm.isEdite = isEdite;
    });
  },
  mounted() {
    this.resetCurrentPage();
  },
  methods: {
    async getInterfaceList() {
      const data = {};
      Object.keys(this.searchInterface).forEach((key) => {
        if (this.searchInterface[key] || this.searchInterface[key] === 0)data[key] = this.searchInterface[key];
      });
      data.project = this.currentProject.id;
      await this.$store.dispatch('getInterfaceList', data);
      if ((this.interfaceData.list.length === 0 && this.interfaceData.total > 0) && this.searchInterface.currentPage > 1) this.searchInterface.currentPage -= 1;
    },
    async resetCurrentPage() {
      if (this.searchInterface.currentPage === 1) await this.getInterfaceList();
      else this.searchInterface.currentPage = 1;
    },
    deleteInterface(row) {
      const vm = this;
      this.$alert('该操作将永久删除接口信息，是否继续？', '提示', {
        showCancelButton: true,
        async callback(action) {
          if (action === 'confirm') {
            await vm.$store.dispatch('deleteInterface', row.id);
            await vm.getInterfaceList();
          }
        },
      });
    },
  },
};
</script>
<style lang="scss">
.project-detail{
  width: 100%;
  .project-main{
    margin:20px 0; 
  }
}
</style>
