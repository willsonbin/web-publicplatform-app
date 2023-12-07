<template>
    <div>
        <ul class="scan-list">
          <li>
            <h5>首次查询时间：</h5>
            <p>{{ formData.flowModal.firstQueryTime }}</p>
          </li>
          <li>
            <h5>首次查询地点：</h5>
            <p>{{ formData.flowModal.firstQueryAddress }}</p>
          </li>
          <li>
            <h5>扫码溯源次数：</h5>
            <!-- >=2 标红 -->
            <p :style="{color: (formData.flowModal.queryQuantity && formData.flowModal.queryQuantity >= 2) ? '#E91914': ''}">{{ formData.flowModal.queryQuantity }}</p>
          </li>
        </ul>
        <!-- 原产地信息 -->
        <div class="flow-modal" :style="{'padding-bottom': flag[0] ? '20px' : '0px'}" v-if="formData.materials.id">
            <img class="foot-mark" v-if="flag[0] && formData.product.id" src="@/assets/foot-mark.png"/>
            <div class="row-title-circle">
              <span>原（料）产地信息</span>
              <span v-if="flag[0]" @click="flag[0] = false"><van-icon name="arrow-down" /></span>
              <span v-else @click="flag[0] = true"><van-icon name="arrow-up" /></span>
              <i class="circle circle-left" v-if="flag[0]"></i>
              <i class="circle circle-right" v-if="flag[0]"></i>
            </div>
            <ul class="list" v-if="flag[0]">
              <li>
                <h5>生产企业：</h5>
                <p>{{formData.materials.productEnterprise}}</p>
              </li>
              <li>
                <h5>原产地：</h5>
                <p>{{formData.materials.areaName}}</p>
              </li>
              <li>
                <h5>日期：</h5>
                <p>{{formData.materials.createDate ? formData.materials.createDate.split(' ')[0] : ''}}</p>
              </li>
              <li>
                <h5>生产批次：</h5>
                <p>{{formData.materials.batchNo}}</p>
              </li>

            </ul>
        </div>
        <!-- 生产加工信息 -->
        <div class="flow-modal" style="margin-top: 12px" :style="{'padding-bottom': flag[1] ? '20px' : '0px'}" v-if="formData.product.id">
          <img class="foot-mark" v-if="flag[1] && formData.flowModal.productReviewRecords && formData.flowModal.productReviewRecords.length > 0" src="@/assets/foot-mark.png"/>
          <div class="row-title-circle">
            <span>生产加工信息</span>
            <span v-if="flag[1]" @click="flag[1] = false"><van-icon name="arrow-down" /></span>
              <span v-else @click="flag[1] = true"><van-icon name="arrow-up" /></span>
              <i class="circle circle-left" v-if="flag[1]"></i>
              <i class="circle circle-right" v-if="flag[1]"></i>
          </div>
          <ul class="list"  v-if="flag[1]">
            <li>
              <h5>企业名称：</h5>
              <p>{{formData.product.processingEnterprise}}</p>
            </li>
            <li>
              <h5>地址：</h5>
              <p>{{formData.product.processingAddress}}</p>
            </li>
            <li>
              <h5>生产加工批次：</h5>
              <p>{{formData.product.batchNo}}</p>
            </li>
          </ul>
        </div>
        <!-- 产品流转信息 -->
        <div class="flow-modal" style="margin-top: 12px" :style="{'padding-bottom': flag[2] ? '20px' : '0px'}" v-if="formData.deliveryRecords && formData.deliveryRecords.length > 0">
            <!-- <img class="foot-mark" v-if="flag[2]" src="@/assets/foot-mark.png"/> -->
            <div class="row-title-circle">
              <span>产品流转信息</span>
              <span v-if="flag[2]" @click="flag[2] = false"><van-icon name="arrow-down" /></span>
              <span v-else @click="flag[2] = true"><van-icon name="arrow-up" /></span>
              <i class="circle circle-left" v-if="flag[2]"></i>
              <i class="circle circle-right" v-if="flag[2]"></i>
            </div>
            <ul v-for="(item, index) in formData.deliveryRecords" :key="index" class="list"  v-show="flag[2]">
              <li>
                <h5>企业名称：</h5>
                <p>{{item.enterpriseName}}</p>
              </li>
              <li>
                <h5>地址：</h5>
                <p>{{item.enterpriseAddress}}</p>
              </li>
              <li>
                <h5>联系电话：</h5>
                <p>{{item.contactPhone}}</p>
              </li>
            </ul>
        </div>
        <!-- 检验检测信息 -->
        <div class="flow-modal" style="margin-top: 12px" :style="{'padding-bottom': flag[3] ? '20px' : '0px'}" v-if="formData.flowModal.productReviewRecords && formData.flowModal.productReviewRecords.length > 0">
            <div class="row-title-circle">
              <span>检验检测信息</span>
              <span v-if="flag[3]" @click="flag[3] = false"><van-icon name="arrow-down" /></span>
              <span v-else @click="flag[3] = true"><van-icon name="arrow-up" /></span>
              <i class="circle circle-left" v-if="flag[3]"></i>
              <i class="circle circle-right" v-if="flag[3]"></i>
            </div>
            <div v-if="flag[3]" class="flow-record" >
              <section v-for="(item, index) in formData.flowModal.productReviewRecords" :key="index">
              <van-swipe ref="my-swipe-info" :loop="false" :autoplay="0" indicator-color="#999" @change="onChange">
                <van-swipe-item>
                  <ul class="list" :key="index">
                    <li>
                      <h5>报告名称：</h5>
                      <p>{{item.reportName}}</p>
                    </li>
                    <li>
                      <h5>报告编号：</h5>
                      <p>{{item.reportNo}}</p>
                    </li>
                    <li>
                      <h5>检验检测机构：</h5>
                      <p>{{item.testingFacilityName}}</p>
                    </li>
                    <li>
                      <h5>检验检测日期：</h5>
                      <p>{{item.detectDate}}</p>
                    </li>
                    <li v-if="item.submitType == 0" style="position:absolute;right: 20px;top: 60px;transform:rotate(15deg)">
                      <img src="../../assets/certification.png">
                    </li>
                  </ul>
                </van-swipe-item>
              </van-swipe>
              <!-- <ul class="list" v-show="current == index" v-for="(item, index) in formData.flowModal.productReviewRecords" :key="index">
                <li style="flex-direction: column">
                  <div class="row-title-circle" style="padding: 0;">
                    <span style="font-weight: 400;">报告图片</span>
                  </div>
                  <ul class="list list-img-nowrap" v-if="item.reportImages && item.reportImages.length > 0">
                    <li v-for="image in item.reportImages" :key="image.id" >
                      <img :src="image.url">
                    </li>
                  </ul>
                </li>
              </ul> -->
              <section style="margin-top: -12px;">
              <ul class="list" v-if="item.imgList && item.imgList.length > 0 || item.pdfList && item.pdfList.length > 0">
                <li style="flex-direction: column">
                  <div class="row-title-circle" style="padding: 0;">
                    <span style="color: #959595;font-weight: normal;font-size: 14px;">上传报告：</span>
                  </div>
                  <ul class="list list-img-nowrap">
                    <li v-for="(image, index) in item.imgList" :key="image.id" >
                      <img :src="image.url" @click="sceneImg(item.imgList, index)">
                    </li>
                    <li v-for="(pdf, index) in item.pdfList" :key="index+1" >
                      <img src="@/assets/pdfs.png" @click="handlepProPdf(pdf)">
                    </li>
                  </ul>
                </li>
              </ul>
               <ul class="list" v-if="item.vedioList && item.vedioList.length > 0">
                   <li style="flex-direction: column">
                       <div class="row-title-circle" style="padding: 0;">
                            <span style="color: #959595;font-weight: normal;font-size: 14px;">检测视频</span>
                        </div>
                        <ul class="list list-img-nowrap">
                        <li v-for="image in item.vedioList" :key="image.id" >
                        <video
                            preload="auto"
                            width="100%"
                            height="200px"
                            controls="true"
                            style="margin-top: -44px;"
                          >
                            <source :src="image.url" type="video/mp4">
                            <source :src="image.url" type="video/flv">
                        </video>
                        </li>
                      </ul>
                   </li>
               </ul>
              </section>
              </section>
            </div>
        </div>
        <!-- 依据标准 -->
        <div class="flow-modal" style="margin-top: 12px" :style="{'padding-bottom': flag[4] ? '20px' : '0px'}" v-if="formData.flowModal.productReviewRecords && formData.flowModal.productReviewRecords.length > 0">
            <div class="row-title-circle">
              <span>依据标准</span>
              <span v-if="flag[4]" @click="flag[4] = false"><van-icon name="arrow-down" /></span>
              <span v-else @click="flag[4] = true"><van-icon name="arrow-up" /></span>
              <i class="circle circle-left" v-if="flag[4]"></i>
              <i class="circle circle-right" v-if="flag[4]"></i>
            </div>
            <div v-if="flag[4]" class="flow-record">
              <van-swipe :loop="false" ref="my-swipe-mark" :autoplay="0" indicator-color="#999" @change="onChange">
                <van-swipe-item v-for="(item, index) in formData.flowModal.productReviewRecords" :key="index">
                  <ul class="list" :key="index">
                    <li>
                      <p>依据标准：{{item.standard}}</p>
                    </li>
                    <li>
                      <p style="color: #333">标准说明：{{item.standardNotes}}</p>
                    </li>
                  </ul>
                </van-swipe-item>
              </van-swipe>
            </div>
        </div>
         <!-- 平台声明 -->
        <div class="flow-modal" style="margin-top: 12px" :style="{'padding-bottom': flag[5] ? '20px' : '0px'}" v-if="formData.configDto.statement">
            <div class="row-title-circle">
              <span>平台声明</span>
              <span v-if="flag[5]" @click="flag[5] = false"><van-icon name="arrow-down" /></span>
              <span v-else @click="flag[5] = true"><van-icon name="arrow-up" /></span>
              <i class="circle circle-left" v-if="flag[5]"></i>
              <i class="circle circle-right" v-if="flag[5]"></i>
            </div>
            <ul class="list"  v-if="flag[5]">
              <li>
                <div v-html="formData.configDto.statement"></div>
              </li>
            </ul>
        </div>
      <van-overlay :show="loaded" @click="loaded = false">
        <div class="wrapper" style="flex-direction: column;">
          <div class="block">
            <div class="goBtn">
                <van-nav-bar title="PDF预览" left-arrow />
            </div>
            <pdf
            :src="pdfUrl"
            style="width: 100%"
            :page="currentPage"
            @num-pages="pageCount=$event"
            @page-loaded="currentPage=$event"
            @loaded="loadPdfHandler"
            />
          </div>
          <div class="pdf" style="margin-top: -25px;z-index: 888;">
              <div class="pagesize">
                <!--上一页-->
                <span @click.stop="changePdfPage(0)" class="turn">上一页</span>
                {{currentPage}} / {{pageCount}}
                <!--下一页-->
                <span @click.stop="changePdfPage(1)" class="turn">下一页</span>
              </div>
          </div>
        </div>
    </van-overlay>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
