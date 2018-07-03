<template lang="pug">
  .project-detail
    project-header
    project-main
</template>
<script>
import ProjectHeader from '../components/project-header';
import ProjectMain from '../components/project-main';

export default {
  components: {
    ProjectHeader,
    ProjectMain,
  },

};
</script>
<style lang="scss">
.project-detail{
  width: 100%;
  .project-main{
    margin:20px 0; 
  }
}
</style>
