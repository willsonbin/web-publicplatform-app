<template>
  <div id="nav-bar" style="height: 46px;">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :border="false"
      fixed
      style="background-color:#004593;"
    >
      <template #title>
        <span style="color:#fff;font-size:1.125rem;">深圳海关</span>
      </template>
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="1.25rem"/>
      </template>
      <template #right>
        <van-icon name="cross" color="#fff" size="1.25rem"/>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'nav_bar',
  data () {
    return {
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      window.location.href = 'about:blank'
      window.close()
    }
  }
}
</script>
<style lang="scss">
</style>
