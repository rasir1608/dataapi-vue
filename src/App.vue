<template lang="pug">
    #app(v-loading='loading', element-loading-text='拼命加载数据中，请稍候。。。')
      head-nav
      main
        router-view 
</template>
<script>
import HeadNav from '@/views/components/head-nav';

export default {
  components: {
    HeadNav,
  },
  computed: {
    loading() {
        return this.$store.state.global.loading;
      },
  },
  created() {
    this.$store.dispatch('getUserInfo');
  },
};
</script>

<style lang="scss">
    #app {
        display: flex;
        flex: 1;
        flex-direction: column;
        font-size: $textFont;
        min-width: 1200px;
        >main{
          display: flex;
          flex: 1;
          background: $bgColor;
          padding: $borderPadding;
          overflow: auto;
        }
    }
</style>
