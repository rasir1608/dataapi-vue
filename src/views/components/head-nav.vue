<template lang="pug">
  .head-nav
    .nav
      .log
        router-link(to='/mine')
          img(src='static/image/logo.png')
          span API市场
      nav
        router-link(to='/mine') 个人主页
        router-link(to='/project') 项目市场
    .login-info
      router-link(to='/mine')
        img(:src='"."+(userInfo.headerurl || "/static/image/hello_kiity.jpg")')
      .user-info
        span {{userInfo.name || '未登录'}}
        ul(v-if='userInfo.name')
          li(@click='logout') 退出
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    logout() {
      this.$store.dispatch('userLogout');
    },
  },
};
</script>

<style lang='scss'>
.head-nav{
  height: 60px;
  background: $se;
  width: 100%;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: $titleFont;
  .nav{
    display: flex;
    align-items: center;
    .log > a{
      display: flex;
      align-items: center;
      font-size: $largeFont;
      margin-right: 20px;
      img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
    nav{
      a{
        padding: 0 20px;
      }
      .router-link-active{
        color: $pr;
      }
    }
  }
  .login-info{
    display: flex;
    font-size: $normalFont;
    align-items: center;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .user-info{
      border: 1px solid $white;
      line-height: 30px;
      height: 30px;
      border-radius: 4px;
      cursor: pointer;
      span{
        line-height: 30px;
        padding: 0 20px;
      }
      ul{
        display: none;
        width: 100%;
        padding-top: 12px;
        position: relative;
        z-index: 100;
        li{
          border-radius:0 0 $borderRadius $borderRadius;
          border-top: 1px solid $white;
          background: $black;
          text-align: center;
          line-height: $lineHeight;
          font-size: $textFont;
          &:hover{
            opacity: 0.8;
          }
        }
      }
      &:hover{
        ul{
          display: block;
        }
      }
    }
  }
}
</style>
