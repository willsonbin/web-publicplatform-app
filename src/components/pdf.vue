<template>
  <div id="pdf-view">
    <div class="pic">
      <img src="../assets/pdf.png"/>
      <p>{{pdfData.name ? pdfData.name : type=='1'?'检验检疫证书':'随附证书'}}</p>
    </div>
    <div><van-button round @click="handleViewPDF">获取</van-button></div>
  </div>
</template>

<script>
export default {
  props: {
    pdfData: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: '1'
    }
  },
  methods: {
    handleViewPDF () {
      this.$emit('handleView', this.pdfData)
    }
  }
}
</script>

<style lang="scss" scoped>
#pdf-view{
  padding:1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top:1px solid #e0e0e0;
  border-bottom:1px solid #e0e0e0;
  .pic{
    display: flex;
    align-items: center;
    img{
      width:1.9375rem;
      height:2.5rem;
      margin-right: 0.625rem;
    }
    p{
      font-size: 14px;
      color:#333;
    }
  }
  /deep/ .van-button--normal{
    width:3.4375rem;
    height:1.4375rem;
    line-height: 1.4375rem;
    font-size: 14px;
    padding:0;
  }
}
</style>
