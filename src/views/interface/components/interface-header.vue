<template lang="pug">
  .interface-header
    .interface-info
      .interface-name.form-item-5
        .label 接口名称：
        .input {{ interData.name }}
      .interface-other
        .interface-items
          .form-item-2
            .label 接口编号：
            .input {{ interData.id }}
          .form-item-2
            .label 所属项目：
            .input 
              a(href='javascript:void(0);',@click='$router.push("/project/detail/"+interData.project)') {{interData.projectName}}
          .form-item-2
            .label 创建时间：
            .input {{ interData.createTime | formatDate('YYYY-MM-DD') }}
          .form-item-2
            .label 创建人：
            .input {{ interData.creatorName }}
      .interface-remark
        .form-item-5
          .label 备注：
          .input
            el-input(v-if='isEdite',v-model='interData.remarks' placeholder='请输入项目备注',type='textarea')
            div(v-else) {{ interData.remarks }}
        // .interface-remark-ctrl
          el-button(type='primary',v-if='isEdite',@click='$emit("update")') 保存备注
    .interface-props
      .interface-props-form
        .interface-props-form-items
          .form-item-2
            .label URL：
            .input
              el-input(v-if='isEdite',v-model='interData.path',placeholder='请输入完整接口路径')
              div(v-else) {{ interData.path || '未填写' }}
          .form-item-2
            .label Method：
            .input
              el-select(v-if='isEdite',v-model='interData.method',placeholder='请选择接口请求方式')
                el-option(value='GET') GET
                el-option(value='POST') POST
                el-option(value='PUT') PUT
                el-option(value='DELETE') DELETE
              div(v-else) {{ interData.method || '未填写' }}
          .form-item-2
            .label Content-type：
            .input
              el-select(v-if='isEdite',v-model='interData.contentType',placeholder='请选择Content-type')
                el-option(value='application/json') application/json
                el-option(value='application/x-www-form-urlencoded') application/x-www-form-urlencoded
                el-option(value='multipart/form-data') multipart/form-data
                el-option(value='text/xml') text/xml
              div(v-else) {{ interData.contentType || '未填写' }}
      .interface-props-form-submits
        el-button(v-if='isEdite',@click='$emit("reset")') 重置
        el-button(v-if='isEdite',type='primary',@click='$emit("update")') 保存
</template>
<script>
export default {
  props: ['isEdite', 'interData'],
  data() {
    return {
    };
  },
};
</script>
<style lang="scss">
.interface-header{
  background: $white;
  border: 1px solid $border;
  border-radius: $borderRadius;
  padding: 20px;
  .interface-info{
    display: flex;
    padding-bottom: 10px;
    border-bottom: 2px dashed $border;
    justify-content: space-between;
    .interface-name{
      width: 300px;
      padding: 0;
      align-items: initial;
      font-size: $normalFont;
      .input{
          height: initial;
        }
    }
    .interface-other{
      margin: 0 20px;
      .interface-items{
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
          a{
            text-decoration: underline;
            color: $pr;
          }
        }
      }
    }
    .interface-remark{
      width: 500px;
      .form-item-5{
        padding: 0;
        align-items: initial;
        .input{
          height: initial;
        }
      }
      .interface-remark-ctrl{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 5px 0;
      }
    }
  }
  .interface-props{
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .interface-props-form{
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      .interface-props-form-items{
        display: flex;
        align-items: center;
        .form-item-2{
          align-items: initial;
          width: initial;
        }
      }
    }
  }
}
</style>

