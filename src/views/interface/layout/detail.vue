<template lang="pug">
  .interface-detail
    interface-header(:is-edite='isEdite',:inter-data='currentInterface')
    interface-main(:is-edite='isEdite')
    interface-footer(:is-edite='isEdite')
</template>
<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { Message } from 'element-ui';
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
  computed: {
    ...mapGetters([
      'currentInterface',
    ]),
  },
  async beforeRouteEnter(to, from, next) {
    const isEdite = /edite/.test(to.path);
    const id = to.params.id;
    await store.dispatch('getInterfaceById', id);
    const inter = store.state.interface.currentInterface;
    if (isEdite && inter.power < 2) {
      Message.error('您没有编辑该项目的权限');
      next(false);
      return;
    }
    next((vm) => {
      vm.isEdite = isEdite && inter.power > 2;
    });
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