import { ImagePreview } from 'vant'
export default {
  components: {
    pdf
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      username: '',
      flag: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true
      },
      current: 0,
      loaded: false,
      contractNum: 0,
      pdfUrl: '',
      currentPage: 0, // pdf文件页码
      pageCount: 0
    }
  },
  methods: {
    // pdf预览
    handlepProPdf (item) {
      this.currentPage = 1
      this.pdfUrl = pdf.createLoadingTask({
        url: item.url
      })
      this.pdfUrl.promise.then(pdf => {
        this.loaded = true
      })
    },
    changePdfPage (val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    // pdf加载时
    loadPdfHandler (e) {
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    // 图片预览
    sceneImg (images, index) {
      ImagePreview({
        images: images.map((v) => v.url), // 需要预览的图片 URL 数组
        showIndex: true, // 是否显示页码
        loop: false, // 是否开启循环播放
        startPosition: index // 图片预览起始位置索引
      })
    },
    onChange (index) {
      this.current = index
      this.$refs['my-swipe-info'].swipeTo(index)
      this.$refs['my-swipe-mark'].swipeTo(index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .turn {
    color: #1388f1;
    cursor: pointer;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 90%;
    background-color: #fff;
  }
.flow-modal {
  padding: 0;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px #ccc;
  position: relative;
  .foot-mark{
    position: absolute;
    height: 42px;
    left: 14px;
    bottom: -27px;
    width: calc(100% - 28px);
  }
  .row-title-circle {
    height: 50px;
    line-height: 50px;
    padding: 0 17px;
    font-size: 15px;
    position: relative;
    text-align: left;
    overflow: hidden;
    font-family: PingFang SC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >span {
      font-weight: 600;
    }
    .circle {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: #ccc;
      border-radius: 100%;
    }
    .circle-left {
      position: absolute;
      left: -6px;
      bottom: 0;
    }
    .circle-right {
      position: absolute;
      right: -6px;
      bottom: 0;
    }
  }
  .list {
    padding: 0 14px;
  }
  .list > li {
    display: flex;
    font-size: 14px;
    text-align: left;
    >h5{
      flex-shrink: 0;
      margin-right: 10px;
      color: #959595;
      line-height: 30px;
    }
    >p {
      color: #1D1D1D;
      line-height: 30px;
      word-break: break-all;
    }
    img{
      width: 100%;
    }
  }
  .list-img-nowrap {
    display: flex;
    overflow-x: auto;
    >li{
      width: 50%;
      flex-shrink: 0;
      margin-left: 10px;
    }
    li:first-child{
      margin-left: 0;
    }
  }
  .flow-record {
    width: 100%;
    // display: flex;
    // justify-content: flex-start;
    // overflow-x: auto;
    >.list {
      width: calc(100% - 28px);
      flex-shrink: 0;
    }
  }
}
.scan-list {
  margin-bottom: 16px;
  >li{
    display: flex;
    font-size: 14px;
    text-align: left;
    >h5{
      flex-shrink: 0;
      width: 100px;
      color: #959595;
      line-height: 30px;
    }
    >p {
      color: #1D1D1D;
      line-height: 30px;
    }
  }

}
</style>
