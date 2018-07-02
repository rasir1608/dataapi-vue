<template lang="pug">
  .project-header
    .project-info
      .project-name.form-item-5
        .label 项目名称：
        .input 接口市场接口市场接口市场接口市场接口市场
      .project-other
        .project-items
          .form-item-2
            .label 项目编号：
            .input 1000
          .form-item-2
            .label 创建时间：
            .input 2018-06-04
          .form-item-2
            .label 创建人：
            .input rasir
        .project-models
          a 原型
          a UI
          a web
          a 项目协作人
      .project-remark
        .form-item-5
          .label 备注：
          .input
            div 此处为项目备注此处为项目备注此处为项目备注此处为项目备注此处为项目备注此处为项目备注此处为项目备注此处为项目备注
            //el-input(v-model='remarks' placeholder='请输入项目备注',type='textarea')
        .project-remark-ctrl
          el-button(type='primary') 保存备注
    .project-interface-search
      .project-interface-ctrol
        el-button(type='primary') 编辑项目
        el-button(type='primary') 创建接口
      .project-interface-form
        .project-interface-form-items
          .form-item-1
            .label 接口ID：
            .input
              el-input(placeholder='请输入接口ID')
          .form-item-1
            .label 接口名称：
            .input
              el-input(placeholder='请输入接口名称')
        .project-interface-form-submits
          el-button 重置
          el-button(type='primary') 查询
</template>
<script>
export default {
  data() {
    return {
      remarks: '',
    };
  },
};
</script>
<style lang="scss">
.project-header{
  background: $white;
  border: 1px solid $border;
  border-radius: $borderRadius;
  padding: 20px;
  .project-info{
    display: flex;
    padding-bottom: 10px;
    border-bottom: 2px dashed $border;
    justify-content: space-between;
    .project-name{
      width: 300px;
      padding: 0;
      align-items: initial;
      font-size: $normalFont;
      .input{
          height: initial;
        }
    }
    .project-other{
      margin: 0 20px;
      .project-items{
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        .form-item-2{
          min-width: 100px;
          padding: 0;
          width: 50%;
          .label{
            width: 60px;
            text-align: right;
          }
        }
      }
      .project-models{
        a{
          color: $pr;
          text-decoration: underline;
          padding: 0 10px;
          cursor: pointer;
        }
      }
    }
    .project-remark{
      width: 500px;
      .form-item-5{
        padding: 0;
        align-items: initial;
        .input{
          height: initial;
        }
      }
      .project-remark-ctrl{
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
  .project-interface-search{
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .project-interface-form{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .project-interface-form-items{
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

