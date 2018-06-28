<template lang="pug">
    #app(v-loading='loading', element-loading-text='拼命加载数据中，请稍候。。。')
      router-view 
</template>
<script>
export default {
  computed: {
    loading() {
        return this.$store.state.global.loading;
      },
  },
};
</script>

<style lang="scss">
    #app {
        display: flex;
        flex: 1;
    }
</style>
