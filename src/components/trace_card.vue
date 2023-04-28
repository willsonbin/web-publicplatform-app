<template>
  <div class="trace_card">
    <div class="title">
      <span  class="title_span"><i/>{{title}}</span>
    </div>
    <van-divider style="margin:0px" />
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trace_card',
  props: ['title'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  /*@import "./decode.css";*/
  .trace_card {
    background-color: #fff;
    margin: 0.9375rem;
    border-radius: 0.3125rem;
    text-align: left;
    .title{
      height: 2.6875rem;
      font-weight: 600;
      font-size: 0.9375rem;
      display: flex;
      align-items: center;
      .title_span{
        display: inline-block;
        height: 1.25rem;
        display: flex;
        align-items: center;
        i{
          display: block;
          width:0.1875rem;
          height:1.125rem;
          margin-right: 0.9375rem;
          background: #2A6DB9;
          border-radius: 0.1875rem;
        }
      }
    }
    .content{
      padding: 0.9375rem;
      font-size: 0.875rem;
    }
  }
</style>
