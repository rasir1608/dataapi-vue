<template lang="pug">
  .signin
    .form-item-5
      .label 帐号：
      .input 
        el-input(v-model='account' placeholder='请输入帐号',type='text')
    .form-item-5
      .label 密码：
      .input 
        el-input(v-model='password' placeholder='请输入密码',type='password')
    .submit
      el-button(type='primary') 确定
</template>
<script>
export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
};
</script>

