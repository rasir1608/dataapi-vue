<template lang="pug">
  .project-market
    .project-form
      .project-form-items
        .form-item-1
          .label 项目ID：
          .input 
            el-input(v-model='searchProject.id',placeholder='请输入项目ID',@blur='searchProject.id = trimStr(searchProject.id)')
        .form-item-1
          .label 项目名称：
          .input 
            el-input(v-model='searchProject.name',placeholder='请输入项目名称',@blur='searchProject.name = trimStr(searchProject.name)')
        .form-item-1
          .label 创建人昵称：
          .input 
            el-input(v-model='searchProject.creatorName',placeholder='请输入创建人昵称',@blur='searchProject.creatorName = trimStr(searchProject.creatorName)')
      .project-form-submits
        el-button(@click='resertData') 重置
        el-button(type='primary',@click='resetCurrentPage') 查询
    .project-create
      .form-item-1
        el-input.input(v-model='newProjectName',placeholder='请输入项目名称',@blur='newProjectName = trimStr(newProjectName)')
      el-button(type='primary',@click='createNewProject') 新建项目
    .project-list
      .project-list-title
        span 项目市场：
      .project-list-table(v-if='marketProjectList.list.length')
        list-item(v-for='(item,index) in marketProjectList.list',:key='index',:item='item',@delete='deleteProject(item)',@apply='applyProject(item)')
      .project-projects-empty(v-else) 暂无数据
    .project-list-pagination(v-if='marketProjectList.total')
      el-pagination(layout="total, prev, pager, next, jumper",:page-size="searchProject.size",:current-page.sync="searchProject.currentPage",:total="marketProjectList.total")
</template>
<script>
import ListItem from '@/views/components/list-item';
import { mapGetters } from 'vuex';

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      searchProject: {
        size: '',
        currentPage: 1,
        id: '',
        namme: '',
        creatorName: '',
      },
      newProjectName: '',
       projectData: {
        list: [],
        total: 0,
      },
    };
  },
  watch: {
    'searchProject.currentPage': {
      handler() {
        this.searchAllProjects();
      },
    },
  },
  computed: {
    ...mapGetters([
      'marketProjectList',
      'userInfo',
    ]),
  },
  created() {
    this.searchProject.size = Math.floor(window.innerWidth / 220);
    this.resetCurrentPage();
  },
  methods: {
    async searchAllProjects() {
      const data = {};
      Object.keys(this.searchProject).forEach((key) => {
        if (this.searchProject[key] || this.searchProject[key] === 0) data[key] = this.searchProject[key];
      });
      await this.$store.dispatch('searchAllProjects', data);
      if ((this.marketProjectList.list.length === 0 && this.marketProjectList.total > 0) && this.searchProject.currentPage > 1) this.searchProject.currentPage -= 1;
    },
     async resetCurrentPage() {
      if (this.searchProject.currentPage === 1) await this.searchAllProjects();
      else this.searchProject.currentPage = 1;
    },
    // 重置数据
    resertData() {
      Object.assign(this.searchProject, {
        id: '',
        name: '',
        creatorName: '',
      });
      this.resetCurrentPage();
    },
    // 新建项目
    createNewProject() {
      if (/^\s*$/.test(this.newProjectName)) {
        this.$message.error('请填写新项目的名称');
        return;
      }
      const newProject = {
          name: this.newProjectName,
          creator: this.userInfo.id,
          modifier: this.userInfo.id,
          remarks: '',
          model: '',
          ui: '',
          web: '',
          createTime: Date.now(),
          updateTime: Date.now(),
        };
      this.$store.dispatch('saveProject', newProject);
    },
    // 删除项目
    deleteProject(item) {
      if (item.power !== 5) {
        this.$message.error('只有项目管理员才能删除项目');
        return;
      }
      const vm = this;
      this.$alert('该操作将永久删除该项目，以及相关数据，是否继续？', '提示', {
        showCancelButton: true,
        async callback(action) {
          if (action === 'confirm') {
            await vm.$store.dispatch('deleteProject', item.projectId);
            await vm.searchAllProjects();
          }
        },
      });
    },
    // 申请项目
    async applyProject(item) {
      await this.$store.dispatch('applyProject', item.projectId);
      await this.resetCurrentPage();
    },
  },
};
</script>

<style lang="scss">
.project-market{
  flex: 1;
  .project-form{
    background: $white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: $borderRadius;
    .project-form-items{
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
  .project-create{
    background: $white;
    margin: 20px 0;
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: $borderRadius;
    .el-button{
      height: 30px;
    }
  }
  .project-list{
    background: $white;
    border-radius: $borderRadius;
    .project-list-title{
      padding:0 10px;
      border-bottom: 1px solid $border;
    }
    .project-list-table{
      padding: 10px 10px 20px;
      display: flex;
      align-items: center;
    }
    .project-projects-empty{
      padding: 20px;
      font-size: $titleFont;
      text-align: center;
    }
  }
  .project-list-pagination{
    padding: 20px;
    background: $white;
    border-radius: $borderRadius;
    margin: 20px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: initial;
  }
}
</style>
