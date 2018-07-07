<template lang="pug">
  .project-members-dialog
    el-dialog(width="500px",title="项目协作人",:visible.sync="membersShow",@close='beforeClose')
      main
        .add-members(v-if='isEdite')
          el-select(v-model='addUserId',@change='addMember',clearable,remote,filterable,placeholder="请输入用户昵称",:remote-method="getUserList",:loading="loading",default-first-option)
            i.el-icon-search(slot='prefix')
            el-option(v-for="(item,index) in userList4add", :key="index",:label="item.name",:value="item.id")
        .members-list
          el-table.process-table(:data='membersList4project',height='300',style='width:100%')
            el-table-column(type='index',width='50',label='序号')
            el-table-column(prop='userId',label='用户ID')
            el-table-column(prop='userName',label='用户名')
            el-table-column(prop='power',label='权限')
              span(slot-scope='scope') {{scope.row.power | powerMap}}
            el-table-column(v-if='isEdite',label='操作',width='60',align='center')
              i.el-icon-delete(slot-scope='scope',@click='removeUser(scope.row)')
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['show', 'projectId', 'isEdite'],
  data() {
    return {
      membersShow: false,
      loading: false,
      addUserId: '',
      userList: [],
      membersList: [],
    };
  },
  watch: {
    show(val) {
      this.membersShow = val;
      if (val) this.getMembers();
    },
    membersShow(val) {
      this.$emit('update:show', val);
    },
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'userList4add',
      'membersList4project',
    ]),
  },
  created() {
    
  },
  methods: {
    async getMembers() {
      await this.$store.dispatch('getMembers4project', this.currentProject.id);
    },
    async getUserList(query) {
      await this.$store.dispatch('getUserList4add', query);
    },
    async addMember() {
      if (this.membersList4project.findIndex(e => e.id === this.addUserId) > -1) {
        this.$message.error('该用户已经在项目中，无需重复添加');
        return;
      }
      const data = {
        userId: this.addUserId,
        projectId: this.currentProject.id,
      };
      await this.$store.dispatch('addUser2project', data);
      await this.getMembers();
    },
    removeUser(row) {
      const vm = this;
      this.$alert('该操作将永久删除用户，是否继续？', '提示', {
        async callback(action) {
          if (action === 'confirm') {
            await vm.$store.dispatch('removerUser', row.powerId);
            await vm.getMembers();
          } 
        },
      });
    },
    beforeClose() {
      this.addUserId = '';
      this.$store.commit('SET_USER_LIST_4_ADD', []);
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

