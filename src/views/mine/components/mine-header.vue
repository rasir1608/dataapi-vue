<template lang="pug">
  .mine-header
    .mine-info
      img(src='/static/image/hello_kiity.jpg')
      .info-detail
        .info-show
          .form-item-2
            .label 帐号：
            .input rasir
          .form-item-2
            .label 昵称：
            .input rasir
        .info-acitons
          el-button 上传新头像
          el-button 修改密码
          el-button(type='primary') 修改昵称
    .mine-process
      .process-actions
        el-button(type='primary') 我申请的
        el-button 申请我的
      .process-list
        el-table.dataapi-table(height='180',:data='PowerData.list', style="width: 100%")
          el-table-column(type='index',label='序号',width='50')
          el-table-column(prop='projectName',label='项目名称',min-width='70',show-overflow-tooltip)
          el-table-column(prop='projectId',label='项目编号',min-width='70',show-overflow-tooltip)
          el-table-column(prop='userName',label='申请人',min-width='70',show-overflow-tooltip)
          el-table-column(prop='remarks',label='备注',min-width='130',show-overflow-tooltip)
          el-table-column(prop='createTime',label='申请时间',min-width='90',show-overflow-tooltip)
          el-table-column(label='操作',min-width='60',align='center')
            template(slot-scope='scope')
              el-button(type='text',icon='el-icon-check',title='通过')
              el-button(type='text',icon='el-icon-close',title='驳回')
</template>
<script>
export default {
  data() {
    return {
      PowerData: {
        list: [
          {
            projectName: '项目1',
            projectId: 10001,
            userName: 'rasir',
            remarks: '这是第N个测试...',
            createTime: '2018-06-04',
          },
           {
            projectName: '项目1',
            projectId: 10001,
            userName: 'rasir',
            remarks: '这是第N个测试...',
            createTime: '2018-06-04',
          },
           {
            projectName: '项目1',
            projectId: 10001,
            userName: 'rasir',
            remarks: '这是第N个测试...',
            createTime: '2018-06-04',
          },
           {
            projectName: '项目1',
            projectId: 10001,
            userName: 'rasir',
            remarks: '这是第N个测试...',
            createTime: '2018-06-04',
          },
           {
            projectName: '项目1',
            projectId: 10001,
            userName: 'rasir',
            remarks: '这是第N个测试...',
            createTime: '2018-06-04',
          },
           {
            projectName: '项目1',
            projectId: 10001,
            userName: 'rasir',
            remarks: '这是第N个测试...',
            createTime: '2018-06-04',
          },
        ],
        total: 20,
      },
    };
  },
};
</script>

<style lang="scss">
  .mine-header{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    height: 200px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mine-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 400px;
      img{
        width: 160px;
        height: 160px;
        border: 1px solid $border;
        border-radius: $borderRadius;
      }
      .info-detail{
        padding-left: 10px;
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .info-show{
          .form-item-2{
            padding: 0;
          }
        }
        .info-acitons{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .el-button{
            margin: 0;
            margin-right: 5px;
            padding:0 10px;
            &:last-of-type{
              margin: 0;
            }
          }
        }
      }
    }
    .mine-process{
      min-width: 700px;
      display: flex;
      .process-actions{
        display: flex;
        flex-direction: column;
        margin-right: 5px;
        .el-button{
          margin: 0;
          padding: 0;
          width: 80px;
          height: 30px;
          line-height: 30px;
          span{
            line-height: 30px;
          }
          &:last-of-type{
            margin-top: 5px;
          }
        }
      }
      .process-list{
        flex: 1;
        border: 1px solid $border;
        border-radius: $borderRadius;
        .el-button{
          padding: 0;
          margin: 0;
          line-height: 30px;
          i{
            padding: 2px;
            transition: all 0.2s ease;
            &:before{
              font-weight: 600;
            }
          }
        }
        .el-icon-check{
          color: $success;
          &:hover{
            background: $success;
            color: $white;
            border-radius: $borderRadius;
          }
        }
        .el-icon-close{
          color: $deleteRed;
          &:hover{
            background: $deleteRed;
            color: $white;
            border-radius: $borderRadius;
          }
        }
      }
    }
  }
</style>
