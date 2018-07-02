<template lang="pug">
  .interface-main
    .request-code
      .code-title
        span 请求参数：
      codemirror( v-model="interfaceData.request",ref="requestEditor",:options="codemirrorOptions")
    .response-code
      .code-title
        span 请求参数：
      codemirror( v-model="interfaceData.response",ref="responseEditor",:options="codemirrorOptions")
</template>
<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { codemirror } from 'vue-codemirror-lite';
  // import 'codemirror/theme/colorforth.css';
  import 'codemirror/mode/javascript/javascript';

  export default {
    components: {
      codemirror,
    },
    data() {
      return {
        code: 'const a = 10',
        interfaceData: {
          request: '{account:"rasir",password:"123456"}',
          response: '{ok:true,data:{account:"rasir",password:"123456"}}',
        },
        codemirrorOptions: { 
          mode: 'javascript', 
          lineNumbers: true, // 显示行数
          indentUnit: 4, // 缩进单位为4
          styleActiveLine: true, // 当前行背景高亮
          matchBrackets: true, // 括号匹配
          lineWrapping: true, // 自动换行
          theme: 'default', // 使用base16-light模版
          foldGutter: true,
          readOnly: false,
          extraKeys: { 'Ctrl-Space': 'autocomplete' }, 
        },
      };
    },
    computed: {
      requestEditor() {
        return this.$refs.requestEditor.editor;
      },
      responseEditor() {
        return this.$refs.responseEditor.editor;
      },
    },
  };
</script>
<style lang="scss">
.interface-main{
  display: flex;
  justify-content: space-between;
  background: $white;
  border: 1px solid $border;
  border-radius: $borderRadius;
  padding: 20px;
  .request-code,.response-code{
    width: 48%;
    .vue-codemirror-wrap{
      border: 1px solid $border;
      border-radius: $borderRadius;
      margin-top: 20px;
      * {
        line-height: 1.45;
      }
    }
    .code-title{
      span{
        position: relative;
        &::after{
          content: '';
          position: absolute;
          left: 1em;
          top: 120%;
          width: 50%;
          border-bottom: 3px solid $pr;
        }
      }
    }
  }
}
</style>

