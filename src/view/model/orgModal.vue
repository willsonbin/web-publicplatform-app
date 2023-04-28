<template>
  <div>
    <div class="org-modal">
        <div class="row-title-circle">
          <!-- <span class="small-background" /> -->
          <span>企业信息</span>
          <i class="circle circle-left"></i>
          <i class="circle circle-right"></i>
        </div>
        <ul class="list">
          <li>
            <h5>企业名称：</h5>
            <p>{{formData.organization.name}}</p>
          </li>
          <li>
            <h5>简介：</h5>
            <p>{{formData.organization.remarks}}</p>
          </li>
          <li>
            <h5>地址：</h5>
            <p>{{formData.organization.address}}</p>
          </li>
          <li>
            <h5>联系方式：</h5>
            <p>{{formData.organization.contactPhone}}</p>
          </li>
        </ul>
        <div class="row-title-circle" v-if="formData.organization.displayDiagram && formData.organization.displayDiagram.length > 0">
          <span style="font-weight: 400;">企业展示图</span>
        </div>
        <ul class="list list-img" v-if="formData.organization.displayDiagram && formData.organization.displayDiagram.length > 0">
          <li v-for="item in formData.organization.displayDiagram" :key="item.id" >
            <img :src="item.url">
          </li>
        </ul>
    </div>
    <div class="org-modal" style="margin-top: 12px" v-if="formData.orgApprove && formData.orgApprove.length > 0">
      <div class="row-title-circle">
        <span>认证信息</span>
        <i class="circle circle-left"></i>
        <i class="circle circle-right"></i>
      </div>
      <ul class="list " v-for="(item, index) in formData.orgApprove" :key="index">
        <li>
          <h5>认证名称：</h5>
          <p>{{item.certificationName}}</p>
        </li>
        <li>
          <h5>证书编号：</h5>
          <p>{{item.certificationNo}}</p>
        </li>
        <li style="flex-direction: column;margin-bottom: 20px;">
          <div class="row-title-circle" style="padding: 0;">
            <span style="font-weight: 400;">证书图片</span>
          </div>
          <ul class="list-img-nowrap" v-if="item.certificationImages && item.certificationImages.length > 0">
            <li v-for="(images, imgIndex) in item.certificationImages" :key="imgIndex">
              <img :src="images.url">
            </li>
          </ul>
        </li>
      </ul>
   </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      username: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.org-modal {
  padding: 0  0 15px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px #ccc;
  .row-title-circle {
    height: 50px;
    line-height: 50px;
    padding: 0 17px;
    font-size: 15px;
    position: relative;
    text-align: left;
    overflow: hidden;
    font-family: PingFang SC;
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
  .list-img > li {
    margin: 0;
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
}
</style>
