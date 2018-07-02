<template lang="pug">
  .interface-detail
    interface-header
    interface-main
    interface-footer
</template>
<script>
import InterfaceHeader from '../components/interface-header';
import InterfaceMain from '../components/interface-main';
import InterfaceFooter from '../components/interface-footer';

export default {
  components: {
    InterfaceHeader,
    InterfaceMain,
    InterfaceFooter,
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

