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
        el-button 我申请的
        el-button 申请我的
      .process-list
        el-table(height='160')
</template>
<style lang="scss">
  .mine-header{
    background: $white;
    border: 1px solid $border;
    border-radius: $borderRadius;
    height: 200px;
    padding: 10px;
  }
</style>
