<template lang="pug">
  .interface-footer
    el-button 返回
    el-button(type='primary') 编辑
    el-button(type='primary') 保存
    el-button(type='primary') 删除接口
</template>
<style lang="scss">
  .interface-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    background: $white;
    border: 1px solid $border;
    padding: 20px;
  }
</style>

