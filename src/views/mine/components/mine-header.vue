<template lang="pug">
  .mine-header
    .mine-info
      img(:src='"."+(userInfo.headerurl || defaultHeader)')
      .info-detail
        .info-show
          .form-item-2
            .label 帐号：
            .input {{userInfo.account}}
          .form-item-2
            .label 昵称：
            .input {{userInfo.name}}
        .info-acitons
          el-upload(:action="uploadHeaderUrl",
                  :multiple='false',
                  :show-file-list='false',
                  name='file',
                  :data='headerData',
                  :before-upload='beforeUploadHeader',
                  :on-success='uploadHeaderSuccess',
                  :on-error='uploadHeaderError')
            el-button 上传新头像
          el-button(@click='passwordShow = true') 修改密码
          el-button(type='primary',@click='userNameShow = true') 修改昵称
    .mine-process
      .process-actions
        el-button(:type='isMyApply ? "primary":""',@click="isMyApply = true") 我申请的
        el-button(:type='isMyApply ? "":"primary"',@click="isMyApply = false") 申请我的
      .process-list
        el-table.process-table(v-if='isMyApply',height='180',:data='myApplingProjects', style="width: 100%")
          el-table-column(type='index',label='序号',width='50')
          el-table-column(prop='projectName',label='项目名称',min-width='70',show-overflow-tooltip)
          el-table-column(prop='projectId',label='项目编号',min-width='70',show-overflow-tooltip)
          el-table-column(prop='projectCreatorName',label='创建人',min-width='70',show-overflow-tooltip)
          el-table-column(prop='remarks',label='备注',min-width='130',show-overflow-tooltip)
          el-table-column(prop='createTime',label='申请时间',min-width='90',show-overflow-tooltip)
            span(slot-scope='scope') {{scope.row.createTime | formatDate('YYYY-MM-DD')}}
          el-table-column(label='操作',min-width='60',align='center')
            template(slot-scope='scope')
              el-button(type='text',icon='el-icon-delete',title='撤销',@click='cancelApply(scope.row)')
        el-table.process-table(v-else,height='180',:data='applyMineProjects', style="width: 100%")
          el-table-column(type='index',label='序号',width='50')
          el-table-column(prop='projectName',label='项目名称',min-width='70',show-overflow-tooltip)
          el-table-column(prop='projectId',label='项目编号',min-width='70',show-overflow-tooltip)
          el-table-column(prop='applicantName',label='申请人',min-width='70',show-overflow-tooltip)
          el-table-column(prop='remarks',label='备注',min-width='130',show-overflow-tooltip)
          el-table-column(prop='createTime',label='申请时间',min-width='90',show-overflow-tooltip)
            span(slot-scope='scope') {{scope.row.createTime | formatDate('YYYY-MM-DD')}}
          el-table-column(label='操作',min-width='60',align='center')
            template(slot-scope='scope')
              el-button(type='text',icon='el-icon-check',title='通过',@click='passProcess(scope.row)')
              el-button(type='text',icon='el-icon-close',title='驳回',@click='dismissProcess(scope.row)')
    el-dialog(title="修改密码",:visible.sync="passwordShow",width="30%")
      div
        .form-item-5
          .label 原密码：
          .input(:class='checkPw("oldPw")')
            el-input(v-model='pwData.oldPw',type='password')
        .form-item-5
          .label 新密码：
          .input(:class='checkPw("newPw")')
            el-input(v-model='pwData.newPw',type='password')
        .form-item-5
          .label 确认密码：
          .input(:class='checkPw("makePw")')
            el-input(v-model='pwData.makePw',type='password')
      div(slot='footer')
        el-button(@click='passwordShow = false') 取消
        el-button(@click='updatePw',type='primary') 确定
    el-dialog(title="修改昵称",:visible.sync="userNameShow",width="30%")
      div
        .form-item-5
          .label 原昵称：
          .input {{userInfo.name}}
        .form-item-5
          .label 新昵称：
          .input(:class='checkUserName()')
            el-input(v-model='newUserName')
      div(slot='footer')
        el-button(@click='userNameShow = false') 取消
        el-button(@click='updateUserName',type='primary') 确定
