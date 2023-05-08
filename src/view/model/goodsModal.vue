<template>
   <div id="product-modal">
      <div class="row-title-circle">
        <span>商品信息</span>
        <i class="circle circle-left"></i>
        <i class="circle circle-right"></i>
      </div>
      <ul class="list">
        <li>
          <h5>商品名称：</h5>
          <p>{{formData.goosInfo.name}}</p>
        </li>
        <li>
          <h5>净重：</h5>
          <p v-if="formData.goosInfo.weight">{{formData.goosInfo.weight}}{{formData.goosInfo.weightType | weightType }}</p>
        </li>
        <li>
          <h5>原产国/地区：</h5>
          <p>{{formData.goosInfo.areaName}}</p>
        </li>
        <li>
          <h5>保质期：</h5>
          <p>{{formData.goosInfo.shelfLife}}{{ formData.goosInfo.shelfLifeType | shelfLifeFilter}}</p>
        </li>
        <li>
          <h5>生产日期：</h5>
          <p>{{formData.goosInfo.createDate ? formData.goosInfo.createDate.split(' ')[0] : ''}}</p>
        </li>

        <li>
          <h5>存储条件：</h5>
          <p>{{formData.goosInfo.storageConditions}}</p>
        </li>
        <li>
          <h5>执行标准：</h5>
          <p>{{formData.goosInfo.implementStandard}}</p>
        </li>
        <li v-if="formData.goosInfo.materialName && formData.goosInfo.materialName.length > 0">>
          <h5>原料投料：</h5>
          <p>{{ formData.goosInfo.materialName }}</p>
        </li>
        <li v-if="formData.goosInfo.nutritionFacts && formData.goosInfo.nutritionFacts.length > 0">>
          <h5>配料表（成分表）：</h5>
          <p>{{ formData.goosInfo.nutritionFacts }}</p>
        </li>
        <li v-for="(item) in formData.goosInfo.attr" :key="item.id">
           <h5>{{ item.key }}：</h5>
           <p>{{item.arrType==='2' ? item.value2.join(' ') : item.arrType==='3' ? item.value3: item.value1}}</p>
        </li>
      </ul>
      <!-- 产品介绍图 -->
      <ul class="list list-img" v-if="formData.goosInfo.description && formData.goosInfo.description.length > 0">
        <li v-for="item in formData.goosInfo.description" :key="item.id" >
          <img :src="item.url" alt="">
        </li>
      </ul>
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
    }
  },
  filters: {
    shelfLifeFilter (type) {
      let filterMap = {
        0: '日',
        1: '月',
        2: '年'
      }
      return filterMap[type] || ''
    },
    weightType (type) {
      let filterMap = {
        1: 'g',
        2: 'kg',
        3: 'ml',
        4: 'l'
      }
      return filterMap[type] || ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#product-modal {
  padding: 0 0 15px;
  border-radius: 6px;
  box-shadow: 0 0 8px 2px #ccc;

  .row-title-circle {
    height: 50px;
    line-height: 50px;
    padding: 0 17px;
    font-size: 15px;
    position: relative;
    text-align: left;
    overflow: hidden;
    font-family: PingFang SC;

    > span {
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
}
</style>
