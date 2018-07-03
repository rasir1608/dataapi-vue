<template lang="pug">
  .project-members-dialog
    el-dialog(title="项目协作人",:visible.sync="membersShow",width="30%")
      main
        .add-members
          el-select(v-model='account',remote,filterable,placeholder="请输入关键词",:remote-method="remoteMethod",:loading="loading",default-first-option)
            i.el-icon-search(slot='prefix')
            el-option(v-for="(item,index) in userList", :key="item.value",:label="item.label",:value="item.value")
        .members-list
          el-table.process-table(:data='membersList',height='300',style='width:100%')
            el-table-column(type='index',width='50',label='序号')
            el-table-column(prop='userId',label='用户ID')
            el-table-column(prop='userName',label='用户名')
            el-table-column(label='操作',width='60',align='center')
              i.el-icon-delete(slot-scope='scope',@click='removeUser(scope.row)')
</template>
<script>
export default {
  props: ['show', 'projectId'],
  data() {
    return {
      membersShow: false,
      loading: false,
      account: '',
      userList: [],
      membersList: [
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
        {
          userId: '10001',
          userName: 'rasir001',
        },
      ],
    };
  },
  watch: {
    show(val) {
      this.membersShow = val;
    },
    membersShow(val) {
      this.$emit('update:show', val);
    },
  },
  methods: {
    remoteMethod(query) {
      console.log(query);
    },
    removeUser(row) {
      this.$alert('该操作将永久删除用户，是否继续？', '提示', {
        callback(action) {
          console.log(action, row);
          if (action === 'confirm') {
            console.log('确定');
          } else if (action === 'cancel') {
            console.log('取消');
          }
        },
      });
    },
  },
};
</script>
<style lang="scss">
.project-members-dialog{
  main{
    padding: 20px;
    border: 1px dashed $border;
    border-left: 0;
    border-right: 0;
    .add-members{
      .el-select{
        width: 100%;
      }
    }
    .process-table{
      margin: 20px 0;
      * {
        line-height: $lineHeight;
      }
      i{
        color: $red;
        font-size: $titleFont;
        cursor: pointer;
      }
    }
  }
}
</style>

