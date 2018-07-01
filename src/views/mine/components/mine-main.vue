<template lang="pug">
  .mine-main
    .mine-projects
      .mine-projects-form
        .form-left
          .form-item-1
            .label 我的项目：
            .input 
              el-input(placeholder='请输入项目名称',v-model='searchProject.name', suffix-icon="el-icon-search")
          el-button(type='primary') 创建新项目
      .mine-projects-table
        list-item(v-for='(item,index) in projectData.list',:key='index',:item='item')
    .mine-projects-pagination 
      el-pagination(layout="total, prev, pager, next, jumper",:page-size="searchProject.size",:current-page="searchProject.currentPage",:total="projectData.total")
</template>
<script>
import ListItem from '@/views/components/list-item';
export default {
  components:{
    ListItem
  },
  data(){
    return {
      searchProject:{
        name:'',
        size:5,
        currentPage:1
      },
      projectData:{
        list:[
          {
              projectName:'项目1',
              remarks:' 此处为项目描述：项目描述',
              creator:'rasir',
              createTime:'2018-06-30',
          },
          {
              projectName:'项目1',
              remarks:' 此处为项目描述：项目描述',
              creator:'rasir',
              createTime:'2018-06-30',
          },
          {
              projectName:'项目1',
              remarks:' 此处为项目描述：项目描述',
              creator:'rasir',
              createTime:'2018-06-30',
          },{
              projectName:'项目1',
              remarks:' 此处为项目描述：项目描述',
              creator:'rasir',
              createTime:'2018-06-30',
          }
          ,{
              projectName:'项目1',
              remarks:' 此处为项目描述：项目描述',
              creator:'rasir',
              createTime:'2018-06-30',
          }

        ],
        total:20
      }
    }
  }
}
</script>
<style lang="scss">
.mine-main{
  margin-top: 20px;
  .mine-projects{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    .mine-projects-form{
      border-bottom: 1px solid $border;
      .form-left{
        display: flex;
        align-items: center;
        .el-button{
          padding: 0 10px;
        }
      }
    }
    .mine-projects-table{
      padding: 10px;
      display: flex;
      justify-content: space-between;
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
