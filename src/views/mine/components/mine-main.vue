<template lang="pug">
  .mine-main
    .mine-projects
      .mine-projects-form
        .form-left
          .form-item-1
            .label 我的项目：
            .input 
              el-input(placeholder='输入项目名称',v-model='newProjectName',@blur='newProjectName = trimStr(newProjectName)')
          el-button(type='primary',@click='createProject') 创建新项目
        .form-right
          el-input(ref="projectNameSearchInputWrap",placeholder='搜索项目名称',v-model='searchProject.name', suffix-icon="el-icon-search",@blur='searchProject.name = trimStr(searchProject.name)')
          el-button(type='primary',@click='resetPageAndSearch') 搜索
      .mine-projects-table(v-if='myProjects.list.length')
        list-item(v-for='(item,index) in myProjects.list',:key='index',:item='item',@edite='editeProject(item)',@delete='deleteProject(item)')
      .mine-projects-empty(v-else) 暂无数据
    .mine-projects-pagination(v-if='myProjects.total') 
      el-pagination(layout="total, prev, pager, next, jumper",:page-size="searchProject.size",:current-page.sync ="searchProject.currentPage",:total="myProjects.total")
</template>
<script>
import ListItem from '@/views/components/list-item';
import { checkProjectName } from '@/check/project';
import { mapGetters } from 'vuex';


export default {
  components: {
    ListItem,
  },
  data() {
    return {
      newProjectName: '',
      searchProject: {
        name: '',
        size: 5,
        currentPage: 1,
      },
    };
  },
  watch: {
    'searchProject.currentPage': {
      handler() {
        this.searchProjectList();
      },
    },
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'myProjects',
    ]),
  },
  created() {
    this.searchProject.size = Math.floor(window.innerWidth / 220);
    this.resetPageAndSearch();
  },
  mounted() {
    this.bindKeyEnter(this.$refs.projectNameSearchInputWrap);
  },
  methods: {
    createProject() {
      if (checkProjectName(this.newProjectName, true)) {
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
      }
    },
    searchProjectList() {
      const data = {};
      Object.keys(this.searchProject).forEach((key) => {
        if (this.searchProject[key] || this.searchProject[key] === 0) data[key] = this.searchProject[key];
      });
      this.$store.dispatch('searchMyProject', data);
    },
    resetPageAndSearch() {
      if (this.searchProject.currentPage === 1) this.searchProjectList();
      else this.searchProject.currentPage = 1;
    },
    bindKeyEnter(wrapEle) {
      const projectNameSearchInput = wrapEle.$refs.input;
      projectNameSearchInput.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
          this.resetPageAndSearch();
        }
      });
    },
    editeProject(item) {
      console.log(91, item);
      this.$router.push(`/project/edite/${item.projectId}`);
    },
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
            vm.searchProjectList();
          }
        },
      });
    },
  },
};
</script>
<style lang="scss">
.mine-main{
  margin-top: 20px;
  .mine-projects{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    .mine-projects-form{
      padding-right: 20px;
      border-bottom: 1px solid $border;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .form-left{
        display: flex;
        flex: 1;
        align-items: center;
        .el-button{
          padding: 0 10px;
        }
      }
      .form-right{
        display: flex;
        align-items: center;
      }
    }
    .mine-projects-table{
      padding: 10px;
      display: flex;
    }
    .mine-projects-empty{
      padding: 20px;
      font-size: $titleFont;
      text-align: center;
    }
  }
  .mine-projects-pagination {
    background: $white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    border: 1px solid $border;
    margin: 20px 0;
    border-radius: $borderRadius;
  }
}
</style>
