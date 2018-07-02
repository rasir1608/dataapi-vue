<template lang="pug">
  .project-main
    .project-interface-list
      .project-interface-list-title
        span 接口列表：
      .project-interface-list-table
        el-table.interface-table(:data='InterfaceData.list',stripe)
          el-table-column(label='序号',type='index')
          el-table-column(label='接口ID',prop='interfaceId',min-width='60')
          el-table-column(label='接口名称',prop='interfaceName',min-width='100',show-overflow-tooltip)
          el-table-column(label='Method',prop='method',min-width='70')
          el-table-column(label='URL',prop='url',min-width='200',show-overflow-tooltip)
          el-table-column(label='Content-type',prop='contentType',min-width='150',show-overflow-tooltip)
          el-table-column(label='描述',prop='remarks',min-width='200',show-overflow-tooltip)
          el-table-column(label='创建人',prop='creator',min-width='80',show-overflow-tooltip)
          el-table-column(label='创建时间',prop='createTime',min-width='100')
          el-table-column(label='操作',min-width='150',align='center')
            template(slot-scope='scope')
              el-button(type='text',icon='el-icon-edit',title='编辑')
              el-button(type='text',icon='el-icon-delete',title='删除')
              el-button(type='text',icon='el-icon-view',title='查看详情')
    .project-interface-pagination
      el-pagination(layout="total, prev, pager, next,sizes, jumper",:page-sizes="[10, 20, 30, 40]",:page-size="searchInterface.size",:current-page="searchInterface.currentPage",:total="InterfaceData.total")
</template>
<script>
export default {
  data() {
    return {
      searchInterface: {
        size: 10,
        currentPage: 1,

      },
      InterfaceData: {
        list: [
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
          {
              interfaceId: '10001',
              interfaceName: '登录接口',
              method: 'POST',
              url: '/dataapi/user/login',
              contentType: 'Application/json',
              remarks: ' 此处为项目描述：项目描述',
              creator: 'rasir',
              createTime: '2018-06-30',
          },
        ],
        total: 20,
      },
    };
  },
};
</script>
<style lang="scss">
.project-main{
  .project-interface-list{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    .project-interface-list-title{
      padding:10px 20px;
      border-bottom: 1px solid $border;
      font-size: $normalFont;
    }
    .project-interface-list-table{
      padding: 10px 20px;
      .el-button{
        padding: 0;
        font-size: $bigFont;
        .el-icon-delete{
          color: $red;
        }
        .el-icon-view{
          color: $black;
        }
      }
    }
  }
  .project-interface-pagination{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
