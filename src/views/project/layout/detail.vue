<template lang="pug">
  .project-detail
    project-header(:is-edite='isEdite',:search='searchInterface',@search='resetCurrentPage',@submit='updateProject')
    project-main(:is-edite='isEdite',:search='searchInterface',@delete='deleteInterface')
</template>
<script>
import { mapGetters } from 'vuex';
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
      autoSaveTimeout: 4 * 60 * 1000,
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
    $route: {
      handler() {
        this.loadProjectData();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'interfaceData',
      'editeDetail',
      'userInfo',
    ]),
  },
  async created() {
    await this.loadProjectData();
    await this.resetCurrentPage();
  },
  beforeRouteLeave(to, from, next) {
    if (from.params.autoSaveTimer) clearTimeout(from.params.autoSaveTimer);
    next();
  },
  mounted() {
    
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
    // 加载项目数据
    async loadProjectData() {
      this.isEdite = /edite/.test(this.$route.path);
      const projectId = Number(this.$route.params.id);
      await this.$store.dispatch('getProjectById', projectId);
      if (this.isEdite && this.currentProject.id) {
        if (this.currentProject.power < 2) {
          this.$message.error('您没有编辑该项目的权限');
          this.$router.push(`/project/detail/${this.currentProject.id}`);
          return;
        } else if (!/^\d+$/.test(this.currentProject.editeId)) {
          await this.$store.dispatch('createEdite', { kind: 0, target: projectId });
          await this.$store.dispatch('getProjectById', projectId);
        } else if (this.currentProject.islock === 1 && this.currentProject.editor !== this.userInfo.id) {
            this.$message.error(`该项目正在被${this.currentProject.editorName}编辑，您暂时无法编辑！`);
            this.$router.push(`/project/detail/${this.currentProject.id}`);
            return;
        } else {
          await this.$store.dispatch('lockEdite', this.currentProject.editeId);
          await this.$store.dispatch('getProjectById', projectId);
        }
        this.beginAutoSaveTimer();
      } else {
        this.closeTimer();
      }
    },
    closeTimer() {
      if (this.$route.params.autoSaveTimer) clearTimeout(this.$route.params.autoSaveTimer);
    },
    beginAutoSaveTimer() {
      this.closeTimer();
      this.$route.params.autoSaveTimer = setTimeout(() => {
        this.updateProject();
      }, this.autoSaveTimeout);
    },
    async updateProject() {
      this.closeTimer();
      if (this.currentProject.power < 2) {
        this.$message.error('您没有项目修改权限');
        return;
      }
      await this.$store.dispatch('updateProject', this.currentProject);
      this.beginAutoSaveTimer();
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