</template>
<script>
import { mapGetters } from 'vuex';
import { checkChangePw, checkNickName } from '@/check/user';

export default {

  data() {
    return {
      defaultHeader: '/static/image/hello_kiity.jpg',
      uploadHeaderUrl: '/dataapi/duser/upload',
      headerData: { fileName: '' },
      passwordShow: false,
      userNameShow: false,
      isMyApply: true,
      newUserName: '',
      pwData: {
        oldPw: '',
        newPw: '',
        makePw: '',
      },
    };
  },
  watch: {
    passwordShow(show) {
      if (!show) {
        this.pwData = {
            oldPw: '',
            newPw: '',
            makePw: '',
          };
      }
    },
    userNameShow(show) {
      if (!show) {
        this.newUserName = '';
      }
    },
    isMyApply() {
      this.updateProjectList();
    },
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'myApplingProjects',
      'applyMineProjects',
    ]),
  },
  mounted() {
     this.updateProjectList();
  },
  methods: {
    // 上传头像之前
    beforeUploadHeader(file) {
      const fileType = file.type;
      if (!/^image\b/.test(fileType)) {
        this.$message.error('请上传图片格式的文件');
        return false;
      }
      this.headerData.fileName = file.name;
      return true;
    },
    // 头像上传成功
    uploadHeaderSuccess(res) {
      if (res.ok) {
        const randHash = `?${Math.floor(Math.random() * 1000000)}`;
        this.userInfo.headerurl = res.data + randHash;
        this.$store.commit('SET_USER_INFO', this.userInfo);
        this.$message.success(res.msg || '头像上传成功');
      } else {
        this.$message.error(res.msg || '头像上传失败');
      }
    },
    // 头像上传失败
    uploadHeaderError(err) {
      this.$message.error(err || '头像上传失败');
    },
    checkPw(tag) {
      return checkChangePw(this.pwData, false)[tag]() ? 'input-success' : 'input-error';
    },
    checkUserName() {
      return checkNickName(this.newUserName, false) ? 'input-success' : 'input-error';
    },
    // 修改昵称
    updateUserName() {
      if (checkNickName(this.newUserName, true)) {
        this.$store.dispatch('updateUserName', this.newUserName);
        this.userNameShow = false;
      }
    },
    // 修改密码
    updatePw() {
      const checkFuns = Object.values(checkChangePw(this.pwData, true));
      const check = checkFuns.every(fun => fun());
      if (check) {
        const { oldPw: oldPassword, newPw: newPassword } = this.pwData;
        this.$store.dispatch('updatePasswrod', {
          oldPassword, newPassword,
        });
        this.passwordShow = false;
      }
    },
    // 更新流程中的项目列表
    updateProjectList() {
      if (this.isMyApply) {
        this.$store.dispatch('getMyApplyProjects');
      } else {
        this.$store.dispatch('getMpplyMineProjects');
      }
    },
    // 撤销项目申请
    cancelApply(row) {
      const vm = this;
      this.$alert('该操作将永久删除该申请流程是否继续？', '提示', {
        showCancelButton: true,
        async callback(action) {
          if (action === 'confirm') {
            await vm.$store.dispatch('deletePower', row.id);
            vm.updateProjectList();
          }
        },
      });
    },
    // 通过流程
    passProcess(row) {
      const vm = this;
      this.$alert('是否确认批准用户申请？', '提示', {
        showCancelButton: true,
        async callback(action) {
          if (action === 'confirm') {
            const { applicantId: userId, projectId } = row;
            await vm.$store.dispatch('passProcess', { userId, projectId });
            vm.updateProjectList();
          }
        },
      });
    },
    // 驳回流程
    dismissProcess(row) {
      const vm = this;
      this.$alert('是否确认驳回用户申请？', '提示', {
        showCancelButton: true,
        async callback(action) {
          if (action === 'confirm') {
            await vm.$store.dispatch('dismissProcess', row.id);
            vm.updateProjectList();
          }
        },
      });
    },
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
          .el-upload{
            margin-right: 5px;
          }
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
            font-size: $titleFont;
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
    .el-dialog{
      .form-item-5{
        .label{
          width: 80px;
          text-align: right;
        }
      }
    }
  }
</style>
