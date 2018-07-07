<template lang="pug">
  .interface-footer
    el-button(@click='$emit("action","back")') 返回
    el-button(v-if='isEdite',type='primary',@click='$emit("action","delete")') 删除接口
    el-button(v-else,type='primary',@click='$emit("action","edite")') 编辑接口
</template>
<script>
export default {
  props: ['isEdite'],
};
</script>

<style lang="scss">
  .interface-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    background: $white;
    border: 1px solid $border;
    padding: 20px;
    .edite-btns{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

