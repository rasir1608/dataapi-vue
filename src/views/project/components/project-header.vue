<template lang="pug">
  .project-header
    .project-info
      .project-name.form-item-5
        .label 项目名称：
        .input 
          // el-input(v-if='canEdite()',v-model='currentProject.name')
          div {{currentProject.name}}
      .project-other
        .project-items
          .form-item-2
            .label 项目编号：
            .input {{currentProject.id}}
          .form-item-2
            .label 创建时间：
            .input {{currentProject.createTime | formatDate('YYYY-MM-DD')}}
          .form-item-2
            .label 创建人：
            .input {{currentProject.creatorName}}
        .project-models
          span
            a(v-if='canEdite()',@click='showEditeDialog("model")') 原型
            a(v-else,:href='currentProject.model',target='_blank') 原型
          span
            a(v-if='canEdite()',@click='showEditeDialog("ui")') UI
            a(v-else,:href='currentProject.ui',target='_blank') UI
          span
            a(v-if='canEdite()',@click='showEditeDialog("web")') WEB
            a(v-else,:href='currentProject.web',target='_blank') WEB
          span
            a(@click='membersShow=true') 项目协作人
      .project-remark
        .form-item-5
          .label 备注：
          .input
            el-input(v-if='canEdite()',v-model='currentProject.remarks' placeholder='请输入项目备注',type='textarea')
            div(v-else) {{currentProject.remarks}}
        .project-remark-ctrl(v-if='canEdite()')
          el-button(type='primary',@click='saveRemarks') 保存备注
    .project-interface-search
      .project-interface-ctrol(v-if='canEdite()')
        el-input(v-model='newInterfaceName' placeholder='请输入新接口名称')
        el-button(type='primary',@click='createInterface') 创建接口
      .project-interface-form
        .project-interface-form-items
          .form-item-1
            .label 接口ID：
            .input
              el-input(placeholder='请输入接口ID',v-model='search.id')
          .form-item-1
            .label 接口名称：
            .input
              el-input(placeholder='请输入接口名称',v-model='search.name')
        .project-interface-form-submits
          el-button(@click='resetSearch') 重置
          el-button(type='primary',@click='searchInter') 查询
    models-dialog(:show.sync='modelsShow',:model='modelData')
    project-members-dialog(:show.sync='membersShow',:is-edite='canEdite()')
</template>
<script>
import { mapGetters } from 'vuex';
import ModelsDialog from './models-dialog';
import ProjectMembersDialog from './project-members-dialog';

export default {
  components: {
    ModelsDialog,
    ProjectMembersDialog,
  },
  props: ['isEdite', 'search'],
  data() {
    return {
      newInterfaceName: '',
      modelsShow: false,
      membersShow: false,
      modelData: {
        title: '项目原型',
        url: '/rasir/header_201806040001',
        path: 'https://jsonplaceholder.typicode.com/posts/',
      },
    };
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'userInfo',
    ]),
  },
  methods: {
    saveRemarks() {
      if (this.currentProject.power < 2) {
        this.$message.error('您没有项目修改权限');
        return;
      }
      this.$store.dispatch('updateProject', this.currentProject);
    },
    showEditeDialog(tag) {
      if (this.currentProject.power < 2) {
        this.$message.error('您没有项目修改权限');
        return;
      }
      const titles = {
        model: '项目原型',
        ui: 'UI设计',
        web: 'web预览',
      };
      this.modelData = {
        tag,
        title: titles[tag],
        url: this.currentProject[tag],
        path: `/dataapi/dproject/upload/${tag}/${this.currentProject.id}`,
      };
      this.modelsShow = true;
    },
    // 重置搜索数据
    resetSearch() {
      Object.assign(this.search, {
        id: '',
        name: '',
      });
      this.searchInter();
    },
    searchInter() {
      this.$emit('search');
    },

    // 创建接口信息
    async createInterface() {
      if (/^\s*$/.test(this.newInterfaceName)) {
        this.$message.error('请先输入新接口的名称');
        return;
      }
      const interData = {
        name: this.newInterfaceName,
        creator: this.userInfo.id,
        modifier: this.userInfo.id,
        project: this.currentProject.id,
        createTime: Date.now(),
        updateTime: Date.now(),
      };
      await this.$store.dispatch('createInterface', interData);
    },
    canEdite() {
      return this.isEdite && this.currentProject.power > 1;
    },
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
        margin: 5px 0;
      }
    }
  }
  .project-interface-search{
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .project-interface-ctrol{
      display: flex;
    }
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

