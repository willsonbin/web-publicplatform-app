<template>
  <div id="app">
    <!--<navBar />-->
    <div id="app-content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/nav_bar'

export default {
  name: 'App',
  components: { navBar },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';

html,body{
  width:100%;
  height: 100%;
  background-color: #fff;
}
.van-dialog{
  border-radius: 5px;
}
.van-dialog__header{
  color: #F31717;
  font-family: 'PingFang-SC-Bold';
  font-size: 1.125rem;
  margin-bottom: 0.625rem;
}
.van-dialog__footer{
  border-top: 1px solid #f4f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #app-content{
    /*flex:1;
    height: 1px;*/
    min-height: 100%;
    /*height: calc( 100% - 92px );*/
    background-color: #fff
  }
}
</style>
