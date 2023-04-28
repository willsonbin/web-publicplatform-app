<template>
  <div id="scan-info">
    <!--   left-arrow
      @click-left="onClickLeft" -->
    <!-- <van-nav-bar
      title="中国检科院粤港澳大湾区研究院质量安全追溯"
      left-text=""
      right-text=""
    /> -->
    <!-- 内容 -->
    <div class="content" :style="{'padding-top': (!formData.goosInfo.images || formData.goosInfo.images.length == 0) ? '20px' : '0'}">
      <div class="picture" v-if="formData.goosInfo && formData.goosInfo.images && formData.goosInfo.images.length > 0">
        <div>
          <img src="../view/logo.png" style="width: 366px" alt=""/>
        </div>
        <div class="white-box">
          <!-- 商品图片 -->
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-if="formData.goosInfo && formData.goosInfo.images && formData.goosInfo.images.length > 0">
            <van-swipe-item v-for="(item, index) in formData.goosInfo.images" :key="index">
              <img :src="item.url"/>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="tabs">
        <van-button :type="activeIndex === 0 ? 'primary' : 'default'" @click="activeIndex = 0 ">产品信息</van-button>
        <van-button :type="activeIndex === 1 ? 'primary' : 'default'" @click="activeIndex = 1 " style="margin: 0 15px;">商事主体</van-button>
        <van-button :type="activeIndex === 2 ? 'primary' : 'default'" @click="activeIndex = 2 ">追溯信息</van-button>
      </div>
      <!-- <p style="word-break:break-all">{{JSON.stringify(device)}}</p> -->
      <div class="tabs-main">
        <!-- 产品信息 -->
        <GoodsModal v-if="activeIndex === 0" :formData="formData"></GoodsModal>
        <!-- 商事主体 -->
        <OrgModal v-if="activeIndex === 1" :formData="formData"></OrgModal>
        <!-- 追溯信息 -->
        <FlowModal v-if="activeIndex === 2" :formData="formData"></FlowModal>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-btn">
      <van-button type="default" @click="handleToFeedBack">意见反馈</van-button>
      <van-button type="primary" @click="handleToCheck">防伪鉴别</van-button>
    </div>
    <!-- <div class="fixed-mark" v-if="showMark">
      <img src="../assets/authTrue.png">
    </div> -->
    <van-popup v-model="show" :style="{ width: '85%', height: '80%' }"  closeable close-icon-position="bottom">
      <div class="wrapper-pic">
        <div class="wrapper-pic-fix">
          <div class="wrapper">
          <h1>鉴伪查询</h1>
          <!-- <p>我们为你提供优质的服务</p> -->
          <div class="pic">
            <p><span>1</span>【长按】识别小程序码</p>
            <img src="../assets/check-app.jpg"/>
          </div>
          <div class="pic">
            <p><span style="margin-right: 10px">2</span> 扫描产品标签上“防伪标识”</p>
            <div class="pic-bj"/>
          </div>
          <!-- <div class="pic"><img src="../assets/check-app.jpg"/></div>
          <p>长按识别小程序码</p> -->
        </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import GoodsModal from './model/goodsModal.vue'
