<template lang="pug">
  .project-market
    .project-form
      .project-form-items
        .form-item-1
          .label 项目ID：
          .input 
            el-input(v-model='searchProject.projectId',placeholder='请输入项目ID')
        .form-item-1
          .label 项目名称：
          .input 
            el-input(v-model='searchProject.projectId',placeholder='请输入项目名称')
        .form-item-1
          .label 创建人昵称：
          .input 
            el-input(v-model='searchProject.projectId',placeholder='请输入创建人昵称')
      .project-form-submits
        el-button 重置
        el-button(type='primary') 查询
    .project-create
      .form-item-1
        el-input.input(v-model='newProject.name',placeholder='请输入项目名称')
      el-button(type='primary') 新建项目
    .project-list
      .project-list-title
        span 项目市场：
      .project-list-table
        list-item(v-for='(item,index) in projectData.list',:key='index',:item='item')
    .project-list-pagination
      el-pagination(layout="total, prev, pager, next, jumper",:page-size="searchProject.size",:current-page="searchProject.currentPage",:total="projectData.total")
</template>
<script>
import ListItem from '@/views/components/list-item';

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      searchProject: {
        size: 5,
        currentPage: 1,
        projectId: '',
        projectName: '',
        creator: '',
      },
      newProject: {
        name: '',
      },
       projectData: {
        list: [
          {
              projectName: '项目1',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
           {
              projectName: '项目1',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              projectName: '项目1',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              projectName: '项目1',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          }, {
              projectName: '项目1',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
        ],
        total: 20,
      },
    };
  },
  created() {
    this.searchProject.size = Math.floor(window.innerWidth / 220);
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
      justify-content: space-between;
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
