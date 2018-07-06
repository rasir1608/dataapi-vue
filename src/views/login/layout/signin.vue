<template lang="pug">
  .signin
    .form-item-5
      .label 帐号：
      .input(:class='checkSignin("account")')
        el-input(v-model='signinData.account' placeholder='请输入帐号',type='text')
    .form-item-5
      .label 密码：
      .input(:class='checkSignin("password")')
        el-input(v-model='signinData.password' placeholder='请输入密码',type='password')
    .submit
      el-button(type='primary',@click='submit') 确定
</template>
<script>
import { checkSignin } from '@/check/user';

export default {
  data() {
    return {
     signinData: {
        account: '',
        password: '',
     },
    };
  },
  methods: {
    submit() {
      const checkFuns = checkSignin(this.signinData, true);
      if (Object.values(checkFuns).every(fun => fun())) {
        this.$store.dispatch('userSignin', this.signinData);
      }
    },
    checkSignin(tag) {
      return checkSignin(this.signinData, false)[tag]() ? '' : 'input-hint';
    },
  },
};
</script>

