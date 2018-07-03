<template lang="pug">
  .models-dialog
    el-dialog(:title="model.title",:visible.sync="modelShow",width="30%")
      main
        .form-item-5
          .label url:
          .input
            el-input(v-model='model.url')
      footer(slot="footer")
        el-button(@click='modelShow = false') 取消
        el-button(type='primary') 修改
        el-upload(:action="model.path",
                  :multiple='false',
                  :show-file-list='false',
                  name='file',
                  :headers='{"Content-type":"multipart/form-data"}',
                  :before-upload='beforeUpload',
                  :on-success='uploadSuccess',
                  :on-error='uploadError')
          el-button(type='primary') 上传
</template>
<script>
export default {
  props: ['model', 'show'],
  data() {
    return {
      modelShow: false,
    };
  },
  watch: {
    show(val) {
       this.modelShow = val;
    },
    modelShow(val) {
      this.$emit('update:show', val);
    },
  },
  methods: {
    beforeUpload(file) {
      const fileType = file.type;
      console.log(79, fileType);
      if (!/^image\b/.test(fileType)) {
        this.$message.error('请上传图片格式的文件');
        return false;
      } 
      return true;
    },
    uploadSuccess(res) {
      console.log(46, res);
    },
    uploadError(err) {
      console.log(err);
    },
  },
};
</script>

<style lang="scss">
.models-dialog{
  .el-dialog{
    .el-input{
      input{
        border-left: 0;
        border-top: 0;
        border-right: 0;
      }
    }
    footer{
      display: flex;
    }
  }
}
</style>
