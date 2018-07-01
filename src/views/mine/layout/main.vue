<template lang="pug">
  .mine
    mine-header
    mine-main
</template>
<script>
import MineHeader from '../components/mine-header';
import MineMain from '../components/mine-main';

export default {
  components: {
    MineHeader, 
    MineMain,
  },
};
</script>


<style lang="scss">
  .mine{
    flex: 1;
  }
</style>