import OrgModal from './model/orgModal.vue'
import FlowModal from './model/flowModal.vue'
export default {
  components: {GoodsModal, OrgModal, FlowModal},
  data () {
    return {
      activeIndex: 0,
      tabList: [{name: '商品信息', id: 0}, {name: '企业信息', id: 1}, {name: '溯源信息', id: 2}],
      formData: {
        product: {}, // 商品信息
        organization: {}, // 企业信息
        orgApprove: [], // 认证信息
        flowModal: {}, // 追溯信息
        configDto: {}, // 系统设置里面的信息
        goosInfo: {},
        deliveryRecords: [] // 产品流转信息
      },
      feedBack: {
        code: '',
        productId: '',
        type: ''
      },
      show: false, // 小程序码弹框
      device: {},
      showMark: false // 从量子微查溯源页面
    }
  },
  created () {
  },
  mounted () {
    // const u = navigator.userAgent
    // const md = new MobileDetect(u)
    // var os = md.os()// 获取系统
    // var model = ''
    // if (os === 'iOS') { // ios系统的处理
    //   os = md.os() + md.version('iPhone')
    //   model = md.mobile()
    // } else if (os === 'AndroidOS') { // Android系统的处理
    //   os = md.os() + md.version('Android')
    // }
    // this.device = {
    //   u: navigator.userAgent,
    //   mobile: md.mobile(),
    //   phone: md.phone(),
    //   userAgent: md.userAgent(),
    //   os: md.os(),
    //   model: model,
    //   version: md.version('Webkit'),
    //   versionStr: md.versionStr('Build')
    // }
  },
  activated () {
    if (this.$route.query && this.$route.query.jump && (this.$route.query.jump === true || this.$route.query.jump === 'true')) {
      this.showMark = true
    } else {
      this.showMark = false
    }
    if (this.$route.query && this.$route.query.code) {
      this.activeIndex = 0
      this.getCodeData(this.$route.query.code, this.showMark)
    }
  },
  methods: {
    handleToCheck () {
      this.show = true
    },
    handleLaunchFn (e) {
      console.log('handleLaunchFn', e)
    },
    handleErrorFn (e) {
      console.log('handleErrorFn', e.detail)
    },
    handleToFeedBack () {
      this.$router.push({path: '/app/feedBack', query: this.feedBack})
    },
    getCodeData (code, showMark) {
      let formData = {
        product: {},
        materials: {},
        organization: {},
        orgApprove: [],
        flowModal: {},
        configDto: {},
        goosInfo: {},
        deliveryRecords: []
      }
      this.formData = formData
      this.feedBack = {
        code: '',
        productId: '',
        type: ''
      }
      const type = showMark ? 0 : 1
      this.$trace.getTraceCodeInfo({code: code, type}).then(res => {
        if (res.success && res.data) {
          let data = {}
          // type  0原料 1产品
          data.type = res.data.type
          let materials = {}
          if (res.data.materials && res.data.materials.length > 0) {
            const keys = ['productEnterprise', 'areaName', 'createDate', 'batchNo']
            materials = {...res.data.materials[0]}
            res.data.materials.forEach((item, index) => {
              if (index > 0) {
                for (const key in materials) {
                  if (keys.includes(key) && materials[key] && item[key]) {
                    materials[key] = materials[key] + ', ' + item[key]
                  } else if (keys.includes(key) && item[key]) {
                    materials[key] = item[key]
                  }
                }
              }
            })
          }
          data.product = res.data.product || {}
          data.materials = materials || {}
          data.organization = res.data.organization || {}
          data.flowModal = {}
          if (res.data.productReviewRecords && res.data.productReviewRecords.length > 0) {
            res.data.productReviewRecords.map((item) => {
              if (item.reportImages) {
                const imgList = []
                const vedioList = []
                const pdfList = []
                item.reportImages.map(obj => {
                  if (obj) {
                    if (obj.type === 'image/jpeg' || obj.type === 'image/png') {
                      imgList.push({
                        url: obj.url
                      })
                      item.imgList = imgList
                    } else if (obj.type === 'application/pdf') {
                      pdfList.push({
                        url: obj.url
                      })
                      item.pdfList = pdfList
                    } else {
                      vedioList.push({
                        url: obj.url
                      })
                      item.vedioList = vedioList
                    }
                  }
                })
              }
            })
          }
          data.flowModal.productReviewRecords = res.data.productReviewRecords || []
          data.flowModal.firstQueryTime = res.data.firstQueryTime
          data.flowModal.firstQueryAddress = res.data.firstQueryAddress
          data.flowModal.queryQuantity = res.data.queryQuantity
          data.configDto = res.data.configDto || {} // 系统设置相关的信息-平台声明
          data.orgApprove = res.data.orgApprove || [] // 认证信息
          data.organization.displayDiagram = data.organization.displayDiagram || [] // 企业展示图
          data.product.description = data.product.description ? JSON.parse(data.product.description) : [] // 产品介绍图
          data.product.images = data.product.images ? JSON.parse(data.product.images) : [] // 商品图片
          data.materials.description = data.materials.description ? JSON.parse(data.materials.description) : [] // 产品介绍图
          data.materials.images = data.materials.images ? JSON.parse(data.materials.images) : [] // 商品图片
          // type 为0
          data.goosInfo = res.data.type === 0 ? data.materials : data.product
          if (data.goosInfo.attr) { // 自定义产品属性
            data.goosInfo.attr = JSON.parse(data.goosInfo.attr) || []
          } else {
            data.goosInfo.attr = []
          }
          data.deliveryRecords = res.data.deliveryRecords || []
          this.formData = data
          this.formData.code = code
          this.feedBack = {
            code: code,
            productId: res.data.type === 0 ? data.materials.id : data.product.id,
            type: res.data.type
          }
        } else {
          Toast({
            message: res.message || '扫码错误'
          })
        }
      }).catch(() => {})
    },
    onClickLeft () {
      this.$router.back()
      this.formData = {
        product: {},
        materials: {},
        organization: {},
        reportInfo: {},
        scanRecord: {},
        goosInfo: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin border-top {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: #1A9D98;
    transform: scaleY(0.5);
  }
}
#scan-info {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .van-nav-bar {
    flex-shrink: 0;
  }
  .content {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    .picture {
      position: relative;
      height: 200px;
      overflow: hidden;
      z-index: 1;
      padding: 13px 12px 16px;
      .white-box{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 6px;
        box-shadow: 0px 3px 8px 0px #555B64;
        .my-swipe {
          height: 100%;
        }
        img {
          margin:0;
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }
    }
    .picture::after {
      content: '';
      z-index: -1;
      width: 120%;
      height: 300px;
      position: absolute;
      top: -66%;
      left: -10%;
      border-radius: 20%;
      //background: #1A9D98;
    }
    .tabs {
      display: flex;
      padding: 0 10px;
      margin: 16px 0 16px 0;
      .van-button{
        flex:1;
        font-size: 15px;
        border-radius: 6px;
        box-shadow: 0px 0px 3px 1px rgba(0 , 0, 0 , 0.1);
      }
    }
    .tabs-main {
      margin: 0 10px 16px;
    }
  }
  .bottom-btn {
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
    @include border-top;
    .van-button{
      flex:1;
      position: relative;
    }
    .van-button--normal {
      padding: 0;
    }
    .btn-link {
      flex: 1;
      background: #1A9D98;
      position: relative;
    }
    .btn-link::after{
      content: '防伪鉴别';
      line-height: 44px;
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
    .btn__mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      z-index: 2;
      overflow-y: hidden;
    }
  }
  .fixed-mark {
    position: fixed;
    top: 45%;
    right: 20%;
    img {
      width: 100px;
    }
  }
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #333;
    font-size: 16px;
    font-weight: 600;
    margin: 20px 0 10px;
  }
  >p {
    color: #C1C1C1;
    font-size: 12px;
  }
  .pic {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    >p {
      width: 90%;
      padding: 15px 0px;
      text-align: left;
      display: flex;
      align-items: center;
      color: #1A9D98;
      >span {
        display: inline-block;
        font-size: 14px;
        width: 14px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        padding: 5px;
        border-radius: 50%;
        margin-right: 5px;
        background: linear-gradient(to bottom,#86E0D8,#4BBCB2);
        color: #fff;
        text-align: center;
      }
    }
    >img {
      width: 50%;
    }
  }
  .pic-bj {
    width: 90%;
    // height: 150px;
    height: 40vw;
    background: url("../assets/trace.png") no-repeat 0 0;
    background-size: 100% 100%;
  }
}
</style>
<style>
#scan-info > .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
#scan-info > .van-nav-bar > .van-nav-bar__content {
  background: #1A9D98;
}
#scan-info > .van-nav-bar > .van-nav-bar__content > .van-nav-bar__title {
  color: #fff;
}
#scan-info > .van-nav-bar > .van-nav-bar__content > .van-nav-bar__left > .van-icon {
  color: #fff;
}
.wrapper-pic {
 width: calc(100% - 40px);
  height: calc(85% - 40px);
  background: url("../assets/beijing.png") no-repeat 0 0;
  background-size: 100% 100%;
  padding: 20px;
  overflow: hidden;
}
.wrapper-pic-fix {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
#scan-info .van-popup {
  background: transparent !important;
}
#scan-info .van-popup--center {
  border-radius: 10px;
  background: transparent !important;
}
#scan-info .van-popup__close-icon {
  position: absolute;
  bottom: 0px;
  left: 50%;
  margin-left: -15px;
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 10px;
  opacity: 0.5;
}
</style>
