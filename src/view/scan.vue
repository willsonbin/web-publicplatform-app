<template>
  <div class="scan-page">
    <h2>扫描追溯码</h2>
    <p>查询溯源信息</p>
    <van-button class="scan-code" type="primary" @click="getScanInfo">扫 码</van-button>
    <van-field
      v-model="content"
      autofocus
      :maxlength="16"
      :minlength="16"
      class="input-box"
      placeholder="请输入16位码值"
      :show-error="false"
      :rules="[{ required: true,message: '' }]"
    />
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      content: '',
      formData: {}
    }
  },
  methods: {
    getScanInfo () {
      if (!this.content || this.content.length !== 16) {
        Toast({
          message: '请输入16位码值'
        })
        return
      }
      this.checkTraceCodeInfo(this.content)
    },
    checkTraceCodeInfo (code) {
      this.$trace.getTraceCodeInfo({code: code}).then(res => {
        if (res.success && res.data) {
          this.$router.push({path: '/app/scanInfo', query: {code: code}})
        } else {
          Toast({
            message: res.message || '扫码错误'
          })
        }
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.scan-page{
  padding-top: 30px;
  height: 100%;
  color: #fff;
  background: linear-gradient(to bottom,#1A9D98,#fff 60%,#fff);
  min-height: 350px;
  position: relative;
  .scan-btn{
    margin: 15px 0;
    width: 100%;
  }
  h2{
    line-height: 60px;
    font-size: 30px;
    font-weight: 800;
  }
  p{
    line-height: 40px;
  }
  .input-box{
    color:#fff;
    margin-top: 30px;
  }
  .van-cell{
      background: transparent;
  }
  /deep/ .van-field__control {
    text-align: center;
  }
  .scan-code{
    width: 80px;
    height:80px;
    border-radius:100%;
    // background:#255aa5;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position:absolute;
    bottom: 20%;
    left: 50%;
    margin-left: -40px;
  }
}
</style>
