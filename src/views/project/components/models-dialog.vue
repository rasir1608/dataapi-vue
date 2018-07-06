<template lang="pug">
  .models-dialog
    el-dialog(:title="model.title",:visible.sync="modelShow",width="30%")
      main
        .form-item-5
          .label url：
          .input
            el-input(v-model='model.url',@blur='model.url = trimStr(model.url)')
      footer(slot="footer")
        el-button(@click='modelShow = false') 取消
        el-button(type='primary',@click='updateUrl') 修改
        el-upload(:action="model.path",
                  :multiple='false',
                  :show-file-list='false',
                  name='file',
                  :before-upload='beforeUpload',
                  :on-success='uploadSuccess',
                  :on-error='uploadError')
          el-button(type='primary') 上传图片
</template>
<script>
import { mapGetters } from 'vuex';

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
    currentProject: {
      handler(project) {
        this.model.url = project[this.model.tag];
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters([
      'currentProject',
    ]),
  },
  methods: {
    beforeUpload(file) {
      const fileType = file.type;
      if (!/^image\b/.test(fileType)) {
        this.$message.error('请上传图片格式的文件');
        return false;
      } 
      return true;
    },
    uploadSuccess(res) {
      if (res.ok) {
        this.model.url = res.data;
        this.currentProject[this.model.tag] = res.data;
        this.$store.commit('SET_CURRENT_PROJECT', this.currentProject);
        this.$message.success('图片上传成功');
      } else {
        this.$message.error(res.msg || '图片上传失败');
      }
    },
    uploadError(err) {
      this.$message.error(err);
    },
    updateUrl() {
      const { url, tag } = this.model;
      this.$store.dispatch('updateUrl', { tag, url, projectId: this.currentProject.id });
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
