<template lang="pug">
  .signup
    .form-item-5
      .label 帐号：
      .input(:class='checkSignup("account")')
        el-input(v-model='signupData.account' placeholder='请输入帐号',type='text')
    .form-item-5
      .label 密码：
      .input(:class='checkSignup("password")') 
        el-input(v-model='signupData.password' placeholder='请输入密码',type='password')
    .form-item-5
      .label 确认密码：
      .input(:class='checkSignup("makePassWord")') 
        el-input(v-model='signupData.makePassWord' placeholder='请再次输入密码',type='password')
    .submit
      el-button(type='primary',@click='submit') 确定
</template>
<script>
import { checkSignup } from '@/check/user';

export default {
  data() {
    return {
      signupData: {
        account: '',
        password: '',
        makePassWord: '',
      },
    };
  },
  methods: {
    submit() {
      const checkFuns = checkSignup(this.signupData, true);
      if (Object.values(checkFuns).every(fun => fun())) {
        const { account, password } = this.signupData;
        this.$store.dispatch('userSignup', {
          account, 
          password,
        });
      }
    },
    checkSignup(tag) {
      return checkSignup(this.signupData, false)[tag]() ? '' : 'input-hint';
    },
  },
};
</script>

