<template lang="pug">
  .interface-detail
    interface-header(:is-edite='isEdite',:inter-data='currentInterface',@update='updateInterface',@unlock='unlock')
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
      autoSaveTimeout: 60 * 1000,
      autoSaveTimer: '', 
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
    async getAction(aciton) {
      const vm = this;
      switch (aciton) {
        case 'back':
          await this.unlock();
          this.$router.push(`/project/${this.isEdite ? 'edite' : 'detail'}/${this.currentInterface.project}`);
          break;
        case 'delete':
          this.$alert('该操作将永久删除该接口，是否继续？', '提示', {
            showCancelButton: true,
            async callback(action) {
              if (action === 'confirm') {
                if (vm.autoSaveTimer) clearTimeout(vm.autoSaveTimer);
                await vm.$store.dispatch('deleteInterface', vm.currentInterface.id);
                vm.$router.push(`/project/${vm.isEdite ? 'edite' : 'detail'}/${vm.currentInterface.project}`);
              }
            },
          });
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
      if (this.isEdite && this.currentInterface.id) {
        if (this.currentInterface.power < 2) {
          this.$message.error('您没有编辑该项目的权限');
          this.$router.push(`/project/interface/detail/${this.currentInterface.id}`);
          return;
        } else if (!/^\d+$/.test(this.currentInterface.editeId)) {
          await this.$store.dispatch('createEdite', { kind: 1, target: interfaceId });
          await this.$store.dispatch('getInterfaceById', interfaceId);
        } else if (this.currentInterface.islock === 1 && this.currentInterface.editor !== this.userInfo.id) {
            this.$message.error(`该项目正在被${this.currentInterface.editorName}编辑，您暂时无法编辑！`);
            this.$router.push(`/project/interface/detail/${this.currentInterface.id}`);
            return;
        } else {
          await this.$store.dispatch('lockEdite', this.currentInterface.editeId);
          await this.$store.dispatch('getInterfaceById', interfaceId);
        }
        this.beginAutoSaveTimer();
      } else if (this.autoSaveTimer) {
        clearTimeout(this.autoSaveTimer);
      }
    },
    async updateInterface() {
      if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
      await this.$store.dispatch('updateInterface', this.currentInterface);
      this.beginAutoSaveTimer();
    },
    beginAutoSaveTimer() {
      if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
      this.autoSaveTimer = setTimeout(() => {
        this.updateInterface();
      }, this.autoSaveTimeout);
    },
    // 解锁编辑状态
    async unlock() {
      await this.$store.dispatch('updateInterface', this.currentInterface);
      await this.$store.dispatch('unlockEdite', this.currentInterface.editeId);
      this.$router.push(`/project/interface/detail/${this.currentInterface.id}`);
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

