<template lang="pug">
  .signin
    .form-item-5
      .label 帐号：
      .input(:class='checkSignin("account")')
        el-input(v-model='signinData.account' placeholder='请输入帐号',type='text',autofocus)
    .form-item-5
      .label 密码：
      .input(:class='checkSignin("password")')
        el-input(v-model='signinData.password' placeholder='请输入密码',type='password')
    .form-item-5.signcode
      .label 验证码：
      .input(:class='signcodeOk ? "input-success":"input-error"')
        el-input(v-model='signcode' placeholder='请输入验证码',@blur='checkSignCode')
        <img border=0 :src="signCodeSrc" @click="myReload" style="cursor: pointer">
    .submit
      el-button(type='primary',@click='submit') 确定
</template>
<script>
import { mapGetters } from 'vuex';
import { checkSignin } from '@/check/user';

export default {
  data() {
    return {
      signcode: '',
      signCodeSrc: `/dataapi/duser/getVerificationCode?${Date.now()}`,
      signinData: {
          account: '',
          password: '',
      },
    };
  },
  computed: {
    ...mapGetters([
      'signcodeOk',
    ]),
  },
  created() {
    this.myReload();
  },
  methods: {
    submit() {
      if (!this.signcodeOk) {
        this.$message.error('请输入正确的验证码');
        return;
      }
      const checkFuns = checkSignin(this.signinData, true);
      if (Object.values(checkFuns).every(fun => fun())) {
        this.$store.dispatch('userSignin', this.signinData);
      }
    },
    checkSignin(tag) {
      return checkSignin(this.signinData, false)[tag]() ? 'input-success' : 'input-error';
    },
    myReload() {
      this.$store.commit('SET_SIGN_CODE_OK', false);
      this.signCodeSrc = `/dataapi/duser/getVerificationCode?${Date.now()}`;
    },
    async checkSignCode() {
      this.signcode = this.trimStr(this.signcode);
      if (this.signcode === '') return;
      await this.$store.dispatch('checkSignCode', this.signcode);
    },
  },
};
</script>

<style lang="scss">
.signcode{
  .input{
    display: flex;
    align-items: center;
    img{
      width: 100px;
      margin-left: 10px;
    }
  }
}
</style>
