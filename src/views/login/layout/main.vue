<template lang="pug">
  .login
    main
      .login-title
        | API市场
      .login-router
        .login-action
          router-link(to='/login/signin') 登录
          router-link(to='/login/signup') 注册
        .login-view
          router-view
</template>

<style lang="scss">
  $actionBorder:#3F51B5;
  .login{
    flex: 1;
    border: 1px solid $border;
    background: $white;
    border-radius: $borderRadius;
    font-size: $bigFont;
    overflow: auto;
    >main{
      width: 400px;
      margin: 100px auto 50px;
      .login-title{
        font-size: 30px;
        line-height: 40px;
        text-align: center;
      }
      .login-router{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        height: 500px;
        border: 1px solid $actionBorder;
        border-radius: $borderRadius;
        .login-action{
          display: flex;
          align-items: center;
          >a{
            width: 50%;
            text-align: center;
            line-height: 50px;
            border-bottom: 1px solid $actionBorder;
            &:first-of-type{
              border-right: 1px solid $actionBorder;
            }
            &.router-link-active{
              border-bottom: 0;
            }
          }
        }
        .login-view{
          display: flex;
          flex:1;
          align-items: center;
          >div{
            width: 100%;
            padding: 20px 40px;
            .label{
              width: 80px;
              text-align: right;
              font-size: $normalFont;
            }
            .submit{
              text-align: right;
              margin-top: 50px;
            }
          }
        }
      }
    }
  }
</style>

