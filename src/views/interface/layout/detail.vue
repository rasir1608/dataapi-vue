<template lang="pug">
  .interface-detail
    interface-header(:is-edite='isEdite',:inter-data='currentInterface',@update='updateInterface')
    interface-main(:is-edite='isEdite',:inter-data='currentInterface')
    interface-footer(:is-edite='isEdite',:inter-data='currentInterface',@action='getAction')
</template>
<script>
import { mapGetters } from 'vuex';
import InterfaceHeader from '../components/interface-header';
import InterfaceMain from '../components/interface-main';
import InterfaceFooter from '../components/interface-footer';

export default {
  components: {
    InterfaceHeader,
    InterfaceMain,
    InterfaceFooter,
  },
  data() {
    return {
      isEdite: false,  
    };
  },
  watch: {
    $route: {
      handler() {
        this.loadInterface();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters([
      'currentInterface',
      'editeDetail',
      'userInfo',
    ]),
  },
  created() {
    this.loadInterface();
  },
  methods: {
    getAction(aciton) {
      switch (aciton) {
        case 'back':
          this.$router.push(`/project/detail/${this.currentInterface.project}`);
          break;
        case 'delete':
          break;
        case 'edite':
          this.$router.push(`/project/interface/edite/${this.currentInterface.id}`);
          break;
        default:
          break;
      }
    },
    // 加载接口数据
    async loadInterface() {
      this.isEdite = /edite/.test(this.$route.path);
      const interfaceId = Number(this.$route.params.id);
      await this.$store.dispatch('getInterfaceById', interfaceId);
      if (this.isEdite) {
        if (this.currentInterface.power < 2) {
          this.$message.error('您没有编辑该接口的权限');
          this.$router.push(`/project/interface/detail/${this.currentInterface.id}`);
        } else {
          const kind = 1;
          await this.$store.dispatch('getEditeDetail', { kind, target: interfaceId });
          console.log(this.editeDetail);
          if (this.editeDetail.islock === 1 && this.editeDetail.editor !== this.userInfo.id) {
            this.$message.error(`该项目正在被${this.editeDetail.editorName}编辑，您无法编辑！`);
            this.$router.push(`/project/interface/detail/${this.currentInterface.id}`);
          } else {
            await this.$store.dispatch('lockEdite', { kind, target: interfaceId });
          }
        }
      }
    },
    updateInterface() {
      const vm = this;
      this.$alert('是否保存修改内容？', '提示', {
        showCancelButton: true,
        async callback(action) {
          if (action === 'confirm') {
            await vm.$store.dispatch('updateInterface', vm.currentInterface);
          }
        },
      });
    },
  },
};
</script>
<style lang="scss">
.interface-detail{
  .interface-main{
    margin: 20px 0;
  }
}
</style>

